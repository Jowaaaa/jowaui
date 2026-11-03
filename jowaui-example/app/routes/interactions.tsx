import { useEffect, useState } from "react";
import {
  Banner,
  Button,
  Card,
  ConfirmDialog,
  ContextMenu,
  Drawer,
  Dropdown,
  Popover,
  Skeleton,
  Spinner,
  ToastProvider,
  Tooltip,
  useToast,
} from "@jowaaaa/jowaui";

export function meta() { return [{ title: "Interactions | jowaui" }, { name: "description", content: "Feedback and overlay components in jowaui." }]; }

type Notify = (message: string, variant: "info" | "success" | "warning") => void;

function InteractionContent({ notify }: { notify: Notify }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  return <div className="example-page"><div className="container">
    <header className="example-page__header"><p className="section-kicker">Useful moments</p><h1>Feedback that keeps people oriented.</h1><p>Explore the layers around an interface: lightweight guidance, focused actions, and graceful recovery.</p></header>
    {bannerVisible && <Banner variant="info" dismissible onDismiss={() => setBannerVisible(false)} action={<Button size="sm" variant="outline" onClick={() => notify("There is nothing else to review.", "success")}>Review updates</Button>}>A new workspace update is ready to review.</Banner>}
    <div className="example-grid">
      <Card><div className="example-card__intro"><span>01</span><h2>Menus and guidance</h2><p>Keep secondary actions close without crowding the primary path.</p></div><div className="example-actions"><Dropdown trigger={<Button variant="outline">Project actions</Button>} items={[{ label: "Rename project" }, { label: "Duplicate project" }, { divider: true, label: "" }, { label: "Archive project", disabled: true }]} /><Tooltip content="This action is safe to undo"><Button variant="ghost">Hover for context</Button></Tooltip><Popover trigger={<Button variant="outline">What is this?</Button>}><div className="example-popover"><strong>Quiet defaults</strong><p>Use a popover for supporting detail that does not deserve a full page.</p></div></Popover></div></Card>
      <Card><div className="example-card__intro"><span>02</span><h2>Focused actions</h2><p>Dialogs and drawers create a deliberate pause when an action needs more room.</p></div><div className="example-actions"><Button onClick={() => setDrawerOpen(true)}>Open details drawer</Button><Button variant="outline" onClick={() => setConfirmOpen(true)}>Archive project</Button></div></Card>
      <Card><div className="example-card__intro"><span>03</span><h2>Loading states</h2><p>Show the shape of what is coming instead of leaving people guessing.</p></div><div className="example-loading"><Skeleton width="70%" height="18px" /><Skeleton width="100%" height="12px" /><Skeleton width="86%" height="12px" /><Spinner size="sm" label="Loading next activity" /></div></Card>
      <Card className="example-card--full"><div className="example-card__intro"><span>04</span><h2>Contextual actions</h2><p>Right-click the surface below to see a contextual menu.</p></div><ContextMenu items={[{ id: "open", label: "Open project", icon: "↗" }, { id: "copy", label: "Copy link", icon: "⌘" }, { id: "separator", separator: true }, { id: "delete", label: "Delete project", danger: true }]} onSelect={(id) => notify(`Selected: ${id}`, id === "delete" ? "warning" : "info")}><div className="context-surface">Right-click anywhere in this panel</div></ContextMenu></Card>
    </div>
   </div><Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Project details"><p className="modal-copy">Northstar mobile is in review. Invite a teammate or add a note before the next milestone.</p><Button onClick={() => setDrawerOpen(false)}>Close drawer</Button></Drawer><ConfirmDialog open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={() => { setConfirmOpen(false); notify("Project archived", "success"); }} title="Archive this project?" description="The project will leave your active workspace, but can be restored later." confirmLabel="Archive" variant="warning" /></div>;
}

function ToastInteractions() {
  const { toast } = useToast();
  return <InteractionContent notify={(message, variant) => toast({ message, variant })} />;
}

export default function Interactions() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated ? <ToastProvider><ToastInteractions /></ToastProvider> : <InteractionContent notify={() => undefined} />;
}
