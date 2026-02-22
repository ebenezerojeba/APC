const VALID_LGAS = [
  'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
  'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye',
  'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland',
  'Mushin', 'Ojo', 'Oshodi-Isolo', 'Somolu', 'Surulere'
];

const VALID_INTERESTS = [
  'Volunteer', 'Grassroots Support', 'Media & Comms', 'Polling Agent', 'PVC'
];

export function validateRegistration(req, res, next) {
  const { firstName, lastName, email, phone, lga, interests } = req.body;

  if (!firstName?.trim())
    return res.status(400).json({ error: 'First name is required' });

  if (!lastName?.trim())
    return res.status(400).json({ error: 'Last name is required' });

  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: 'Valid email is required' });

  if (!phone?.trim() || !/^(\+234|0)[789]\d{9}$/.test(phone.replace(/\s/g, '')))
    return res.status(400).json({ error: 'Valid Nigerian phone number is required' });

  if (!lga || !VALID_LGAS.includes(lga))
    return res.status(400).json({ error: 'Valid LGA is required' });

  if (!Array.isArray(interests) || interests.length === 0)
    return res.status(400).json({ error: 'At least one interest is required' });

  if (!interests.every(i => VALID_INTERESTS.includes(i)))
    return res.status(400).json({ error: 'Invalid interest option' });

  next();
}