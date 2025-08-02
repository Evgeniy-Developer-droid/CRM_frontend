'use client';

import { useEffect, useState } from 'react';
import { getPayments, deletePayment } from '@/app/payments/services';
import { getClients } from '@/app/clients/services';
import { getServices } from '@/app/services/services';
import { getAppointments } from '@/app/appointments/services';
import PaymentModal from '@/components/PaymentModal';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [pays, cls, svcs, appts] = await Promise.all([
        getPayments(),
        getClients(),
        getServices(),
        getAppointments(),
      ]);
      setPayments(pays);
      setClients(cls);
      setServices(svcs);
      setAppointments(appts);
    } catch {
      alert('Помилка завантаження');
    }
    setLoading(false);
  }

  function openCreate() {
    setEditingPayment(null);
    setModalOpen(true);
  }
  function openEdit(payment) {
    setEditingPayment(payment);
    setModalOpen(true);
  }
  async function handleDelete(id) {
    if (confirm('Видалити платіж?')) {
      await deletePayment(id);
      fetchData();
    }
  }

  const getClientName = id => clients.find(c => c.id === id)?.name || '';
  const getServiceName = id => services.find(s => s.id === id)?.name || '';

  // Сума платежів за період (наприклад, за весь час)
  const totalAmount = payments.reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Платежі</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={openCreate}
        >+ Додати платіж</button>
      </div>

      <div className="mb-4 text-lg font-semibold">
        Загальна сума: <span className="text-green-600">{totalAmount} грн</span>
      </div>

      {loading ? (
        <div>Завантаження...</div>
      ) : (
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="p-2 border-b">Дата</th>
              <th className="p-2 border-b">Клієнт</th>
              <th className="p-2 border-b">Послуга</th>
              <th className="p-2 border-b">Сума</th>
              <th className="p-2 border-b">Метод</th>
              <th className="p-2 border-b">Коментар</th>
              <th className="p-2 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="p-2">{payment.payment_date}</td>
                <td className="p-2">{payment.booking ? payment.booking.client.name : 'Невідомий'}</td>
                <td className="p-2">{payment.booking ? payment.booking.service.name : 'Невідомий'}</td>
                <td className="p-2">{payment.amount} грн</td>
                <td className="p-2">{payment.method}</td>
                <td className="p-2">{payment.comment}</td>
                <td className="p-2">
                  <button className="text-blue-600 mr-2" onClick={() => openEdit(payment)}>Редагувати</button>
                  <button className="text-red-500" onClick={() => handleDelete(payment.id)}>Видалити</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <PaymentModal
          payment={editingPayment}
          clients={clients}
          services={services}
          booking={appointments}
          onClose={() => setModalOpen(false)}
          onSaved={() => { setModalOpen(false); fetchData(); }}
        />
      )}
    </div>
  );
}
