import React from 'react';

interface smsCode {
    phoneNumber: string,
    handleLogin: (e: React.FormEvent<HTMLFormElement>) => void,
    backOneHandle: () => void
}

const SmsCode = ({ backOneHandle, handleLogin, phoneNumber }: smsCode) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                SMS kodini kiriting
            </h2>
            <p className="text-center text-gray-600 mb-4">
                <span className='text-blue-400 underline'>+{phoneNumber.replaceAll(' ', '')}</span> raqamiga yuborilgan SMS kodini kiriting
            </p>
            <form onSubmit={handleLogin}>
                <div className="flex justify-between items-center mb-4">
                    <input type="text" placeholder='ssmm code' />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:ring focus:ring-blue-400"
                >
                    Tasdiqlash
                </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
                Kodni qabul qilmadingizmi?
                <button onClick={backOneHandle} className="text-blue-600 hover:underline focus:outline-none">
                    Qayta yuborish
                </button>
            </p>
        </div>
    );
};

export default SmsCode;