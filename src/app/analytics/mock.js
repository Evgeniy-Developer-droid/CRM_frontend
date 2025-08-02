const mockAnalytics = {
  total_today: 1500,
  total_week: 9700,
  total_month: 23000,
  top_services: [
    { name: "Стрижка", total: 7000 },
    { name: "Манікюр", total: 5500 },
    { name: "Масаж", total: 3300 }
  ],
  top_clients: [
    { name: "Олександр", total: 4200 },
    { name: "Марія", total: 3900 },
    { name: "Іван", total: 3100 }
  ],
  last_payments: [
    { date: "2025-07-30", client: "Олена", service: "Масаж", amount: 500 },
    { date: "2025-07-29", client: "Петро", service: "Стрижка", amount: 700 },
    { date: "2025-07-28", client: "Ігор", service: "Манікюр", amount: 650 }
  ],
  chart: [
    { date: "2025-07-25", amount: 800 },
    { date: "2025-07-26", amount: 900 },
    { date: "2025-07-27", amount: 1300 },
    { date: "2025-07-28", amount: 1100 },
    { date: "2025-07-29", amount: 1700 },
    { date: "2025-07-30", amount: 1500 }
  ]
};

export default mockAnalytics;
