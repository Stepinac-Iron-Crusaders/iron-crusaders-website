import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Resend } from "resend";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.TO_EMAIL || "engineeringclub@stepinac.org";
const FROM_EMAIL = process.env.FROM_EMAIL || "Iron Crusaders <onboarding@resend.dev>";

if (!RESEND_API_KEY) {
  console.warn("[warn] RESEND_API_KEY not set — /api/send will return 500 until you set it in server/.env");
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

app.get("/health", (_req, res) => res.json({ ok: true }));

app.post("/api/send", async (req, res) => {
  const { name, email, subject, message, tier } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields: name, email, message" });
  }
  if (!resend) {
    return res.status(500).json({ error: "Server not configured: RESEND_API_KEY missing" });
  }

  const finalSubject = tier
    ? `Sponsorship Interest — ${tier} Tier`
    : subject?.trim() || "Iron Crusaders — General Inquiry";

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const tierLine = tier ? `<p><strong>Tier:</strong> ${escapeHtml(tier)}</p>` : "";
  const html = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #111">
      <h2 style="margin:0 0 8px">New message via Iron Crusaders site</h2>
      <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      <p><strong>Subject:</strong> ${escapeHtml(finalSubject)}</p>
      ${tierLine}
      <hr style="margin:16px 0; border:none; border-top:1px solid #e5e5e5" />
      <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
      <hr style="margin:16px 0; border:none; border-top:1px solid #e5e5e5" />
      <p style="font-size:12px; color:#666">Reply-To: ${escapeHtml(email)} • Sent via Resend</p>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: finalSubject,
      html,
      replyTo: email,
    });
    if (error) {
      console.error("Resend error", error);
      return res.status(500).json({ error: error.message || "Resend error" });
    }
    return res.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Failed to send" });
  }
});

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

app.listen(PORT, () => {
  console.log(`[api] listening on http://localhost:${PORT}`);
  console.log(`[api] TO=${TO_EMAIL} FROM=${FROM_EMAIL} RESEND_KEY=${RESEND_API_KEY ? "set" : "MISSING"}`);
});
