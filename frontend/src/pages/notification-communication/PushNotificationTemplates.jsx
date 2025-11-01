import React, { useState, useEffect } from 'react';

const initialTemplates = [
  {
    id: 1,
    title: 'Order Placed',
    content: 'Your order #[ORDER_ID] has been placed successfully!',
    status: true,
    tags: ['Order'],
  },
  {
    id: 2,
    title: 'Delivery Assigned',
    content: 'Your delivery agent is on the way for order #[ORDER_ID].',
    status: true,
    tags: ['Delivery'],
  },
];

const PushNotificationTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({ title: '', content: '', tags: '', id: null });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // Simulated fetch
    setTemplates(initialTemplates);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!form.title || !form.content) return alert('All fields are required.');
    if (editing) {
      setTemplates((prev) =>
        prev.map((tpl) =>
          tpl.id === form.id
            ? { ...tpl, ...form, tags: form.tags.split(',').map((t) => t.trim()) }
            : tpl
        )
      );
    } else {
      const newTemplate = {
        ...form,
        id: Date.now(),
        status: true,
        tags: form.tags.split(',').map((t) => t.trim()),
      };
      setTemplates((prev) => [...prev, newTemplate]);
    }
    setForm({ title: '', content: '', tags: '', id: null });
    setEditing(false);
  };

  const handleEdit = (tpl) => {
    setForm({
      ...tpl,
      tags: tpl.tags.join(', '),
    });
    setEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this template?')) {
      setTemplates((prev) => prev.filter((tpl) => tpl.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setTemplates((prev) =>
      prev.map((tpl) => (tpl.id === id ? { ...tpl, status: !tpl.status } : tpl))
    );
  };

  const filtered = templates.filter((tpl) =>
    tpl.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Push Notification</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.search}
      />

      {/* Form */}
      <div style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder=" Title"
          value={form.title}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="content"
          placeholder="TContent (e.g., Your order #[ORDER_ID] is shipped)"
          value={form.content}
          onChange={handleChange}
          rows={3}
          style={styles.textarea}
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          style={styles.input}
        />
        <button onClick={handleSave} style={styles.saveBtn}>
          {editing ? 'Update Template' : 'Add Template'}
        </button>
      </div>

      {/* List */}
      <div style={styles.list}>
        {filtered.length === 0 ? (
          <p>No templates found.</p>
        ) : (
          filtered.map((tpl) => (
            <div key={tpl.id} style={styles.card}>
              <div>
                <h3>{tpl.title}</h3>
                <p style={styles.preview}>{tpl.content}</p>
                <div style={styles.tags}>
                  {tpl.tags.map((tag, i) => (
                    <span key={i} style={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div style={styles.actions}>
                <button onClick={() => handleEdit(tpl)} style={styles.actionBtn}>Edit</button>
                <button onClick={() => handleDelete(tpl.id)} style={styles.delBtn}>Delete</button>
                <label style={styles.switch}>
                  <input
                    type="checkbox"
                    checked={tpl.status}
                    onChange={() => toggleStatus(tpl.id)}
                  />
                  <span style={styles.slider}></span>
                </label>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    maxWidth: 900,
    margin: '40px auto',
    fontFamily: 'Arial, sans-serif',
    padding: 20,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 28,
  },
  search: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    borderRadius: 5,
    border: '1px solid #ccc',
  },
  form: {
    display: 'grid',
    gap: 10,
    marginBottom: 30,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    border: '1px solid #ccc',
  },
  textarea: {
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  saveBtn: {
    backgroundColor: '#2874f0',
    color: '#fff',
    padding: '10px 20px',
    fontSize: 16,
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  card: {
    padding: 15,
    border: '1px solid #eee',
    borderRadius: 8,
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#f9f9f9',
  },
  preview: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
  },
  tags: {
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#eee',
    padding: '3px 8px',
    marginRight: 6,
    borderRadius: 4,
    fontSize: 12,
    color: '#555',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    alignItems: 'center', 
    justifyContent: 'center',
    width: '100px',
  },
  actionBtn: {
    padding: '6px 12px',
    fontSize: 14,
    backgroundColor: '#ff9800',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    width: '100px',
    textAlign: 'center',
  },
  delBtn: {
    padding: '6px 12px',
    fontSize: 14,
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    width: '100px',
  },
  switch: {
    position: 'relative',
    display: 'inline-block',
    width: 40,
    height: 20,
  },
  slider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: -30,
    right: 0,
    bottom: 0,
    backgroundColor: '#ccc',
    transition: '.4s',
     width: '100px',
  },
};

export default PushNotificationTemplates;
