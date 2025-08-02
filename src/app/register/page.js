'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/users/signup`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        throw new Error('Registration failed');
      }
      router.push('/login');
    } catch (err) {
      setError('Помилка реєстрації');
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-24 bg-white rounded-xl shadow p-8">
      <h1 className="text-2xl font-bold mb-6">Реєстрація</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
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
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded p-2">Зареєструватися</button>
        {error && <div className="text-red-500">{error}</div>}
        <div>
          <span>Вже маєте акаунт? </span>
          <a className="text-blue-600 underline" href="/login">Увійти</a>
        </div>
      </form>
    </div>
  );
}