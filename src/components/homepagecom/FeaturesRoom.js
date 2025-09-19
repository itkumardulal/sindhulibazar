import React, { useMemo } from "react";
import roomsData from "../../data/rooms.json";
import "./FeaturesRoom.css";
import { useNavigate } from "react-router-dom";

const FeaturedRooms = () => {
  const navigate = useNavigate();

  // Pick 3 random rooms
  const featuredRooms = useMemo(() => {
    const shuffled = [...roomsData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, []);

  const handleViewMore = (room) => {
    navigate("/roombookingstore", { state: { bookingDetails: room } });
  };

  return (
    <section className="features-room">
      <h2>Featured Rooms</h2>
      <div className="rooms-grid">
        {featuredRooms.map((room) => (
          <div className="room-card" key={room.id}>
            <div className="room-image">
              <img src={room.images[0]} alt={room.title} />
              <div className="price-badge">₹{room.price}</div>
            </div>
            <div className="room-info">
              <h3>{room.title}</h3>
              <p className="room-details">{room.details}</p>
              <button
                className="view-more-btn"
                onClick={() => handleViewMore(room)}
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRooms;
