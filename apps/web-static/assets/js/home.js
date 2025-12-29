const headlines = [
  "The watch continues.",
  "Lanterns hold the northern line.",
  "Quiet signals travel far."
];

const tickerValues = [
  "14,021 watchers active",
  "14,038 watchers active",
  "14,052 watchers active",
  "14,066 watchers active"
];

const headlineEl = document.getElementById("headline");
const populationEl = document.getElementById("population");

if (headlineEl) {
  const index = Math.floor(Math.random() * headlines.length);
  headlineEl.textContent = headlines[index];
}

let tickerIndex = 0;
const updateTicker = () => {
  if (!populationEl) return;
  populationEl.textContent = tickerValues[tickerIndex % tickerValues.length];
  tickerIndex += 1;
};

updateTicker();
setInterval(updateTicker, 4000);
