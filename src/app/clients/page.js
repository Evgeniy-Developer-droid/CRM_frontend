'use client';

import { useEffect, useState } from 'react';
import { getClients, createClient, updateClient, deleteClient } from './services';
import ClientModal from '@/components/ClientModal';

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  // Отримати список клієнтів
  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    setLoading(true);
    try {
      const data = await getClients();
      setClients(data);
    } catch (err) {
      alert('Помилка завантаження клієнтів');
    }
    setLoading(false);
  }

  // Відкрити модалку на створення/редагування
  function openCreate() {
    setEditingClient(null);
    setModalOpen(true);
  }
  function openEdit(client) {
    setEditingClient(client);
    setModalOpen(true);
  }

  async function handleDelete(id) {
    if (confirm('Видалити клієнта?')) {
      await deleteClient(id);
      fetchClients();
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Клієнти</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={openCreate}
        >+ Додати клієнта</button>
      </div>

      {loading ? (
        <div>Завантаження...</div>
      ) : (
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="p-2 border-b">Ім'я</th>
              <th className="p-2 border-b">Телефон</th>
              <th className="p-2 border-b">Коментар</th>
              <th className="p-2 border-b">Теги</th>
              <th className="p-2 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="p-2">{client.name}</td>
                <td className="p-2">{client.phone}</td>
                <td className="p-2">{client.comment}</td>
                <td className="p-2">{client.tags?.join(', ')}</td>
                <td className="p-2">
                  <button className="text-blue-600 mr-2" onClick={() => openEdit(client)}>Редагувати</button>
                  <button className="text-red-500" onClick={() => handleDelete(client.id)}>Видалити</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Попап для створення/редагування */}
      {modalOpen && (
        <ClientModal
          client={editingClient}
          onClose={() => setModalOpen(false)}
          onSaved={() => { setModalOpen(false); fetchClients(); }}
        />
      )}
    </div>
  );
}