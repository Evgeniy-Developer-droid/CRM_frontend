'use client';

import { useState, useEffect } from 'react';
import { createClient, updateClient } from '@/app/clients/services';

export default function ClientModal({ client, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    comment: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const isEdit = !!client;

  useEffect(() => {
    if (client) {
      setForm({
        name: client.name || '',
        phone: client.phone || '',
        comment: client.comment || '',
        tags: client.tags?.join(', ') || '',
      });
    }
  }, [client]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const tagsArr = form.tags.split(',').map(t => t.trim()).filter(Boolean);
      if (isEdit) {
        await updateClient(client.id, { ...form, tags: tagsArr });
      } else {
        await createClient({ ...form, tags: tagsArr });
      }
      onSaved();
    } catch (err) {
      alert('Помилка збереження');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md relative">
        <button className="absolute top-2 right-3 text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">{isEdit ? 'Редагувати клієнта' : 'Додати клієнта'}</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Ім'я" className="border rounded p-2" required />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Телефон" className="border rounded p-2" />
          <input name="comment" value={form.comment} onChange={handleChange} placeholder="Коментар" className="border rounded p-2" />
          <input name="tags" value={form.tags} onChange={handleChange} placeholder="Теги (через кому)" className="border rounded p-2" />
          <button disabled={loading} type="submit" className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700">
            {loading ? 'Збереження...' : (isEdit ? 'Оновити' : 'Створити')}
          </button>
        </form>
      </div>
    </div>
  );
}