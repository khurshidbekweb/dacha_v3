'use client';

import React, { ChangeEvent } from 'react';
import { Trash, Upload } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { toast } from 'sonner';

import { image } from '@/types';
import { cottageUtils } from '@/utils/cottage.utils';
import { QUERY_KEYS } from '@/query/query-key';
import { IMG_BASE_URL } from '@/constants';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface PropsType {
    id: string;
    images: image[];
}

const CottageEditImg = ({ id, images }: PropsType) => {
    const queryClient = useQueryClient();

    const mainImage = images.find((e) => e.isMainImage === true);
    const childImages = images.filter((e) => !e.isMainImage);

    const invalidateImages = () =>
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottages] });

    const patchMainImage = useMutation({
        mutationFn: cottageUtils.patchCottageImage,
        onSuccess: invalidateImages,
        onError: (err) => console.error(err),
    });

    const addImage = useMutation({
        mutationFn: cottageUtils.addCottageImage,
        onSuccess: () => {
            invalidateImages();
            toast.success('Rasm muvaffaqiyatli yuklandi');
        },
        onError: (err) => toast.error(err.message),
    });

    const deleteImage = useMutation({
        mutationFn: cottageUtils.deleteCottageImage,
        onSuccess: () => {
            invalidateImages();
            toast.success('Rasm muvaffaqiyatli o‘chirildi');
        },
        onError: (err) => toast.error(err.message),
    });

    const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (mainImage?.id) {
            patchMainImage.mutate({ id: mainImage.id, image: file });
        } else {
            addImage.mutate({
                cottageId: id,
                image: file,
                isMainImage: true,
            });
        }
    };

    const handleChildImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        addImage.mutate({
            cottageId: id,
            image: file,
            isMainImage: false,
        });
    };

    return (
        <div className="modal-body w-full overflow-x-hidden">
            <div className="p-4 space-y-6">
                {/* Main Image */}
                <div>
                    <h2 className="text-lg font-semibold">Asosiy rasm</h2>
                    <div className="flex items-end gap-4 mt-3">
                        {mainImage?.image && (
                            <Image
                                src={`${IMG_BASE_URL}${mainImage.image}`}
                                alt="Asosiy rasm"
                                width={150}
                                height={180}
                                className="rounded-md w-[150px] h-[180px] object-cover"
                            />
                        )}
                        <label className="cursor-pointer border bg-secondary flex flex-col items-center justify-center p-2 rounded-md">
                            <input
                                onChange={handleMainImageChange}
                                type="file"
                                accept="image/*"
                                className="hidden"
                            />
                            <Upload size={20} />
                            <span>Rasmni almashtirish</span>
                        </label>
                    </div>
                </div>

                <Separator />

                {/* Child Images */}
                <div>
                    <h2 className="text-lg font-semibold">Qo‘shimcha rasmlar</h2>
                    <div className="flex gap-2 mt-3 overflow-x-auto items-center">
                        {childImages.map((img) => (
                            <div key={img.id} className="relative w-[120px] h-[150px]">
                                <div className="relative w-[120px] h-[150px]">
                                    <Image
                                        src={`${IMG_BASE_URL}${img.image}`}
                                        alt="Qo‘shimcha rasm"
                                        fill
                                        className="rounded-md object-cover"
                                        sizes='(max-width:120px) 100px 90px'
                                    />
                                </div>
                                <Button
                                    type="button"
                                    variant="link"
                                    className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-red-500 rounded-full px-2"
                                    onClick={() => deleteImage.mutate(img.id)}
                                >
                                    <Trash size={18} className="text-white" />
                                </Button>
                            </div>
                        ))}
                        <label className="cursor-pointer bg-secondary flex flex-col items-center justify-center p-2 rounded-md relative w-[120px] h-[150px] border">
                            <input
                                onChange={handleChildImageChange}
                                type="file"
                                accept="image/*"
                                className="hidden"
                            />
                            <Upload size={20} />
                            <span className='text-sm w-[120px] text-center'>Rasm qo‘shish</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CottageEditImg;
