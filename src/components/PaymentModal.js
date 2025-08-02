'use client';

import { useState, useEffect } from 'react';
import { createPayment, updatePayment } from '@/app/payments/services';

export default function PaymentModal({ payment, clients, services, booking, onClose, onSaved }) {
  const [form, setForm] = useState({
    booking_id: '',
    amount: '',
    status: 'paid',
    method: '',
    comment: ''
  });
  const [loading, setLoading] = useState(false);
  const isEdit = !!payment;

  useEffect(() => {
    if (payment) {
      setForm({
        booking_id: payment.booking_id,
        amount: payment.amount,
        status: payment.status,
        method: payment.method || '',
        comment: payment.comment || ''
      });
    }
  }, [payment]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, amount: parseFloat(form.amount) };
      if (isEdit) {
        await updatePayment(payment.id, payload);
      } else {
        await createPayment(payload);
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
        <h2 className="text-xl font-bold mb-4">{isEdit ? 'Редагувати платіж' : 'Додати платіж'}</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label>
            Клієнт:
            <select name="booking_id" value={form.booking_id} onChange={handleChange} required className="w-full p-2 border rounded">
              <option value="">Виберіть бронювання</option>
              {booking && booking.map(b => (
                <option key={b.id} value={b.id}>{`${b.start_time} - ${b.client.name} (${b.service.name})`}</option>
              ))}
            </select>
          </label>
          <label>
            Сума:
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Введіть суму"
            />
          </label>
          <label>
            Статус:
            <select name="status" value={form.status} onChange={handleChange} required className="w-full p-2 border rounded">
              <option value="paid">Оплачено</option>
              <option value="unpaid">Не оплачено</option>
            </select>
          </label>
          <label>
            Метод:
            <select name="method" value={form.method} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Виберіть метод</option>
              <option value="cash">Готівка</option>
              <option value="card">Картка</option>
              <option value="transfer">Переклад</option>
            </select>
          </label>
          <label>
            Коментар:
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Додайте коментар"
            />
          </label>
          
          <button disabled={loading} type="submit" className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700">
            {loading ? 'Збереження...' : (isEdit ? 'Оновити' : 'Створити')}
          </button>
        </form>
      </div>
    </div>
  );
}
