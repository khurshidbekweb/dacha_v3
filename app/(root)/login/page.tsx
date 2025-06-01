import LoginPage from '@/section/login/login-page';
import { Metadata } from 'next';
import React from 'react';


export const metadata: Metadata = {
    title: "Login | DachaOL",
    description: "Reginter in this page",
};

const Login = () => {
    return <LoginPage />
};

export default Login;