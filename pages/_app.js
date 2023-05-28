import "@/styles/globals.css";

import { TrackingProvider } from "@/Context/TrackingContext";

export default function App({ Component, pageProps }) {
  return (
    <TrackingProvider>
      <Component {...pageProps} />
    </TrackingProvider>
  );
}
