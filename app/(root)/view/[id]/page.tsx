import { Metadata } from 'next';
import { cottageUtils } from '@/utils/cottage.utils';
import { cottage, image } from '@/types';
import { IMG_BASE_URL } from '@/constants';
import Info from '../info';

interface PageParams {
    params: {
        id: string;
    };
}

// static params generatsiya qilish
export async function generateStaticParams() {
    const cottages = await cottageUtils.getCottage();

    return cottages.map((cottage: cottage) => ({
        id: cottage.id.toString(),
    }));
}

export async function generateMetadata(
    { params }: PageParams
): Promise<Metadata> {
    const cottages = await cottageUtils.getCottage();
    const awaitedParams = await params;
    const suitableCottage = cottages.find((e: cottage) => e.id === awaitedParams.id);
    const mainImage = suitableCottage?.images.find((img: image) => img.isMainImage);

    return {
        title: suitableCottage?.name || 'Dacha ko‘rish',
        description: suitableCottage?.description || 'Dacha haqida ma’lumot',
        openGraph: {
            title: suitableCottage?.name || 'DachaOL',
            description: suitableCottage?.description,
            images: [
                {
                    url: mainImage ? `${IMG_BASE_URL}${mainImage.image}` : 'https://your-site.com/default.jpg',
                    width: 800,
                    height: 600,
                    alt: suitableCottage?.name || 'Dacha rasmi',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: suitableCottage?.name || '',
            description: suitableCottage?.description || '',
            images: [mainImage ? `${IMG_BASE_URL}${mainImage.image}` : 'https://your-site.com/default.jpg'],
        },
    };
}

export default async function View({
    params,
}: PageParams) {
    const cottage = await cottageUtils.getCottage();
    const awaitedParams = await params; // await kerak emas
    const suitableCottage = await cottageUtils.getSuitableCottage(awaitedParams.id);
    const cottageView: cottage = cottage && cottage?.find((e: cottage) => e.id === awaitedParams.id)
    return (
        <>
            <Info
                cottage={cottageView}
                paramsId={params.id}
                suitableCottage={suitableCottage}
            />
        </>
    );
}
