import { apiFetch } from './../apiClient';

// Отримати всі послуги
export async function getServices() {
  const res = await apiFetch('/api/services');
  if (!res.ok) throw new Error('Помилка отримання');
  return res.json();
}

// Створити послугу
export async function createService(data) {
  const res = await apiFetch('/api/services', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Помилка створення');
  return res.json();
}

// Оновити послугу
export async function updateService(id, data) {
  const res = await apiFetch(`/api/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Помилка оновлення');
  return res.json();
}

// Видалити послугу
export async function deleteService(id) {
  const res = await apiFetch(`/api/services/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Помилка видалення');
  return true;
}