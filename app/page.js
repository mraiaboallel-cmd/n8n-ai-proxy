"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("Aamer");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setResult(null);

    if (!message.trim()) {
      setError("اكتب رسالتك أولًا.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim() || "Aamer",
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "فشل إرسال الطلب.");
      }

      setResult(data);
    } catch (requestError) {
      setError(requestError.message || "حدث خطأ غير متوقع.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section
        style={{
          maxWidth: 700,
          margin: "0 auto",
          background: "#ffffff",
          padding: 30,
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
        }}
      >
        <h1 style={{ marginTop: 0 }}>n8n AI Agent</h1>

        <p style={{ color: "#555", lineHeight: 1.7 }}>
          اكتب رسالتك وسيتم توجيهها إلى الوكيل المناسب داخل n8n.
        </p>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="name"
            style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}
          >
            الاسم
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 20,
              border: "1px solid #ccc",
              borderRadius: 8,
              fontSize: 16,
              boxSizing: "border-box",
            }}
          />

          <label
            htmlFor="message"
            style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}
          >
            الرسالة
          </label>

          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="اكتب سؤالك هنا..."
            rows={6}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 20,
              border: "1px solid #ccc",
              borderRadius: 8,
              fontSize: 16,
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 14,
              border: "none",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "جارٍ الإرسال..." : "إرسال الرسالة"}
          </button>
        </form>

        {error && (
          <div
            style={{
              marginTop: 20,
              padding: 15,
              border: "1px solid #d33",
              borderRadius: 8,
            }}
          >
            <strong>خطأ:</strong> {error}
          </div>
        )}

        {result && (
          <div
            style={{
              marginTop: 20,
              padding: 20,
              background: "#f7f7f7",
              borderRadius: 8,
              lineHeight: 1.8,
            }}
          >
            <p>
              <strong>الوكيل:</strong> {result.agent}
            </p>

            <p>
              <strong>الرد:</strong> {result.reply}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}