import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const MyPage = () => {
  const { user } = useAuth();

  const recentOrders = [
    { id: 1, date: '2026-07-10', total: 15000 },
    { id: 2, date: '2026-07-08', total: 12000 },
    { id: 3, date: '2026-07-05', total: 18000 },
  ];

  return (
    <div className="bg-surface min-h-screen p-4">
      <header className="flex items-center space-x-4 mb-6">
        <img
          src="https://via.placeholder.com/80"
          alt="프로필 아바타"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold">{user?.name || '사용자'}</h1>
          <p className="text-muted">{user?.email || '이메일 없음'}</p>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">누적 통계</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <p className="text-lg font-bold">총 주문 수</p>
            <p className="text-2xl">{recentOrders.length}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <p className="text-lg font-bold">총 금액</p>
            <p className="text-2xl">{recentOrders.reduce((sum, order) => sum + order.total, 0)}원</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <p className="text-lg font-bold">즐겨찾기 메뉴</p>
            <p className="text-2xl">3개</p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">최근 주문</h2>
        <ul className="space-y-4">
          {recentOrders.map((order) => (
            <li key={order.id} className="p-4 bg-white rounded-lg shadow-md">
              <p className="text-lg font-bold">주문번호: {order.id}</p>
              <p className="text-sm text-muted">날짜: {order.date}</p>
              <p className="text-sm text-muted">총 금액: {order.total}원</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">계정 설정</h2>
        <ul className="space-y-4">
          <li>
            <button className="px-4 py-2 bg-mid text-white rounded-lg">프로필 수정</button>
          </li>
          <li>
            <button className="px-4 py-2 bg-danger text-white rounded-lg">로그아웃</button>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default MyPage;
