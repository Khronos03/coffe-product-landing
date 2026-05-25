import { motion } from "framer-motion";
import Footer from "../components/Footer";

const About = () => {
  return (
    <section 
      id="section3" 
      className="relative w-full min-h-screen flex flex-col py-20 px-4 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Fondos Decorativos Locales Premium */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradiente base sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-warm/10 via-transparent to-transparent opacity-40"></div>
        
        {/* Orbes flotantes locales */}
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-gradient-to-br from-primary/25 to-transparent rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Luz ambiental adicional */}
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-warm/15 to-transparent rounded-full blur-3xl opacity-15"></div>
      </div>

      {/* Contenedor Principal */}
      <div className="relative z-10 flex-1 max-w-6xl mx-auto w-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          
          {/* Contenido - Izquierda */}
          <div className="animate-fade-in-left">
            {/* Título */}
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-4 border border-primary/20">
                Nuestra Historia
              </span>
              <h2 
                id="about-heading"
                className="text-5xl md:text-6xl font-black text-gradient leading-tight mb-4"
              >
                Café con Compromiso
              </h2>
              <p className="text-lg text-textLight">
                Una familia dedicada a la excelencia
              </p>
            </div>

            {/* Descripción Principal */}
            <div className="space-y-6 mb-8">
              <p className="text-lg text-textLight leading-relaxed">
                Somos una <strong className="text-primary">familia de caficultores</strong> comprometida con la producción de café de especialidad de alta calidad. Cada grano que cultivamos representa nuestro amor por el café y respeto por la tierra.
              </p>
              <p className="text-lg text-textLight leading-relaxed">
                Nuestras prácticas son <strong className="text-accent">100% sostenibles</strong>. Preservamos el medio ambiente, apoyamos a nuestras comunidades locales y entregamos un café que es tan responsable como delicioso.
              </p>
            </div>

            {/* Valores */}
            <div className="space-y-4 mb-8">
              {[
                { icon: '🌱', title: 'Sostenibilidad', desc: 'Prácticas que respetan la tierra' },
                { icon: '☕', title: 'Especialidad', desc: 'Café grado AA premium' },
                { icon: '👥', title: 'Comunidad', desc: 'Apoyo a productores locales' },
                { icon: '✨', title: 'Calidad', desc: 'Excelencia en cada taza' },
              ].map((valor, idx) => (
                <div 
                  key={idx}
                  className="flex gap-4 p-4 rounded-xl bg-light/40 backdrop-blur-sm border border-primary/10 hover-lift transition-all duration-300"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <span className="text-3xl">{valor.icon}</span>
                  <div>
                    <h3 className="font-bold text-primary">{valor.title}</h3>
                    <p className="text-sm text-textLight">{valor.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://wa.me/573216363596/?text=¡Hola! Me gustaría conocer más sobre la historia y prácticas sostenibles de Cumbre Café"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 gradient-primary text-light font-bold text-lg rounded-xl shadow-premium hover-lift focus-ring transition-all duration-300"
            >
              <span>📬</span>
              Conectemos
            </a>
          </div>

          {/* Imagen/Gráfico - Derecha */}
          <div className="animate-fade-in-right relative hidden lg:block">
            <div className="relative">
              {/* Glow Background */}
              <div className="absolute -inset-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl opacity-30"></div>
              
              {/* Card Principal */}
              <div className="relative bg-gradient-to-br from-light/80 to-surface/80 backdrop-blur-sm rounded-3xl border-2 border-primary/20 p-8 shadow-premium-lg hover-glow transition-all duration-300">
                
                {/* Estadísticas */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 rounded-xl bg-gradient-primary/10 border border-primary/20">
                    <p className="text-4xl font-black text-primary">1.950</p>
                    <p className="text-sm text-textLight font-semibold mt-2">Metros sobre el nivel del mar</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <p className="text-4xl font-black text-accent">100%</p>
                    <p className="text-sm text-textLight font-semibold mt-2">Café de Especialidad</p>
                  </div>
                </div>

                {/* Ubicación */}
                <div className="mb-6 p-4 rounded-xl bg-warm/15 border border-warm/30">
                  <p className="text-sm font-bold text-primary mb-2">📍 Ubicación</p>
                  <p className="text-base font-bold text-dark mb-1">Mistrató, Risaralda</p>
                  <p className="text-sm text-textLight">Colombia</p>
                </div>

                {/* Procesos */}
                <div className="p-4 rounded-xl bg-surface border border-primary/10">
                  <p className="text-sm font-bold text-primary mb-3">☕ Procesos de Fermentación</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm text-textLight">Proceso Lavado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-sm text-textLight">Proceso Honey</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full mt-20">
        <Footer />
      </div>
    </section>
  );
};

export default About;
