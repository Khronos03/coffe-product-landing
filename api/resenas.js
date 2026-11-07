// GET /api/resenas — reseñas aprobadas para la portada. Se cachean en el CDN de Vercel
// para no despertar el panel en cada visita; si el panel no responde, la sección no se muestra.
const { fetchPublic } = require("./_lib/reviews");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end();
  }
  try {
    const data = await fetchPublic();
    res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=86400");
    return res.status(200).json(data);
  } catch (err) {
    console.error("resenas:", err.message);
    res.setHeader("Cache-Control", "public, s-maxage=60");
    return res.status(200).json({ count: 0, average: 0, reviews: [] });
  }
};
