import React from "react";
import { describe, expect, it } from "vitest";
import { COMPONENT_REGISTRY, createNode, moveNode, nodesToModule, sourceMap, sourceToNodes } from "./registry";

describe("builder JSX registry", () => {
  it("exposes the expanded library registry", () => {
    expect(Object.keys(COMPONENT_REGISTRY)).toEqual(expect.arrayContaining([
      "avatar", "banner", "breadcrumbs", "checkbox", "divider", "navbar", "progress", "skeleton", "spinner", "statcard", "switch", "tag", "textarea",
      "columns",
    ]));
  });

  it("exposes editable Navbar links and color props", () => {
    const keys = COMPONENT_REGISTRY.navbar.props.map((prop) => prop.key);

    expect(keys).toEqual(expect.arrayContaining(["links"]));
    expect(COMPONENT_REGISTRY.navbar.props.find((prop) => prop.key === "links")?.type).toBe("links");
    expect(COMPONENT_REGISTRY.navbar.colors?.map((color) => color.key)).toEqual(expect.arrayContaining(["--jowa-navbar-bg", "--jowa-navbar-text"]));
  });

  it("keeps the Button label in its props", () => {
    const button = createNode("button");
    const element = React.createElement(COMPONENT_REGISTRY.button.render, button.props);

    expect(element.props.children).toBe("Get started");
  });

  it("creates exportable Columns with editable Column children", () => {
    const columns = createNode("columns");
    const source = nodesToModule([columns]);
    const element = React.createElement(COMPONENT_REGISTRY.columns.render, columns.props, columns.children.map((child) => React.createElement(COMPONENT_REGISTRY.column.render, { key: child.id })));

    expect(columns.children).toHaveLength(3);
    expect(columns.children.every((child) => child.component === "column")).toBe(true);
    expect(element.props.children).toHaveLength(3);
    expect(source).toContain("<Columns");
    expect(source).toContain("<Column");
  });

  it("wraps multiple roots and emits valid JSX", () => {
    const hero = createNode("hero");
    const divider = createNode("divider");
    const source = nodesToModule([hero, divider]);

    expect(source).toContain("<>\n");
    expect(source).toContain("<Hero");
    expect(source).toContain("<Divider");
    expect(() => sourceToNodes(source)).not.toThrow();
  });

  it("round-trips nested registered components and Hero actions", () => {
    const source = `
      import React from "react";
      import { Hero, Card, Button } from "@jowaaaa/jowaui";
      export default function App() {
        return <Hero data-builder-id="hero-root" title="Welcome" actions={<>
          <Card data-builder-id="card-child" header="Details">
            <Button data-builder-id="button-child">Continue</Button>
          </Card>
        </>} />;
      }
    `;
    const [hero] = sourceToNodes(source);

    expect(hero.id).toBe("hero-root");
    expect(hero.children[0]?.id).toBe("card-child");
    expect(hero.children[0]?.children[0]?.id).toBe("button-child");
    expect(sourceMap([hero])).toMatchObject({
      "hero-root": expect.any(Object),
      "card-child": expect.any(Object),
      "button-child": expect.any(Object),
    });
  });

  it("preserves conditional and fragment children as source-owned nodes", () => {
    const source = `
      import React from "react";
      import { Card } from "@jowaaaa/jowaui";
      export default function App() {
        return <Card data-builder-id="card-root">
          {isVisible && <span data-testid="conditional">Visible</span>}
          <><span>Fragment child</span></>
        </Card>;
      }
    `;
    const [card] = sourceToNodes(source);

    expect(card.children).toHaveLength(2);
    expect(card.children.every((child) => child.component === "custom")).toBe(true);
    expect(card.children[0]?.source).toContain("isVisible &&");
    expect(card.children[1]?.source).toContain("Fragment child");
  });
});

describe("builder node movement", () => {
  it("moves nodes between root and nested child lists", () => {
    const card = createNode("card");
    const button = createNode("button");
    const badge = createNode("badge");
    const moved = moveNode([card, button, badge], button.id, card.id, 0);

    expect(moved.map((node) => node.id)).toEqual([card.id, badge.id]);
    expect(moved[0].children.map((node) => node.id)).toEqual([button.id]);
  });

  it("keeps same-list downward moves at the requested drop position", () => {
    const first = createNode("button");
    const second = createNode("badge");
    const third = createNode("tag");

    const moved = moveNode([first, second, third], first.id, null, 2);

    expect(moved.map((node) => node.id)).toEqual([second.id, first.id, third.id]);
  });

  it("rejects moving a node into its own descendant", () => {
    const card = createNode("card");
    const button = createNode("button");
    card.children = [button];

    expect(moveNode([card], card.id, button.id, 0)).toEqual([card]);
  });
});
