import React from "react";

type SingleValue = number;
type DualValue = [number, number];

export interface RangeSliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Minimum selectable value (default: 0) */
  min?: number;
  /** Maximum selectable value (default: 100) */
  max?: number;
  /** Snap increment for thumb movement (default: 1) */
  step?: number;
  /** Controlled value — a single number or a [low, high] tuple for dual-thumb mode */
  value?: SingleValue | DualValue;
  /** Initial value for uncontrolled usage */
  defaultValue?: SingleValue | DualValue;
  /** Callback fired with the updated value on every change */
  onChange?: (value: SingleValue | DualValue) => void;
  /** Disables all interaction when true (default: false) */
  disabled?: boolean;
  /** Additional CSS class applied to the slider wrapper */
  className?: string;
  /** Show a tooltip above the active thumb displaying its current value (default: true) */
  showTooltip?: boolean;
}

function isDual(v: SingleValue | DualValue): v is DualValue {
  return Array.isArray(v);
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

function toPercent(val: number, min: number, max: number): number {
  return ((val - min) / (max - min)) * 100;
}

export const RangeSlider = React.forwardRef<HTMLDivElement, RangeSliderProps>(
  (
    {
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue,
      onChange,
      disabled = false,
      className = "",
      showTooltip = true,
      ...props
    },
    ref
  ) => {
    const resolvedDefault: SingleValue | DualValue = defaultValue ?? (value !== undefined && isDual(value) ? [min, max] : min);
    const isControlled: boolean = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<SingleValue | DualValue>(resolvedDefault);
    const currentValue: SingleValue | DualValue = isControlled ? (value as SingleValue | DualValue) : internalValue;

    const dual: boolean = isDual(currentValue);

    const [activeThumb, setActiveThumb] = React.useState<number>(-1);
    const trackRef = React.useRef<HTMLDivElement>(null);

    const updateValue = (next: SingleValue | DualValue): void => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    };

    const getValueFromPosition = (clientX: number): number => {
      const track = trackRef.current;
      if (!track) return min;
      const rect = track.getBoundingClientRect();
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      const raw = min + ratio * (max - min);
      const stepped = Math.round(raw / step) * step;
      return clamp(stepped, min, max);
    };

    const handleTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>): void => {
      if (disabled) return;
      const newVal = getValueFromPosition(e.clientX);
      if (dual) {
        const [lo, hi] = currentValue as DualValue;
        const distLo = Math.abs(newVal - lo);
        const distHi = Math.abs(newVal - hi);
        if (distLo <= distHi) {
          updateValue([clamp(newVal, min, hi), hi]);
          setActiveThumb(0);
        } else {
          updateValue([lo, clamp(newVal, lo, max)]);
          setActiveThumb(1);
        }
      } else {
        updateValue(newVal);
        setActiveThumb(0);
      }
    };

    const handleThumbPointerDown = (thumbIndex: number, e: React.PointerEvent<HTMLSpanElement>): void => {
      if (disabled) return;
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      setActiveThumb(thumbIndex);
    };

    const handleThumbPointerMove = (thumbIndex: number, e: React.PointerEvent<HTMLSpanElement>): void => {
      if (disabled || activeThumb !== thumbIndex) return;
      if (!(e.buttons & 1)) return;
      const newVal = getValueFromPosition(e.clientX);
      if (dual) {
        const [lo, hi] = currentValue as DualValue;
        if (thumbIndex === 0) {
          updateValue([clamp(newVal, min, hi), hi]);
        } else {
          updateValue([lo, clamp(newVal, lo, max)]);
        }
      } else {
        updateValue(newVal);
      }
    };

    const handleThumbPointerUp = (): void => {
      setActiveThumb(-1);
    };

    const handleThumbKeyDown = (thumbIndex: number, e: React.KeyboardEvent<HTMLSpanElement>): void => {
      if (disabled) return;
      const delta = e.shiftKey ? step * 10 : step;
      if (dual) {
        const [lo, hi] = currentValue as DualValue;
        if (thumbIndex === 0) {
          if (e.key === "ArrowRight" || e.key === "ArrowUp") updateValue([clamp(lo + delta, min, hi), hi]);
          if (e.key === "ArrowLeft" || e.key === "ArrowDown") updateValue([clamp(lo - delta, min, hi), hi]);
          if (e.key === "Home") updateValue([min, hi]);
          if (e.key === "End") updateValue([hi, hi]);
        } else {
          if (e.key === "ArrowRight" || e.key === "ArrowUp") updateValue([lo, clamp(hi + delta, lo, max)]);
          if (e.key === "ArrowLeft" || e.key === "ArrowDown") updateValue([lo, clamp(hi - delta, lo, max)]);
          if (e.key === "Home") updateValue([lo, lo]);
          if (e.key === "End") updateValue([lo, max]);
        }
      } else {
        const v = currentValue as SingleValue;
        if (e.key === "ArrowRight" || e.key === "ArrowUp") updateValue(clamp(v + delta, min, max));
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") updateValue(clamp(v - delta, min, max));
        if (e.key === "Home") updateValue(min);
        if (e.key === "End") updateValue(max);
      }
      if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)) {
        e.preventDefault();
      }
    };

    // Compute fill and thumb positions
    let fillLeft: number;
    let fillRight: number;
    let thumbPositions: number[];

    if (dual) {
      const [lo, hi] = currentValue as DualValue;
      fillLeft = toPercent(lo, min, max);
      fillRight = 100 - toPercent(hi, min, max);
      thumbPositions = [fillLeft, toPercent(hi, min, max)];
    } else {
      const v = currentValue as SingleValue;
      fillLeft = 0;
      fillRight = 100 - toPercent(v, min, max);
      thumbPositions = [toPercent(v, min, max)];
    }

    const classes: string = [
      "jowa-rangeslider",
      dual ? "jowa-rangeslider--dual" : "",
      disabled ? "jowa-rangeslider--disabled" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const thumbValues: number[] = dual
      ? [((currentValue as DualValue)[0]), ((currentValue as DualValue)[1])]
      : [(currentValue as SingleValue)];

    return (
      <div ref={ref} className={classes} {...props}>
        <div
          ref={trackRef}
          className="jowa-rangeslider__track"
          onPointerDown={handleTrackPointerDown}
        >
          <div
            className="jowa-rangeslider__fill"
            style={{ left: `${fillLeft}%`, right: `${fillRight}%` }}
          />
          {thumbPositions.map((pos, i) => (
            <span
              key={i}
              className={[
                "jowa-rangeslider__thumb",
                activeThumb === i ? "jowa-rangeslider__thumb--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ left: `${pos}%` }}
              role="slider"
              aria-valuemin={dual && i === 1 ? (currentValue as DualValue)[0] : min}
              aria-valuemax={dual && i === 0 ? (currentValue as DualValue)[1] : max}
              aria-valuenow={thumbValues[i]}
              aria-disabled={disabled}
              tabIndex={disabled ? -1 : 0}
              onPointerDown={(e) => handleThumbPointerDown(i, e)}
              onPointerMove={(e) => handleThumbPointerMove(i, e)}
              onPointerUp={handleThumbPointerUp}
              onKeyDown={(e) => handleThumbKeyDown(i, e)}
            >
              {showTooltip && (
                <span className="jowa-rangeslider__tooltip">{thumbValues[i]}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    );
  }
);

RangeSlider.displayName = "RangeSlider";
