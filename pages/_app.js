import "@/styles/globals.css";

import { TrackingProvider } from "@/Context/TrackingContext";
import { Navbar, Footer } from "@/Components";

export default function App({ Component, pageProps }) {
  return (
    <>
      <TrackingProvider>
        <Navbar />
        <Component {...pageProps} />
      </TrackingProvider>
      <Footer />
    </>
  );
}
