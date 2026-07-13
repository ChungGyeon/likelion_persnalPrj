import React, { useState } from 'react';
import { Search, Calendar, ChevronDown, Eye } from 'lucide-react';
// import { formatPrice, formatDate } from '@/js/utils';

// 목업 데이터 (js/data.ts에서 가져온다고 가정)
const mockOrders = [
    { id: 'ORD-20260713-001', date: '2026-07-13T10:30:00Z', customer: '김카페', amount: 12500, status: '준비중' },
    { id: 'ORD-20260713-002', date: '2026-07-13T10:45:00Z', customer: '이코너', amount: 8000, status: '대기중' },
    { id: 'ORD-20260713-003', date: '2026-07-13T11:00:00Z', customer: '박도그', amount: 21000, status: '완료' },
];

export default function AdminOrderList() {
    const [activeTab, setActiveTab] = useState('전체');
    const [orders, setOrders] = useState(mockOrders);

    const tabs = ['전체', '대기중', '준비중', '완료', '취소'];

    // 상태 배지 색상 매핑
    const getStatusColor = (status: string) => {
        switch (status) {
            case '대기중': return 'bg-[#F5F0E8] text-[#1A1A1A]';
            case '준비중': return 'bg-[#4CAF7D] text-white';
            case '완료': return 'bg-[#1A4A30] text-[#A8C4B0] border border-[#A8C4B0]';
            case '취소': return 'bg-[#E05252] text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    return (
        <div className="min-h-screen bg-[#0D2B1E] text-[#FFFFFF] p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* 헤더 */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif text-[#F5F0E8]">주문 관리</h1>
                </div>

                {/* 필터 및 툴바 */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-[#1A4A30] p-4 rounded-lg border border-white/10 mb-6 gap-4">
                    {/* 상태 탭 필터 */}
                    <div className="flex space-x-2">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    activeTab === tab
                                        ? 'bg-[#4CAF7D] text-white'
                                        : 'bg-transparent text-[#A8C4B0] hover:bg-white/5'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* 검색 및 날짜 필터 */}
                    <div className="flex items-center space-x-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-48">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8C4B0]" />
                            <input
                                type="date"
                                className="w-full bg-[#0D2B1E] border border-white/10 rounded-md py-2 pl-10 pr-3 text-sm text-[#FFFFFF] focus:outline-none focus:border-[#4CAF7D]"
                            />
                        </div>
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8C4B0]" />
                            <input
                                type="text"
                                placeholder="주문번호, 주문자 검색"
                                className="w-full bg-[#0D2B1E] border border-white/10 rounded-md py-2 pl-10 pr-3 text-sm text-[#FFFFFF] focus:outline-none focus:border-[#4CAF7D] placeholder-[#A8C4B0]"
                            />
                        </div>
                    </div>
                </div>

                {/* 주문 테이블 */}
                <div className="bg-[#1A4A30] rounded-lg border border-white/10 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="border-b border-white/10 text-[#A8C4B0] text-sm">
                            <th className="p-4 font-medium">주문일시</th>
                            <th className="p-4 font-medium">주문번호</th>
                            <th className="p-4 font-medium">주문자</th>
                            <th className="p-4 font-medium text-right">결제금액</th>
                            <th className="p-4 font-medium text-center">상태</th>
                            <th className="p-4 font-medium text-center">관리</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 text-sm">{new Date(order.date).toLocaleString('ko-KR')}</td>
                                <td className="p-4 font-mono text-sm text-[#F5F0E8]">{order.id}</td>
                                <td className="p-4 text-sm">{order.customer}</td>
                                <td className="p-4 text-sm font-mono text-right">{order.amount.toLocaleString()}원</td>
                                <td className="p-4 text-center">
                                    {/* 인라인 상태 변경 드롭다운 */}
                                    <div className="relative inline-block">
                                        <select
                                            className={`appearance-none px-3 py-1 pr-8 rounded-full text-xs font-medium cursor-pointer border-none outline-none ${getStatusColor(order.status)}`}
                                            defaultValue={order.status}
                                        >
                                            <option value="대기중">대기중</option>
                                            <option value="준비중">준비중</option>
                                            <option value="완료">완료</option>
                                            <option value="취소">취소</option>
                                        </select>
                                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="p-2 text-[#A8C4B0] hover:text-[#4CAF7D] transition-colors" title="상세 보기">
                                        <Eye className="w-5 h-5 mx-auto" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}