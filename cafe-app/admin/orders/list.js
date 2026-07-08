import { formatPrice } from '../../js/utils.js';   

// 주문 상태 정의
const ORDER_STATUSES = ['주문 완료', '준비중', '준비 완료'];

// 날짜 포맷팅 함수
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
}

// 기본 주문 데이터 (localStorage가 비어있을 때 사용)
const defaultOrders = [
    {
        id: 1,
        orderTime: new Date().toISOString(),
        items: [
            { name: '아메리카노', quantity: 1 },
            { name: '치즈케이크', quantity: 1 }
        ],
        totalPrice: 9500,
        status: ORDER_STATUSES[0] // 주문 완료
    }
];

// 페이지가 로드될 때 주문 목록을 불러오는 함수
function loadOrders() {
    const storedOrders = localStorage.getItem('cafeOrders');
    let orders;

    // localStorage가 비어있거나, 파싱된 배열의 길이가 0이면 기본 주문으로 초기화
    if (!storedOrders || JSON.parse(storedOrders).length === 0) {
        orders = defaultOrders;
        localStorage.setItem('cafeOrders', JSON.stringify(defaultOrders));
    } else {
        orders = JSON.parse(storedOrders);
    }

    const tbody = document.getElementById('orderTableBody');
    tbody.innerHTML = ''; // 기존 내용을 비움

    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px;">현재 주문이 없습니다.</td></tr>';
        return;
    }
    
    // 최신 주문이 위로 오도록 정렬
    orders.sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));

    orders.forEach(order => {
        const statusClass = getStatusClass(order.status);
        const menuSummary = order.items.length > 1
            ? `${order.items[0].name} 외 ${order.items.length - 1}건`
            : order.items[0].name;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><a href="detail.html?id=${order.id}" class="order-id-link">#${String(order.id).padStart(4, '0')}</a></td>
            <td>${formatDate(order.orderTime)}</td>
            <td class="menu-name">${menuSummary}</td>
            <td>${formatPrice(order.totalPrice)}</td>
            <td><span class="badge ${statusClass}">${order.status}</span></td>
            <td>
                ${generateStatusButtons(order.id, order.status)}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 주문 상태에 따른 CSS 클래스를 반환하는 함수
function getStatusClass(status) {
    if (status === '주문 완료') return 'pending';
    if (status === '준비중') return 'processing';
    if (status === '준비 완료') return 'completed';
    return '';
}

// 주문 상태 변경 버튼을 생성하는 함수
function generateStatusButtons(orderId, currentStatus) {
    const currentIndex = ORDER_STATUSES.indexOf(currentStatus);
    let buttonsHtml = '';

    if (currentIndex < ORDER_STATUSES.length - 1) {
        const nextStatus = ORDER_STATUSES[currentIndex + 1];
        buttonsHtml += `<button class="btn-small edit" onclick="updateOrderStatus(${orderId}, '${nextStatus}')">${nextStatus}으로</button>`;
    }
    
    if (currentIndex > 0) {
        const prevStatus = ORDER_STATUSES[currentIndex - 1];
        buttonsHtml += `<button class="btn-small delete" onclick="updateOrderStatus(${orderId}, '${prevStatus}')">이전으로</button>`;
    }
    
    return buttonsHtml;
}

// 주문 상태 업데이트 함수
window.updateOrderStatus = function(orderId, newStatus) {
    let orders = JSON.parse(localStorage.getItem('cafeOrders'));
    const orderIndex = orders.findIndex(o => o.id === orderId);

    if (orderIndex !== -1) {
        orders[orderIndex].status = newStatus;
        localStorage.setItem('cafeOrders', JSON.stringify(orders));
        loadOrders(); // 목록 새로고침
    }
}

// --- 초기화 및 실시간 업데이트 ---

// 2초마다 주문 목록을 새로고침하여 실시간처럼 보이게 함
setInterval(loadOrders, 2000);

// 다른 탭에서 localStorage가 변경되었을 때 목록을 새로고침
window.addEventListener('storage', function(e) {
    if (e.key === 'cafeOrders') {
        loadOrders();
    }
});

// 페이지 첫 로드 시 실행
document.addEventListener('DOMContentLoaded', loadOrders);
