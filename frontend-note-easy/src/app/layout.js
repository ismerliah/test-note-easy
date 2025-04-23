import { ConfigProvider } from "antd";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: inter.style.fontFamily,
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
