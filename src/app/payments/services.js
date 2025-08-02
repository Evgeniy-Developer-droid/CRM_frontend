import { apiFetch } from './../apiClient';

// Отримати всі платежі
export async function getPayments() {
  const res = await apiFetch('/api/payments');
  if (!res.ok) throw new Error('Помилка отримання платежів');
  return res.json();
}

// Створити платіж
export async function createPayment(data) {
  const res = await apiFetch('/api/payments', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Помилка створення');
  return res.json();
}

// Оновити платіж
export async function updatePayment(id, data) {
  const res = await apiFetch(`/api/payments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Помилка оновлення');
  return res.json();
}

// Видалити платіж
export async function deletePayment(id) {
  const res = await apiFetch(`/api/payments/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Помилка видалення');
  return true;
}
