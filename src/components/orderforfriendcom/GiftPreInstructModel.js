import React, { useState, useEffect, useRef } from "react";
import { handleSubmitOrder as universalOrderHandler } from "../handlers/orderHandler";
// updated import
import toast from "react-hot-toast";

export default function GiftPreInstructModel({ orderData, onClose }) {
  const itemOrdered = orderData.cart.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  }));
  const totalPrice = orderData.totalPrice;
  const deliveryCharge = orderData.deliveryChargeFinal;
  const LINK_GENERATION_COST = 50;

  const giftRanges = [
    { label: "10 देखि 50", value: "10-40", cost: 0 },
    // Add more ranges if needed
  ];

  const [step, setStep] = useState(0);
  const [additionalCost, setAdditionalCost] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    receiverName: "",
    receiverPhone: "",
    ageGroup: "",
    gender: "",
    relationship: "",
    message: "",
    occasion: "",
    giftRange: "",
  });

  const inputRefs = useRef([]);

  useEffect(() => {
    const rangeObj = giftRanges.find((r) => r.value === formData.giftRange);
    setAdditionalCost(rangeObj ? rangeObj.cost : 0);
  }, [formData.giftRange]);

  useEffect(() => {
    const currentRef = inputRefs.current[step];
    if (currentRef) {
      currentRef.scrollIntoView({ behavior: "smooth", block: "center" });
      currentRef.focus({ preventScroll: true });
    }
  }, [step]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGiftRangeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      giftRange: e.target.value,
    }));
  };

  const fields = [
    { label: "Sender's Name", name: "senderName", placeholder: "Your name" },
    {
      label: "Sender's Phone (Optional)",
      name: "senderPhone",
      placeholder: "98........",
      optional: true,
    },
    {
      label: "Receiver's Name",
      name: "receiverName",
      placeholder: "Receiver name",
    },
    {
      label: "Receiver's Phone (Optional)",
      name: "receiverPhone",
      placeholder: "98********",
      optional: true,
    },
    {
      label: "Age Group",
      name: "ageGroup",
      isSelect: true,
      options: [
        { label: "Children", value: "children" },
        { label: "Teenage", value: "teenage" },
        { label: "Adult", value: "adult" },
        { label: "Old", value: "old" },
      ],
    },
    {
      label: "Gender",
      name: "gender",
      isSelect: true,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    { label: "Gift Price Range", name: "giftRange", isGiftRange: true },
    {
      label: "Relationship",
      name: "relationship",
      placeholder: "Friend/mum/brother",
    },
    {
      label: "Message",
      name: "message",
      placeholder: "Happy Birthday! Hope you like your gift 🎉",
      multiline: true,
    },
    {
      label: "Occasion",
      name: "occasion",
      placeholder: "Birthday/New Year/celebration",
    },
  ];

  const currentField = fields[step];

  const handleNext = () => {
    const currentValue = formData[currentField.name];
    if (
      !currentField.optional &&
      (!currentValue || currentValue.trim() === "")
    ) {
      setErrorMsg("कृपया यो फिल्ड भर्नुहोस्।");
      return;
    }
    setErrorMsg("");
    setStep((prev) => Math.min(prev + 1, fields.length - 1));
  };

  const handleBack = () => {
    setErrorMsg("");
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentValue = formData[currentField.name];
    if (
      !currentField.optional &&
      (!currentValue || currentValue.trim() === "")
    ) {
      setErrorMsg("कृपया यो फिल्ड भर्नुहोस्।");
      return;
    }
    setErrorMsg("");

    await universalOrderHandler({
      orderData: {
        cart: orderData.cart,
        totalPrice,
        deliveryChargeFinal: deliveryCharge,
      },
      formData: { ...formData, additionalCost, LINK_GENERATION_COST },
      setLoading,
      setErrorMsg,
      setSuccess: (success) => {
        if (success) toast.success("✅ Order placed successfully!");
      },
      onClose,
      isGift: true,
    });
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>
          ✖
        </button>
        <h2 style={styles.title}>🎁 उपहार निर्देशनहरू</h2>
        <p style={styles.infoText}>
          आधार मूल्य: <strong>रु. {totalPrice}</strong>
          <br />
          उपहार दायराको लागि अतिरिक्त लागत:{" "}
          <strong>रु. {additionalCost}</strong>
          <br />
          लिंक निर्माण शुल्क: <strong>रु. {LINK_GENERATION_COST}</strong>
          <br />
          <strong>अन्तिम मूल्य:</strong> रु.{" "}
          {totalPrice + additionalCost + LINK_GENERATION_COST}
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {errorMsg && <div style={styles.errorMsg}>⚠ {errorMsg}</div>}

          {currentField.isGiftRange ? (
            <>
              <label style={styles.label}>{currentField.label}:</label>
              <select
                ref={(el) => (inputRefs.current[step] = el)}
                name="giftRange"
                value={formData.giftRange}
                onChange={handleGiftRangeChange}
                style={styles.select}
                required
              >
                <option value="">दायरा छान्नुहोस्</option>
                {giftRanges.map(({ label, value, cost }) => (
                  <option key={value} value={value}>
                    {label} (लागत: रु. {cost})
                  </option>
                ))}
              </select>
            </>
          ) : currentField.isSelect ? (
            <>
              <label style={styles.label}>{currentField.label}:</label>
              <select
                ref={(el) => (inputRefs.current[step] = el)}
                name={currentField.name}
                value={formData[currentField.name]}
                onChange={handleChange}
                style={styles.select}
                required
              >
                <option value="">छान्नुहोस्</option>
                {currentField.options.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </>
          ) : currentField.multiline ? (
            <>
              <label style={styles.label}>{currentField.label}:</label>
              <textarea
                ref={(el) => (inputRefs.current[step] = el)}
                name={currentField.name}
                placeholder={currentField.placeholder}
                value={formData[currentField.name]}
                onChange={handleChange}
                style={styles.textarea}
                rows={4}
                required={!currentField.optional}
              />
            </>
          ) : (
            <>
              <label style={styles.label}>{currentField.label}:</label>
              <input
                ref={(el) => (inputRefs.current[step] = el)}
                type="text"
                name={currentField.name}
                placeholder={currentField.placeholder}
                value={formData[currentField.name]}
                onChange={handleChange}
                style={styles.input}
                required={!currentField.optional}
              />
            </>
          )}

          <div style={styles.buttons}>
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                style={{ ...styles.button, ...styles.backButton }}
              >
                ← पछाडि
              </button>
            )}
            {step < fields.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                style={{ ...styles.button, ...styles.nextButton }}
              >
                अगाडि →
              </button>
            ) : (
              <button
                type="submit"
                style={{ ...styles.button, ...styles.submitButton }}
                disabled={loading}
              >
                {loading ? "बुझाउँदै..." : "बुझाउनुहोस्"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// Styles remain the same...
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    padding: "1rem",
  },
  modal: {
    background: "#fff",
    borderRadius: "12px",
    padding: "2rem",
    maxWidth: "480px",
    width: "100%",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    position: "relative",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  closeBtn: {
    position: "absolute",
    top: "12px",
    right: "15px",
    fontSize: "18px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#666",
  },
  title: {
    textAlign: "center",
    color: "rgb(255, 112, 67)",
    marginBottom: "1rem",
  },
  infoText: {
    fontSize: "14px",
    color: "#333",
    marginBottom: "1rem",
    lineHeight: 1.4,
    textAlign: "center",
  },
  form: { display: "flex", flexDirection: "column" },
  label: { marginBottom: "0.4rem", fontWeight: "600", color: "#444" },
  input: {
    padding: "0.6rem 0.8rem",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "1.2rem",
    outline: "none",
  },
  textarea: {
    padding: "0.6rem 0.8rem",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "vertical",
    marginBottom: "1.2rem",
    outline: "none",
  },
  select: {
    padding: "0.6rem 0.8rem",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "1.2rem",
    outline: "none",
  },
  buttons: { display: "flex", justifyContent: "space-between" },
  button: {
    padding: "0.6rem 1.2rem",
    fontSize: "14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  backButton: { backgroundColor: "#ddd", color: "#333" },
  nextButton: { backgroundColor: "rgb(241, 196, 15)", color: "white" },
  submitButton: { backgroundColor: "#10b981", color: "white", width: "100%" },
  errorMsg: {
    color: "red",
    fontWeight: "600",
    marginTop: "0.5rem",
    minHeight: "20px",
  },
};
