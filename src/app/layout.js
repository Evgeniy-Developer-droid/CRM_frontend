"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const noMenu = pathname === '/login' || pathname === '/register';

  const router = useRouter();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/login');
  }
  return (
    <html lang="uk">
      <body className="bg-gray-50 min-h-screen">
        <div className="flex min-h-screen">
          {!noMenu && (
            <nav className="w-64 bg-white shadow-lg p-4 flex flex-col gap-4">
              <a href="/clients">Клієнти</a>
              <a href="/appointments">Бронювання</a>
              <a href="/services">Послуги</a>
              <a href="/payments">Платежі</a>
              <a href="/analytics">Аналітика</a>
              <a href="/login" onClick={handleLogout}>Вийти</a>
            </nav>
          )}
          
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
