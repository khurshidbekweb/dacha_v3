import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import React, { useState } from 'react';

interface smsCode {
    phoneNumber: string,
    handleLogin: (e: React.FormEvent<HTMLFormElement>) => void,
    backOneHandle: () => void
}

const SmsCode = ({ backOneHandle, handleLogin, phoneNumber }: smsCode) => {
    const [checked, setChecked] = useState(true)

    return (
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                SMS kodini kiriting !
            </h2>
            <p className="text-center text-gray-600 mb-4">
                <span className='text-blue-400 underline'>+{phoneNumber.replaceAll(' ', '')}</span> raqamiga SMS kod yuborildi.
            </p>
            <form onSubmit={handleLogin}>
                <input name='smscode' className='border-b-2 text-center text-xl border-bottom w-full outline-0 mt-5' type="tel" placeholder='*****' />
                <div className="flex items-center gap-x-2 mt-3">
                    <Checkbox checked={!checked} onCheckedChange={(value) => setChecked(!value)} />
                    <p>Barcha shartlarga roziman</p>
                </div>
                <Button
                    disabled={checked}
                    type="submit"
                    className="w-full mt-10 bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-500 focus:ring focus:ring-blue-400"
                >
                    Tasdiqlash
                </Button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4 flex gap-x-2 justify-center">
                Kodni qabul qilmadingizmi?
                <button onClick={backOneHandle} className="text-blue-600 hover:underline focus:outline-none cursor-pointer">
                    Qayta yuborish
                </button>
            </p>
        </div>
    );
};

export default SmsCode;