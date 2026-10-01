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

// Path routes: /2027 (Nexus 2027 page) and /lab/nexus-2027 (design study).
// Static hosts (Vercel/Netlify/nginx) need a rewrite of these paths to
// index.html — single-page app fallback.
const normalize = (path) =>
  path.replace(/\/+$/, "").toLowerCase() || "/";

function App() {
  const path = normalize(window.location.pathname);

  const page =
    path === "/2027" ? (
      <HomePage2027 />
    ) : path === "/lab/nexus-2027" ? (
      <DesignLab />
    ) : (
      <HomePage />
    );

  return <Suspense fallback={<LoadingScreen />}>{page}</Suspense>;
}

export default App;
