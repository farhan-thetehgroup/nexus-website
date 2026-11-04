/* eslint-disable no-undef */
import { Suspense, lazy } from "react";

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

// The NEXUS 2027 page IS the site's home page now — every path except the
// design study renders it, so unknown paths and legacy /2027 links land on
// the same SPA page instead of a 404 (static hosts still need a rewrite of
// everything to index.html — single-page app fallback).
const normalize = (path) => path.replace(/\/+$/, "").toLowerCase() || "/";

function App() {
  const path = normalize(window.location.pathname);

  const page = path === "/lab/nexus-2027" ? <DesignLab /> : <HomePage2027 />;

  return <Suspense fallback={<LoadingScreen />}>{page}</Suspense>;
}

export default App;
