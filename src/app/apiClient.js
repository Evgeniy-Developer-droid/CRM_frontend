const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const getToken = () => localStorage.getItem('access_token');
const getRefreshToken = () => localStorage.getItem('refresh_token');

const setToken = (token) => localStorage.setItem('access_token', token);
const setRefreshToken = (token) => localStorage.setItem('refresh_token', token);

// Перевіряємо, чи access_token не протух (декодуємо payload JWT)
function isTokenExpired(token) {
  if (!token) return true;
  try {
    const [, payload] = token.split('.');
    const { exp } = JSON.parse(atob(payload));
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

async function refreshAccessToken() {
  const refresh_token = getRefreshToken();
  const res = await fetch(`${API_URL}/api/users/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token }),
  });
  if (!res.ok) throw new Error('Не вдалося оновити токен');
  const data = await res.json();
  setToken(data.access_token);
  if (data.refresh_token) setRefreshToken(data.refresh_token);
  return data.access_token;
}

export async function apiFetch(url, options = {}) {
  let token = getToken();
  if (!token) {
    window.location.href = '/login'; // або інший шлях для отримання токена
  }
  // якщо токен протух — оновлюємо
  if (isTokenExpired(token)) {
    token = await refreshAccessToken();
  }
  // додаємо токен в headers
  const headers = {
    ...(options.headers || {}),
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });
  // якщо 401 — спробувати оновити токен і повторити запит
  if (res.status === 401) {
    token = await refreshAccessToken();
    headers['Authorization'] = `Bearer ${token}`;
    return fetch(`${API_URL}${url}`, {
      ...options,
      headers,
    });
  }
  return res;
}