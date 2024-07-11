import React, { useState} from 'react';

const FavoritesComponent = ({ addFavorite, favorites }) => {
    const [location, setLocation] = useState('');

    const handleAddFavorite = () => {
        if (favorites.length < 5) {
            addFavorite(location);
            setLocation('');
        } else {
            alert('You can only have 5 favorite locations');
        }
    };

    return (
        <div>
            <h1>Favorite Locations</h1>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <button onClick={handleAddFavorite}>Add Favorite</button>
            <ul>
                {favorites.map((favorite, index) => (
                    <li key={index}>{favorite}</li>
                ))}
            </ul>
        </div>
    );

};

export default FavoritesComponent;