// Transportadoras con las que despacha Cumbre Café. Ninguna permite abrir una guía directamente
// por URL pública, así que se enlaza su página oficial de rastreo y se ofrece copiar la guía.
// Revisar estas URL si la transportadora cambia su sitio.
export const CARRIERS = {
  // Nov 2026: Interrapidísimo rediseñó su sitio; /sigue-tu-envio/ da 404 y el rastreo es el buscador de la página principal
  interrapidisimo: { name: "Interrapidísimo", url: "https://www.interrapidisimo.com/" },
  servientrega: { name: "Servientrega", url: "https://www.servientrega.com/wps/portal/rastreo-envio" },
  otra: { name: "Transportadora", url: null },
};
