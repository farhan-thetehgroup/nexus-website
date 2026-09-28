/* eslint-disable no-undef */
import { Suspense, lazy } from "react";

import { HomePage } from "./pages/HomePage";

const DesignLab = lazy(() =>
  import("./labs/nexus-2027/DesignLab").then((module) => ({
    default: module.DesignLab,
  })),
);

const HomePage2027 = lazy(() =>
  import("./pages/HomePage2027").then((module) => ({
    default: module.HomePage2027,
  })),
);

const LoadingScreen = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#03101a] text-xs tracking-[0.3em] text-[#9fc4d4] uppercase">
    Loading study…
  </div>
);

// Opt-in routes: /?lab=nexus-2027 (design study) and /?year=2027 (2027 page).
function App() {
  const params = new URLSearchParams(window.location.search);

  if (params.get("lab") === "nexus-2027") {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <DesignLab />
      </Suspense>
    );
  }

  if (params.get("year") === "2027") {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <HomePage2027 />
      </Suspense>
    );
  }

  return <HomePage />;
}

export default App;
