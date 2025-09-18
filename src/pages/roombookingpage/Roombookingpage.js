import React, { useState } from "react";
import DrawerAppBar from "../../components/Navbar";
import "./Roombookingpage.css"; // external CSS

const Roombookingpage = () => {
  const rooms = [
    {
      id: 1,
      name: "Single Bed Couple Room",
      price: 2500,
      availability: 3,
      description:
        "A cozy single-bed room perfect for couples, offering a serene and intimate stay with modern amenities.",
      images: [
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
      ],
    },
    {
      id: 2,
      name: "Double Bed - 3 Person",
      price: 3000,
      availability: 3,
      description:
        "Spacious room with a double bed, comfortably accommodating up to three people with ample space.",
      images: [
        "https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg",
      ],
    },
    {
      id: 3,
      name: "Double Bed - 2 Person",
      price: 2500,
      availability: 3,
      description:
        "A comfortable double bed room designed for two, perfect for a short getaway with essential comforts.",
      images: [
        "https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg",
      ],
    },
    {
      id: 4,
      name: "Double Bed - 4 Person",
      price: 3500,
      availability: 3,
      description:
        "Spacious and comfortable room for four people, ideal for families or small groups traveling together.",
      images: [
        "https://images.pexels.com/photos/2029722/pexels-photo-2029722.jpeg",
      ],
    },
    {
      id: 5,
      name: "Double Bed - 3 Person with Balcony",
      price: 3500,
      availability: 3,
      description:
        "Enjoy the fresh air and scenic views with this spacious 3-person room featuring a private balcony.",
      images: [
        "https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg",
      ],
    },
    {
      id: 6,
      name: "Suite Room for Couple",
      price: 3500,
      availability: 2,
      description:
        "Luxurious suite designed exclusively for couples, offering elegance, comfort, and privacy.",
      images: [
        "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
      ],
    },
    {
      id: 7,
      name: "Couple Room",
      price: 3000,
      availability: 1,
      description:
        "A modern couple’s room at an affordable price, perfect for a short and sweet stay.",
      images: [
        "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg",
      ],
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

  const handleBookNow = (roomId) => {
    console.log(`Room ${roomId} has been selected for booking.`);
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

      <div className="main-container">
        <main className="room-gallery">
          <h2>Our Exclusive Rooms</h2>
          <div className="room-grid">
            {rooms.map((room) => (
              <div key={room.id} className="room-card">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="card-image"
                />
                <div className="card-content">
                  <h3>{room.name}</h3>
                  <p className="price">Rs. {room.price}</p>
                  <p className="availability">Available: {room.availability}</p>
                  <p>{room.description}</p>
                </div>
                <div className="button-group">
                  <button
                    onClick={() => openModal(room)}
                    className="button view-details"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleBookNow(room.id)}
                    className="button book-now"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {isModalOpen && selectedRoom && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>{selectedRoom.name}</h3>
              <p className="price-info">Rs. {selectedRoom.price}</p>
              <p>{selectedRoom.description}</p>
              <div className="modal-footer">
                <button onClick={closeModal} className="close-button">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Roombookingpage;
