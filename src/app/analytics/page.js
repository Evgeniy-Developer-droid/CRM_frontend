'use client';

import { useEffect, useState } from 'react';
import { getAnalytics } from '@/app/analytics/services';
import RevenueChart from '@/components/RevenueChart';
import mockAnalytics from '@/app/analytics/mock';

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetchData();
    setData(mockAnalytics);
    setLoading(false);
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const analytics = await getAnalytics();
      setData(analytics);
    } catch {
      alert('Помилка завантаження аналітики');
    }
    setLoading(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Аналітика</h1>

      {loading || !data ? (
        <div>Завантаження...</div>
      ) : (
        <>
          {/* Загальна виручка */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <div className="text-gray-600">Виручка сьогодні</div>
              <div className="text-2xl font-bold text-green-600">{data.total_today} грн</div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <div className="text-gray-600">Виручка за тиждень</div>
              <div className="text-2xl font-bold text-blue-600">{data.total_week} грн</div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <div className="text-gray-600">Виручка за місяць</div>
              <div className="text-2xl font-bold text-purple-600">{data.total_month} грн</div>
            </div>
          </div>

          {/* ТОП послуги */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Топ послуги</h2>
            <ul className="bg-white rounded shadow p-4">
              {data.top_services.map(s => (
                <li key={s.name} className="flex justify-between border-b py-2">
                  <span>{s.name}</span>
                  <span className="font-semibold">{s.total} грн</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ТОП клієнти */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Топ клієнти</h2>
            <ul className="bg-white rounded shadow p-4">
              {data.top_clients.map(c => (
                <li key={c.name} className="flex justify-between border-b py-2">
                  <span>{c.name}</span>
                  <span className="font-semibold">{c.total} грн</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Останні платежі */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Останні платежі</h2>
            <table className="w-full bg-white shadow rounded">
              <thead>
                <tr>
                  <th className="p-2 border-b">Дата</th>
                  <th className="p-2 border-b">Клієнт</th>
                  <th className="p-2 border-b">Послуга</th>
                  <th className="p-2 border-b">Сума</th>
                </tr>
              </thead>
              <tbody>
                {data.last_payments.map((p, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-2">{p.date}</td>
                    <td className="p-2">{p.client}</td>
                    <td className="p-2">{p.service}</td>
                    <td className="p-2">{p.amount} грн</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Графік виручки */}
          <RevenueChart data={data.chart} />
        </>
      )}
    </div>
  );
}
