import React from 'react';

const BackgroundVideo = () => {
  // Replace 'videoID' with your YouTube video ID
  const videoID = 'bt4WzNJjHWI';

  const divStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh', // Full viewport height
    overflow: 'hidden',
  };

  const iframeStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  };

  return (
    <div style={divStyle}>
      <iframe
        title="background-video"
        src={`https://www.youtube.com/embed/${videoID}?autoplay=1&loop=1&playlist=${videoID}&controls=0&mute=1&showinfo=0&modestbranding=1&iv_load_policy=3`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        style={iframeStyle}
      ></iframe>
      {/* Your content goes here */}
    </div>
  );
};

export default BackgroundVideo;
