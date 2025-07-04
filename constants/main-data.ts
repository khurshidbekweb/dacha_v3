import { MessageCircle, MapPinHouse, DatabaseZap, HousePlus } from 'lucide-react'
import { z } from "zod";

export const navLink = [
    {
        id: 1,
        name: 'announcements',
        path: '/cottage',
        icon: MapPinHouse
    },
    {
        id: 2,
        name: 'services',
        path: '/services',
        icon: DatabaseZap
    },
    {
        id: 4,
        name: 'add_announcements',
        path: '/add-new',
        icon: HousePlus
    },
    {
        id: 3,
        name: 'contact',
        path: '/contact',
        icon: MessageCircle
    },
]



export const cottageSchema = z.object({
    cottageName: z.string().min(1, "Cottage name is required"),
    description: z.string().min(10, "Min 10 ta belgi").max(400, 'Max 400 ta belgi'),
    images: z.array(z.string()).min(3, 'Rasm 3 tadan kam bo`lmasligi kerak'),
    regionId: z.string().min(1, "Region is required"),
    placeId: z.string().min(1, "Place is required"),
    price: z.number().min(1, "Price cannot be negative"),
    priceWeekend: z.number().min(1, "Weekend price cannot be negative"),
    cottageType: z.array(z.string()).min(1, "At least one cottage type required"),
    comforts: z.array(z.string()).min(1),
    entranceTime: z.string(),
    exitTime: z.string(),
    contactPhone: z.string().min(17, '+998 97 123 45 67'),
    maxGuests: z.number().min(1, "At least 1 guest"),
    numberOfRooms: z.number().min(1, "At least 1 room"),
    singleBedCount: z.number().min(1),
    doubleBedCount: z.number().min(1),
    familyOnly: z.boolean(),
    noAlcohol: z.boolean(),
    noLoudMusic: z.boolean(),
    noParty: z.boolean(),
    noPets: z.boolean(),
    noSmoking: z.boolean(),
    quiteHours: z.string(),
    latitude: z.number(),
    longitude: z.number(),
});

export type CottageFormValues = z.infer<typeof cottageSchema>;
