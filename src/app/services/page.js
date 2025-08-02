'use client';

import { useEffect, useState } from 'react';
import { getServices, deleteService } from '@/app/services/services';
import ServiceModal from '@/components/ServiceModal';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data);
    } catch {
      alert('Помилка завантаження послуг');
    }
    setLoading(false);
  }

  function openCreate() {
    setEditingService(null);
    setModalOpen(true);
  }
  function openEdit(service) {
    setEditingService(service);
    setModalOpen(true);
  }
  async function handleDelete(id) {
    if (confirm('Видалити послугу?')) {
      await deleteService(id);
      fetchServices();
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Послуги</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={openCreate}
        >+ Додати послугу</button>
      </div>

      {loading ? (
        <div>Завантаження...</div>
      ) : (
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="p-2 border-b">Назва</th>
              <th className="p-2 border-b">Ціна</th>
              <th className="p-2 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="p-2">{service.name}</td>
                <td className="p-2">{service.price} грн</td>
                <td className="p-2">
                  <button className="text-blue-600 mr-2" onClick={() => openEdit(service)}>Редагувати</button>
                  <button className="text-red-500" onClick={() => handleDelete(service.id)}>Видалити</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <ServiceModal
          service={editingService}
          onClose={() => setModalOpen(false)}
          onSaved={() => { setModalOpen(false); fetchServices(); }}
        />
      )}
    </div>
  );
}
