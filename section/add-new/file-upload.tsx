'use clinet'
import { Input } from '@/components/ui/input';
import { postCottage } from '@/types';
import { X } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react';
import UploadImage from '@/public/image/upload-image.png'
import { Separator } from '@/components/ui/separator';
import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '@/utils/upload-image.utls';


interface ImageUploaderProps {
    cottage: postCottage;
    setCottage: React.Dispatch<React.SetStateAction<postCottage>>;
}


const FileUpload = ({ cottage, setCottage }: ImageUploaderProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const imageUpload = useMutation({
        mutationFn: uploadImage.uploadImage,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (err) => {
            console.log(err);

        }
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newFiles = Array.from(files);
        const validFiles: File[] = [];
        const maxFileSize = 10 * 1024 * 1024; // 10 MB
        const totalImagesCount = cottage.images.length;

        for (const file of newFiles) {
            if (file.size > maxFileSize) {
                alert(`${file.name} hajmi 10MB dan katta. Iltimos, kichikroq fayl yuklang.`);
                continue;
            }

            if (totalImagesCount + validFiles.length >= 15) {
                alert("Faqat 15 ta rasm yuklash mumkin.");
                break;
            }

            validFiles.push(file);
            imageUpload.mutate({
                destination: 'cottage',
                file: file
            }, {
                onSuccess: (data) => {
                    setCottage((prev) => ({
                        ...prev, images: [data.imageUrl, ...prev.images]
                    }))
                }
            }
            )

        }
    };

    const handleRemoveImage = (index: number) => {
        const newImages = cottage.images.filter((_, i: number) => i !== index);
        setCottage(prev => ({ ...prev, images: newImages }));
    };

    const previews = cottage?.images
    console.log(previews);


    return (
        <div className="flex flex-col items-start px-2 mt-5 md:mt-10 w-full mx-auto">
            <Input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
            />
            <div className='flex flex-col w-full border border-dashed p-1 shadow-lg rounded-lg md:p-5  gap-x-3 h-auto'>
                <div className="w-full flex flex-col md:flex-row justify-center items-center" onClick={() => fileInputRef.current?.click()}>
                    <div className="w-[220px] relative h-[150px] mx-auto">
                        <Image priority sizes="(max-width: 768px) 100vw, 500px" className='object-fill' fill src={UploadImage} alt='upload image' />
                    </div>
                    <div className="flex flex-col items-start justify-start">
                        {
                            previews?.length == 0 && <><span className="text-sm text-muted-foreground"> PNG, JPG yoki GIF (max: 5MB)</span>
                                <span className="text-sm text-muted-foreground">Rasmlar soni 3ta dan kam bo`lmasligi kerak(max: 15 ta).</span></> ||
                            previews?.length < 3 && <p className='text-[14px] text-red-400'>Rasm qo`shing (kamida 3 ta rasm bo`lishi kerak)</p> ||
                            previews?.length < 15 && <p className='text-xl text-green-400'>Yana {15 - previews.length} ta rasm qo`shishingiz mumkin</p> ||
                            previews?.length === 15 && <p>Yetarlicha rasm qo`shildi</p>

                        }
                    </div>
                </div>
                <Separator className='my-3' />
                {previews?.length ? <div className={`grid w-full grid-cols-3 md:grid-cols-3 xl:grid-cols-5 gap-1 overflow-hidden  ${previews?.length > 5 ? 'overflow-y-scroll h-[170px]' : ''}`}>
                    {previews?.map((src, index) => (
                        <div key={index} className="relative max-w-[140px] md:max-w-[250px] h-[80px]">
                            <Image
                                src={'https://api.dachaol.uz/uploads/' + src}
                                fill
                                alt={`preview-${index}`}
                                className="w-24 h-24 object-cover rounded border"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-secondary p-1 rounded-full flex items-center justify-center"
                            >
                                <X size={15} />
                            </button>
                        </div>
                    ))}
                </div> : ''}
            </div>
        </div>
    );
};

export default FileUpload;