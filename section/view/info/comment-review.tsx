'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { newCottage, user } from '@/types';
import { MessageCircleWarning, Star, UserRound } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { safeLocalStorage } from '@/utils/safeLocalstorge';
import { commitUtils } from '@/utils/commit.utils';
import { IMG_BASE_URL } from '@/constants';
import { Button } from '@/components/ui/button';
import { QUERY_KEYS } from '@/query/query-key';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Rating, RatingButton } from '@/components/ui/reating';
import { ratingUtils } from '@/utils/rating.utils';

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
            if (!cottage?.comments[cottage.comforts.length - 1]?.rating) {
                setOpen(true)
            }
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
    const [rating, setRating] = useState(4)
    const postRating = useMutation({
        mutationFn: ratingUtils.postRating,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottage_by_id] })
            setOpen(false)
        }
    })
    return (
        <>
            <div>
                <div className="review mt-5 flex flex-col space-y-2 relative">
                    <h3 className='text-2xl md:text-3xl font-mediu'>{t('guest_reviews')}</h3>
                    <div className="flex flex-col space-y-3">
                        <div className="flex justify-between items-end flex-col space-y-3">
                            <div className="flex justify-between items-center gap-x-2 w-full">
                                <Avatar>
                                    <AvatarImage src={userInfo?.name ? '' : `${IMG_BASE_URL}${userInfo.image}`} />
                                    <AvatarFallback>{userInfo?.name ? userInfo?.name?.slice(0, 3) : <UserRound />}</AvatarFallback>
                                </Avatar>
                                <Textarea value={commitText} onChange={(text) => setCommitText(text.target.value)} placeholder={t('add_comment')} className='w-full border-b outline-none' />
                            </div>
                            <Button className='' onClick={handleCommit}>{t('submit_comment')}</Button>
                        </div>
                        <div className={`${cottage.comments.length > 2 ? 'h-[40vh]' : "h-[20vh]"}  md:h-auto overflow-y-scroll space-y-3 scroll-none`}>
                            {cottage?.comments?.length ? cottage.comments.map((comment) => (
                                <div className="flex flex-col space-y-2" key={comment.id}>
                                    <div className="user flex gap-x-2 items-center">
                                        <Avatar>
                                            <AvatarImage src={comment.user?.name ? '' : `${IMG_BASE_URL}${userInfo.image}`} />
                                            <AvatarFallback>{comment.user?.name?.slice(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div className="">
                                            <p>{comment.user.name}</p>
                                            <span className='flex'>
                                                <Star className={`w-3 h-3 mr-1 ${Number(comment.rating) >= 1 ? 'fill-yellow-400 text-yellow-400' : ''} `} />
                                                <Star className={`w-3 h-3 mr-1 ${Number(comment.rating) >= 2 ? 'fill-yellow-400 text-yellow-400' : ''} `} />
                                                <Star className={`w-3 h-3 mr-1 ${Number(comment.rating) >= 3 ? 'fill-yellow-400 text-yellow-400' : ''} `} />
                                                <Star className={`w-3 h-3 mr-1 ${Number(comment.rating) >= 4 ? 'fill-yellow-400 text-yellow-400' : ''} `} />
                                                <Star className={`w-3 h-3 mr-1 ${Number(comment.rating) == 5 ? 'fill-yellow-400 text-yellow-400' : ''} `} />
                                            </span>
                                        </div>
                                    </div>
                                    <p className='text-[16px]'>{comment?.content}</p>
                                </div>
                            )) : <p className='w-full flex items-center flex-col justify-center text-amber-400'>
                                <MessageCircleWarning size={60} className='text-red-500 text-center' />
                                {t('no_comment')}
                            </p>}
                        </div>
                    </div>
                </div>
                <Separator className='mt-10' />
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px] rounded-lg">
                    <DialogHeader className="p-1">
                        <DialogTitle className="text-xl md:text-2xl font-semibold text-start">
                            {t('rating_')}
                        </DialogTitle>

                        <div className="flex justify-center items-center">
                            <Rating defaultValue={rating} onValueChange={(value) => {
                                setRating(value)
                                postRating.mutate({
                                    cottageId: cottage.id,
                                    rating: value,
                                    userId: userInfo.id
                                })

                            }}>
                                {Array?.from({ length: 5 }).map((_, index) => (
                                    <RatingButton key={index} />
                                ))}
                            </Rating>
                        </div>
                        <DialogDescription className="text-muted-foreground text-center mt-5 text-sm">
                            {t('rating_test')}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CommentReview;

