import React, { useState, useEffect, useCallback } from 'react';
import {
  Plus, Edit2, Trash2, Eye, X, Save,
  RefreshCw, Search, FileText, Tag,
  ChevronLeft, ChevronRight, AlertCircle,
} from 'lucide-react';
import useAuthStore from '../store/authStore.js';

/* ── TOKENS (matches AdminLayout) ───────── */
const C = {
  bg:       '#0b0f0e',
  surface:  '#0e1511',
  card:     '#111815',
  border:   '#1a2820',
  borderHi: '#243630',
  green:    '#22c55e',
  muted:    '#4b6357',
  text:     '#e8f0eb',
  textDim:  '#7a9e84',
  hover:    '#141d18',
  gold:     '#f59e0b',
  red:      '#f87171',
  redDim:   'rgba(248,113,113,0.08)',
};

const CATEGORIES = [
  'Official Statement', 'Mobilization', 'Registration', 'Obituary',
];

/* ── API HELPER ─────────────────────────── */
const _raw = import.meta.env.VITE_API_URL;
const API_BASE = (_raw && _raw !== 'undefined')
  ? _raw.replace(/\/$/, '')
  : 'https://apcbackend.vercel.app/api';

const api = async (path, options = {}) => {
  const token = useAuthStore.getState().accessToken;
  let cleanPath = path
    .replace(/^https?:\/\/[^/]+/, '')
    .replace(/^\/api\//, '/')
    .replace(/^\/api$/, '/');
  if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;

  const res = await fetch(`${API_BASE}${cleanPath}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

/* ── EMPTY FORM STATE ───────────────────── */
const emptyForm = () => ({
  title: '',
  excerpt: '',
  category: 'Official Statement',
  date: new Date().toISOString().split('T')[0],
  author: '',
  role: '',
  paragraphs: [''],  // array of paragraph strings
});

/* ── BADGE ──────────────────────────────── */
const Badge = ({ category }) => {
  const colors = {
    'Official Statement': { color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.25)' },
    'Mobilization':       { color: C.green,   bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.25)' },
    'Registration':       { color: C.gold,    bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.25)' },
    'Obituary':           { color: C.muted,   bg: 'rgba(75,99,87,0.15)',   border: 'rgba(75,99,87,0.3)' },
  };
  const s = colors[category] || colors['Official Statement'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700,
      background: s.bg, border: `1px solid ${s.border}`, color: s.color,
      letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap',
    }}>
      {category}
    </span>
  );
};

/* ── INPUT STYLES ───────────────────────── */
const inputStyle = (focused) => ({
  width: '100%', boxSizing: 'border-box',
  background: C.card, border: `1px solid ${focused ? C.borderHi : C.border}`,
  borderRadius: 8, color: C.text, padding: '9px 12px',
  fontSize: 13, fontFamily: 'DM Sans,sans-serif',
  outline: 'none', transition: 'border-color .15s',
});

const labelStyle = {
  display: 'block', color: C.muted,
  fontSize: 10, fontWeight: 800,
  letterSpacing: '0.1em', textTransform: 'uppercase',
  marginBottom: 6,
};

/* ── FIELD WRAPPER ──────────────────────── */
const Field = ({ label, children }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={labelStyle}>{label}</label>
    {children}
  </div>
);

/* ── ARTICLE FORM MODAL ─────────────────── */
const ArticleForm = ({ initial, onSave, onClose, saving }) => {
  const [form, setForm] = useState(initial || emptyForm());
  const [focused, setFocused] = useState('');
  const isEdit = !!initial?._id;

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));


  const setPara = (i, val) => {
    const arr = [...form.paragraphs];
    arr[i] = val;
    setForm(f => ({ ...f, paragraphs: arr }));
  };

  const addPara = () => setForm(f => ({ ...f, paragraphs: [...f.paragraphs, ''] }));

  const removePara = (i) =>
    setForm(f => ({ ...f, paragraphs: f.paragraphs.filter((_, idx) => idx !== i) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // basic validation
    if (!form.title.trim()) return alert('Title is required');
    if (!form.excerpt.trim()) return alert('Excerpt is required');
    if (!form.author.trim()) return alert('Author is required');
    if (form.paragraphs.every(p => !p.trim())) return alert('At least one paragraph is required');
    onSave(form);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.surface, border: `1px solid ${C.borderHi}`,
          borderRadius: 16, width: '100%', maxWidth: 680,
          maxHeight: '92vh', display: 'flex', flexDirection: 'column',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '18px 20px', borderBottom: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: `${C.green}18`, border: `1px solid ${C.green}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FileText size={15} color={C.green} />
            </div>
            <div>
              <p style={{ color: C.text, fontSize: 14, fontWeight: 800, margin: 0 }}>
                {isEdit ? 'Edit Article' : 'New Article'}
              </p>
              <p style={{ color: C.muted, fontSize: 11, margin: '1px 0 0' }}>
                {isEdit ? 'Update existing news post' : 'Create a new news post'}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted }}>
            <X size={18} />
          </button>
        </div>

        {/* Form body — scrollable */}
        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', flex: 1, padding: 20 }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            {/* Title — full width */}
            <div style={{ gridColumn: '1 / -1' }}>
              <Field label="Title *">
                <input
                  value={form.title}
                  onChange={e => set('title', e.target.value)}
                  placeholder="Article headline…"
                  style={inputStyle(focused === 'title')}
                  onFocus={() => setFocused('title')}
                  onBlur={() => setFocused('')}
                  required
                />
              </Field>
            </div>

            {/* Excerpt — full width */}
            <div style={{ gridColumn: '1 / -1' }}>
              <Field label="Excerpt / Summary *">
                <textarea
                  value={form.excerpt}
                  onChange={e => set('excerpt', e.target.value)}
                  placeholder="Short summary shown in the news feed…"
                  rows={2}
                  style={{ ...inputStyle(focused === 'excerpt'), resize: 'vertical' }}
                  onFocus={() => setFocused('excerpt')}
                  onBlur={() => setFocused('')}
                  required
                />
              </Field>
            </div>

            {/* Category */}
            <Field label="Category *">
              <select
                value={form.category}
                onChange={e => set('category', e.target.value)}
                style={inputStyle(focused === 'category')}
                onFocus={() => setFocused('category')}
                onBlur={() => setFocused('')}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>

            {/* Date */}
            <Field label="Publication Date *">
              <input
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
                style={{ ...inputStyle(focused === 'date'), colorScheme: 'dark' }}
                onFocus={() => setFocused('date')}
                onBlur={() => setFocused('')}
                required
              />
            </Field>

            {/* Author */}
            <Field label="Author *">
              <input
                value={form.author}
                onChange={e => set('author', e.target.value)}
                placeholder="e.g. Pastor Cornelius Ojelabi"
                style={inputStyle(focused === 'author')}
                onFocus={() => setFocused('author')}
                onBlur={() => setFocused('')}
                required
              />
            </Field>

            {/* Role */}
            <Field label="Author Role / Title">
              <input
                value={form.role}
                onChange={e => set('role', e.target.value)}
                placeholder="e.g. APC Lagos State Chairman"
                style={inputStyle(focused === 'role')}
                onFocus={() => setFocused('role')}
                onBlur={() => setFocused('')}
              />
            </Field>
          </div>

          {/* Paragraphs */}
          <div style={{ marginBottom: 8 }}>
            <label style={labelStyle}>Body Paragraphs *</label>
            <p style={{ color: C.muted, fontSize: 11, marginBottom: 10, lineHeight: 1.5 }}>
              Each block becomes a separate paragraph in the article.
            </p>
            {form.paragraphs.map((para, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'flex-start' }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 9,
                  background: C.card, border: `1px solid ${C.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: C.muted, fontSize: 9, fontWeight: 800,
                }}>
                  {i + 1}
                </div>
                <textarea
                  value={para}
                  onChange={e => setPara(i, e.target.value)}
                  placeholder={`Paragraph ${i + 1}…`}
                  rows={3}
                  style={{ ...inputStyle(focused === `para-${i}`), resize: 'vertical', flex: 1 }}
                  onFocus={() => setFocused(`para-${i}`)}
                  onBlur={() => setFocused('')}
                />
                {form.paragraphs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePara(i)}
                    style={{
                      width: 30, height: 30, borderRadius: 8, flexShrink: 0, marginTop: 6,
                      background: 'transparent', border: `1px solid ${C.border}`,
                      cursor: 'pointer', color: C.muted, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all .15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.redDim; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.3)'; e.currentTarget.style.color = C.red; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addPara}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 12px', borderRadius: 8, cursor: 'pointer',
                background: 'transparent', border: `1px dashed ${C.borderHi}`,
                color: C.textDim, fontSize: 12, fontWeight: 700, fontFamily: 'DM Sans,sans-serif',
                transition: 'all .15s', width: '100%', justifyContent: 'center',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.color = C.green; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.borderHi; e.currentTarget.style.color = C.textDim; }}
            >
              <Plus size={13} /> Add Paragraph
            </button>
          </div>
        </form>

        {/* Footer actions */}
        <div style={{
          padding: '14px 20px', borderTop: `1px solid ${C.border}`,
          display: 'flex', gap: 8, justifyContent: 'flex-end', flexShrink: 0,
        }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '9px 16px', borderRadius: 8, border: `1px solid ${C.border}`,
              background: 'transparent', color: C.muted, cursor: 'pointer',
              fontSize: 12, fontWeight: 700, fontFamily: 'DM Sans,sans-serif',
              transition: 'all .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderHi; e.currentTarget.style.color = C.text; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              if (!form.title.trim()) return alert('Title is required');
              if (!form.excerpt.trim()) return alert('Excerpt is required');
              if (!form.author.trim()) return alert('Author is required');
              if (form.paragraphs.every(p => !p.trim())) return alert('At least one paragraph is required');
              onSave(form);
            }}
            disabled={saving}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '9px 18px', borderRadius: 8,
              border: `1px solid rgba(34,197,94,0.3)`,
              background: 'rgba(34,197,94,0.12)', color: C.green,
              cursor: saving ? 'not-allowed' : 'pointer',
              fontSize: 12, fontWeight: 700, fontFamily: 'DM Sans,sans-serif',
              opacity: saving ? 0.6 : 1, transition: 'all .15s',
            }}
          >
            <Save size={14} />
            {saving ? 'Saving…' : (isEdit ? 'Update Article' : 'Publish Article')}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── PREVIEW MODAL ──────────────────────── */
const PreviewModal = ({ article, onClose }) => (
  <div
    onClick={onClose}
    style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }}
  >
    <div
      onClick={e => e.stopPropagation()}
      style={{
        background: '#fff', borderRadius: 16, width: '100%', maxWidth: 620,
        maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{ padding: '18px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Preview</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
          <X size={18} />
        </button>
      </div>
      <div style={{ padding: '24px 24px' }}>
        <Badge category={article.category} />
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111', margin: '12px 0 8px', lineHeight: 1.3 }}>{article.title}</h2>
        <p style={{ fontSize: 13, color: '#008A44', fontWeight: 600, marginBottom: 4 }}>{article.author}</p>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 20 }}>{article.date}</p>
        <p style={{ fontSize: 14, color: '#555', fontStyle: 'italic', borderLeft: '3px solid #008A44', paddingLeft: 14, marginBottom: 20, lineHeight: 1.6 }}>
          {article.excerpt}
        </p>
        {article.paragraphs?.filter(Boolean).map((p, i) => (
          <p key={i} style={{ fontSize: 15, color: '#333', lineHeight: 1.8, marginBottom: 16 }}>{p}</p>
        ))}
      </div>
    </div>
  </div>
);

/* ── MAIN PAGE ──────────────────────────── */
const AdminsNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [previewTarget, setPreviewTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const LIMIT = 10;

  const fetchArticles = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const params = new URLSearchParams({ page, limit: LIMIT });
      if (search.trim()) params.set('search', search.trim());
      if (categoryFilter) params.set('category', categoryFilter);
      const data = await api(`/admin/news?${params}`);
      setArticles(data.data);
      setPagination(data.pagination);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [page, search, categoryFilter]);

  useEffect(() => { fetchArticles(); }, [fetchArticles]);
  useEffect(() => { setPage(1); }, [search, categoryFilter]);

  const handleSave = async (form) => {
    setSaving(true);
    try {
      if (editTarget?._id) {
        const data = await api(`/admin/news/${editTarget._id}`, {
          method: 'PUT',
          body: JSON.stringify(form),
        });
        setArticles(prev => prev.map(a => a._id === editTarget._id ? data.data : a));
      } else {
        const data = await api('/admin/news', {
          method: 'POST',
          body: JSON.stringify(form),
        });
        setArticles(prev => [data.data, ...prev]);
      }
      setShowForm(false);
      setEditTarget(null);
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this article?')) return;
    try {
      await api(`/admin/news/${id}`, { method: 'DELETE' });
      setArticles(prev => prev.filter(a => a._id !== id));
    } catch (e) {
      alert(e.message);
    }
  };

  const openEdit = (article) => {
    // Map DB shape → form shape
    setEditTarget({
      ...article,
      paragraphs: article.fullContent?.paragraphs || [''],
      author: article.fullContent?.author || '',
      role: article.fullContent?.role || '',
    });
    setShowForm(true);
  };

  const openCreate = () => {
    setEditTarget(null);
    setShowForm(true);
  };

  return (
    <div style={{ padding: 24, minHeight: '100%', background: C.bg }}>

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ color: C.text, fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
            News Articles
          </h1>
          <p style={{ color: C.muted, fontSize: 13, margin: '4px 0 0' }}>
            Publish and manage news for the public site
          </p>
        </div>
        <button
          onClick={openCreate}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '9px 16px', borderRadius: 10,
            background: 'rgba(34,197,94,0.12)', border: `1px solid rgba(34,197,94,0.3)`,
            color: C.green, cursor: 'pointer',
            fontSize: 12, fontWeight: 700, fontFamily: 'DM Sans,sans-serif',
            transition: 'all .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,197,94,0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(34,197,94,0.12)'; }}
        >
          <Plus size={14} /> New Article
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
        <div style={{
          flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: 8,
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 10, padding: '0 12px', minWidth: 180,
        }}>
          <Search size={14} color={C.muted} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search articles…"
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: C.text, fontSize: 13, padding: '9px 0', fontFamily: 'DM Sans,sans-serif' }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted }}>
              <X size={12} />
            </button>
          )}
        </div>

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, color: categoryFilter ? C.text : C.muted, padding: '9px 12px', fontSize: 13, outline: 'none', fontFamily: 'DM Sans,sans-serif', cursor: 'pointer', minWidth: 160 }}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <button
          onClick={fetchArticles}
          style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: C.card, border: `1px solid ${C.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: C.muted, transition: 'all .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderHi; e.currentTarget.style.color = C.textDim; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
          title="Refresh"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Table */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
        {/* Header row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 140px 100px 80px',
          padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.surface,
        }}>
          {['Article', 'Category', 'Date', ''].map((h, i) => (
            <span key={i} style={{ color: C.muted, fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</span>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: C.muted, fontSize: 13 }}>Loading articles…</div>
        ) : error ? (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <AlertCircle size={20} color={C.red} style={{ marginBottom: 8 }} />
            <p style={{ color: C.red, fontSize: 13 }}>{error}</p>
          </div>
        ) : articles.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: C.muted, fontSize: 13 }}>
            No articles yet. Click <strong style={{ color: C.green }}>New Article</strong> to publish one.
          </div>
        ) : (
          articles.map((article, idx) => (
            <div
              key={article._id}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 140px 100px 80px',
                padding: '12px 16px', alignItems: 'center',
                borderBottom: idx < articles.length - 1 ? `1px solid ${C.border}` : 'none',
                transition: 'background .1s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.hover}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Title + excerpt */}
              <div style={{ minWidth: 0, paddingRight: 12 }}>
                <p style={{ color: C.text, fontSize: 13, fontWeight: 700, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {article.title}
                </p>
                <p style={{ color: C.muted, fontSize: 11, margin: '3px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {article.excerpt}
                </p>
              </div>

              <div><Badge category={article.category} /></div>

              <span style={{ color: C.muted, fontSize: 11, fontFamily: 'DM Mono,monospace' }}>
                {article.date}
              </span>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                {/* Preview */}
                <ActionBtn
                  title="Preview"
                  onClick={() => setPreviewTarget(article)}
                  icon={<Eye size={12} />}
                />
                {/* Edit */}
                <ActionBtn
                  title="Edit"
                  onClick={() => openEdit(article)}
                  icon={<Edit2 size={12} />}
                />
                {/* Delete */}
                <ActionBtn
                  title="Delete"
                  onClick={() => handleDelete(article._id)}
                  icon={<Trash2 size={12} />}
                  danger
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, flexWrap: 'wrap', gap: 10 }}>
          <span style={{ color: C.muted, fontSize: 12 }}>
            Showing {((page - 1) * LIMIT) + 1}–{Math.min(page * LIMIT, pagination.total)} of {pagination.total}
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            <PBtn disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft size={14} /></PBtn>
            <PBtn disabled={page === pagination.pages} onClick={() => setPage(p => p + 1)}><ChevronRight size={14} /></PBtn>
          </div>
        </div>
      )}

      {/* Modals */}
      {showForm && (
        <ArticleForm
          initial={editTarget}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditTarget(null); }}
          saving={saving}
        />
      )}
      {previewTarget && (
        <PreviewModal
          article={previewTarget}
          onClose={() => setPreviewTarget(null)}
        />
      )}
    </div>
  );
};

/* ── SMALL ACTION BUTTON ────────────────── */
const ActionBtn = ({ icon, title, onClick, danger }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 28, height: 28, borderRadius: 7,
        background: danger && hov ? C.redDim : 'transparent',
        border: `1px solid ${danger && hov ? 'rgba(248,113,113,0.3)' : C.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        color: danger && hov ? C.red : hov ? C.textDim : C.muted,
        transition: 'all .15s',
      }}
    >
      {icon}
    </button>
  );
};

/* ── PAGINATION BUTTON ──────────────────── */
const PBtn = ({ children, disabled, onClick }) => (
  <button
    onClick={onClick} disabled={disabled}
    style={{
      minWidth: 32, height: 32, borderRadius: 8,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 700, fontFamily: 'DM Sans,sans-serif',
      cursor: disabled ? 'not-allowed' : 'pointer',
      border: `1px solid ${C.border}`, background: 'transparent',
      color: C.muted, opacity: disabled ? 0.4 : 1, transition: 'all .15s',
    }}
  >
    {children}
  </button>
);

export default AdminsNews;