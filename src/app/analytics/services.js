import { apiFetch } from './../apiClient';


export async function getAnalytics() {
  const res = await apiFetch('/api/analytics/summary');
  if (!res.ok) throw new Error('Помилка отримання аналітики');
  return res.json();
}