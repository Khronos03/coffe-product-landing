// Estrellas de la reseña, grabadas como el resto del billete: llenas en tinta, vacías en contorno.

const PATH = "M12 2.6l2.82 6.03 6.6.78-4.88 4.52 1.3 6.53L12 17.2l-5.84 3.26 1.3-6.53L2.58 9.4l6.6-.78z";

export function Star({ filled, size = 18 }) {
  return (
    <svg className={`star ${filled ? "is-filled" : ""}`} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={PATH} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

/** Solo lectura: "4 de 5 estrellas" para lectores de pantalla. */
export function StarRow({ value, size }) {
  return (
    <span className="star-row" role="img" aria-label={`${value} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= value} size={size} />
      ))}
    </span>
  );
}
