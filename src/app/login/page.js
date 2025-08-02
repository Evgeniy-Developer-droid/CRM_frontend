'use client';

import { use, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/users/login`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw new Error('Invalid credentials');
      }
      const data = await res.json();
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      router.push('/clients');
    } catch (err) {
      setError('Неправильний email або пароль');
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-24 bg-white rounded-xl shadow p-8">
      <h1 className="text-2xl font-bold mb-6">Вхід</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          className="border rounded p-2"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="border rounded p-2"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded p-2">Увійти</button>
        {error && <div className="text-red-500">{error}</div>}
        <div>
          <span>Немає акаунту? </span>
          <a className="text-blue-600 underline" href="/register">Зареєструватися</a>
        </div>
      </form>
    </div>
  );
}