// @ts-ignore
import './index.css';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router";
import {LoginPage} from "./pages/auth/login";
import {DashboardPage} from "@/pages/dashboard";
import {DashboardLayout} from "@/pages/dashboard/layout/layout.tsx";
import {UsersPage} from "@/pages/dashboard/users";
import {CreateUserPage} from "@/pages/dashboard/users/create.tsx";

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
            </Route>
        </Routes>
    </BrowserRouter>
);
