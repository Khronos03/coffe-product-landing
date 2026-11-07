// /resena/<clave> — el cliente califica su pedido. La clave es la del link de seguimiento,
// así que solo quien compró puede dejar reseña, una por pedido. Llega pendiente: se publica
// en la tienda solo si la aprobamos y el cliente lo autorizó aquí.

import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import { FiAlertCircle } from "react-icons/fi";
import "@fontsource-variable/archivo/wdth";
import "@fontsource-variable/big-shoulders-display";
import "../styles/billete.css";
import "../styles/notfound.css";
import { whatsappUrl } from "../data/catalog";
import { SiteFooter, SiteHeader } from "../components/billete/Chrome";
import { Perforation, WaveField } from "../components/billete/Security";
import { Star } from "../components/billete/Stars";
import { useDocumentMeta } from "../seo";
import { track } from "../analytics";

const MIN = 10;
const MAX = 600;
const WORDS = ["", "No me gustó", "Regular", "Bueno", "Muy bueno", "Excelente"];

export default function Review() {
  useDocumentMeta({ title: "Tu reseña | Cumbre Café", description: "Cuéntanos qué tal estuvo tu café.", noindex: true });
  const { token = "" } = useParams();
  const [state, setState] = useState({ loading: true, form: null, error: null });
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [allow, setAllow] = useState(true);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const load = useCallback(async (attempt = 0) => {
    try {
      const res = await fetch(`/api/resena?t=${encodeURIComponent(token)}`);
      const body = await res.json().catch(() => ({}));
      if (res.status === 504 && attempt < 2) {
        setTimeout(() => load(attempt + 1), 3000);
        return;
      }
      if (!res.ok) throw Object.assign(new Error(body.error || "No pudimos abrir el formulario."), { status: res.status });
      setState({ loading: false, form: body, error: null });
    } catch (err) {
      setState({ loading: false, form: null, error: err });
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async (e) => {
    e.preventDefault();
    const text = comment.trim();
    const next = {};
    if (!rating) next.rating = "Elige de 1 a 5 estrellas.";
    if (text.length < MIN) next.comment = `Cuéntanos un poco más (mínimo ${MIN} caracteres).`;
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(next.rating ? "rv-star-1" : "rv-comment")?.focus();
      return;
    }
    setSending(true);
    try {
      const send = () =>
        fetch(`/api/resena?t=${encodeURIComponent(token)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating, comment: text, allowPublish: allow }),
        });
      let res = await send();
      if (res.status === 504) res = await send();
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "No pudimos guardar tu reseña. Intenta de nuevo.");
      track("review_submit", { rating, publicar: allow ? "si" : "no" });
      setDone(true);
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setSending(false);
    }
  };

  const f = state.form;
  const notFound = state.error && state.error.status === 404;
  const canWrite = f && !f.notYet && !f.alreadyReviewed && !done;
  const wa = whatsappUrl(["¡Hola, Cumbre Café! Quiero contarles qué tal mi café.", f ? `Pedido: ${f.code}` : ""].filter(Boolean));
  const signature = f ? [f.displayName, f.city].filter(Boolean).join(", ") : "";

  let title = "Abriendo tu reseña…";
  let line = null;
  if (!state.loading) {
    if (!f) {
      title = notFound ? "No encontramos este pedido" : "No pudimos abrir el formulario";
      line = notFound ? "Puede que el link esté incompleto. Escríbenos por WhatsApp y te ayudamos." : state.error?.message;
    } else if (done) {
      title = `¡Gracias${f.firstName ? `, ${f.firstName}` : ""}!`;
      line = allow
        ? "Recibimos tu reseña. La leemos toda y, cuando la aprobemos, aparecerá en la tienda con tu nombre."
        : "Recibimos tu reseña. Queda solo para nosotros: no la publicaremos.";
    } else if (f.alreadyReviewed) {
      title = "Ya nos dejaste tu reseña";
      line = "Gracias por tomarte el tiempo. Si quieres contarnos algo más, escríbenos por WhatsApp.";
    } else if (f.notYet) {
      title = "Tu pedido aún no sale";
      line = "Podrás calificarlo cuando lo tengas en casa. Te avisamos por WhatsApp.";
    } else {
      title = "¿Qué tal estuvo tu café?";
      line = `${f.firstName ? `Hola, ${f.firstName}. ` : ""}Tu opinión nos ayuda a tostar mejor y le ayuda a otros a elegir.`;
    }
  }

  return (
    <div className="bt nf is-status is-review" data-ink="violet">
      <SiteHeader onHome={false} skipTo="#resena" skipLabel="Saltar a la reseña" />
      <main className="nf-field">
        <WaveField className="field-waves" />
        <article className="nf-ticket" id="resena" aria-labelledby="rv-title" aria-busy={state.loading}>
          <div className="nf-body">
            <div className="billete-issuer">
              <span>Cumbre Café</span>
              <span className="billete-issuer-mid">Reseña de compra</span>
              <span>{f ? f.code : "—"}</span>
            </div>
            <div className="nf-main">
              <h1 className="nf-title" id="rv-title">{title}</h1>
              {line && <p className="nf-line" role="status">{line}</p>}

              {canWrite && (
                <form id="review-form" className="rv-form" onSubmit={submit} noValidate>
                  {f.products.length > 0 && (
                    <p className="rv-products">
                      <span className="rv-kicker">Tu pedido</span> {f.products.join(" · ")}
                    </p>
                  )}

                  <fieldset className={`rv-stars ${errors.rating ? "has-error" : ""}`} aria-describedby={errors.rating ? "rv-rating-err" : undefined}>
                    <legend className="rv-kicker">Tu calificación</legend>
                    <div className="rv-star-set">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <label key={n} className={`rv-star ${n <= rating ? "is-on" : ""}`}>
                          <input
                            id={`rv-star-${n}`}
                            type="radio"
                            name="rating"
                            value={n}
                            checked={rating === n}
                            onChange={() => {
                              setRating(n);
                              setErrors((er) => ({ ...er, rating: undefined }));
                            }}
                          />
                          <Star filled={n <= rating} size={34} />
                          <span className="sr-only">{n} {n === 1 ? "estrella" : "estrellas"}: {WORDS[n]}</span>
                        </label>
                      ))}
                      <span className="rv-star-word" aria-hidden="true">{WORDS[rating]}</span>
                    </div>
                    {errors.rating && (
                      <p className="field-error" id="rv-rating-err">
                        <FiAlertCircle className="field-error-icon" aria-hidden="true" /> {errors.rating}
                      </p>
                    )}
                  </fieldset>

                  <div className={`cart-field rv-field ${errors.comment ? "has-error" : ""}`}>
                    <label htmlFor="rv-comment">Cuéntanos de tu café</label>
                    <textarea
                      id="rv-comment"
                      rows={5}
                      maxLength={MAX}
                      value={comment}
                      placeholder="¿Cómo lo preparaste? ¿Qué notas sentiste? ¿Llegó bien?"
                      aria-invalid={Boolean(errors.comment)}
                      aria-describedby={`rv-count${errors.comment ? " rv-comment-err" : ""}`}
                      onChange={(e) => {
                        setComment(e.target.value);
                        if (errors.comment && e.target.value.trim().length >= MIN) setErrors((er) => ({ ...er, comment: undefined }));
                      }}
                    />
                    <span className="rv-count" id="rv-count">{comment.length}/{MAX}</span>
                    {errors.comment && (
                      <p className="field-error" id="rv-comment-err">
                        <FiAlertCircle className="field-error-icon" aria-hidden="true" /> {errors.comment}
                      </p>
                    )}
                  </div>

                  <label className="rv-allow">
                    <input type="checkbox" checked={allow} onChange={(e) => setAllow(e.target.checked)} />
                    <span>
                      Pueden publicarla en la tienda firmada como <strong>{signature || "cliente de Cumbre"}</strong>.
                      <small>Sin apellido completo, celular ni dirección.</small>
                    </span>
                  </label>

                  {errors.general && (
                    <p className="field-error" role="alert">
                      <FiAlertCircle className="field-error-icon" aria-hidden="true" /> {errors.general}
                    </p>
                  )}
                </form>
              )}
            </div>
            {done && (
              <p className="stamp nf-void is-paid" aria-hidden="true">Recibida</p>
            )}
          </div>

          <Perforation vertical className="billete-perf" />

          <nav className="nf-stub" aria-label="Siguientes pasos">
            <h2 className="nf-stub-title">{canWrite ? "Tu reseña" : "¿Algo más?"}</h2>
            {canWrite ? (
              <>
                <button type="submit" form="review-form" className="tear-button" disabled={sending}>
                  {sending ? "Enviando…" : "Enviar reseña"}
                </button>
                <p className="rv-stub-note">La revisamos antes de publicarla.</p>
              </>
            ) : (
              <Link className="tear-button" to="/">Volver a la tienda</Link>
            )}
            <a className="nf-secondary" href={wa} target="_blank" rel="noopener noreferrer" data-source="resena">
              <IoLogoWhatsapp aria-hidden="true" /> Escríbenos por WhatsApp
            </a>
          </nav>
        </article>
      </main>
      <SiteFooter onHome={false} />
    </div>
  );
}
