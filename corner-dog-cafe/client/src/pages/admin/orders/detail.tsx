import React, { useState } from 'react';
import { ArrowLeft, User, CreditCard, Clock, FileText } from 'lucide-react';

export default function AdminOrderDetail() {
    const [adminMemo, setAdminMemo] = useState('고객 요청: 샷 추가 누락 주의');
    const [orderStatus, setOrderStatus] = useState('준비중');

    // 목업 데이터
    const orderDetail = {
        id: 'ORD-20260713-001',
        date: '2026. 07. 13 10:30',
        customer: { name: '김카페', phone: '010-1234-5678', type: '회원' },
        items: [
            { id: 1, name: '아이스 아메리카노', options: '사이즈: L, 샷 추가: 1', price: 5000, qty: 1 },
            { id: 2, name: '바질 토마토 베이글', options: '데우기 O', price: 6500, qty: 1 },
        ],
        payment: { subtotal: 11500, discount: 0, total: 11500, method: '신용카드' }
    };

    return (
        <div className="min-h-screen bg-[#0D2B1E] text-[#FFFFFF] p-8 font-sans pb-20">
            <div className="max-w-6xl mx-auto">
                {/* 상단 헤더 */}
                <div className="flex items-center space-x-4 mb-8">
                    <button className="p-2 bg-[#1A4A30] rounded-full hover:bg-[#4CAF7D] transition-colors">
                        <ArrowLeft className="w-5 h-5 text-[#F5F0E8]" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-serif text-[#F5F0E8]">주문 상세</h1>
                        <p className="text-sm text-[#A8C4B0] mt-1 font-mono">{orderDetail.id} • {orderDetail.date}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 왼쪽 컬럼: 주문 항목 & 결제 정보 */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* 주문 항목 목록 */}
                        <div className="bg-[#1A4A30] rounded-xl border border-white/10 p-6">
                            <h2 className="text-lg font-serif text-[#F5F0E8] border-b border-white/10 pb-4 mb-4 flex items-center">
                                <FileText className="w-5 h-5 mr-2 text-[#4CAF7D]" />
                                주문 항목
                            </h2>
                            <ul className="space-y-4">
                                {orderDetail.items.map(item => (
                                    <li key={item.id} className="flex justify-between items-center bg-[#0D2B1E] p-4 rounded-lg border border-white/5">
                                        <div>
                                            <p className="font-medium text-[#F5F0E8]">{item.name}</p>
                                            <p className="text-sm text-[#A8C4B0] mt-1">{item.options}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-[#A8C4B0]">수량: {item.qty}개</p>
                                            <p className="font-mono text-[#4CAF7D] mt-1">{item.price.toLocaleString()}원</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 결제 정보 요약 */}
                        <div className="bg-[#1A4A30] rounded-xl border border-white/10 p-6">
                            <h2 className="text-lg font-serif text-[#F5F0E8] border-b border-white/10 pb-4 mb-4 flex items-center">
                                <CreditCard className="w-5 h-5 mr-2 text-[#4CAF7D]" />
                                결제 정보
                            </h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-[#A8C4B0]">
                                    <span>상품 소계</span>
                                    <span className="font-mono">{orderDetail.payment.subtotal.toLocaleString()}원</span>
                                </div>
                                <div className="flex justify-between text-[#A8C4B0]">
                                    <span>할인 금액</span>
                                    <span className="font-mono text-[#E05252]">-{orderDetail.payment.discount.toLocaleString()}원</span>
                                </div>
                                <div className="flex justify-between text-lg font-medium text-[#F5F0E8] pt-3 border-t border-white/10">
                                    <span>총 결제 금액 ({orderDetail.payment.method})</span>
                                    <span className="font-mono text-[#4CAF7D]">{orderDetail.payment.total.toLocaleString()}원</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 오른쪽 컬럼: 상태 변경, 고객 정보, 메모 */}
                    <div className="space-y-8">
                        {/* 상태 변경 패널 */}
                        <div className="bg-[#1A4A30] rounded-xl border border-white/10 p-6">
                            <h2 className="text-lg font-serif text-[#F5F0E8] border-b border-white/10 pb-4 mb-4 flex items-center">
                                <Clock className="w-5 h-5 mr-2 text-[#4CAF7D]" />
                                주문 상태
                            </h2>
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => setOrderStatus('준비중')}
                                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                                        orderStatus === '준비중'
                                            ? 'bg-[#4CAF7D] text-white shadow-[0_0_15px_rgba(76,175,125,0.3)]'
                                            : 'bg-[#0D2B1E] text-[#A8C4B0] hover:bg-white/5'
                                    }`}
                                >
                                    음료 준비중
                                </button>
                                <button
                                    onClick={() => setOrderStatus('완료')}
                                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                                        orderStatus === '완료'
                                            ? 'bg-[#4CAF7D] text-white shadow-[0_0_15px_rgba(76,175,125,0.3)]'
                                            : 'bg-[#0D2B1E] text-[#A8C4B0] hover:bg-white/5'
                                    }`}
                                >
                                    제조 완료 (픽업 대기)
                                </button>
                                <button
                                    onClick={() => setOrderStatus('취소')}
                                    className="w-full py-3 rounded-lg font-medium bg-transparent border border-[#E05252] text-[#E05252] hover:bg-[#E05252] hover:text-white transition-all mt-2"
                                >
                                    주문 취소
                                </button>
                            </div>
                        </div>

                        {/* 고객 정보 */}
                        <div className="bg-[#1A4A30] rounded-xl border border-white/10 p-6">
                            <h2 className="text-lg font-serif text-[#F5F0E8] border-b border-white/10 pb-4 mb-4 flex items-center">
                                <User className="w-5 h-5 mr-2 text-[#4CAF7D]" />
                                고객 정보
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-[#A8C4B0] mb-1">이름</p>
                                    <p className="text-[#F5F0E8] font-medium">{orderDetail.customer.name} <span className="text-xs bg-[#0D2B1E] px-2 py-1 rounded ml-2 text-[#4CAF7D]">{orderDetail.customer.type}</span></p>
                                </div>
                                <div>
                                    <p className="text-xs text-[#A8C4B0] mb-1">연락처</p>
                                    <p className="text-[#F5F0E8] font-mono">{orderDetail.customer.phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* 관리자 메모 */}
                        <div className="bg-[#1A4A30] rounded-xl border border-white/10 p-6">
                            <h2 className="text-lg font-serif text-[#F5F0E8] mb-4">관리자 메모</h2>
                            <textarea
                                value={adminMemo}
                                onChange={(e) => setAdminMemo(e.target.value)}
                                className="w-full bg-[#0D2B1E] border border-white/10 rounded-lg p-3 text-sm text-[#F5F0E8] focus:outline-none focus:border-[#4CAF7D] resize-none h-32"
                                placeholder="내부 전달용 메모를 입력하세요."
                            />
                            <button className="w-full mt-3 bg-[#F5F0E8] text-[#1A1A1A] font-medium py-2 rounded-lg hover:bg-[#e2ddd5] transition-colors">
                                메모 저장
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}