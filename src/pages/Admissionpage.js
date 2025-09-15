import React, { useState, useEffect, useRef } from "react";
import "./Admissionpage.css"; 
import DrawerAppBar from "../components/Navbar";

const AdmissionPage = () => {
  const [showInquiry, setShowInquiry] = useState(false);
  const [faqOpen, setFaqOpen] = useState({});
const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // Refs for each section
  const principalRef = useRef(null);
  const whyChooseRef = useRef(null);
  const careerRef = useRef(null);
  const eligibilityRef = useRef(null);
  const featuresRef = useRef(null);
  const locationRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowInquiry(true);
      else setShowInquiry(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFaq = (index) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const faqs = [
    { q: "Who can apply?", a: "10+2 or equivalent, any discipline, min 40%." },
    { q: "What is Dual Degree?", a: "Bachelor in Technical Education + BIT simultaneously." },
    { q: "Career Opportunities?", a: "EdTech, AI/ML, VR/AR, IT Trainer, Software Dev." },
  ];

  return (
    <>
      <DrawerAppBar>
        <div className="admission-page">

          {/* Vertical Navigation Buttons */}
    
          

          <div className="container fade-in">
            

            {/* Banner Image */}
            <div className="banner-image">
              <img
                src="https://i.imgur.com/bEDaRjG.jpeg"
                alt="Admission Banner"
              />
            </div>

            {/* Header */}
            <h1 className="header">OPEN ADMISSION | Kathmandu University School of Education</h1>
            <h2 className="subheader">🎓 B.Tech.Ed IT / BIT – Transform Your Career in Educational Technology!</h2>
            <a className="apply-btn">🎓 Sindhuli Community Technical Institute (SCTI)</a>


      <div className="vertical-nav">
            <button onClick={() => scrollToSection(principalRef)}>👩‍🏫 Principal</button>
            <button onClick={() => scrollToSection(whyChooseRef)}>🎯 Why Choose</button>
            <button onClick={() => scrollToSection(careerRef)}>💼 Career</button>
            <button onClick={() => scrollToSection(eligibilityRef)}>📋 Eligibility</button>
            <button onClick={() => scrollToSection(featuresRef)}>🎁 Features</button>
            <button onClick={() => scrollToSection(locationRef)}>📍 Location</button>
            <button onClick={() => scrollToSection(faqRef)}>❓ FAQ</button>
          </div>
            {/* Principal Message */}
            <div className="section principal-section" ref={principalRef}>
              <h3 className="section-title">👩‍🏫 A Word from Our Principal</h3>
              <div className="flex-item">
                <img 
                  src="https://i.imgur.com/LQS4g3s.png"
                  alt="Principal" 
                  className="icon" 
                  style={{ width: "120px", height: "120px", borderRadius: "50%", marginRight: "15px" }}
                />
                <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
                  "Our B.Tech.Ed IT / BIT program empowers students with cutting-edge technology skills and
                  hands-on experience to innovate in the field of education. Join us to transform your
                  career and impact the future of learning!"
                </p>
              </div>
            </div>

            {/* Why Choose */}
            <div className="section" ref={whyChooseRef}>
              <h3 className="section-title">🎯 Why Choose This Program?</h3>
              <ul className="section-list">
                <li>✅ Dual Degree Advantage: Bachelor of Technical Education in IT + BIT</li>
                <li>✅ Industry-Ready Skills: Bridge the gap between education and technology</li>
                <li>✅ Future-Focused: 75% of educational content will be digital by 2028</li>
                <li>✅ Learn by doing and earning</li>
              </ul>
            </div>

            {/* Career Prospects */}
            <div className="section" ref={careerRef}>
              <h3 className="section-title">💼 Career Prospects</h3>
              <div className="flex-list">
                <div className="flex-item"><img src="https://i.imgur.com/COz3jZf.jpeg" alt="career" className="icon"/> EdTech Specialist/Entrepreneurship</div>
                <div className="flex-item"><img src="https://i.imgur.com/OafAn56.jpeg" alt="career" className="icon"/> AI & Machine Learning Specialist</div>
                <div className="flex-item"><img src="https://i.imgur.com/LCET4qj.png" alt="career" className="icon"/> VR/AR Specialist/Software Dev</div>
                <div className="flex-item"><img src="https://i.imgur.com/bSW4o6h.jpeg" alt="career" className="icon"/> IT Educator/Trainer</div>
              </div>
            </div>

            {/* Eligibility */}
            <div className="section" ref={eligibilityRef}>
              <h3 className="section-title">📋 Eligibility</h3>
              <div className="flex-item">
                <img src="https://i.imgur.com/Hzdhl7i.png" alt="eligibility" className="icon"/>
                Minimum 10+2 or equivalent with CGPA 1.6+ (40% average) in ANY discipline
              </div>
            </div>

            {/* Special Features */}
            <div className="section" ref={featuresRef}>
              <h3 className="section-title">🎁 Special Features</h3>
              <div className="flex-item"><img src="https://i.imgur.com/161ST7j.png" alt="feature" className="icon"/> 💰 Scholarships Available</div>
              <div className="flex-item"><img src="https://i.imgur.com/bSW4o6h.jpeg" alt="feature" className="icon"/> 👨‍🏫 Expert Faculty & Industry Professionals</div>
              <div className="flex-item"><img src="https://i.imgur.com/Hzdhl7i.png" alt="feature" className="icon"/> 🌐 Work-Based Learning & Real Projects</div>
            </div>

            {/* Map */}
            <div className="section" ref={locationRef}>
              <h3 className="section-title">📍 Location</h3>
              <div className="map-container">
                <iframe
                  title="SCTI Sindhuli"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16876.5667365771!2d85.91797484187175!3d27.22350986086391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb8cba009e212f%3A0x99c55cd0cbe147aa!2z4KS44KS_4KSo4KWN4KSn4KWB4KSy4KWAIOCkuOCkruClgeCkpuCkvuCkryDgpKrgpY3gpLDgpL7gpLXgpL_gpKfgpL_gpJUg4KS44KSC4KS44KWN4KSl4KS-4KSo!5e0!3m2!1sen!2snp!4v1755182471877!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* FAQ */}
            <div className="section" ref={faqRef}>
              <h3 className="section-title">❓ FAQs</h3>
              {faqs.map((faq, i) => (
                <div key={i} className="faq-item">
                  <div onClick={() => toggleFaq(i)} className="faq-question">{faq.q} {faqOpen[i] ? "▲" : "▼"}</div>
                  {faqOpen[i] && <div className="faq-answer">{faq.a}</div>}
                </div>
              ))}
            </div>

          </div>

          {/* WhatsApp Inquiry Button */}
          {showInquiry && (
            <a
              href={`https://wa.me/9854041424?text=${encodeURIComponent(
                `Hello, I want to inquire about the B.Tech.Ed IT / BIT program at Sindhuli Community Technical Institute (SCTI). Please provide details about eligibility, admission process, fees, scholarships, and important dates. Thank you!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inquiry-btn"
            >
              Send Inquiry via WhatsApp
            </a>
          )}
        </div>
      </DrawerAppBar>
    </>
  );
};

export default AdmissionPage;
