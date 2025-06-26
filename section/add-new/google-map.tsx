'use client'

import { useState, useRef } from "react";
import { GoogleMap, Marker, Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { postCottage } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const mapContainerStyle = { height: "200px", width: "100%", borderRadius: "10px" };
const defaultCenter = { lat: 41.2995, lng: 69.2401 }; // Toshkent koordinatalari
const libraries: ("places")[] = ['places'];

interface infoProps {
    cottage: postCottage;
    setCottage: React.Dispatch<React.SetStateAction<postCottage>>;
}

export const DachaMap = ({ setCottage, cottage }: infoProps) => {
    const { t } = useTranslation();
    const [coordinates, setCoordinates] = useState(defaultCenter);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCGUri0Qf7oabhI-5bCvkhu4DkNJU1l6v4",
        libraries,
    });

    const onPlaceSelected = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry) {
                const newCoordinates = {
                    lat: place.geometry.location!.lat(),
                    lng: place.geometry.location!.lng(),
                };
                setCoordinates(newCoordinates);
                setCottage({ ...cottage, latitude: newCoordinates.lat, longitude: newCoordinates.lng });
            }
        }
    };

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

    if (loadError) return <div>Xarita yuklanmadi</div>;
    if (!isLoaded) return <div>Xarita yuklanmoqda...</div>;

    return (
        <div className="w-full h-[340px] relative">
            <h3>{t('choos_map')}</h3>

            <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={onPlaceSelected}>
                <Input type="text" className="my-2 p-2" placeholder={`${t('search_by_location_name')}...`} />
            </Autocomplete>

            <Button className="rounded-lg my-2" onClick={getCurrentLocation} type="button">
                📍 {t('get_my_location')}
            </Button>

            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={coordinates}
                zoom={14}
                onClick={(e) => {
                    if (e.latLng) {
                        const newCoordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                        setCoordinates(newCoordinates);
                        setCottage({ ...cottage, latitude: newCoordinates.lat, longitude: newCoordinates.lng });
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
                            setCottage({ ...cottage, latitude: newCoordinates.lat, longitude: newCoordinates.lng });
                        }
                    }}
                />
            </GoogleMap>
        </div>
    );
};
