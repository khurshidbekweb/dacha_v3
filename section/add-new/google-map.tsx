import { useState, useRef } from "react";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
const mapContainerStyle = { height: "300px", width: "100%" };
const defaultCenter = { lat: 41.2995, lng: 69.2401 }; // Toshkent koordinatalari
import { Libraries } from '@react-google-maps/api';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ChevronLeft, MapPinned } from "lucide-react";



export const DachaMap = () => {
    const libraries: Libraries = ['places'];

    const [coordinates, setCoordinates] = useState(defaultCenter);
    const autocompleteRef = useRef(null);
    const { t } = useTranslation()
    const onPlaceSelected = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry) {
                const newCoordinates = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                setCoordinates(newCoordinates);
                onLocationSelect(newCoordinates); // 📡 Ota komponentaga jo‘natish
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
                    onLocationSelect(newCoordinates); // 📡 Ota komponentaga jo‘natish
                },
                (error) => console.error("Geolocation error:", error)
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <Drawer>
            <DrawerTrigger className="w-full flex items-center gap-x-3"><MapPinned size={25} /> Xaritadan belgilash</DrawerTrigger>
            <DrawerContent className='!h-[100vh]'>
                <DrawerTitle className='w-[50px] border flex items-center p-2 text-center ml-3 justify-center cursor-pointer rounded-lg'><ChevronLeft className='w-5 h-5 font-bold block' size={35} /></DrawerTitle>

                <LoadScript onLoad={() => setIsMapLoad(true)} googleMapsApiKey="AIzaSyCGUri0Qf7oabhI-5bCvkhu4DkNJU1l6v4" libraries={libraries}>
                    {isMapLoad ? <div>
                        <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={onPlaceSelected}>
                            <input type="text" placeholder="Dacha joyini qidiring..." style={{ width: "100%", padding: "10px", fontSize: "16px" }} />
                        </Autocomplete>

                        <button onClick={getCurrentLocation} type="button" style={{ margin: "10px", padding: "8px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
                            📍 {t('my_location')}
                        </button>

                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={coordinates}
                            zoom={14}
                            onClick={(e) => {
                                const newCoordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                                setCoordinates(newCoordinates);
                                onLocationSelect(newCoordinates); // 📡 Ota komponentaga jo‘natish
                            }}
                        >
                            <Marker
                                position={coordinates}
                                draggable={true}
                                onDragEnd={(e) => {
                                    const newCoordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                                    setCoordinates(newCoordinates);
                                    onLocationSelect(newCoordinates); // 📡 Ota komponentaga jo‘natish
                                }}
                            />
                        </GoogleMap>
                    </div> : ""}
                </LoadScript>
            </DrawerContent>
        </Drawer>
    );
};