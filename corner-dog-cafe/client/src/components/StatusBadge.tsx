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
:root {
  --color-bg-deep: #0D2B1E;
  --color-bg-mid: #1A4A30;
  --color-accent: #4CAF7D;
  --color-surface: #F5F0E8;
  --color-text-on-dark: #FFFFFF;
  --color-text-muted: #A8C4B0;
  --color-text-on-light: #1A1A1A;
  --color-border: rgba(255, 255, 255, 0.12);
  --color-danger: #E05252;
}

