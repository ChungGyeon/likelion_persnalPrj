# 카페 웹 애플리케이션 제작 계획 (최종본)

## 목표 및 요약

Yucca Packaging 사이트(https://yucca.co.za)의 **딥 포레스트 그린 컬러 팔레트, 미니멀 타이포그래피, 고급스러운 레이아웃**을 **Corner Dog Cafe** 브랜드에 맞게 재해석하여, **React(Vite 빌드) + Spring Boot(백엔드) + Supabase(DB)** 기술 스택으로 동작하는 카페 주문 웹 애플리케이션을 제작한다.

> **핵심 사항**: 빌드 도구로 Vite를 사용하고, UI 프레임워크는 **React 19**를 채택한다. 요청된 파일 구조의 각 경로(`/`, `/menus/list`, `/admin/` 등)는 React Router의 라우트로 1:1 매핑하며, 페이지별 컴포넌트 파일명은 청사진의 명명 규칙(`list`, `detail`, `create`, `edit`)을 그대로 따른다.

---

## 기술 스택

| 레이어 | 기술 | 비고 |
|--------|------|------|
| **빌드 도구** | Vite 5.x | React 플러그인 (`@vitejs/plugin-react`) |
| **프론트엔드** | React 19 + TypeScript | Wouter 또는 React Router v6 라우팅 |
| **UI 라이브러리** | Tailwind CSS 4 + shadcn/ui | 커스텀 디자인 토큰 적용 |
| **백엔드** | Spring Boot 3.x | REST API, JWT 인증 |
| **데이터베이스** | Supabase (PostgreSQL) | 실시간 구독, RLS |
| **인증** | Supabase Auth (JS SDK) | `@supabase/supabase-js` |
| **HTTP 클라이언트** | Fetch API / Axios | API 통신 |
| **패키지 관리** | npm / pnpm | |

---

## React + Vite 라우팅 설계

Vite를 빌드 도구로 사용하는 단일 진입점 SPA이며, React Router v6의 `<Routes>` 구조로 청사진의 파일 경로를 URL 라우트에 1:1 매핑한다.

```
/                         → pages/index/Index.tsx
/menus/list               → pages/menus/List.tsx
/menus/detail/:id         → pages/menus/Detail.tsx
/my                       → pages/my/Index.tsx
/basket/list              → pages/basket/List.tsx
/orders/list              → pages/orders/List.tsx
/orders/detail/:id        → pages/orders/Detail.tsx
/admin                    → pages/admin/Index.tsx
/admin/menus/list         → pages/admin/menus/List.tsx
/admin/menus/detail/:id   → pages/admin/menus/Detail.tsx
/admin/menus/create       → pages/admin/menus/Create.tsx
/admin/menus/edit/:id     → pages/admin/menus/Edit.tsx
/admin/orders/list        → pages/admin/orders/List.tsx
/admin/orders/detail/:id  → pages/admin/orders/Detail.tsx
```

청사진의 `index.css` / `list.css` 등 개별 CSS 파일은 각 페이지 컴포넌트의 CSS Module(`*.module.css`) 또는 Tailwind 유틸리티 클래스로 대응하며, `css/variables.css`는 전역 CSS 변수 파일로 `index.css`에서 import한다.

---

## 파일 구조 (요청 사항 100% 준수)

```
cafe-app/
│
├── vite.config.ts                    # Vite + React 플러그인 설정
├── package.json
├── tsconfig.json
│
├── index.html                        # Vite 단일 진입점 HTML
│
└── src/
    ├── main.tsx                      # React 앱 진입점
    ├── App.tsx                       # 라우터 + 전역 레이아웃
    ├── index.css                     # 전역 스타일 (variables.css import 포함)
    │
    ├── css/
    │   └── variables.css             # CSS 변수 (전역 디자인 토큰)
    │
    ├── js/
    │   ├── data.ts                   # 메뉴/카테고리 목 데이터
    │   └── utils.ts                  # 공통 유틸리티 함수
    │
    ├── pages/
    │   ├── index/
    │   │   └── Index.tsx             # 메인 (고객) ← index.html
    │   ├── menus/
    │   │   ├── List.tsx              # 메뉴 목록 ← menus/list.html
    │   │   └── Detail.tsx            # 메뉴 상세 ← menus/detail.html
    │   ├── my/
    │   │   └── Index.tsx             # 마이페이지 ← my/index.html
    │   ├── basket/
    │   │   └── List.tsx              # 장바구니 ← basket/list.html
    │   ├── orders/
    │   │   ├── List.tsx              # 주문 내역 목록 ← orders/list.html
    │   │   └── Detail.tsx            # 주문 상세 ← orders/detail.html
    │   └── admin/
    │       ├── Index.tsx             # 대시보드 ← admin/index.html
    │       ├── menus/
    │       │   ├── List.tsx          # 메뉴 목록 ← admin/menus/list.html
    │       │   ├── Detail.tsx        # 메뉴 상세 ← admin/menus/detail.html
    │       │   ├── Create.tsx        # 메뉴 추가 ← admin/menus/create.html
    │       │   └── Edit.tsx          # 메뉴 수정 ← admin/menus/edit.html
    │       └── orders/
    │           ├── List.tsx          # 주문 목록 ← admin/orders/list.html
    │           └── Detail.tsx        # 주문 상세 ← admin/orders/detail.html
    │
    ├── components/                   # 공통 재사용 컴포넌트
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   ├── AdminSidebar.tsx
    │   ├── MenuCard.tsx
    │   ├── StatusBadge.tsx
    │   └── ui/                       # shadcn/ui 컴포넌트
    │
    ├── contexts/
    │   ├── AuthContext.tsx            # 인증 상태 관리
    │   └── CartContext.tsx            # 장바구니 상태 관리
    │
    └── hooks/
        ├── useAuth.ts
        └── useCart.ts
```

---

## 디자인 시스템 (Yucca 참조 기반)

### 컬러 팔레트 (`css/variables.css`)

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-bg-deep` | `#0D2B1E` | 주 배경 (딥 포레스트 그린) |
| `--color-bg-mid` | `#1A4A30` | 카드 배경, 섹션 구분 |
| `--color-accent` | `#4CAF7D` | CTA 버튼, 강조 요소 |
| `--color-surface` | `#F5F0E8` | 밝은 섹션 배경 (크림) |
| `--color-text-on-dark` | `#FFFFFF` | 다크 배경 위 텍스트 |
| `--color-text-muted` | `#A8C4B0` | 서브텍스트, 캡션 |
| `--color-text-on-light` | `#1A1A1A` | 밝은 배경 위 텍스트 |
| `--color-border` | `rgba(255,255,255,0.12)` | 카드 테두리, 구분선 |
| `--color-danger` | `#E05252` | 삭제, 경고 |

### 타이포그래피 (Google Fonts CDN)
- **헤딩**: `Playfair Display` (serif) — 브랜드 고급감
- **본문**: `Inter` (sans-serif) — 가독성
- **숫자/가격**: `JetBrains Mono` (monospace)

### 레이아웃 원칙
- 딥 그린 다크 테마 기본, 크림 배경 섹션과 교차 배치
- 비대칭 그리드, 넓은 여백, 풀블리드 이미지 섹션
- 모바일 퍼스트 반응형 (breakpoints: 640 / 768 / 1024 / 1280px)

---

## 공유 자원 명세

### `css/variables.css` — 전역 디자인 토큰
- 컬러, 타이포그래피 스케일, 간격(spacing), 그림자, 테두리 반경, z-index 토큰
- `src/index.css`에서 `@import './css/variables.css'`로 전역 참조

### `js/data.ts` — 목 데이터 (TypeScript)
- **카테고리** 5개: 커피, 논커피, 에이드, 디저트, 베이커리
- **메뉴** 20개 이상: `{ id, categoryId, name, description, price, imageUrl, isAvailable, options }`
- `options` 예시: `[{ name: '사이즈', choices: [{label:'S', price:0}, {label:'M', price:500}, {label:'L', price:1000}] }]`
- TypeScript 인터페이스(`Menu`, `Category`, `Order`, `OrderItem`) 정의 포함

### `js/utils.ts` — 공통 유틸리티 (TypeScript)
- `formatPrice(n)` — 원화 포맷 (예: `4,500원`)
- `formatDate(iso)` — 날짜 포맷
- `generateOrderId()` — 주문번호 생성
- `cn(...classes)` — Tailwind 클래스 병합 (clsx + tailwind-merge)
- `showToast(msg, type)` — sonner 기반 전역 토스트 알림

---

## 페이지별 구현 명세

### 고객 페이지

#### `index.html` — 메인 랜딩
- **Hero**: 풀스크린 딥 그린 배경, 카페 로고 + 슬로건, "메뉴 보기" CTA 버튼
- **인기 메뉴**: 카드 그리드 3~4개 (이미지, 이름, 가격)
- **카테고리 탐색**: 아이콘 + 카테고리명 가로 스크롤 바
- **공지/이벤트 배너**: 크림 배경 섹션
- **Footer**: 영업시간, 위치, SNS 링크

#### `menus/list.html` — 메뉴 목록
- 상단 카테고리 필터 탭 (전체 / 커피 / 논커피 / 에이드 / 디저트)
- 검색바 (실시간 필터링)
- 메뉴 카드 그리드 (이미지, 이름, 가격, 장바구니 담기 버튼)
- 품절 오버레이 표시
- 정렬 드롭다운 (인기순 / 가격 낮은순 / 높은순)

#### `menus/detail.html` — 메뉴 상세
- 2컬럼 레이아웃: 대형 이미지(좌) + 정보 패널(우)
- 메뉴명, 가격, 설명, 알레르기 정보
- 옵션 선택 (사이즈, 온도, 추가 옵션)
- 수량 조절 스피너
- "장바구니 담기" / "바로 주문" 버튼
- 관련 메뉴 추천 섹션

#### `my/index.html` — 마이페이지
- 프로필 헤더 (아바타, 이름, 이메일)
- 누적 통계 카드 (총 주문 수, 총 금액, 즐겨찾기 메뉴)
- 최근 주문 3건 미리보기
- 계정 설정 메뉴 (프로필 수정, 로그아웃)

#### `basket/list.html` — 장바구니
- 담긴 메뉴 목록 (이미지, 이름, 옵션, 수량 조절, 삭제)
- 주문 요약 패널 (소계, 합계)
- 요청사항 입력
- "주문하기" CTA (하단 고정)
- 빈 장바구니 Empty State

#### `orders/list.html` — 주문 내역 목록
- 주문 카드 리스트 (날짜, 주문번호, 상태 배지, 금액)
- 상태 필터 탭 (전체 / 준비중 / 완료 / 취소)

#### `orders/detail.html` — 주문 상세
- 주문 상태 타임라인
- 주문 항목 목록
- 결제 정보 요약
- 재주문 버튼

### 관리자 페이지

#### `admin/index.html` — 대시보드
- 사이드바 네비게이션 (고정, 딥 그린)
- KPI 카드 4개: 오늘 주문, 오늘 매출, 대기 주문, 인기 메뉴
- 최근 주문 목록 (10건)
- 매출 차트 (Chart.js 바 차트, CDN 사용)
- 카테고리별 판매 비율 도넛 차트

#### `admin/menus/list.html` — 메뉴 목록 (관리자)
- 테이블 (썸네일, 이름, 카테고리, 가격, 재고 상태, 수정/삭제)
- 카테고리 필터, 검색
- "메뉴 추가" 버튼
- 일괄 삭제 체크박스

#### `admin/menus/detail.html` — 메뉴 상세 (관리자)
- 읽기 전용 상세 뷰 + "수정하기" 버튼

#### `admin/menus/create.html` — 메뉴 추가
- 폼: 메뉴명, 카테고리, 가격, 설명, 이미지 URL, 옵션 동적 추가
- 품절 여부 토글
- 실시간 카드 미리보기 패널

#### `admin/menus/edit.html` — 메뉴 수정
- create와 동일 폼, URL 파라미터로 기존 데이터 pre-fill

#### `admin/orders/list.html` — 주문 목록 (관리자)
- 실시간 주문 테이블
- 상태별 탭 필터
- 인라인 상태 변경 드롭다운
- 날짜 범위 필터

#### `admin/orders/detail.html` — 주문 상세 (관리자)
- 주문 항목, 고객 정보, 결제 정보
- 상태 변경 버튼 (준비중 / 완료 / 취소)
- 관리자 메모 입력

---

## Supabase DB 스키마

```sql
-- 사용자 프로필 (Supabase Auth 연동)
profiles (id uuid PK, email text, name text, phone text, role text DEFAULT 'customer', created_at timestamptz)

-- 카테고리
categories (id serial PK, name text, slug text UNIQUE, sort_order int, is_active bool DEFAULT true)

-- 메뉴
menus (
  id serial PK,
  category_id int FK → categories.id,
  name text, description text,
  price int, image_url text,
  is_available bool DEFAULT true,
  options jsonb,   -- [{name, choices:[{label, price}]}]
  created_at timestamptz, updated_at timestamptz
)

-- 주문
orders (
  id serial PK,
  user_id uuid FK → profiles.id,
  status text CHECK (status IN ('pending','preparing','ready','cancelled')),
  total_price int, note text, created_at timestamptz
)

-- 주문 항목
order_items (
  id serial PK,
  order_id int FK → orders.id,
  menu_id int FK → menus.id,
  quantity int, unit_price int,
  options jsonb
)
```

---

## Spring Boot API 엔드포인트 명세

| Method | Path | 설명 | 권한 |
|--------|------|------|------|
| GET | `/api/menus` | 메뉴 목록 (카테고리 필터) | Public |
| GET | `/api/menus/{id}` | 메뉴 상세 | Public |
| POST | `/api/menus` | 메뉴 생성 | Admin |
| PUT | `/api/menus/{id}` | 메뉴 수정 | Admin |
| DELETE | `/api/menus/{id}` | 메뉴 삭제 | Admin |
| GET | `/api/categories` | 카테고리 목록 | Public |
| POST | `/api/orders` | 주문 생성 | User |
| GET | `/api/orders` | 내 주문 목록 | User |
| GET | `/api/orders/{id}` | 주문 상세 | User/Admin |
| PATCH | `/api/orders/{id}/status` | 주문 상태 변경 | Admin |
| GET | `/api/admin/orders` | 전체 주문 목록 | Admin |
| GET | `/api/admin/stats` | 대시보드 통계 | Admin |

---

## 구현 단계 (Phase별)

### Phase 1 — 프로젝트 초기화 및 공유 자원
1. `npm create vite@latest cafe-app -- --template react-ts` 로 프로젝트 생성
2. Tailwind CSS 4 + shadcn/ui 설치 및 초기 설정
3. `css/variables.css` — 전역 디자인 토큰 정의 (딥 그린 테마)
4. `js/data.ts` — 샘플 메뉴/카테고리 데이터 (20+ 항목, TypeScript 타입 포함)
5. `js/utils.ts` — 공통 유틸리티 함수
6. `AuthContext`, `CartContext` 구현 (localStorage 기반 목 상태)
7. 공통 컴포넌트 구현: `Header`, `Footer`, `AdminSidebar`, `MenuCard`, `StatusBadge`

### Phase 2 — 고객 페이지 구현
1. `index.html` — 메인 랜딩 (Hero, 인기 메뉴, 카테고리 탐색, Footer)
2. `menus/list.html` — 메뉴 목록 (필터, 검색, 정렬)
3. `menus/detail.html` — 메뉴 상세 (옵션 선택, 장바구니 담기)
4. `basket/list.html` — 장바구니 (수량 조절, 주문하기)
5. `orders/list.html` + `orders/detail.html` — 주문 내역
6. `my/index.html` — 마이페이지

### Phase 3 — 관리자 페이지 구현
1. `admin/index.html` — 대시보드 (Chart.js 차트 포함)
2. `admin/menus/` — 메뉴 CRUD (list / detail / create / edit)
3. `admin/orders/` — 주문 관리 (list / detail)

### Phase 4 — 통합 및 마무리
1. API 연동 레이어 (`src/lib/api.ts` — axios 인스턴스 + 인터셉터, Spring Boot 엔드포인트 연결)
2. Supabase Auth 연동 코드 (`@supabase/supabase-js` npm 패키지)
3. 로딩/에러 상태 처리 (React Query 또는 커스텀 훅)
4. 반응형 검증 (모바일/태블릿/데스크톱)
5. 접근성 점검 (키보드 탐색, ARIA 레이블)

---

## 가정 및 전제 조건

1. **React 19 + Vite**: 빌드 도구로 Vite를 사용하고, UI 프레임워크는 React 19(TypeScript)를 채택한다. 라우팅은 React Router v6 또는 Wouter를 사용한다.
2. **공통 컴포넌트**: Header, Footer, AdminSidebar 등 공통 UI는 `src/components/`에 React 컴포넌트로 구현하고, 각 페이지에서 import하여 재사용한다.
3. **차트**: Recharts(npm)를 사용하여 관리자 대시보드 차트를 구현한다 (React 친화적 라이브러리).
4. **데이터**: 백엔드 미연동 시 `src/js/data.ts` 목 데이터 사용, API 연동 시 `src/lib/api.ts`의 axios 호출로 교체 가능하도록 서비스 레이어를 분리한다.
5. **인증**: React Context(`AuthContext`) 기반 목 인증 구현, Supabase Auth 연동 코드를 주석으로 제공한다.
6. **이미지**: Unsplash 무료 이미지 URL을 플레이스홀더로 사용한다.
7. **카페 브랜드명**: **"Corner Dog Cafe"** — 딥 포레스트 그린 컬러 테마는 현행 유지.

---

## 리스크 및 고려 사항

| 리스크 | 대응 방안 |
|--------|-----------|
| 공통 컴포넌트 중복 | React 컴포넌트로 분리, `src/components/`에서 일괄 관리 |
| 페이지 간 상태 공유 | React Context + localStorage를 단일 진실 공급원으로 사용 |
| 관리자 접근 제어 | `ProtectedRoute` 컴포넌트로 역할(role) 기반 라우트 가드 구현 |
| Supabase RLS 설정 | 스키마 및 RLS 정책 코드 주석으로 제공 |
| 실시간 주문 업데이트 | Supabase Realtime 구독 코드 준비 (관리자 주문 목록) |
