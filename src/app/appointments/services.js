import { apiFetch } from './../apiClient';

// Отримати всі бронювання
export async function getAppointments() {
  const res = await apiFetch('/api/bookings');
  if (!res.ok) throw new Error('Помилка отримання бронювань');
  return res.json();
}

// Створити бронювання
export async function createAppointment(data) {
  const res = await apiFetch('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Помилка створення');
  return res.json();
}

// Оновити бронювання
export async function updateAppointment(id, data) {
  const res = await apiFetch(`/api/bookings/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Помилка оновлення');
  return res.json();
}

// Видалити бронювання
export async function deleteAppointment(id) {
  const res = await apiFetch(`/api/bookings/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Помилка видалення');
  return true;
}