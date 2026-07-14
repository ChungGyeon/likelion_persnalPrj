import React, { useState } from 'react';
import { menus, categories } from '../../../js/data';

const AdminMenuList = () => {
    const [categoryFilter, setCategoryFilter] = useState('전체');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMenus = menus.filter((menu) => {
        const categoryName = categories.find((cat) => cat.id === menu.categoryId)?.name;
        return (
            (categoryFilter === '전체' || categoryName === categoryFilter) &&
            menu.name.includes(searchTerm)
        );
    });

    return (
        <div className="bg-surface min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-6">메뉴 관리</h1>
            <div className="flex space-x-4 mb-6">
                {['전체', ...categories.map((cat) => cat.name)].map((category) => (
                    <button
                        key={category}
                        className={`px-4 py-2 rounded-lg ${categoryFilter === category ? 'bg-accent text-white' : 'bg-mid text-muted'}`}
                        onClick={() => setCategoryFilter(category)}
                    >
                        {category}
                    </button>
                ))}
                <input
                    type="text"
                    placeholder="검색"
                    className="border px-4 py-2 rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table className="w-full bg-white rounded-lg shadow-md">
                <thead>
                <tr>
                    <th className="p-4">썸네일</th>
                    <th className="p-4">이름</th>
                    <th className="p-4">카테고리</th>
                    <th className="p-4">가격</th>
                    <th className="p-4">재고 상태</th>
                    <th className="p-4">액션</th>
                </tr>
                </thead>
                <tbody>
                {filteredMenus.map((menu) => (
                    <tr key={menu.id}>
                        <td className="p-4">
                            <img src={menu.imageUrl} alt={menu.name} className="w-16 h-16 rounded-lg" />
                        </td>
                        <td className="p-4">{menu.name}</td>
                        <td className="p-4">{categories.find((cat) => cat.id === menu.categoryId)?.name}</td>
                        <td className="p-4">{menu.price}원</td>
                        <td className="p-4">{menu.isAvailable ? '판매중' : '품절'}</td>
                        <td className="p-4">
                            <button className="px-4 py-2 bg-mid text-white rounded-lg mr-2">수정</button>
                            <button className="px-4 py-2 bg-danger text-white rounded-lg">삭제</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminMenuList;