'use client';

import { useState, useEffect } from 'react';
import { createAppointment, updateAppointment } from '@/app/appointments/services';

export default function AppointmentModal({ appointment, clients, services, onClose, onSaved }) {
  const [form, setForm] = useState({
    client_id: '',
    service_id: '',
    date: '',
    time: '',
    comment: ''
  });
  const [loading, setLoading] = useState(false);
  const isEdit = !!appointment;

  useEffect(() => {
    if (appointment) {
      setForm({
        client_id: appointment.client_id,
        service_id: appointment.service_id,
        date: appointment.date,
        time: appointment.time,
        comment: appointment.comment || ''
      });
    }
  }, [appointment]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form };
      // remove date and time if not provided and change to start_time 
      if (!payload.date || !payload.time) {
        delete payload.date;
        delete payload.time;
      } else {
        payload.start_time = `${payload.date}T${payload.time}`;
        delete payload.date;
        delete payload.time;
      }
      if (isEdit) {
        await updateAppointment(appointment.id, payload);
      } else {
        await createAppointment(payload);
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
        <h2 className="text-xl font-bold mb-4">{isEdit ? 'Редагувати бронювання' : 'Нове бронювання'}</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <select name="client_id" value={form.client_id} onChange={handleChange} required className="border rounded p-2">
            <option value="">Виберіть клієнта</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select name="service_id" value={form.service_id} onChange={handleChange} required className="border rounded p-2">
            <option value="">Виберіть послугу</option>
            {services.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <input name="date" type="date" value={form.date} onChange={handleChange} required className="border rounded p-2" />
          <input name="time" type="time" value={form.time} onChange={handleChange} required className="border rounded p-2" />
          <input name="comment" value={form.comment} onChange={handleChange} placeholder="Коментар (необов'язково)" className="border rounded p-2" />
          <button disabled={loading} type="submit" className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700">
            {loading ? 'Збереження...' : (isEdit ? 'Оновити' : 'Створити')}
          </button>
        </form>
      </div>
    </div>
  );
}