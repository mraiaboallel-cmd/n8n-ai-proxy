export const metadata = {
  title: "n8n AI Proxy",
  description: "Secure proxy for n8n automation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body>{children}</body>
    </html>
  );
}