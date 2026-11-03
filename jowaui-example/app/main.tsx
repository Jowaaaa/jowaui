import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Navbar } from "@jowaaaa/jowaui";
import Home from "./routes/home";
import Forms from "./routes/forms";
import Data from "./routes/data";
import Interactions from "./routes/interactions";
import Content from "./routes/content";
import "./app.css";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const links = [
  { href: `${basePath}/`, label: "Overview" },
  { href: `${basePath}/forms`, label: "Forms" },
  { href: `${basePath}/data`, label: "Data" },
  { href: `${basePath}/interactions`, label: "Interactions" },
  { href: `${basePath}/content`, label: "Content" },
];

function App() {
  return (
    <BrowserRouter basename={basePath}>
      <Navbar links={links} title="jowaui" />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/data" element={<Data />} />
          <Route path="/interactions" element={<Interactions />} />
          <Route path="/content" element={<Content />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
