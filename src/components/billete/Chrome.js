// Encabezado, cierre y barra de pedido móvil de la home.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FiMail, FiArrowUp } from "react-icons/fi";
import logo from "../../assets/logo-cumbre.webp";
import { WHATSAPP_NUMBER, formatCOP, whatsappUrl } from "../../data/catalog";
import { Microtext } from "./Security";

const NAV = [
  { href: "#serie", label: "Serie" },
  { href: "#proceso", label: "Proceso" },
  { href: "#finca", label: "Finca" },
  { href: "#especial", label: "Regalos" },
];

/**
 * En la home los enlaces son anclas; en otras rutas (recetario) apuntan a la
 * home con su ancla. `current` marca la sección activa del menú.
 */
export function SiteHeader({ onHome = true, current = null, skipTo = "#serie-pedido", skipLabel = "Saltar al pedido" }) {
  const [open, setOpen] = useState(false);
  const prefix = onHome ? "" : "/";

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <a className="skip-link" href={skipTo}>
        {skipLabel}
      </a>
      <div className="site-header-inner">
        <a className="site-logo" href={onHome ? "#serie" : "/"} aria-label="Cumbre Café, inicio">
          <img src={logo} alt="" width="411" height="184" />
        </a>

        <nav className="site-nav" aria-label="Principal">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={prefix + n.href}>{n.label}</a>
              </li>
            ))}
            <li>
              <Link to="/recetas-cafe" aria-current={current === "recetas" ? "page" : undefined}>
                Recetas
              </Link>
            </li>
          </ul>
        </nav>

        <a className="header-order" href={prefix + "#serie-pedido"}>
          Pedir
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
        </button>
      </div>

      <nav id="mobile-nav" className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Principal móvil" hidden={!open}>
        <ul>
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={prefix + n.href} onClick={() => setOpen(false)}>
                {n.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/recetas-cafe"
              aria-current={current === "recetas" ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              Recetas
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

/** Barra fija en móvil cuando el desprendible del billete sale de la pantalla. */
export function MobileOrderBar({ serie, order }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById("serie-pedido");
    if (!target || !("IntersectionObserver" in window)) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  if (!order) return null;
  return (
    <div className={`order-bar ${show ? "is-visible" : ""}`} data-ink={serie.ink} aria-hidden={!show}>
      <span className="order-bar-text">
        <span className="order-bar-serial">{serie.name}</span> · {order.size.label} · {formatCOP(order.size.price)}
        <span className="order-bar-grind">{order.grindLabel}</span>
      </span>
      <a
        className="order-bar-button"
        href={order.href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
        onClick={order.markOpened}
      >
        <IoLogoWhatsapp aria-hidden="true" /> Pedir
      </a>
    </div>
  );
}

export function RecetarioBand({ count }) {
  return (
    <section className="recetario" aria-labelledby="recetario-title">
      <div className="recetario-inner">
        <h2 id="recetario-title" className="recetario-title">
          Recetario
        </h2>
        <p className="recetario-copy">
          {count} recetas para preparar tu café en casa: de un colado tradicional a un espresso tonic.
        </p>
        <Link className="recetario-link" to="/recetas-cafe">
          Abrir el recetario
        </Link>
      </div>
    </section>
  );
}

export function SiteFooter({ onHome = true }) {
  const generic = whatsappUrl([
    "¡Hola, Cumbre Café! Quiero hacer un pedido. ¿Me ayudan a elegir proceso y presentación?",
  ]);
  return (
    <footer className="site-footer" id="contacto">
      <div className="site-footer-inner">
        <div className="footer-cta">
          <h2 className="footer-title">¿No sabes cuál elegir?</h2>
          <p>Cuéntanos cómo preparas tu café y te recomendamos el lote y la molienda.</p>
          <a className="tear-button" href={generic} target="_blank" rel="noopener noreferrer">
            <IoLogoWhatsapp aria-hidden="true" className="tear-button-icon" />
            <span>Escribir por WhatsApp</span>
          </a>
        </div>

        <dl className="footer-fine">
          <div>
            <dt>WhatsApp</dt>
            <dd>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                +57 321 636 3596
              </a>
            </dd>
          </div>
          <div>
            <dt>Correo</dt>
            <dd>
              <a href="mailto:cafesaboracampo@gmail.com">
                <FiMail aria-hidden="true" /> cafesaboracampo@gmail.com
              </a>
            </dd>
          </div>
          <div>
            <dt>Origen</dt>
            <dd>Mistrató, Risaralda, Colombia</dd>
          </div>
          <div>
            <dt>Redes</dt>
            <dd className="socials">
              <a href="https://www.instagram.com/cumbre.cafe" target="_blank" rel="noopener noreferrer">
                <FaInstagram aria-hidden="true" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/share/EbvUVP2UEw1mPXbG/?mibextid=qi2Omg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF aria-hidden="true" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://www.tiktok.com/@cumbre.caf?_t=8ovh16QRai6&_r=1" target="_blank" rel="noopener noreferrer">
                <FaTiktok aria-hidden="true" />
                <span className="sr-only">TikTok</span>
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <Microtext className="footer-micro" text="CUMBRE CAFÉ CAFÉ DE ESPECIALIDAD MISTRATÓ RISARALDA COLOMBIA" />
      <div className="footer-legal">
        <p>
          Cumbre Café · Café de especialidad de productor · Pedidos por WhatsApp · Envíos a toda Colombia ·{" "}
          {new Date().getFullYear()}
        </p>
        <a href={onHome ? "#serie" : "#top"} className="to-top">
          <FiArrowUp aria-hidden="true" /> Volver arriba
        </a>
      </div>
    </footer>
  );
}
