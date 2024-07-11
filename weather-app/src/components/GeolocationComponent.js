import React, { useEffect, useState } from 'react';
import { useGeolocated } from 'react-geolocated';

const GeolocationComponent = ({ onLocationFound }) => {
    const { coords } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });

    const [location, setLocation] = useState(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                if (coords) {
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=71a1d54910fc34b8989358aaf59ab093`);
                    const data = await response.json();
                    setLocation({ city: data.name });
                } else {
                    const response = await fetch(`/https://api.ipgeolocation.io/ipgeo?apiKey=650bbeadcb1d48b489b8fab6dbcff3ee`);
                    const data = await response.json();
                    setLocation({ city: data.city });
                }
            } catch (error) {
                console.error("Error fetching location data:", error);
            }
        };

        fetchLocation();
    }, [coords]);

    useEffect(() => {
        if (location) {
            onLocationFound(location);
        }
    }, [location, onLocationFound]);

    return null;
};

export default GeolocationComponent;
