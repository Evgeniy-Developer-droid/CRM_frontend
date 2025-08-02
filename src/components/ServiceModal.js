'use client';

import { useState, useEffect } from 'react';
import { createService, updateService } from '@/app/services/services';

export default function ServiceModal({ service, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);
  const isEdit = !!service;

  useEffect(() => {
    if (service) {
      setForm({
        name: service.name || '',
        price: service.price || '',
      });
    }
  }, [service]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await updateService(service.id, { ...form, price: parseFloat(form.price) });
      } else {
        await createService({ ...form, price: parseFloat(form.price) });
      }
      onSaved();
    } catch {
      alert('Помилка збереження');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md relative">
        <button className="absolute top-2 right-3 text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">{isEdit ? 'Редагувати послугу' : 'Додати послугу'}</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Назва" className="border rounded p-2" required />
          <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="Ціна" className="border rounded p-2" required />
          <button disabled={loading} type="submit" className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700">
            {loading ? 'Збереження...' : (isEdit ? 'Оновити' : 'Створити')}
          </button>
        </form>
      </div>
    </div>
  );
}
