import React from "react";

export default function FormField({ field, formData, handleChange, handleGiftRangeChange, giftRanges }) {
  if (field.isGiftRange) {
    return (
      <>
        <label>{field.label}:</label>
        <select
          name="giftRange"
          value={formData.giftRange}
          onChange={handleGiftRangeChange}
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
    );
  }

  if (field.multiline) {
    return (
      <>
        <label>{field.label}:</label>
        <textarea
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name]}
          onChange={handleChange}
          rows={4}
          required={!field.optional}
        />
      </>
    );
  }

  return (
    <>
      <label>{field.label}:</label>
      <input
        type="text"
        name={field.name}
        placeholder={field.placeholder}
        value={formData[field.name]}
        onChange={handleChange}
        required={!field.optional}
      />
    </>
  );
}
