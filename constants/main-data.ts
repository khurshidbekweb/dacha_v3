import { User, MessageCircle } from 'lucide-react'
import { z } from "zod";

export const navLink = [
    {
        id: 1,
        name: 'announcements',
        path: '/villa',
        icon: User
    },
    {
        id: 2,
        name: 'services',
        path: '/villa',
        icon: User
    },
    {
        id: 3,
        name: 'Contact',
        path: '/contact',
        icon: MessageCircle
    },
]



export const cottageSchema = z.object({
    cottageName: z.string().min(1, "Cottage name is required"),
    description: z.string().min(1, "Description is required"),
    images: z.array(z.string()).optional(),
    regionId: z.string().min(1, "Region is required"),
    placeId: z.string().min(1, "Place is required"),
    price: z.number().min(0, "Price cannot be negative"),
    priceWeekend: z.number().min(0, "Weekend price cannot be negative"),
    cottageType: z.array(z.string()).min(1, "At least one cottage type required"),
    comforts: z.array(z.string()).optional(),
    latitude: z.string(),
    longitude: z.string(),
    doubleBedCount: z.number().min(0),
    entranceTime: z.string(),
    exitTime: z.string(),
    maxGuests: z.number().min(1, "At least 1 guest"),
    numberOfRooms: z.number().min(1, "At least 1 room"),
    singleBedCount: z.number().min(0),
    familyOnly: z.boolean(),
    noAlcohol: z.boolean(),
    noLoudMusic: z.boolean(),
    noParty: z.boolean(),
    noPets: z.boolean(),
    noSmoking: z.boolean(),
    quiteHours: z.string(),
});

// Type’ni ham olamiz
export type CottageFormValues = z.infer<typeof cottageSchema>;
