import React, { useState, useEffect } from "react";
import { createOrder } from "./order_api/createOrder";


export default function GiftPreInstructModel({ orderData, onClose }) {
  const itemOrdered = orderData.cart.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  }));
  const totalPrice = 500;

  const giftRanges = [
    { label: "१० देखि ३०", value: "10-30", cost: 0 },
    { label: "१०० देखि ३००", value: "100-300", cost: 200 },
    { label: "३०० देखि ५००", value: "300-500", cost: 400 },
    { label: "५०० देखि १०००", value: "500-1000", cost: 1200 },
    { label: "१००० देखि १५००", value: "1000-1500", cost: 1800 },
    { label: "१५०० देखि २०००", value: "1500-2000", cost: 1700 },
    { label: "२००० देखि २५००", value: "2000-2500", cost: 2200 },
    { label: "२५०० देखि ३५००", value: "2500-3500", cost: 3000 },
    { label: "३५०० देखि ४०००", value: "3500-4000", cost: 3600 },
  ];

  const LINK_GENERATION_COST = 50;

  const [step, setStep] = useState(0);
  const [additionalCost, setAdditionalCost] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    receiverName: "",
    receiverPhone: "",
    ageGroup: "",       // new field
    gender: "",         // new field
    relationship: "",
    message: "",
    occasion: "",
    giftRange: "",
  });

  useEffect(() => {
    const rangeObj = giftRanges.find((r) => r.value === formData.giftRange);
    setAdditionalCost(rangeObj ? rangeObj.cost : 0);
  }, [formData.giftRange]);

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

  // Form fields including new Age Group and Gender dropdowns
  const fields = [
    { label: "प्रेषकको नाम", name: "senderName", placeholder: "सोफिया" },
    { label: "प्रेषकको फोन (वैकल्पिक)", name: "senderPhone", placeholder: "९८७६५४३२१०", optional: true },
    { label: "प्राप्तकर्ताको नाम", name: "receiverName", placeholder: "खड्का" },
    { label: "प्राप्तकर्ताको फोन (वैकल्पिक)", name: "receiverPhone", placeholder: "९१२३४५६७८९", optional: true },

    // New Age Group select field
    { label: "आयु समूह", name: "ageGroup", isSelect: true, options: [
      { label: "छोराछोरी (Children)", value: "children" },
      { label: "किशोरावस्था (Teenage)", value: "teenage" },
      { label: "प्रौढ (Adult)", value: "adult" },
      { label: "बृद्ध (Old)", value: "old" },
    ]},

    // New Gender select field
    { label: "लिंग", name: "gender", isSelect: true, options: [
      { label: "पुरुष (Male)", value: "male" },
      { label: "महिला (Female)", value: "female" },
    ]},

    { label: "उपहार मूल्य दायरा", name: "giftRange", isGiftRange: true },
    { label: "सम्बन्ध", name: "relationship", placeholder: "सर्वोत्तम मित्र" },
    {
      label: "सन्देश",
      name: "message",
      placeholder: "जन्मदिनको शुभकामना सोफिया! तपाईलाई सबै राम्रो होस्। मैले तपाईलाई उपहार पठाएको छु। आशा छ मन पर्छ 🎉",
      multiline: true,
    },
    { label: "अवसर", name: "occasion", placeholder: "जन्मदिन" },
  ];

  const currentField = fields[step];

  const handleNext = () => {
    const currentValue = formData[currentField.name];
    if (!currentField.optional && (!currentValue || currentValue.trim() === "")) {
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

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    const currentValue = formData[currentField.name];
    if (!currentField.optional && (!currentValue || currentValue.trim() === "")) {
      setErrorMsg("कृपया यो फिल्ड भर्नुहोस्।");
      return;
    }
    setErrorMsg("");

    const orderData = {
      senderName: formData.senderName,
      senderPhone: formData.senderPhone,
      receiverName: formData.receiverName,
      receiverPhone: formData.receiverPhone,
      receiverAgeGroup: formData.ageGroup,         // included in submission
      receiverGender: formData.gender,             // included in submission
      relationship: formData.relationship,
      message: formData.message,
      occasion: formData.occasion,
      deliveryCharge: additionalCost,
      totalPrice: totalPrice + additionalCost + LINK_GENERATION_COST,
      itemsOrdered: itemOrdered,
    };

    try {
      setLoading(true);
      const result = await createOrder(orderData);
      console.log("✅ Order created:", result);
      alert("🎉 अर्डर सफलतापूर्वक गरिएको छ!");
      console.log("✅ Order ID:", result.orderId);
      //create a rout link 
      onClose();
    } catch (err) {
      setErrorMsg(err.message || "अर्डर गर्न असफल भयो");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>✖</button>
        <h2 style={styles.title}>🎁 उपहार निर्देशनहरू</h2>
        <p style={styles.infoText}>
          आधार मूल्य: <strong>रु. {totalPrice}</strong>
          <br />
          उपहार दायराको लागि अतिरिक्त लागत: <strong>रु. {additionalCost}</strong>
          <br />
          लिंक निर्माण शुल्क: <strong>रु. {LINK_GENERATION_COST}</strong>
          <br />
          <strong>अन्तिम मूल्य:</strong> रु. {totalPrice + additionalCost + LINK_GENERATION_COST}
        </p>

        <form onSubmit={handleSubmitOrder} style={styles.form}>
          {errorMsg && <div style={styles.errorMsg}>⚠ {errorMsg}</div>}

          {currentField.isGiftRange ? (
            <>
              <label style={styles.label}>{currentField.label}:</label>
              <select
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
                name={currentField.name}
                placeholder={currentField.placeholder}
                value={formData[currentField.name]}
                onChange={handleChange}
                style={styles.textarea}
                rows={4}
                autoFocus
                required={!currentField.optional}
              />
            </>
          ) : (
            <>
              <label style={styles.label}>{currentField.label}:</label>
              <input
                type="text"
                name={currentField.name}
                placeholder={currentField.placeholder}
                value={formData[currentField.name]}
                onChange={handleChange}
                style={styles.input}
                autoFocus
                required={!currentField.optional}
              />
            </>
          )}

          <div style={styles.buttons}>
            {step > 0 && (
              <button type="button" onClick={handleBack} style={{ ...styles.button, ...styles.backButton }}>
                ← पछाडि
              </button>
            )}

            {step < fields.length - 1 ? (
              <button type="button" onClick={handleNext} style={{ ...styles.button, ...styles.nextButton }}>
                अगाडि →
              </button>
            ) : (
              <button type="submit" style={{ ...styles.button, ...styles.submitButton }} disabled={loading}>
                {loading ? "बुझाउँदै..." : "बुझाउनुहोस्"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

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
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.4rem",
    fontWeight: "600",
    color: "#444",
  },
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
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    padding: "0.6rem 1.2rem",
    fontSize: "14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  backButton: {
    backgroundColor: "#ddd",
    color: "#333",
  },
  nextButton: {
    backgroundColor: "rgb(241, 196, 15)",
    color: "white",
  },
  submitButton: {
    backgroundColor: "#10b981",
    color: "white",
    width: "100%",
  },
  errorMsg: {
    color: "red",
    fontWeight: "600",
    marginTop: "0.5rem",
  },
};
