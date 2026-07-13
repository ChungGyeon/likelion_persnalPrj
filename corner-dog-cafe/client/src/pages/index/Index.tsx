import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Index = () => {
  return (
    <div className="bg-deep text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="hero bg-deep flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Corner Dog Cafe</h1>
            <p className="text-xl mb-6">딥 포레스트 그린 컬러로 고급스러운 카페 경험을 제공합니다.</p>
            <button className="bg-accent text-white px-6 py-3 rounded-lg">메뉴 보기</button>
          </div>
        </section>
        <section className="popular-menus bg-surface py-12">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6">인기 메뉴</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 메뉴 카드 컴포넌트 반복 렌더링 */}
              <div className="card bg-white text-black p-4 rounded-lg shadow-md">
                <img src="/path/to/image.jpg" alt="메뉴 이름" className="w-full h-48 object-cover rounded-t-lg" />
                <h3 className="text-xl font-semibold mt-4">아메리카노</h3>
                <p className="text-lg">4,500원</p>
              </div>
            </div>
          </div>
        </section>
        <section className="categories bg-mid py-12">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6">카테고리 탐색</h2>
            <div className="flex space-x-4 overflow-x-auto">
              {/* 카테고리 아이템 반복 렌더링 */}
              <div className="category-item bg-accent text-white px-4 py-2 rounded-lg">커피</div>
            </div>
          </div>
        </section>
        <section className="banner bg-surface py-12">
          <div className="container mx-auto text-center">
            <p className="text-lg">Corner Dog Cafe에서 특별한 이벤트를 만나보세요!</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
