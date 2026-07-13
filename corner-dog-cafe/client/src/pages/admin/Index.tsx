import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

const AdminDashboard = () => {
  const kpiData = [
    { label: '오늘 주문', value: 25 },
    { label: '오늘 매출', value: '₩450,000' },
    { label: '대기 주문', value: 5 },
    { label: '인기 메뉴', value: '아메리카노' },
  ];

  const recentOrders = [
    { id: 1, customer: '김철수', total: '₩15,000', status: '준비중' },
    { id: 2, customer: '이영희', total: '₩12,000', status: '완료' },
    { id: 3, customer: '박민수', total: '₩18,000', status: '취소' },
  ];

  const salesData = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        label: '매출',
        data: [120000, 150000, 180000, 200000, 170000, 220000, 250000],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const categorySalesData = {
    labels: ['커피', '논커피', '에이드', '디저트', '베이커리'],
    datasets: [
      {
        data: [40, 25, 15, 10, 10],
        backgroundColor: ['#4CAF7D', '#1A4A30', '#F5F0E8', '#E05252', '#A8C4B0'],
      },
    ],
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-6 bg-surface">
        <h1 className="text-3xl font-bold mb-6">관리자 대시보드</h1>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpiData.map((kpi) => (
            <div key={kpi.label} className="p-4 bg-white rounded-lg shadow-md">
              <p className="text-lg font-bold">{kpi.label}</p>
              <p className="text-2xl">{kpi.value}</p>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">최근 주문</h2>
          <ul className="space-y-4">
            {recentOrders.map((order) => (
              <li key={order.id} className="p-4 bg-white rounded-lg shadow-md">
                <div className="flex justify-between">
                  <p>주문번호: {order.id}</p>
                  <p>고객: {order.customer}</p>
                  <p>총 금액: {order.total}</p>
                  <p>상태: {order.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">매출 차트</h2>
          <Bar data={salesData} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">카테고리별 판매 비율</h2>
          <Doughnut data={categorySalesData} />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
