import { Metadata } from 'next';
import { cottageUtils } from '@/utils/cottage.utils';
import { cottage, image } from '@/types';
import { IMG_BASE_URL } from '@/constants';
import Info from '../info';


// static params generatsiya qilish
export async function generateStaticParams() {
    const cottages = await cottageUtils.getCottage();

    return cottages.map((cottage: cottage) => ({
        id: cottage.id.toString(),
    }));
}

export async function generateMetadata(
    { params }: { params: { id: string } }
): Promise<Metadata> {
    const cottages = await cottageUtils.getCottage();
    const suitableCottage = cottages.find((e: cottage) => e.id === params.id);
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
}: { params: { id: string } }) {
    const { data: cottage } = await cottageUtils.getCottageById(params.id);
    const suitableCottage = await cottageUtils.getSuitableCottage(params.id);
    console.log(cottage);

    return (
        <>
            <Info
                cottage={cottage}
                paramsId={params.id}
                suitableCottage={suitableCottage}
            />
        </>
    );
}

