import VideoAbout from "../videoCumbrecafeAbout.mp4";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 flex-1 flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="bg-accent/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8">
            <h2 id="about-heading" className="text-2xl md:text-3xl font-extrabold text-primary mb-4">
              Compromiso con la calidad y el medio ambiente
            </h2>
            <div className="space-y-3 text-textdark text-base md:text-lg leading-relaxed">
              <p>
                Somos una familia de caficultores comprometida con la producción de café de especialidad de alta calidad.
                Cultivamos bajo prácticas sostenibles que <strong>respetan el medio ambiente</strong>, y preservan la esencia de nuestro origen.
              </p>
              <p>
                Cada compra de nuestro café apoya este trabajo responsable!
              </p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border-4 border-accent/70 shadow-xl h-56 md:h-72 lg:h-96 bg-black/20">
            <video
              src={VideoAbout}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="relative z-10 mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
};

export default About;
