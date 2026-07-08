import { formatPrice } from '../js/utils.js';

// 임시 주문 데이터
const mockOrders = [
    {
        id: "20260706-001",
        date: "2026.07.06 15:30",
        status: "preparing",
        statusText: "메뉴 준비 중",
        itemsSummary: "아이스 아메리카노 외 1건",
        totalPrice: 8500
    },
    {
        id: "20260705-042",
        date: "2026.07.05 12:15",
        status: "ready",
        statusText: "수령 대기",
        itemsSummary: "리얼 딸기 라떼",
        totalPrice: 6000
    },
    {
        id: "20260701-015",
        date: "2026.07.01 09:05",
        status: "complete",
        statusText: "수령 완료",
        itemsSummary: "크림 치즈 베이글 외 2건",
        totalPrice: 16500
    }
];

document.addEventListener('DOMContentLoaded', () => {
    renderOrderList(mockOrders);

    // 필터 탭 클릭 이벤트 연결
    const tabs = document.querySelectorAll('.filter-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            // 활성 탭 스타일 변경
            tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            
            // 텍스트 기반으로 필터링 처리
            const filterType = e.target.textContent;
            let filteredOrders = mockOrders;
            
            if (filterType === '진행중') {
                filteredOrders = mockOrders.filter(o => o.status === 'preparing' || o.status === 'ready');
            } else if (filterType === '완료') {
                filteredOrders = mockOrders.filter(o => o.status === 'complete');
            }
            
            renderOrderList(filteredOrders);
        });
    });
});

// 상태별 아이콘 맵핑
const getStatusIcon = (status) => {
    switch (status) {
        case 'preparing': return '<i class="fa-solid fa-fire-burner"></i>';
        case 'ready': return '<i class="fa-solid fa-bell"></i>';
        case 'complete': return '<i class="fa-solid fa-check-circle"></i>';
        default: return '';
    }
};

function renderOrderList(orders) {
    const listContainer = document.getElementById('order-list');
    listContainer.innerHTML = '';

    if (orders.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-msg">
                <i class="fa-solid fa-receipt" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 15px; display: block;"></i>
                주문 내역이 없습니다.
            </div>`;
        return;
    }

    orders.forEach(order => {
        const card = document.createElement('div');
        card.className = 'order-card';
        card.onclick = () => {
            // 상세 페이지로 주문 ID를 가지고 이동
            location.href = `detail.html?id=${order.id}`;
        };

        card.innerHTML = `
            <div class="order-card-header">
                <span class="order-date">${order.date}</span>
                <span class="order-status status-${order.status}">
                    ${getStatusIcon(order.status)}
                    ${order.statusText}
                </span>
            </div>
            <div class="order-details-row">
                <div class="order-summary">${order.itemsSummary}</div>
                <div class="order-price">${formatPrice(order.totalPrice)}</div>
            </div>
        `;

        listContainer.appendChild(card);
    });
}