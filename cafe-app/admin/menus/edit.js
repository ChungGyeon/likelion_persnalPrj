// 카테고리 변경 시 이모지 자동 적용을 위한 맵
const categoryEmojiMap = {
    '커피': '☕️',
    '음료': '🍹',
    '디저트': '🍰',
    '베이커리': '🥐'
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. URL 파라미터에서 id 추출 (예: edit.html?id=3)
    const urlParams = new URLSearchParams(window.location.search);
    const menuId = parseInt(urlParams.get('id'), 10);

    if (!menuId) {
        alert('잘못된 접근입니다.');
        window.location.href = 'list.html';
        return;
    }

    // 2. localStorage에서 데이터 불러오기
    let menus = JSON.parse(localStorage.getItem('cafeMenus')) || [];
    const targetMenu = menus.find(m => m.id === menuId);

    if (!targetMenu) {
        alert('존재하지 않는 메뉴입니다.');
        window.location.href = 'list.html';
        return;
    }

    // 3. 기존 데이터를 폼 요소에 채워넣기 (화면에 보여주기)
    document.getElementById('category').value = targetMenu.category || '';
    document.getElementById('status').value = targetMenu.status || '판매중';
    document.getElementById('menuName').value = targetMenu.name || '';
    document.getElementById('price').value = targetMenu.price || '';
    document.getElementById('description').value = targetMenu.description || '';

    // 체크박스(옵션) 데이터 렌더링
    if (targetMenu.options && Array.isArray(targetMenu.options)) {
        document.querySelectorAll('input[name="options"]').forEach(checkbox => {
            if (targetMenu.options.includes(checkbox.value)) {
                checkbox.checked = true;
            }
        });
    }

    // 4. 폼 제출 시 데이터 덮어쓰기 로직
    document.getElementById('editMenuForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // 새로 입력된 값 가져오기
        const updatedCategory = document.getElementById('category').value;
        const updatedOptions = [];
        document.querySelectorAll('input[name="options"]:checked').forEach(checkbox => {
            updatedOptions.push(checkbox.value);
        });

        // 원본 객체를 복사한 후 수정한 내용을 덮어씌움
        const updatedMenu = {
            ...targetMenu,
            category: updatedCategory,
            status: document.getElementById('status').value,
            name: document.getElementById('menuName').value,
            price: parseInt(document.getElementById('price').value, 10),
            description: document.getElementById('description').value,
            options: updatedOptions,
            image: categoryEmojiMap[updatedCategory] || '🍽️' // 카테고리 변경 시 이모지 갱신
        };

        // 전체 배열에서 해당 인덱스를 찾아 교체
        const menuIndex = menus.findIndex(m => m.id === menuId);
        menus[menuIndex] = updatedMenu;

        // localStorage에 최종 저장
        localStorage.setItem('cafeMenus', JSON.stringify(menus));

        alert('메뉴가 성공적으로 수정되었습니다.');
        window.location.href = 'list.html';
    });
});