'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Rating, RatingButton } from '@/components/ui/reating';
import { QUERY_KEYS } from '@/query/query-key';
import { ratingUtils } from '@/utils/rating.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
interface propsActive {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    cottageId: string,
    userId: string
}
const RetingCottage = ({ onOpenChange, open, cottageId, userId }: propsActive) => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    const [rating, setRating] = useState(4)
    const postRating = useMutation({
        mutationFn: ratingUtils.postRating,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottage_by_id] })
            onOpenChange(false)
        }
    })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] rounded-lg">
                <DialogHeader className="p-1">
                    <DialogTitle className="text-lg font-semibold text-start">

                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        {t('select_tariff_params')}
                    </DialogDescription>
                    <div className="flex">
                        <Rating defaultValue={rating} onValueChange={(value) => {
                            setRating(value)
                            postRating.mutate({
                                cottageId: cottageId,
                                rating,
                                userId
                            })

                        }}>Add commentMore actions
                            {Array.from({ length: 5 }).map((_, index) => (
                                <RatingButton key={index} />
                            ))}
                        </Rating>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default RetingCottage;