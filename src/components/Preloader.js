
const Preloader = ({ isLoading, progress }) => {
  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary"
      style={{ transition: 'opacity 0.5s ease-out' }}
    >
      <div className="text-center">
        <img 
          src="LogoCumbreCafe.webp" 
          alt="Cumbre Café Logo" 
          className="w-24 h-24 md:w-32 md:h-32 mb-6 animate-pulse mx-auto"
        />
        <h2 className="text-accent text-2xl md:text-3xl font-bold mb-4">
          Cumbre Café
        </h2>
        <div className="w-64 md:w-80 h-2 bg-secondary/30 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-accent transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-accent/80 text-sm">
          Cargando experiencia... {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};

export default Preloader;
