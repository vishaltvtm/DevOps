import "./globals.css";

export const metadata = {
  title: "test App",
  description: "test app with kubernetes",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </>
  );
}
