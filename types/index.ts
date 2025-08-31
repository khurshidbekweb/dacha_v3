export interface ChildProps {
  children: React.ReactNode;
}
export interface language {
  image: string,
  id: string,
  code: string,
  title: string
}

interface event {
  eventType: "view" | "call",
  id: string,
  cottageId: string,
  occurredAt: string
}

export interface cottage {
  id: string,
  name: string,
  images: image[],
  comforts: comfort[],
  cottageStatus: "confirmed" | 'progress' | 'rejected',
  cottageType: cottageType[],
  description: string,
  latitude: string | null,
  longitude: string | null,
  place: place,
  price: number,
  priceWeekend: number,
  rating: string,
  status: string,
  region: region,
  user: user,
  events: event[]
}

export interface cottageTop {
  id: string,
  cottage: cottage,
  cottageId: string,
  createdAt: string,
  expireAt: string,
  priority: string,
  serviceCode: 'top' | 'recommended'
}


export interface image {
  id: string,
  cottageId: string,
  created_at: string,
  image: string,
  isMainImage: boolean,
  status: "active" | "inactive"
}

export interface comfort {
  id: string,
  image: string,
  name: string,
}
export interface cottageType {
  id: string,
  name: string,
  image: string
}
export interface place {
  id: string,
  image: string,
  name: string,
  regionId: string,
}
export interface region {
  id: string,
  name: string,
}
export interface user {
  id: string,
  username: string | null,
  name: string | null,
  email: string | null,
  phone: string,
  image: string | null,
  password: string | null,
  orders: order[]
}

export interface breadcrambs {
  title: string,
  slug: string,
}

export interface services {
  id: string,
  name: string,
  description: string,
  serviceCode: 'recommended' | 'top',
  tariffs: tariff[],
  images: string[]
}

export interface tariff {
  id: string,
  description: string,
  service_id: string,
  days: string,
  price: string
  type: string
  service: services
}
export interface order {
  id: string,
  cottage: cottage,
  cottageId: string,
  createdAt: string,
  expireAt: string,
  orderStatus: string,
  tariff: tariff,
  status: 'active' | 'inactive',
  tariffId: string,
  userId: string,
}

export interface premiumCottage {
  cottage: newCottage,
  cottageId: string
  createdAt: string
  expireAt: string
  id: string
  priority: number
  serviceCode: string
}

export interface postCottage {
  cottageName: string;
  description: string;
  images: string[];
  regionId: string;
  placeId: string;
  price: number | '';
  priceWeekend: number | '';
  cottageType: string[]; // Bu sizning misolingizda ["c4c301b1-4719-499e-bde2-2c36715fae9e"]
  comforts: string[];
  latitude: number;
  contactPhone: string,
  longitude: number;
  doubleBedCount: number | '';
  entranceTime: string;
  exitTime: string;
  maxGuests: number | '';
  numberOfRooms: number | '';
  singleBedCount: number | '';
  familyOnly: boolean | '';
  noAlcohol: boolean | '';
  noLoudMusic: boolean | '';
  noParty: boolean | '';
  noPets: boolean | '';
  noSmoking: boolean | '';
  quiteHours: string;
};



export interface newCottage {
  id: string;
  name: string;
  description: string;
  contactPhone: string;
  cottageStatus: "confirmed" | string;
  cottageType: cottageType[];
  createdAt: string;
  updatedAt: string;
  entranceTime: string;
  exitTime: string;
  familyOnly: boolean;
  noSmoking: boolean;
  noAlcohol: boolean;
  noPets: boolean;
  noLoudMusic: boolean;
  noParty: boolean;
  numberOfRooms: number;
  singleBedCount: number;
  doubleBedCount: number;
  maxGuests: number;
  price: number;
  priceWeekend: number;
  rating: string;
  quiteHours: string;
  latitude: number | string;
  longitude: number | string;
  comforts: comfort[];
  images: image[];
  events: event[];
  orders: order[]; // Empty array, so can be left as `any[]` or defined
  premiumCottages?: string[]; // Typing this depends on your actual structure
  place: place;
  region: region;
  status: "active" | string;
  user: user,
  comments: comments[]
}

export interface dataCottage {
  data: newCottage[],
  limit: number,
  page: number,
  totalCount: number
}

export interface comments {
  content: string
  cottageId: string
  createdAt: string
  id: string,
  user: user,
  rating: string
  userId: string
}