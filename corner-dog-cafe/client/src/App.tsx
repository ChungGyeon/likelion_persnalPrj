import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";

import Index from "./pages/index/Index.tsx";
import MenuList from "./pages/menus/List.tsx";
import MenuDetail from "./pages/menus/Detail.tsx";
import MyPage from "./pages/my/Index.tsx";
import BasketList from "./pages/basket/List.tsx";
import OrderList from "./pages/orders/List.tsx";
import OrderDetail from "./pages/orders/Detail.tsx";
import AdminDashboard from "./pages/admin/Index.tsx";
import AdminMenuList from "./pages/admin/menus/List.tsx";
import AdminMenuDetail from "./pages/admin/menus/Detail.tsx";
import AdminMenuCreate from "./pages/admin/menus/Create.tsx";
import AdminMenuEdit from "./pages/admin/menus/Edit.tsx";
import AdminOrderList from "./pages/admin/orders/list.tsx";
import AdminOrderDetail from "./pages/admin/orders/detail.tsx";

function Router() {
    return (
        <Switch>
            <Route path="/" component={Index} />

            <Route path="/menus/list" component={MenuList} />
            <Route path="/menus/detail/:id" component={MenuDetail} />

            <Route path="/my" component={MyPage} />
            <Route path="/basket/list" component={BasketList} />

            <Route path="/orders/list" component={OrderList} />
            <Route path="/orders/detail/:id" component={OrderDetail} />

            <Route path="/admin" component={AdminDashboard} />
            <Route path="/admin/menus/list" component={AdminMenuList} />
            <Route path="/admin/menus/detail/:id" component={AdminMenuDetail} />
            <Route path="/admin/menus/create" component={AdminMenuCreate} />
            <Route path="/admin/menus/edit/:id" component={AdminMenuEdit} />
            <Route path="/admin/orders/list" component={AdminOrderList} />
            <Route path="/admin/orders/detail/:id" component={AdminOrderDetail} />

            <Route path="/404" component={NotFound} />
            {/* Final fallback route */}
            <Route component={NotFound} />
        </Switch>
    );
}

function App() {
    return (
        <ErrorBoundary>
            <ThemeProvider defaultTheme="light">
                <AuthProvider>
                    <CartProvider>
                        <TooltipProvider>
                            <Toaster />
                            <Router />
                        </TooltipProvider>
                    </CartProvider>
                </AuthProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}

export default App;