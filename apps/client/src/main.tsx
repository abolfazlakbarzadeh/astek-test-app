// @ts-ignore
import './index.css';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router";
import {LoginPage} from "./pages/auth/login";
import {DashboardPage} from "@/pages/dashboard";
import {DashboardLayout} from "@/pages/dashboard/layout/layout.tsx";
import {UsersPage} from "@/pages/dashboard/users";
import {CreateUserPage} from "@/pages/dashboard/users/create.tsx";
import {RolesPage} from "@/pages/dashboard/roles";
import {CreateRolePage} from "@/pages/dashboard/roles/create.tsx";
import {CreateProductPage} from "@/pages/dashboard/products/create.tsx";
import {ProductsPage} from "@/pages/dashboard/products";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="auth">
                <Route path="login" element={<LoginPage/>}/>
            </Route>
            <Route path="dashboard" element={<DashboardLayout/>}>
                <Route index element={<DashboardPage/>}/>
                <Route path="users">
                    <Route index element={<UsersPage />} />
                    <Route path="create" element={<CreateUserPage />} />
                </Route>
                <Route path="roles">
                    <Route index element={<RolesPage />} />
                    <Route path="create" element={<CreateRolePage />} />
                </Route>
                <Route path="products">
                    <Route index element={<ProductsPage />} />
                    <Route path="create" element={<CreateProductPage />} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
);
