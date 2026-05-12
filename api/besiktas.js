const API = "https://www.thesportsdb.com/api/v1/json/3";
const BESIKTAS_ID = "133794";

const fallback = {
  next: [
    { strEvent: "Beşiktaş - Rakip", dateEvent: "Yakında", strTime: "20:00:00", strVenue: "Tüpraş Stadyumu" }
  ],
  last: [
    { strEvent: "Beşiktaş - Rakip", intHomeScore: "-", intAwayScore: "-", dateEvent: "Son maç" }
  ]
};

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("API error " + response.status);
  return response.json();
}

function onlyBesiktasEvents(events) {
  if (!Array.isArray(events)) return [];
  return events.filter((e) => {
    const title = String(e.strEvent || "").toLowerCase();
    return title.includes("besiktas") || title.includes("beşiktaş");
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");

  try {
    const [nextRes, lastRes] = await Promise.allSettled([
      getJson(`${API}/eventsnext.php?id=${BESIKTAS_ID}`),
      getJson(`${API}/eventslast.php?id=${BESIKTAS_ID}`)
    ]);

    const nextRaw =
      nextRes.status === "fulfilled" && Array.isArray(nextRes.value.events)
        ? nextRes.value.events
        : fallback.next;

    const lastRaw =
      lastRes.status === "fulfilled" && Array.isArray(lastRes.value.results)
        ? lastRes.value.results
        : fallback.last;

    const next = onlyBesiktasEvents(nextRaw);
    const last = onlyBesiktasEvents(lastRaw);

    res.status(200).json({
      source: "Backend",
      next: next.length ? next : fallback.next,
      last: last.length ? last : fallback.last,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(200).json({
      source: "Fallback",
      ...fallback,
      error: error.message,
      updatedAt: new Date().toISOString()
    });
  }
};
