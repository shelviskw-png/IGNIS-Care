const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔍 Analisis stres lebih luas
function analyzeStress(text) {
  let score = 0;
  const t = text.toLowerCase();

  if (t.includes("capek") || t.includes("lelah")) score += 2;
  if (t.includes("stress") || t.includes("tertekan")) score += 3;
  if (t.includes("tugas") || t.includes("deadline")) score += 2;
  if (t.includes("takut") || t.includes("cemas")) score += 2;
  if (t.includes("sendiri") || t.includes("kesepian")) score += 2;
  if (t.includes("gagal") || t.includes("tidak mampu")) score += 3;

  if (score >= 6) return { level: "Tinggi", score };
  if (score >= 3) return { level: "Sedang", score };
  return { level: "Rendah", score };
}

// 🎲 random helper
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 🤖 Respon pintar
function generateResponse(message) {
  const stress = analyzeStress(message);
  const t = message.toLowerCase();

  const empathyHigh = [
    "Aku bisa merasakan betapa beratnya yang kamu alami sekarang.",
    "Sepertinya kamu lagi berada di titik yang sangat melelahkan.",
    "Kedengarannya kamu benar-benar sedang kewalahan."
  ];

  const empathyMedium = [
    "Sepertinya hari kamu cukup berat ya.",
    "Aku paham kamu lagi capek.",
    "Kedengarannya kamu lagi banyak pikiran."
  ];

  const empathyLow = [
    "Terima kasih sudah berbagi.",
    "Aku di sini untuk mendengarkan kamu.",
    "Senang kamu mau cerita."
  ];

  const advice = [
    "Coba tarik napas perlahan selama beberapa detik.",
    "Tidak apa-apa untuk istirahat sebentar.",
    "Coba bagi tugas kamu jadi bagian kecil supaya lebih ringan.",
    "Jangan terlalu keras pada diri sendiri ya.",
    "Kamu tidak harus menyelesaikan semuanya sekaligus."
  ];

  const followUp = [
    "Mau cerita lebih detail?",
    "Apa yang paling bikin kamu kepikiran sekarang?",
    "Sejak kapan kamu merasa seperti ini?",
    "Apa ada sesuatu yang bisa sedikit membantu kamu sekarang?"
  ];

  // 🔍 tambahan konteks
  let contextResponse = "";

  if (t.includes("tugas")) {
    contextResponse = "Kelihatannya tugas sekolah cukup menekan ya.";
  } else if (t.includes("teman")) {
    contextResponse = "Masalah dengan teman memang bisa terasa berat.";
  } else if (t.includes("keluarga")) {
    contextResponse = "Hal tentang keluarga seringkali cukup sensitif ya.";
  }

  let reply = "";

  if (stress.level === "Tinggi") {
    reply =
      random(empathyHigh) +
      " " +
      contextResponse +
      " Kamu sudah berjuang sejauh ini, itu tidak mudah. " +
      random(advice) +
      " " +
      random(followUp);
  } else if (stress.level === "Sedang") {
    reply =
      random(empathyMedium) +
      " " +
      contextResponse +
      " " +
      random(advice) +
      " " +
      random(followUp);
  } else {
    reply =
      random(empathyLow) +
      " " +
      random(followUp);
  }

  return {
    reply,
    level: stress.level,
    score: stress.score
  };
}

// 📩 endpoint chat
app.post("/chat", (req, res) => {
  const { message } = req.body;
  const result = generateResponse(message);
  res.json(result);
});

// 🚀 start server
app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});