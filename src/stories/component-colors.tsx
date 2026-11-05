import { createElement, useEffect, type CSSProperties, type ReactNode } from "react";
import type { ArgTypes, Decorator } from "@storybook/react-vite";
import { GENERATED_COMPONENT_CONTROLS } from "./generated-component-colors";

export type ComponentColorControl = {
  key: string;
  name: string;
  variables: readonly string[];
  category: string;
  target?: "body";
};

const PORTAL_COMPONENTS = new Set(["confirmdialog", "drawer", "modal", "toast"]);

export const componentColorArgTypes = (
  controls: readonly ComponentColorControl[],
): ArgTypes =>
  Object.fromEntries(
    controls.map((control) => [
      control.key,
      {
        name: control.name,
        control: "color",
        table: { category: control.category },
      },
    ]),
  );

export const withComponentColors = (
  controls: readonly ComponentColorControl[],
): Decorator =>
  (Story, context) => {
    const style: CSSProperties = {};
    const bodyStyle: Record<string, string> = {};

    for (const control of controls) {
      const value = context.args[control.key];
      if (value === undefined || value === "") continue;

      for (const variable of control.variables) {
        if (control.target === "body") {
          bodyStyle[variable] = String(value);
        } else {
          style[variable as keyof CSSProperties] = String(value) as never;
        }
      }
    }

    return createElement(ColorScope, { bodyStyle, style, children: Story() });
  };

const ColorScope = ({
  bodyStyle,
  style,
  children,
}: {
  bodyStyle: Record<string, string>;
  style: CSSProperties;
  children: ReactNode;
}) => {
  useEffect(() => {
    const previous = new Map<string, string>();
    for (const [variable, value] of Object.entries(bodyStyle)) {
      previous.set(variable, document.body.style.getPropertyValue(variable));
      document.body.style.setProperty(variable, value);
    }

    return () => {
      for (const [variable, value] of previous) {
        if (value) document.body.style.setProperty(variable, value);
        else document.body.style.removeProperty(variable);
      }
    };
  }, [bodyStyle]);

  return createElement("div", { style }, children);
};

export const componentColorMeta = (component: string) => {
  const controls = (GENERATED_COMPONENT_CONTROLS[component] ?? []).map((control) =>
    PORTAL_COMPONENTS.has(component) ? { ...control, target: "body" as const } : control,
  );

  return controls.length > 0
    ? {
        argTypes: componentColorArgTypes(controls),
        decorators: [withComponentColors(controls)],
      }
    : {};
};
