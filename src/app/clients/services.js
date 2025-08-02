import { apiFetch } from './../apiClient';

export async function getClients() {
  const res = await apiFetch('/api/clients');
  if (!res.ok) throw new Error('Помилка отримання');
  return res.json();
}

export async function createClient(data) {
  const res = await apiFetch('/api/clients', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Помилка створення');
  return res.json();
}

export async function updateClient(id, data) {
  const res = await apiFetch(`/api/clients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Помилка оновлення');
  return res.json();
}

export async function deleteClient(id) {
  const res = await apiFetch(`/api/clients/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Помилка видалення');
  return true;
}
