import { Button } from '@/components/ui/button';
import Cleave from 'cleave.js/react';
import Image from 'next/image';
import React from 'react';
import logo from '@/public/image/image.png'

interface phoneNumber {
    handleAuth: (e: React.FormEvent<HTMLFormElement>) => void,
    setPhoneNumber: (e: string) => void
}

const PhoneNumber = ({ handleAuth, setPhoneNumber }: phoneNumber) => {
    return (
        <div className="bg-white  shadow-md rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-start">
                Kirish
            </h2>
            <Image width={70} height={70} className='rounded-full overflow-hidden mx-auto border p-1' src={logo} alt='' />
            <p className='text-2xl text-center font-normal text-gray-800'>DachaOL.uz</p>
            <form onSubmit={handleAuth} >
                <label htmlFor="phone" className="block text-gray-700 py-2 text-sm font-createRound">
                    Telefon raqami
                </label>
                <Cleave
                    options={{
                        prefix: "+998",
                        delimiter: " ",
                        blocks: [4, 2, 3, 2, 2],
                        numericOnly: true,
                    }}
                    placeholder="Phone number"
                    className="w-full p-2 dark:bg-slate-100 text-xl text-black border rounded-md"
                    name="phonenumber"
                    inputMode="numeric"
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                    required
                />
                <Button
                    type="submit"
                    className="w-full mt-6 bg-blue-600 text-white py-3 text-xl cursor-pointer px-4 rounded-lg hover:bg-blue-500 focus:ring focus:ring-blue-400"
                >
                    Kodni olish
                </Button>
            </form>
        </div>
    );
};

export default PhoneNumber;