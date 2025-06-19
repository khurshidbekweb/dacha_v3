'use client'

import { useState, useRef } from "react";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";
const mapContainerStyle = { height: "70%", width: "100%" };
const defaultCenter = { lat: 41.2995, lng: 69.2401 }; // Toshkent koordinatalari
import { Libraries } from '@react-google-maps/api';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { MapPinned, X } from "lucide-react";
import { postCottage } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface infoProps {
    cottage: postCottage;
    setCottage: React.Dispatch<React.SetStateAction<postCottage>>;
}


export const DachaMap = ({ setCottage, cottage }: infoProps) => {
    const libraries: Libraries = ['places'];
    const [open, setOpen] = useState(false)
    const { t } = useTranslation()
    const [coordinates, setCoordinates] = useState(defaultCenter);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const onPlaceSelected = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry) {
                const newCoordinates = {
                    lat: place.geometry.location!.lat(),
                    lng: place.geometry.location!.lng(),
                };
                setCoordinates(newCoordinates);
                setCottage({ ...cottage, latitude: newCoordinates.lat, longitude: newCoordinates.lng }); // 📡 Ota komponentaga jo‘natish
            }
        }
    };

    const [isMapLoad, setIsMapLoad] = useState(false)

    // Hozirgi joylashuvni olish
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newCoordinates = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCoordinates(newCoordinates);
                    setCottage({ ...cottage, latitude: newCoordinates.lat, longitude: newCoordinates.lng });
                },
                (error) => console.error("Geolocation error:", error)
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <Drawer onOpenChange={setOpen} open={open}>
            <DrawerTrigger className="w-full flex items-center gap-x-3 border rounded-lg justify-center p-[6px] cursor-pointer bg-transparent dark:bg-input/30 border-amber-500 text-amber-500"><MapPinned size={25} className="text-amber-600" /> {t('choos_map')}</DrawerTrigger>
            <DrawerContent className='!h-[100vh] overflow-y-auto'>
                <DrawerTitle onClick={() => setOpen(false)} className='w-[50px] border flex items-center p-2 text-center ml-3 justify-center cursor-pointer rounded-lg'><X className='w-5 h-5 font-bold block' size={35} /></DrawerTitle>
                <LoadScript onLoad={() => setIsMapLoad(true)} googleMapsApiKey="AIzaSyCGUri0Qf7oabhI-5bCvkhu4DkNJU1l6v4" libraries={libraries}>
                    {isMapLoad ? <div className="w-full h-full z-50">
                        <Button className="rounded-lg my-2" onClick={getCurrentLocation} type="button">
                            📍 Joylashuvimni olish
                        </Button>

                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={coordinates}
                            zoom={14}
                            onClick={(e) => {
                                if (e.latLng) {
                                    const newCoordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                                    setCoordinates(newCoordinates);
                                    setCottage({
                                        ...cottage,
                                        latitude: newCoordinates.lat,
                                        longitude: newCoordinates.lng,
                                    });
                                }
                            }}
                        >
                            <Marker
                                position={coordinates}
                                draggable={true}
                                onDragEnd={(e) => {
                                    if (e.latLng) {
                                        const newCoordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                                        setCoordinates(newCoordinates);
                                        setCottage({
                                            ...cottage,
                                            latitude: newCoordinates.lat,
                                            longitude: newCoordinates.lng,
                                        });
                                    }
                                }}
                            />
                        </GoogleMap>
                        <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} className="z-20" onPlaceChanged={onPlaceSelected}>
                            <Input type="text" className="my-2 p-2" placeholder="Dacha joyini qidiring..." style={{ width: "100%", padding: "10px", fontSize: "16px" }} />
                        </Autocomplete>
                    </div> : ""}
                </LoadScript>
            </DrawerContent>
        </Drawer>
    );
};