import { Button } from '@/components/ui/button';
import React from 'react';

const SetName = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Kirish
            </h2>
            <form>
                <label htmlFor="phone" className="block text-sm text-gray-700">
                    Ismingizni kiriting
                </label>
                <input
                    type='text'
                    placeholder='Xurshidbek'
                    className='w-full p-2 border outline-blue-500  rounded-md'
                />
                <Button
                    type="submit"
                    className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:ring focus:ring-blue-400"
                >
                    Tasdiqlash
                </Button>
            </form>
        </div>
    );
};

export default SetName;