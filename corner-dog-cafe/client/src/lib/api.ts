import axios from 'axios';
// import { supabase } from './supabase'; // Phase 4-2에서 연동할 Supabase 클라이언트

// 1. Axios 기본 인스턴스 생성
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. 요청 인터셉터 (Request Interceptor)
api.interceptors.request.use(
    async (config) => {
        // TODO: Phase 4-2에서 Supabase Auth 연동 시 아래 주석 해제 및 수정
        // const { data: { session } } = await supabase.auth.getSession();
        // const token = session?.access_token;

        // 임시 목업 토큰 (localStorage 사용 가정)
        const token = localStorage.getItem('access_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. 응답 인터셉터 (Response Interceptor)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                // 인증 에러 발생 시 로그아웃 처리 또는 토큰 갱신 로직
                console.error('인증이 만료되었습니다. 다시 로그인해주세요.');
                // window.location.href = '/login';
            } else if (status === 403) {
                console.error('해당 작업에 대한 권한이 없습니다.');
            } else if (status >= 500) {
                console.error('서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }
        }
        return Promise.reject(error);
    }
);

// 4. API 엔드포인트 서비스 객체
export const menuAPI = {
    // Public
    getMenus: (categoryId?: number) =>
        api.get('/api/menus', { params: { categoryId } }),
    getMenuDetail: (id: string | number) =>
        api.get(`/api/menus/${id}`),

    // Admin Only
    createMenu: (data: any) =>
        api.post('/api/menus', data),
    updateMenu: (id: string | number, data: any) =>
        api.put(`/api/menus/${id}`, data),
    deleteMenu: (id: string | number) =>
        api.delete(`/api/menus/${id}`),
};

export const categoryAPI = {
    // Public
    getCategories: () => api.get('/api/categories'),
};

export const orderAPI = {
    // User
    createOrder: (data: any) =>
        api.post('/api/orders', data),
    getMyOrders: () =>
        api.get('/api/orders'),

    // User / Admin
    getOrderDetail: (id: string | number) =>
        api.get(`/api/orders/${id}`),

    // Admin Only
    updateOrderStatus: (id: string | number, status: string) =>
        api.patch(`/api/orders/${id}/status`, { status }),
    getAllOrders: () =>
        api.get('/api/admin/orders'),
    getAdminStats: () =>
        api.get('/api/admin/stats'),
};

export default api;