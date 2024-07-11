import React, { useState } from 'react';
import WeatherComponent from './components/WeatherComponent';
import FavoritesComponent from './components/FavoritesComponent';
import ChatBoxComponent from './components/ChatBox';
import GeolocationComponent from './components/GeolocationComponent';
import SearchBarComponent from './components/SearchBarComponent';

const AppComponent = () => {
    const [location, setLocation] = useState(null);
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (location) => {
        setFavorites([...favorites, location]);
    };

    const handleSearch = (query) => {
        setLocation({ city: query });
    };

    return (
        <div>
            <SearchBarComponent onSearch={handleSearch} />
            <GeolocationComponent onLocationFound={setLocation} />
            {location && <WeatherComponent location={location.city} />}
            <FavoritesComponent addFavorite={addFavorite} favorites={favorites} />
            {location && <ChatBoxComponent location={location.city} />}
        </div>
    );
};

export default AppComponent;
