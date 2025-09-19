import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import DrawerAppBar from "../../components/Navbar";
import "./BookingApp.css";

export default function BookingApp() {
  const location = useLocation();
  const selectedRoom = location.state?.bookingDetails;

  const rooms = [
    {
      id: 1,
      title: "Single Bed Couple Room",
      price: 2500,
      details: "1 Bed • 1 Bathroom • 2 Guests",
    },
    {
      id: 2,
      title: "Double Bed - 3 Person",
      price: 3000,
      details: "2 Beds • 1 Bathroom • 3 Guests",
    },
    {
      id: 3,
      title: "Double Bed - 2 Person",
      price: 2500,
      details: "2 Beds • 1 Bathroom • 2 Guests",
    },
    {
      id: 4,
      title: "Double Bed - 4 Person",
      price: 3500,
      details: "2 Beds • 2 Bathrooms • 4 Guests",
    },
    {
      id: 5,
      title: "Double Bed - 3 Person with Balcony",
      price: 3500,
      details: "2 Beds • 1 Bathroom • 3 Guests",
    },
    {
      id: 6,
      title: "Suite Room for Couple",
      price: 3000,
      details: "Luxury Bed • 1 Bathroom • 2 Guests",
    },
    {
      id: 7,
      title: "Suite Room Plus",
      price: 3500,
      details: "Luxury Bed • 1 Bathroom • 2 Guests • 3 Space",
    },
  ];

  const createRoom = (roomId = 1) => ({ roomId, nights: 1, checkIn: "" });

  const [roomsBooked, setRoomsBooked] = useState([createRoom()]);
  const [expandedRoom, setExpandedRoom] = useState(0);
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [notes, setNotes] = useState("");
  const [booked, setBooked] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    if (selectedRoom?.id) setRoomsBooked([createRoom(selectedRoom.id)]);
  }, [selectedRoom]);

  // ------------------- Add Room -------------------
  const addRoom = () => {
    const lastRoom = roomsBooked[roomsBooked.length - 1];
    const newRoom = createRoom();
    newRoom.checkIn = lastRoom?.checkIn || "";
    newRoom.nights = lastRoom?.nights || 1;
    setRoomsBooked([...roomsBooked, newRoom]);
    setExpandedRoom(roomsBooked.length);
  };

  const removeRoom = (index) => {
    const newRooms = roomsBooked.filter((_, i) => i !== index);
    setRoomsBooked(newRooms);
    if (expandedRoom === index) setExpandedRoom(-1);
    else if (expandedRoom > index) setExpandedRoom(expandedRoom - 1);
  };

  const toggleRoom = (index) => {
    setExpandedRoom(expandedRoom === index ? -1 : index);
  };

  const updateRoom = (index, field, value) => {
    const newRooms = [...roomsBooked];
    newRooms[index][field] = value;
    setRoomsBooked(newRooms);
  };

  const changeNights = (index, delta) => {
    const newRooms = [...roomsBooked];
    newRooms[index].nights = Math.max(1, newRooms[index].nights + delta);
    setRoomsBooked(newRooms);
  };

  const getCheckout = (checkInDate, nights) => {
    if (!checkInDate) return "";
    const date = new Date(checkInDate);
    date.setDate(date.getDate() + nights);
    date.setHours(12, 0, 0, 0);
    return date.toISOString().slice(0, 16);
  };

  const priceDetails = useMemo(
    () =>
      roomsBooked.map((r) => {
        const room = rooms.find((room) => room.id === r.roomId);
        const subtotal = room.price * r.nights;
        return {
          ...r,
          roomLabel: room.title,
          subtotal,
          checkout: getCheckout(r.checkIn, r.nights),
        };
      }),
    [roomsBooked]
  );

  const totalAmount = useMemo(
    () => priceDetails.reduce((acc, r) => acc + r.subtotal, 0),
    [priceDetails]
  );

  // const handleBook = (e) => {
  //   e.preventDefault();
  //   if (!guestName || !phone || !age)
  //     return alert("Please fill in all required fields!");
  //   setBooked({
  //     id: `BK-${Date.now()}`,
  //     name: guestName,
  //     phone,
  //     age,
  //     rooms: priceDetails,
  //     total: totalAmount,
  //     notes,
  //   });
  //   alert("Booking Successful!");
  // };

  const resetForm = () => {
    setGuestName("");
    setPhone("");
    setAge("");
    setNotes("");
    setRoomsBooked([createRoom()]);
    setExpandedRoom(-1);
    setBooked(null);
  };

  // Remove the old one entirely
  // const handleBook = (e) => { ... }

  // Replace it with this:
  const handleBook = (e) => {
    e.preventDefault();
    if (!guestName || !phone || !age)
      return alert("कृपया सबै आवश्यक विवरण भर्नुहोस्!");

    const bookingId = `BK-${Date.now()}`;
    const bookingData = {
      id: bookingId,
      name: guestName,
      phone,
      age,
      rooms: priceDetails,
      total: totalAmount,
      notes,
    };

    // WhatsApp Message Formatting as Bill
    let message = `🧾 *Booking Receipt*\n`;
    message += `*Booking ID:* ${bookingId}\n`;
    message += `*Guest Name:* ${guestName}\n`;
    message += `*Phone:* ${phone}\n`;
    message += `*Age:* ${age}\n\n`;
    message += `*Rooms for Booking:*\n`;

    bookingData.rooms.forEach((r, i) => {
      message += `\n${i + 1}. ${r.roomLabel}\n`;
      message += `   🏨 Check-In: ${
        r.checkIn ? new Date(r.checkIn).toLocaleString() : "-"
      }\n`;
      message += `   🌙 Nights: ${r.nights}\n`;
      message += `   💰 Subtotal: ₹${r.subtotal}\n`;
    });

    message += `\n*Total Amount:* ₹${totalAmount}\n`;
    if (notes) message += `*Notes:* ${notes}\n`;

    // Encode message and open WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "9779703782444"; // Change to your WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    setBooked(bookingData);
  };

  return (
    <>
      <DrawerAppBar />
      <div className="booking-container">
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleBook}
          className="booking-form"
        >
          <h2>Room Booking</h2>

          <label>
            Guest Name
            <input
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Enter full name"
            />
          </label>

          <div className="guest-info">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
            <input
              type="number"
              min={1}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
            />
          </div>

          {roomsBooked.map((r, i) => {
            const roomObj = rooms.find((room) => room.id === r.roomId);
            return (
              <motion.div
                key={i}
                className={`room-booked ${
                  expandedRoom === i ? "expanded" : "collapsed"
                }`}
              >
                <div className="room-header">
                  <h4>
                    Room {i + 1}: {roomObj.title}
                  </h4>
                </div>

                {/* Remove button top-left */}
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeRoom(i)}
                >
                  <span className="material-symbols-outlined">cancel</span>
                </button>

                {/* Arrow toggle button top-right */}
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => toggleRoom(i)}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      display: "inline-block",
                      transition: "transform 0.3s ease",
                      transform:
                        expandedRoom === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    keyboard_double_arrow_down
                  </span>
                </button>

                {expandedRoom === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="room-content"
                  >
                    <select
                      value={r.roomId}
                      onChange={(e) =>
                        updateRoom(i, "roomId", parseInt(e.target.value))
                      }
                    >
                      {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.title} — Rs {room.price} (Max{" "}
                          {room.details.split("•")[2].trim()})
                        </option>
                      ))}
                    </select>

                    <label>
                      Check-In
                      <input
                        type="datetime-local"
                        value={r.checkIn}
                        onChange={(e) =>
                          updateRoom(i, "checkIn", e.target.value)
                        }
                      />
                    </label>

                    {r.checkIn && (
                      <div className="nights-counter">
                        <label>Nights</label>
                        <div>
                          <button
                            type="button"
                            onClick={() => changeNights(i, -1)}
                          >
                            -
                          </button>
                          <span>{r.nights}</span>
                          <button
                            type="button"
                            onClick={() => changeNights(i, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}

                    {r.checkIn && (
                      <div>Checkout: {getCheckout(r.checkIn, r.nights)}</div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}

          <button type="button" className="add-room" onClick={addRoom}>
            + Add more room
          </button>

          <label>
            Notes (Optional)
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Special requests (optional)"
            />
          </label>

          <div className="price-summary-bill">
            <h3>Booking Receipt</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Room</th>
                  <th>Check-In</th>
                  <th>Nights</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {priceDetails.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{r.roomLabel}</td>
                    <td>{r.checkIn || "-"}</td>
                    <td>{r.nights}</td>
                    <td>₹{r.subtotal}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan="4"
                    style={{ textAlign: "right", fontWeight: "bold" }}
                  >
                    Total
                  </td>
                  <td style={{ fontWeight: "bold" }}>₹{totalAmount}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="form-actions">
            <button type="button" className="reset-btn" onClick={resetForm}>
              Reset
            </button>
            <button type="submit" className="book-btn">
              Book Now
            </button>
          </div>
        </motion.form>
      </div>
    </>
  );
}
