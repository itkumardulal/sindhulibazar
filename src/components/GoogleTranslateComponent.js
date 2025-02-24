import React, { useEffect } from 'react';

const GoogleTranslateComponent = () => {
  useEffect(() => {
    // Dynamically load the Google Translate script
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Define the callback function for Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en', // Set the default language (can change if needed)
        autoDisplay: false, // Don't automatically display the translator
      }, 'google_translate_element');
    };

    return () => {
      document.body.removeChild(script); // Clean up the script when the component is unmounted
    };
  }, []);

  return (
    <div
      style={{
        height: '50px',
        width: '200px',
        backgroundColor: 'aqua',
        marginTop: '50px',
      }}
      id="google_translate_element"
    ></div>
  );
};

export default GoogleTranslateComponent;
