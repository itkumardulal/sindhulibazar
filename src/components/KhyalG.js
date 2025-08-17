import React from "react";
import DrawerAppBar from "./Navbar";

// Badge component
const Badge = ({ children }) => (

  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      borderRadius: "9999px",
      border: "1px solid #fff",
      padding: "0.25rem 0.75rem",
      fontSize: "0.75rem",
      gap: "0.25rem",
      background: "rgba(255, 255, 255, 0.3)",
      color: "#111",
    }}
  >
    {children}
  </span>
);

const profile = {
  stageName: "KHYAL G",
  tagline: "भावनात्मक नेपाली कविता | ख्यालपूर्ण अभिव्यक्ति | B-feel वाइब",
  summary:
    "KHYAL G एक नेपाली सृजनकर्ता हुन् जसले TikTok मा भावनात्मक कविता, मन छुने कथाहरू र संगीतको माध्यमबाट दर्शकलाई छुन्छन्। उनले प्रेम, आशा, स्मरण, जीवनका अनुभूतिहरू, र सामाजिक अनुभवहरूलाई सरल तर गहिरो शैलीमा प्रस्तुत गर्छन्।",
  moreDetails:
    "उनी विशेष गरी छोटो भिडियोहरूमा संवेदनशील कविता प्रस्तुत गर्छन् जसले मानिसको दैनिक जीवन, सम्बन्ध, परिवार र प्रेमसँग सम्बन्धित भावनाहरू समेट्छ। KHYAL G का भिडियोहरू सरल भाषा र संगीतसँग मिश्रित हुन्छन् जसले सबै उमेरका दर्शकलाई मन छुने अनुभव दिन्छ।",
  profileImage: "https://i.imgur.com/wumkFd2.jpeg",
};

const videos = [
  {
    id: 1,
    title: "Tribute: सानी बहिनीको सम्झनामा",
    tags: ["TikTok", "+1"],
    link: "https://www.tiktok.com/@khyalg69/video/7539533469756542226?is_from_webapp=1&sender_device=pc",
    cover: "https://i.imgur.com/48Jx4tD.png", // Replace with real TikTok thumbnail
  },
  {
    id: 2,
    title: "टुटेको प्रेमको कविता",
    tags: ["TikTok"],
    link: "https://www.tiktok.com/@khyalg69/video/7539022340361932040?is_from_webapp=1&sender_device=pc",
    cover: "https://i.imgur.com/hrF41Js.png",
  },
  {
    id: 3,
    title: "घर–यात्राका भाव",
    tags: ["TikTok", "+2"],
    link: "https://www.tiktok.com/@khyalg69/video/7538774141923593480?is_from_webapp=1&sender_device=pc",
    cover: "https://i.imgur.com/hrF41Js.png",
  },
];

export default function KhyalGLanding() {
  return (
        <DrawerAppBar>
    <div
      style={{
        fontFamily: "sans-serif",
        background: "linear-gradient(135deg, #d4cc9fff, #d3a64bff)",
        color: "#111",
        minHeight: "100vh",
        padding: "1rem",
        overflowX: "hidden",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "4rem 1rem",
          position: "relative",
        }}
      >
        {/* Profile Image */}
        <div
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "5px solid #fff",
            marginBottom: "1.5rem",
            animation: "float 3s ease-in-out infinite",
          }}
        >
          <img
            src={profile.profileImage}
            alt="KHYAL G"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            background: "linear-gradient(90deg, #fff176, #ffc107)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "glow 2s ease-in-out infinite alternate",
          }}
        >
          {profile.stageName}
        </h1>

        <p style={{ fontStyle: "italic", fontSize: "1.2rem", marginBottom: "1.5rem" }}>
          {profile.tagline}
        </p>

        <p style={{ maxWidth: "700px", lineHeight: "1.6", marginBottom: "2rem" }}>
          {profile.summary}
        </p>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Badge>TikTok</Badge>
          <Badge>Poetry</Badge>
          <Badge>Motivation</Badge>
          <Badge>Emotional</Badge>
        </div>

        <button
          style={{
            marginTop: "2rem",
            background: "#111",
            color: "#ffeb3b",
            padding: "0.75rem 2rem",
            border: "none",
            borderRadius: "9999px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Send Inquiry
        </button>

        {/* Animation CSS */}
        <style>
          {`
            @keyframes glow {
              0% { text-shadow: 0 0 5px #fff176, 0 0 10px #ffc107; }
              100% { text-shadow: 0 0 20px #fff176, 0 0 30px #ffc107; }
            }
            @keyframes float {
              0% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0); }
            }
          `}
        </style>
      </section>

      {/* More About Section */}
      <section
        style={{
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(5px)",
          borderRadius: "1rem",
          padding: "2rem 1rem",
          maxWidth: "800px",
          margin: "2rem auto",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          About {profile.stageName}
        </h2>
        <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}>{profile.moreDetails}</p>
        <p style={{ lineHeight: "1.6" }}>
          KHYAL G का छोटो भिडियोहरू, कविता, र संगीतले दर्शकलाई भावनात्मक यात्रा दिन्छ। उनले प्रेम, स्मरण, जीवनका उतार-चढाव, र सामाजिक सन्देशलाई सरल तर प्रभावकारी तरिकाले प्रस्तुत गर्छन्।
        </p>
      </section>

      {/* Video Gallery */}
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem",
          padding: "2rem 1rem",
        }}
      >
        {videos.map((v) => (
          <a
            key={v.id}
            href={v.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "relative",
              width: "140px",
              height: "200px",
              borderRadius: "1rem",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              cursor: "pointer",
              textDecoration: "none",
              color: "#111",
              transition: "transform 0.3s",
              backgroundImage: `url(${v.cover})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {/* Tags */}
            <div
              style={{
                position: "absolute",
                top: "0.25rem",
                left: "0.25rem",
                display: "flex",
                gap: "0.25rem",
                fontSize: "0.6rem",
              }}
            >
              {v.tags.map((t, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: "#fff",
                    padding: "0 0.25rem",
                    borderRadius: "0.25rem",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Play Button */}
            <div
              style={{
                position: "absolute",
                fontSize: "1.5rem",
                color: "#fff",
                textShadow: "0 0 5px rgba(0,0,0,0.7)",
              }}
            >
              ▶️
            </div>
          </a>
        ))}
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "2rem 1rem",
          borderTop: "1px solid rgba(0,0,0,0.1)",
          marginTop: "2rem",
        }}
      >
        © {new Date().getFullYear()} KHYAL G — All rights reserved.
      </footer>
    </div>
    </DrawerAppBar>
  );
}
