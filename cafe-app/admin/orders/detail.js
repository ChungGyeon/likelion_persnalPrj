document.addEventListener('DOMContentLoaded', () => {
    // 1. URL에서 '?id=숫자' 파라미터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const menuId = parseInt(urlParams.get('id'), 10);

    // ID가 없으면 목록으로 튕겨냄
    if (!menuId) {
        alert('잘못된 접근입니다.');
        window.location.href = 'list.html';
        return;
    }

    // 2. LocalStorage에서 전체 메뉴 불러와서 해당 메뉴 찾기
    let menus = JSON.parse(localStorage.getItem('cafeMenus')) || [];
    const targetMenu = menus.find(m => m.id === menuId);

    if (!targetMenu) {
        alert('존재하지 않는 메뉴입니다.');
        window.location.href = 'list.html';
        return;
    }

    // 3. 기존 데이터를 HTML 폼에 채워넣기
    document.getElementById('category').value = targetMenu.category;
    document.getElementById('status').value = targetMenu.status;
    document.getElementById('menuName').value = targetMenu.name;
    document.getElementById('price').value = targetMenu.price;

    // 체크박스(디테일 옵션) 기존 데이터 체크 처리
    if (targetMenu.detailOptions) {
        document.querySelectorAll('input[name="detailOptions"]').forEach(checkbox => {
            if (targetMenu.detailOptions.includes(checkbox.value)) {
                checkbox.checked = true;
            }
        });
    }

    // 4. 폼 제출 시 수정 사항 덮어쓰기
    document.getElementById('editMenuForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // 폼 데이터 읽기
        const updatedMenu = {
            ...targetMenu, // 기존 데이터 유지 (id, image 등)
            category: document.getElementById('category').value,
            status: document.getElementById('status').value,
            name: document.getElementById('menuName').value,
            price: parseInt(document.getElementById('price').value, 10),
            detailOptions: Array.from(document.querySelectorAll('input[name="detailOptions"]:checked')).map(cb => cb.value)
        };

        // 전체 배열에서 해당 메뉴를 교체
        const menuIndex = menus.findIndex(m => m.id === menuId);
        menus[menuIndex] = updatedMenu;

        // LocalStorage에 다시 저장
        localStorage.setItem('cafeMenus', JSON.stringify(menus));

        alert('메뉴 상세 정보가 수정되었습니다.');
        window.location.href = 'list.html';
    });
});