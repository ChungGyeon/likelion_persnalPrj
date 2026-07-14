import React, { useState } from 'react';
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