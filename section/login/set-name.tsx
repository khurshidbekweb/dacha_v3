import { Button } from '@/components/ui/button';
import { QUERY_KEYS } from '@/query/query-key';
import { userUtils } from '@/utils/user.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface userName {
    userId: string
}

const SetName = ({ userId }: userName) => {
    console.log(userId);
    const router = useRouter()
    const [name, setName] = useState('')
    const queryClinet = useQueryClient()
    const userEdit = useMutation({
        mutationFn: userUtils.editUser,
        onSuccess: async () => {
            queryClinet.invalidateQueries({ queryKey: [QUERY_KEYS.users] })
            router.push('/profile')
        }
    })

    const handleUserEdit = () => {
        userEdit.mutate({
            id: userId,
            name: name,
            image: null
        })
    }

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
                    placeholder='Ismiz...'
                    className='w-full p-2 border outline-blue-500  rounded-md py-2 mt-2'
                    onChange={(e) => setName(e.target.value)}
                />
                <Button
                    onClick={handleUserEdit}
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