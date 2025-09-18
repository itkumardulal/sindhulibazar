import React, { useState } from "react";
import DrawerAppBar from "../../components/Navbar";
import "./RoomType.css";

const RoomType = () => {
  const rooms = [
    {
      id: 1,
      title: "Single Bed Couple Room",
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
      details: "1 Bed • 1 Bathroom • 2 Guests",
      price: 2500,
      amenities: ["Free WiFi", "Breakfast Included"],
      description:
        "A cozy single-bed room perfect for couples, offering a serene and intimate stay with modern amenities.",
    },
    {
      id: 2,
      title: "Double Bed - 3 Person",
      image: "https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg",
      details: "2 Beds • 1 Bathroom • 3 Guests",
      price: 3000,
      amenities: ["AC Room", "Free Parking"],
      description:
        "Spacious room with a double bed, comfortably accommodating up to three people with ample space.",
    },
    {
      id: 3,
      title: "Double Bed - 2 Person",
      image: "https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg",
      details: "2 Beds • 1 Bathroom • 2 Guests",
      price: 2500,
      amenities: ["Free WiFi", "Balcony View"],
      description:
        "A comfortable double bed room designed for two, perfect for a short getaway with essential comforts.",
    },
    {
      id: 4,
      title: "Double Bed - 4 Person",
      image: "https://images.pexels.com/photos/2029722/pexels-photo-2029722.jpeg",
      details: "2 Beds • 2 Bathrooms • 4 Guests",
      price: 3500,
      amenities: ["Family Friendly", "Free WiFi"],
      description:
        "Spacious and comfortable room for four people, ideal for families or small groups traveling together.",
    },
    {
      id: 5,
      title: "Double Bed - 3 Person with Balcony",
      image: "https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg",
      details: "2 Beds • 1 Bathroom • 3 Guests",
      price: 3500,
      amenities: ["Balcony", "Mountain View"],
      description:
        "Enjoy the fresh air and scenic views with this spacious 3-person room featuring a private balcony.",
    },
    {
      id: 6,
      title: "Suite Room for Couple",
      image: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
      details: "Luxury Bed • 1 Bathroom • 2 Guests",
      price: 3500,
      amenities: ["Private Balcony", "Room Service"],
      description:
        "Luxurious suite designed exclusively for couples, offering elegance, comfort, and privacy.",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const openModal = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <>
      <DrawerAppBar />

      {/* Cover Photo / Hero Section */}
      <div className="cover-photo">
        <img
          src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
          alt="Hotel Cover"
          className="cover-image"
        />
        <div className="cover-text">
          <h1>Welcome to Our Hotel</h1>
          <p>Experience comfort, luxury, and a stay to remember.</p>
        </div>
      </div>

      <div className="room-list-container">
        {rooms.map((room) => (
          <div className="room-card" key={room.id}>
            {/* Left Image */}
            <div className="room-image">
              <img src={room.image} alt={room.title} />
            </div>

            {/* Right Content */}
            <div className="room-content">
              <div className="room-header">
                <h2>{room.title}</h2>
                <div className="stars">★★★★☆</div>
              </div>

              <div className="room-meta">
                <span className="room-info">{room.details}</span>
              </div>

              <div className="amenities">
                {room.amenities.map((a, i) => (
                  <React.Fragment key={i}>
                    <span>{a}</span>
                    {i < room.amenities.length - 1 && (
                      <span className="dot">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="description">
                <p>{room.description}</p>
              </div>

              <div className="room-footer">
                <div className="price">
                  <span className="amount">₹{room.price} / night</span>
                  <span className="deal">Free cancellation • Free WiFi</span>
                </div>
                <div className="button-group">
                  <button
                    className="deal-btn"
                    onClick={() => openModal(room)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedRoom && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{selectedRoom.title}</h3>
            <p className="price-info">₹{selectedRoom.price}</p>
            <p>{selectedRoom.details}</p>
            <p>{selectedRoom.description}</p>
            <div className="modal-footer">
              <button onClick={closeModal} className="close-button">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomType;
