import React from "react";
import { createRoot } from "react-dom/client";
import "../lib/styles/index.css";
import "./styles.css";
import { BuilderApp, PublishedPreview } from "./app";

const previewId = new URLSearchParams(window.location.search).get("preview");
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>{previewId ? <PublishedPreview id={previewId} /> : <BuilderApp />}</React.StrictMode>,
);
