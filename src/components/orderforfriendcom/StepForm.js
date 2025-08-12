import React from "react";
import FormField from "./FormField";

export default function StepForm({
  step,
  fields,
  formData,
  handleChange,
  handleGiftRangeChange,
  giftRanges,
  handleBack,
  handleNext,
  handleSubmit,
  errorMsg,
  loading
}) {
  const currentField = fields[step];

  return (
    <form onSubmit={handleSubmit}>
      {errorMsg && <div style={{ color: "red", fontWeight: "600" }}>⚠ {errorMsg}</div>}

      <FormField
        field={currentField}
        formData={formData}
        handleChange={handleChange}
        handleGiftRangeChange={handleGiftRangeChange}
        giftRanges={giftRanges}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {step > 0 && (
          <button type="button" onClick={handleBack}>
            ← पछाडि
          </button>
        )}
        {step < fields.length - 1 ? (
          <button type="button" onClick={handleNext}>
            अगाडि →
          </button>
        ) : (
          <button type="submit" disabled={loading}>
            {loading ? "बुझाउँदै..." : "बुझाउनुहोस्"}
          </button>
        )}
      </div>
    </form>
  );
}
