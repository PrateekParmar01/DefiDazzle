import "../styles/globals.css"
import Nav from "@/components/Nav";

export const metadata = {
  title: "Portfolio Tracker",
  description: "Track your transactions",
};

export default function RootLayout({ children }) {
  // console.log("Hello")
  return (
    <html lang="en">
      <body>
      <div className="main">
        <div className="background"></div>
      </div>
        <div className="w-full h-full relative z-10 pb-10">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
