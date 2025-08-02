"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function useAuth() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.replace('/login');
    }
    // Якщо треба — тут можна зробити перевірку валідності токена
  }, [router]);
}