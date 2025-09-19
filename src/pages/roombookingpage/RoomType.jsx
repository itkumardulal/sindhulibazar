// src/pages/roombookingpage/RoomType.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DrawerAppBar from "../../components/Navbar";
import "./RoomType.css";
import roomsData from "../../data/rooms.json";

const RoomType = () => {
  const navigate = useNavigate();
  const rooms = roomsData;
  // All 6 rooms

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  const openModal = (room) => {
    setSelectedRoom(room);
    setCurrentImage(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };
  useEffect(() => {
    // Component render भइसकेपछि scroll top
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []); // empty dependency array means only runs once on mount

  const handleBooking = (room) => {
    navigate("/confirmbooking", { state: { bookingDetails: room } });
  };

  const nextImage = () => {
    if (selectedRoom) {
      setCurrentImage((prev) => (prev + 1) % selectedRoom.images.length);
    }
  };

  const prevImage = () => {
    if (selectedRoom) {
      setCurrentImage(
        (prev) =>
          (prev - 1 + selectedRoom.images.length) % selectedRoom.images.length
      );
    }
  };

  return (
    <>
      <DrawerAppBar />

      {/* Hero Section */}
      <div className="hero-section">
        <img
          src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
          alt="Hotel Cover"
          className="hero-image"
        />
        <div className="cover-overlay"></div>
        <div className="hero-text">
          <h1>Welcome to Hotel Nariyah, SINDHULI</h1>
          <p>
            सिन्धुली माढीमा आराम, विलासिता, र सम्झनायोग्य बसाइ अनुभव गर्नुहोस्।
          </p>
          <button
            className="hero-book-btn"
            onClick={() => handleBooking(rooms[0])}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Rooms Section */}
      <div className="rooms-section">
        <h2 className="section-title">Our Rooms</h2>
        <div className="rooms-grid">
          {rooms.map((room) => (
            <div className="room-card" key={room.id}>
              <div className="room-image">
                <img src={room.images[0]} alt={room.title} />
                <div className="price-badge">₹{room.price}</div>
              </div>
              <div className="room-info">
                <h3>{room.title}</h3>
                <div className="stars">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < room.rating ? "star-filled" : "star-empty"
                        }
                      >
                        ★
                      </span>
                    ))}
                </div>
                <p className="room-details">{room.details}</p>
                <p className="amenities">{room.amenities.join(" • ")}</p>
                <div className="room-actions">
                  <button
                    className="details-btn"
                    onClick={() => openModal(room)}
                  >
                    View Details
                  </button>
                  <button
                    className="book-btn"
                    onClick={() => handleBooking(room)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedRoom && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeModal} className="modal-close">
              ×
            </button>
            <h3>{selectedRoom.title}</h3>
            <p className="modal-price">₹{selectedRoom.price} / night</p>
            <p>{selectedRoom.details}</p>

            {/* Image Slider */}
            <div className="modal-slider">
              <div className="slider-wrapper">
                {selectedRoom.images.map((img, index) => (
                  <div className="slide" key={index}>
                    <img src={img} alt={`${selectedRoom.title} ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            <p className="modal-description">{selectedRoom.description}</p>
            <div className="modal-actions">
              <button
                className="book-btn"
                onClick={() => handleBooking(selectedRoom)}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomType;
