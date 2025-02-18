import React from "react";
import VideoColibri from "../videoFondoBanner.mp4";
import VideoRecolectando from "../Recolectando.mp4";
import Ambiente from "../Ambiente.mov";
import Cafetales from "../Cafetales.mov";
import Perrito from "../Perrito.mov";
import TomaHorizontal from "../TomaHorizontal.MOV";
import TomaHorizontalII from '../TomaHorizontalII.MOV';

const mediaItems = [
  { type: "video", src: Ambiente },
  { type: "video", src: VideoColibri },
  { type: "video", src: Perrito },
  { type: "video", src: VideoRecolectando },
  { type: "video", src: TomaHorizontal },
  { type: "video", src: Cafetales },
  { type: "video", src: TomaHorizontalII },
];

const AboutUs = () => {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
      />
      <div className="relative z-10 bg-primary p-6">
        <div className="columns-2 md:columns-3 gap-4 space-y-2 p-2">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="w-full rounded-lg shadow-lg overflow-hidden"
            >
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={item.src} type="video/mp4" />
                Tu navegador no soporta el tag de video.
              </video>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;