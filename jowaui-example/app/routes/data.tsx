import { useState } from "react";
import { Card, DataGrid, KanbanBoard, Pagination, Tag, Timeline, Tree } from "@jowaaaa/jowaui";

export function meta() { return [{ title: "Data | jowaui" }, { name: "description", content: "Data display components in jowaui." }]; }

const rows = [
  { id: 1, project: "Acme workspace", owner: "Maya Chen", status: "Live", health: "98%" },
  { id: 2, project: "Northstar mobile", owner: "Theo Harris", status: "Review", health: "84%" },
  { id: 3, project: "Atlas dashboard", owner: "Noah Williams", status: "Draft", health: "61%" },
];

export default function Data() {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState("projects");
  return <div className="example-page"><div className="container">
    <header className="example-page__header"><p className="section-kicker">Make complexity legible</p><h1>Data that rewards a closer look.</h1><p>Tables, boards, trees, and timelines help teams move from signal to next step.</p></header>
    <div className="example-grid example-grid--wide">
      <Card className="example-card--full"><div className="example-card__intro"><span>01</span><h2>Project register</h2><p>Sortable rows with a small, useful status vocabulary.</p></div><DataGrid rows={rows} getRowId={(row) => row.id} columns={[{ key: "project", header: "Project", sortable: true }, { key: "owner", header: "Owner" }, { key: "status", header: "Status", render: (value) => <Tag variant={value === "Live" ? "success" : value === "Review" ? "warning" : "neutral"}>{String(value)}</Tag> }, { key: "health", header: "Health", sortable: true }]} /><div className="example-pagination"><Pagination page={page} total={40} pageSize={10} onChange={setPage} /></div></Card>
      <Card><div className="example-card__intro"><span>02</span><h2>Workspace tree</h2><p>Expose hierarchy without overwhelming the surface.</p></div><Tree selected={selected} onSelect={setSelected} defaultExpanded={["workspace"]} nodes={[{ id: "workspace", label: "Workspace", icon: "◈", children: [{ id: "projects", label: "Projects", children: [{ id: "active", label: "Active work" }, { id: "archive", label: "Archive" }] }, { id: "team", label: "Team" }] }]} /><p className="example-selection">Selected: <strong>{selected}</strong></p></Card>
      <Card><div className="example-card__intro"><span>03</span><h2>Delivery timeline</h2><p>Show progress as a sequence of meaningful moments.</p></div><Timeline items={[{ id: "approved", title: "Brief approved", description: "The team aligned on the outcome.", timestamp: "Today", variant: "success" }, { id: "review", title: "Prototype review", description: "Feedback is being gathered from the crew.", timestamp: "Tomorrow", variant: "info" }, { id: "release", title: "First release", description: "A small release to learn from.", timestamp: "Nov 18", variant: "warning" }]} /></Card>
      <Card className="example-card--full"><div className="example-card__intro"><span>04</span><h2>Move work forward</h2><p>Kanban keeps ownership and momentum visible at a glance. Try dragging a card between columns.</p></div><KanbanBoard columns={[{ id: "backlog", title: "Backlog", color: "#a8c0b1", cards: [{ id: "brief", title: "Shape the brief", description: "Turn the request into a useful first cut.", tags: ["Planning"], assignee: "Maya" }] }, { id: "progress", title: "In progress", color: "#527c78", cards: [{ id: "prototype", title: "Review prototype", description: "Collect feedback from the team.", tags: ["Design"], assignee: "Theo" }] }, { id: "done", title: "Done", color: "#d3965b", cards: [{ id: "research", title: "Share research", tags: ["Research"], assignee: "Noah" }] }]} /></Card>
    </div>
  </div></div>;
}
