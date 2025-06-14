'use client'

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authUtils } from '@/utils/auth.utils';
import SmsCode from './sms-code';
import Navbar from '@/app/(root)/_components/navbar';
import PhoneNumber from './phone-number';
import SetName from './set-name';

const LoginPage = () => {
    const [step, setStep] = useState<number>(0)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [userId, setUserId] = useState('')
    const phone = useMutation({
        mutationFn: authUtils.smsAuth,
        onSuccess: (data) => {
            toast.success('a');
            setUserId(data.userId)
            setTimeout(() => {
                setStep(1)
            }, 500);
            // console.log(data.smsCode)
        },
        onError: (err) => {
            console.log(err);
            toast.error('Success');
        },
    });

    const login = useMutation({
        mutationFn: authUtils.loginAuth,
        onSuccess: () => {
            setStep(2)
        },
        onError: (err) => {
            console.log(err, "login");
        },
    });


    const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        phone.mutate({
            phone: phoneNumber.replaceAll(" ", "").slice(3),
            languageCode: 'uz'
        });
    };

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const code = form.smscode.value
        const truthCode = phone?.data?.smsCode;

        if (code === truthCode) {
            login.mutate({
                smsCode: code,
                userId: phone?.data?.userId,
            });
        } else {
            toast.error('');
        }
    };

    const backOneHandle = () => {
        setTimeout(() => {
            setStep(0)
        }, 500);
    }

    function authLOgin(step: number) {
        switch (step) {
            case 0: {
                return <PhoneNumber handleAuth={handleAuth} setPhoneNumber={setPhoneNumber} />
            };
            case 1: {
                return <SmsCode backOneHandle={backOneHandle} handleLogin={handleLogin} phoneNumber={phoneNumber} />
            };
            case 2: {
                return <SetName userId={userId} />
            }
        }
    }

    return (
        <div className="w-full">
            <Navbar />
            <div className="flex items-center justify-center mt-20 px-5 md:px-0">
                {authLOgin(step)}
            </div>
        </div>
    );
}

export default LoginPage;