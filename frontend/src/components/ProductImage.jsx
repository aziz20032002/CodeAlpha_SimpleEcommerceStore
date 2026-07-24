import { useMemo, useState } from "react";

const palettes = [
  ["#312e81", "#7c3aed"],
  ["#1e3a8a", "#2563eb"],
  ["#0f766e", "#14b8a6"],
  ["#9a3412", "#f97316"],
  ["#4c1d95", "#a855f7"],
];

function ProductImage({ src, alt, productKey = "", className = "", placeholderClassName = "", priority = false }) {
  const [failedSource, setFailedSource] = useState("");
  const [loadedSource, setLoadedSource] = useState("");
  const visual = useMemo(() => {
    const label = String(alt || "Produit").trim();
    const seed = `${productKey}-${label}`;
    const hash = [...seed].reduce((total, character) => total + character.charCodeAt(0), 0);
    const initials = label
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    return { colors: palettes[hash % palettes.length], initials };
  }, [alt, productKey]);

  const placeholder = (
    <div
      className={`product-placeholder ${placeholderClassName}`}
      style={{ "--placeholder-start": visual.colors[0], "--placeholder-end": visual.colors[1] }}
      role="img"
      aria-label={`Visuel de remplacement pour ${alt}`}
    >
      <span className="placeholder-orbit" aria-hidden="true" />
      <span className="placeholder-mark">{visual.initials || "CA"}</span>
      <small>{alt}</small>
    </div>
  );

  if (!src || failedSource === src) return placeholder;

  return (
    <span className={`product-media-frame ${loadedSource === src ? "is-loaded" : ""}`}>
      {loadedSource !== src && placeholder}
      <img
        className={className}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setLoadedSource(src)}
        onError={() => setFailedSource(src)}
      />
    </span>
  );
}

export default ProductImage;
