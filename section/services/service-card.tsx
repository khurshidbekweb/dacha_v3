import { Card } from "@/components/ui/card";
import { services } from "@/types";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const ServiceCard = (props: services) => {
    const { t } = useTranslation()
    return (
        <Card className="">
            <div className="p-3">
                <h4 className="text-[18px] font-medium capitalize">{props.name}</h4>
                <p className="services-card-description">{props.description}</p>
                <Link className="bg-green-500 text-white dark:bg-secondary w-full block text-center mt-5 p-2 rounded-lg" href={`/services/${props.id}`}>
                    {t('more')}
                </Link>
            </div>
        </Card>
    );
};

export default ServiceCard;