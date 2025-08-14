import React, { useState } from "react";

function ClaimedGiftAuthModel() {
  const [received, setReceived] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleCheckboxChange = () => setReceived(!received);
  const handleFeedbackChange = (e) => setFeedback(e.target.value);
  const handleSubmitFeedback = () => {
    console.log("Feedback submitted:", feedback, "Package received:", received);
    alert("Thank you for your feedback!");
    setFeedback("");
    setReceived(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full flex flex-col space-y-6">
        {/* 🎁 Gift Icon */}
        <div className="flex justify-center">
          <div className="bg-pink-300 rounded-full p-4 shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6M20 12V7a2 2 0 00-2-2H6a2 2 0 00-2 2v5m16 0H4"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            You have already claimed your prize!
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            You will receive your package within the delivery time scheduled by the sender.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-around space-x-4">
          <button className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition">
            Contact Us
          </button>
          <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition">
            Report a Problem
          </button>
        </div>

        {/* Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="received"
            checked={received}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-indigo-600 rounded border-gray-300"
          />
          <label htmlFor="received" className="text-gray-700">
            I received the package
          </label>
        </div>

        {/* Feedback Section */}
        <div className="flex flex-col space-y-2">
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Write your feedback here..."
            className="border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 h-24"
          />
          <button
            onClick={handleSubmitFeedback}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClaimedGiftAuthModel;
