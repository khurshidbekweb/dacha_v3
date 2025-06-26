import { Button } from '@/components/ui/button';
import { ALL_DATA } from '@/query/query-fn';
import { QUERY_KEYS } from '@/query/query-key';
import { userUtils } from '@/utils/user.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

interface userName {
    userId: string
}

const SetName = ({ userId }: userName) => {
    const {t} = useTranslation()
    const router = useRouter()
    const userData = ALL_DATA.useSingleUser();
    const [name, setName] = useState('')
    const queryClinet = useQueryClient()
    const userEdit = useMutation({
        mutationFn: userUtils.editUser,
        onSuccess: () => {
            queryClinet.invalidateQueries({ queryKey: [QUERY_KEYS.users] })
            toast.success('Muaffaqiyatli')
            setTimeout(() => {
                router.push('/profile')
            }, 200)
            localStorage.setItem("user", JSON.stringify(userData?.data));
        }
    })

    const handleUserEdit = () => {
        userEdit.mutate({
            id: userId,
            name: name ? name : '',
            image: null
        })
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-start">
            {t('enter')}
            </h2>
            <form>
                <label htmlFor="phone" className="block text-sm text-gray-700">
                    {t('form_name')}
                </label>
                <input
                    type='text'
                    placeholder={`${t('form_name')}...`}
                    required
                    className='w-full p-2 border outline-blue-500  rounded-md py-2 mt-2 border-black text-black'
                    onChange={(e) => setName(e.target.value)}
                />
                <Button
                    onClick={handleUserEdit}
                    type='button'
                    disabled={!name ? true : false}
                    className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:ring focus:ring-blue-400"
                >
                    {t('confirm')}
                </Button>
                <Button
                    onClick={() => router.push('/profile')}
                    type='button'
                    className="w-full mt-3 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:ring focus:ring-blue-400"
                >
                    {t('skip')}
                </Button>
            </form>
        </div>
    );
};

export default SetName;