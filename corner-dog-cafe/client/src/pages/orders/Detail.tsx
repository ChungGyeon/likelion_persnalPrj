import React from 'react';
import { useParams } from 'react-router-dom';
import { orders } from '../../js/data';

const OrderDetail = () => {
  const { id } = useParams();
  const order = orders.find((order) => order.id === parseInt(id));
import React, { useState } from 'react';
  if (!order) {
    return <div>주문을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="bg-surface min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">주문 상세</h1>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <p className="text-lg font-bold">주문번호: {order.id}</p>
          <p className="text-sm text-muted">{order.date}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">주문 항목</h2>
          <ul className="space-y-2">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.quantity}개</span>
                <span>{item.price}원</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">결제 정보</h2>
          <p>총 금액: {order.totalPrice}원</p>
        </div>
        <button className="px-6 py-3 bg-accent text-white rounded-lg">재주문</button>
      </div>
    </div>
  );
};

export default OrderDetail;
import StatusBadge from '../../components/StatusBadge';
import { orders } from '../../js/data';

const OrderList = () => {
  const [statusFilter, setStatusFilter] = useState('전체');

  const filteredOrders = orders.filter((order) =>
    statusFilter === '전체' || order.status === statusFilter
  );

  return (
    <div className="bg-surface min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">주문 내역</h1>
      <div className="flex space-x-4 mb-6">
        {['전체', '준비중', '완료', '취소'].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded-lg ${statusFilter === status ? 'bg-accent text-white' : 'bg-mid text-muted'}`}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <ul className="space-y-4">
        {filteredOrders.map((order) => (
          <li key={order.id} className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-bold">주문번호: {order.id}</p>
                <p className="text-sm text-muted">{order.date}</p>
              </div>
              <StatusBadge status={order.status} />
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted">총 금액: {order.totalPrice}원</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
