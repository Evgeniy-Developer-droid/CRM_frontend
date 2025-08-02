'use client';

import { useEffect, useState } from 'react';
import { getAppointments, deleteAppointment } from './services';
import { getClients } from '@/app/clients/services';
import { getServices } from '@/app/services/services';
import AppointmentModal from '@/components/AppointmentModal';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [apps, cls, svcs] = await Promise.all([
        getAppointments(),
        getClients(),
        getServices(),
      ]);
      setAppointments(apps);
      setClients(cls);
      setServices(svcs);
    } catch {
      alert('Помилка завантаження');
    }
    setLoading(false);
  }

  function openCreate() {
    setEditingAppointment(null);
    setModalOpen(true);
  }
  function openEdit(app) {
    setEditingAppointment(app);
    setModalOpen(true);
  }
  async function handleDelete(id) {
    if (confirm('Видалити бронювання?')) {
      await deleteAppointment(id);
      fetchData();
    }
  }

  const getClientName = id => clients.find(c => c.id === id)?.name || '';
  const getServiceName = id => services.find(s => s.id === id)?.name || '';

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Бронювання</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={openCreate}
        >+ Нове бронювання</button>
      </div>

      {loading ? (
        <div>Завантаження...</div>
      ) : (
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="p-2 border-b">Клієнт</th>
              <th className="p-2 border-b">Послуга</th>
              <th className="p-2 border-b">Дата</th>
              <th className="p-2 border-b">Час</th>
              <th className="p-2 border-b">Коментар</th>
              <th className="p-2 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(app => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="p-2">{getClientName(app.client_id)}</td>
                <td className="p-2">{getServiceName(app.service_id)}</td>
                <td className="p-2">{app.start_time?.split('T')[0]}</td>
                <td className="p-2">{app.start_time?.split('T')[1].slice(0, 5)}</td>
                <td className="p-2">{app.comment}</td>
                <td className="p-2">
                  <button className="text-blue-600 mr-2" onClick={() => openEdit(app)}>Редагувати</button>
                  <button className="text-red-500" onClick={() => handleDelete(app.id)}>Видалити</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <AppointmentModal
          appointment={editingAppointment}
          clients={clients}
          services={services}
          onClose={() => setModalOpen(false)}
          onSaved={() => { setModalOpen(false); fetchData(); }}
        />
      )}
    </div>
  );
}