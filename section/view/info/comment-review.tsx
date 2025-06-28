'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { newCottage, user } from '@/types';
import { Star, UserRound } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { safeLocalStorage } from '@/utils/safeLocalstorge';
import { commitUtils } from '@/utils/commit.utils';
import { IMG_BASE_URL } from '@/constants';
import { Button } from '@/components/ui/button';
import { QUERY_KEYS } from '@/query/query-key';
import RetingCottage from './reting-cottage';

interface commentType {
    cottage: newCottage
}

const CommentReview = ({ cottage }: commentType) => {
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)

    const [commitText, setCommitText] = useState('')
    const userInfo: user = JSON.parse(safeLocalStorage.getItem('user')!)
    const queryClient = useQueryClient()


    const postCommit = useMutation({
        mutationFn: commitUtils.postComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottage_by_id] })
            setCommitText('')
            setOpen(true)
        },
        onError: (err) => {
            console.log(err);
        }
    })

    const handleCommit = () => {
        postCommit.mutate({
            cottageId: cottage.id,
            content: commitText,
            userId: userInfo.id
        })
    }
    return (
        <div>
            <div className="review mt-5 flex flex-col space-y-2 relative">
                <h3 className='text-2xl md:text-3xl font-mediu'>{t('guest_reviews')}</h3>
                <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-end flex-col space-y-1">
                        <div className="flex justify-between items-center gap-x-2 w-full">
                            <Avatar>
                                <AvatarImage src={userInfo?.name ? '' : `${IMG_BASE_URL}${userInfo.image}`} />
                                <AvatarFallback>{userInfo?.name ? userInfo?.name?.slice(0, 3) : <UserRound />}</AvatarFallback>
                            </Avatar>
                            <Textarea onChange={(text) => setCommitText(text.target.value)} placeholder='Commit add...' className='w-full border-b outline-none' />
                        </div>
                        <Button className='' onClick={handleCommit}>Comment</Button>
                    </div>
                    <div className="h-[40vh] md:h-auto overflow-y-scroll scroll-none">
                        {cottage?.comments ? cottage.comments.map((comment) => (
                            <div className="flex flex-col space-y-2" key={comment.id}>
                                <div className="user flex gap-x-2 items-center">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>AL</AvatarFallback>
                                    </Avatar>
                                    <div className="">
                                        <p>Alijon</p>
                                        <span className='flex'><Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /><Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /><Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /><Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /><Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /></span>
                                    </div>
                                </div>
                                <p className='text-[16px]'>{comment?.content}</p>
                            </div>
                        )) : <p>
                            Not yet comment
                        </p>}
                    </div>
                </div>
            </div>
            <Separator className='mt-10' />
            <RetingCottage onOpenChange={setOpen} open={open} cottageId={cottage.id} userId={userInfo.id} />
        </div>
    );
};

export default CommentReview;