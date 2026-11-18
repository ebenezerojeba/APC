import NewsImage from '../models/NewsImage.js';

const MAX_BYTES = 3 * 1024 * 1024; // after decoding; the admin sends ~0.2–0.4 MB
const DATA_URL = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/;

// Absolute link to an image, built from the request so it works locally and on Vercel.
const publicUrl = (req, id) => {
  const proto = req.headers['x-forwarded-proto']?.split(',')[0] || req.protocol;
  return `${proto}://${req.get('host')}/api/news-images/${id}`;
};

/**
 * POST /api/admin/news-images
 * Admin — body: { dataUrl: "data:image/jpeg;base64,..." }
 * Returns { url } to put in the article's `image` field.
 */
export const uploadNewsImage = async (req, res) => {
  try {
    const match = DATA_URL.exec(req.body?.dataUrl || '');
    if (!match) {
      return res.status(400).json({ success: false, message: 'Send a JPEG, PNG or WebP image.' });
    }
    const data = Buffer.from(match[2], 'base64');
    if (data.length > MAX_BYTES) {
      return res.status(413).json({ success: false, message: 'Image is too large (max 3 MB).' });
    }

    const img = await NewsImage.create({
      data,
      contentType: match[1],
      size: data.length,
      uploadedBy: req.admin?._id,
    });

    return res.status(201).json({ success: true, data: { _id: img._id, url: publicUrl(req, img._id) } });
  } catch (err) {
    console.error('[uploadNewsImage]', err);
    return res.status(500).json({ success: false, message: 'Could not save the image.' });
  }
};

/**
 * GET /api/news-images/:id
 * Public — the image bytes. Images never change once uploaded, so they are
 * cached for a year.
 */
export const getNewsImage = async (req, res) => {
  try {
    const img = await NewsImage.findById(req.params.id).select('data contentType').lean();
    if (!img) return res.status(404).end();
    res.set({
      'Content-Type': img.contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
      // Helmet defaults to same-origin, which would stop the website (another domain) showing it.
      'Cross-Origin-Resource-Policy': 'cross-origin',
    });
    // .lean() returns a BSON Binary (bytes in .buffer); a hydrated doc returns a Buffer.
    const bytes = Buffer.isBuffer(img.data) ? img.data : Buffer.from(img.data.buffer ?? img.data);
    return res.send(bytes);
  } catch (err) {
    if (err.name === 'CastError') return res.status(404).end();
    console.error('[getNewsImage]', err);
    return res.status(500).end();
  }
};
