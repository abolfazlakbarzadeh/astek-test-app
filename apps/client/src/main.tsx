// @ts-ignore
import './index.css';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router";
import {LoginPage} from "./pages/auth/login";
import {DirectionProvider} from "@radix-ui/react-direction";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <DirectionProvider dir="rtl">
        <BrowserRouter>
            <Routes>
                <Route path="auth">
                    <Route path="login" element={<LoginPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </DirectionProvider>
);
