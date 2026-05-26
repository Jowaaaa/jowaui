import React, { useState, useCallback, useEffect, useRef } from "react";

export interface CarouselImage {
  src: string;
  alt?: string;
}

export interface CarouselProps {
  children?: React.ReactNode[];
  images?: (CarouselImage | string)[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  images,
  autoPlay = false,
  interval = 4000,
  showDots = true,
  showArrows = true,
  className = "",
}) => {
  const imageSlides: React.ReactNode[] = (images ?? []).map((img, i) => {
    const src = typeof img === "string" ? img : img.src;
    const alt = typeof img === "string" ? `Slide ${i + 1}` : (img.alt ?? `Slide ${i + 1}`);
    return <img key={i} src={src} alt={alt} className="jowa-carousel__image" />;
  });

  const slides: React.ReactNode[] = imageSlides.length > 0 ? imageSlides : (children ?? []);

  const [current, setCurrent] = useState(0);
  const total = slides.length;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setInterval(next, interval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoPlay, interval, next]);

  const classes = ["jowa-carousel", className].filter(Boolean).join(" ");

  return (
    <div className={classes} aria-roledescription="carousel">
      <div className="jowa-carousel__track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((child, i) => (
          <div
            key={i}
            className="jowa-carousel__slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${total}`}
            aria-hidden={i !== current}
          >
            {child}
          </div>
        ))}
      </div>

      {showArrows && total > 1 && (
        <>
          <button
            className="jowa-carousel__arrow jowa-carousel__arrow--prev"
            onClick={prev}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            className="jowa-carousel__arrow jowa-carousel__arrow--next"
            onClick={next}
            aria-label="Next slide"
          >
            ›
          </button>
        </>
      )}

      {showDots && total > 1 && (
        <div className="jowa-carousel__dots" role="tablist" aria-label="Slides">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              className={["jowa-carousel__dot", i === current ? "jowa-carousel__dot--active" : ""].filter(Boolean).join(" ")}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Carousel.displayName = "Carousel";
