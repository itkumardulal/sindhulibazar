import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import "./BookingApp.css";

export default function BookingApp() {
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [roomType, setRoomType] = useState("singleCouple");
  const [checkIn, setCheckIn] = useState("");
  const [nights, setNights] = useState(1);
  const [notes, setNotes] = useState("");
  const [booked, setBooked] = useState(null);

  const ROOMS = {
    singleCouple: { label: "Single Room (Couple)", price: 2500, maxGuests: 2, image: "/images.jpeg" },
    double2: { label: "Double Bed (2 Persons)", price: 2500, maxGuests: 2, image: "/images.jpeg" },
    double3: { label: "Double Bed (3 Persons)", price: 3000, maxGuests: 3, image: "/images.jpeg" },
    double3Balcony: { label: "Double Bed with Balcony (3 Persons)", price: 3500, maxGuests: 3, image: "images.jpeg" },
    suite1: { label: "Suite Room Option 1", price: 3500, maxGuests: 4, image: "images.jpeg" },
    suite2: { label: "Suite Room Option 2", price: 3000, maxGuests: 4, image: "images.jpeg" },
  };

  const errors = useMemo(() => {
    const e = {};
    if (!guestName.trim()) e.guestName = "Enter guest name.";
    if (!phone.trim()) e.phone = "Enter phone number.";
    if (!age || age < 1) e.age = "Enter valid age.";
    if (!checkIn) e.checkIn = "Select check-in date.";
    const max = ROOMS[roomType].maxGuests;
    if (adults + children > max) e.capacity = `Selected room fits up to ${max} guests.`;
    return e;
  }, [guestName, phone, age, checkIn, adults, children, roomType]);

  const priceDetails = useMemo(() => {
    const room = ROOMS[roomType];
    const basePrice = room.price * nights;
    const childCharge = (room.price * 0.5) * children * nights;
    const extraAdultSurcharge = adults > 2 ? (adults - 2) * 500 * nights : 0;
    const subtotal = basePrice + childCharge + extraAdultSurcharge;
    return {
      roomLabel: room.label,
      image: room.image,
      basePrice,
      childCharge,
      extraAdultSurcharge,
      subtotal,
      total: subtotal,
    };
  }, [roomType, nights, children, adults]);

  function handleBook(e) {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      alert(Object.values(errors)[0]);
      return;
    }
    setBooked({
      id: `BK-${Date.now()}`,
      name: guestName.trim(),
      phone,
      age,
      checkIn,
      nights,
      adults,
      children,
      roomType: priceDetails.roomLabel,
      total: priceDetails.total,
      notes,
      image: priceDetails.image,
    });
  }

  function resetForm() {
    setGuestName("");
    setPhone("");
    setAge("");
    setAdults(1);
    setChildren(0);
    setRoomType("singleCouple");
    setCheckIn("");
    setNights(1);
    setNotes("");
    setBooked(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-6 flex items-start justify-center">
      <motion.form
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleBook}
        className="bg-white rounded-2xl shadow-md p-6 booking-form max-w-md w-full"
      >
        <h2 className="text-2xl font-semibold mb-4">Room Booking</h2>

        <img src={priceDetails.image} alt={priceDetails.roomLabel} className="rounded-lg mb-4 w-full h-40 object-cover" />

        <label className="block mb-3">
          <span className="text-sm font-medium">Guest Name</span>
          <input
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Full name"
          />
        </label>

        <div className="flex-row">
          <div className="flex-item">
            <label>
              Phone Number
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="9876543210" />
            </label>
          </div>
          <div className="flex-item">
            <label>
              Age
              <input type="number" min={1} value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
            </label>
          </div>
        </div>

        <div className="flex-row">
          <div className="flex-item">
            <label>
              Person
              <input type="number" min={1} value={adults} onChange={(e) => setAdults(parseInt(e.target.value || "1"))} />
            </label>
          </div>
          <div className="flex-item">
            <label>
              Children
              <input type="number" min={0} value={children} onChange={(e) => setChildren(parseInt(e.target.value || "0"))} />
            </label>
          </div>
        </div>

        <div className="flex-row">
          <div className="flex-item">
            <label>
              Room Type
              <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                {Object.entries(ROOMS).map(([key, room]) => (
                  <option key={key} value={key}>
                    {room.label} — Rs {room.price} (Max {room.maxGuests})
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex-item">
            <label>
              Nights
              <input type="number" min={1} value={nights} onChange={(e) => setNights(parseInt(e.target.value || "1"))} />
            </label>
          </div>
        </div>

        <label className="block mb-3">
          <span className="text-sm font-medium">Notes (Optional)</span>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Any special requests..." />
        </label>

        {errors.capacity && <p className="text-sm text-red-600 mb-2">{errors.capacity}</p>}

        <div className="price-breakdown">
          <div className="mb-1 font-semibold">Price Breakdown:</div>
          <div className="flex justify-between"><span>Room × Nights</span><span>Rs {priceDetails.basePrice}</span></div>
          <div className="flex justify-between"><span>Children charge</span><span>Rs {priceDetails.childCharge}</span></div>
          <div className="flex justify-between"><span>Extra adult surcharge</span><span>Rs {priceDetails.extraAdultSurcharge}</span></div>
          <hr className="my-1"/>
          <div className="flex justify-between font-semibold"><span>Total</span><span>Rs {priceDetails.total}</span></div>
          <div className="mt-1 text-xs text-gray-500">* Total price = (Room price × nights) + 50% per child × nights + extra adult charge</div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button type="submit">Book Now</button>
          <button type="button" onClick={resetForm}>Reset</button>
        </div>

        {booked && (
          <div className="confirm-box">
            <img src={booked.image} alt={booked.roomType} />
            <div className="text-sm font-medium">Confirmed</div>
            <div className="text-xs text-slate-700 mt-1">Booking ID: <span className="font-mono">{booked.id}</span></div>
            <div className="mt-2 text-sm">Name: {booked.name}</div>
            <div className="text-sm">Phone: {booked.phone} • Age: {booked.age}</div>
            <div className="text-sm">Room: {booked.roomType} • {booked.nights} night(s)</div>
            <div className="text-sm">Total: Rs {booked.total}</div>
            <button onClick={resetForm}>Make another booking</button>
          </div>
        )}
      </motion.form>
    </div>
  );
}
