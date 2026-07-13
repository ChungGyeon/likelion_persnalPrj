import React from 'react';
import { useParams } from 'react-router-dom';
import { menus, categories } from '../../../js/data';

const AdminMenuDetail = () => {
  const { id } = useParams();
  const menu = menus.find((menu) => menu.id === parseInt(id));

  if (!menu) {
    return <div>메뉴를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="bg-surface min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">메뉴 상세</h1>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <img src={menu.imageUrl} alt={menu.name} className="w-full h-auto rounded-lg mb-4" />
        <h2 className="text-2xl font-bold mb-2">{menu.name}</h2>
        <p className="text-lg mb-2">카테고리: {categories.find((cat) => cat.id === menu.categoryId)?.name}</p>
        <p className="text-lg mb-2">가격: {menu.price}원</p>
        <p className="text-lg mb-2">설명: {menu.description}</p>
        <p className="text-lg mb-2">재고 상태: {menu.isAvailable ? '판매중' : '품절'}</p>
        <button className="px-6 py-3 bg-accent text-white rounded-lg mt-4">수정하기</button>
      </div>
    </div>
  );
};

export default AdminMenuDetail;
