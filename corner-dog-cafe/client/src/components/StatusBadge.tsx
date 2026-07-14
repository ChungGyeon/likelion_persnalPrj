import React from 'react';

const StatusBadge = ({ status }) => {
  const statusColors = {
    pending: 'bg-yellow-500',
    preparing: 'bg-blue-500',
    ready: 'bg-green-500',
    cancelled: 'bg-red-500',
  };
/* 전역 디자인 토큰 정의 */
  return <span className={`badge ${statusColors[status]}`}>{status}</span>;
};

export default StatusBadge;


