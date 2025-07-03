import { Metadata } from 'next';
import { cottageUtils } from '@/utils/cottage.utils';
import { image } from '@/types';
import { IMG_BASE_URL } from '@/constants';
import Info from '../info';


export async function generateMetadata(
    { params }: { params: { id: string } }
): Promise<Metadata> {
    const { data: cottage } = await cottageUtils.getCottageById(params.id);
    const mainImage = cottage?.images.find((img: image) => img.isMainImage);

    return {
        title: cottage?.name || 'Dacha ko‘rish',
        description: cottage?.description || 'Dacha haqida ma’lumot',
        openGraph: {
            title: cottage?.name || 'DachaOL',
            description: cottage?.description,
            images: [
                {
                    url: mainImage ? `${IMG_BASE_URL}${mainImage.image}` : 'https://your-site.com/default.jpg',
                    width: 800,
                    height: 600,
                    alt: cottage?.name || 'Dacha rasmi',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: cottage?.name || '',
            description: cottage?.description || '',
            images: [mainImage ? `${IMG_BASE_URL}${mainImage.image}` : 'https://your-site.com/default.jpg'],
        },
    };
}


export default async function View({
    params,
}: { params: { id: string } }) {
    return (
        <Info
            paramsId={params?.id}
        />
    );
}
