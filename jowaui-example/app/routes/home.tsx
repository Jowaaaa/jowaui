import { useState } from "react";
import { Link } from "react-router";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Chart,
  Divider,
  Footer,
  Gauge,
  Hero,
  Input,
  Modal,
  Progress,
  Select,
  Sidebar,
  Sparkline,
  StatCard,
  Table,
  Tabs,
} from "@jowaaaa/jowaui";
const chartData = [
  { label: "Mon", value: 32 },
  { label: "Tue", value: 48 },
  { label: "Wed", value: 42 },
  { label: "Thu", value: 64 },
  { label: "Fri", value: 58 },
  { label: "Sat", value: 72 },
  { label: "Sun", value: 86 },
];

const projectRows = [
  { name: "Acme workspace", owner: "Maya Chen", status: "Live", progress: 86 },
  {
    name: "Northstar mobile",
    owner: "Theo Harris",
    status: "Review",
    progress: 64,
  },
  {
    name: "Atlas dashboard",
    owner: "Noah Williams",
    status: "Draft",
    progress: 38,
  },
];

const tableColumns = [
  {
    key: "name",
    header: "Project",
    render: (row: (typeof projectRows)[number]) => (
      <div className="project-cell">
        <Avatar alt={row.name} size="sm" />
        <span>{row.name}</span>
      </div>
    ),
  },
  { key: "owner", header: "Owner" },
  {
    key: "status",
    header: "Status",
    render: (row: (typeof projectRows)[number]) => (
      <Badge
        variant={
          row.status === "Live"
            ? "success"
            : row.status === "Review"
              ? "warning"
              : "neutral"
        }
      >
        {row.status}
      </Badge>
    ),
  },
  {
    key: "progress",
    header: "Progress",
    render: (row: (typeof projectRows)[number]) => (
      <Progress value={row.progress} showValue />
    ),
  },
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("foundations");
  const [notice, setNotice] = useState<string | null>(null);
  const install = () =>
    setNotice("Copied to clipboard: npm install @jowaaaa/jowaui");

  return (
    <div className="site-shell">
      {notice && (
        <div className="site-notice" role="status">
          {notice}
          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}
      <section className="hero-wrap">
        <div className="container">
          <div className="eyebrow">
            <span className="eyebrow-dot" /> Jowaui 0.2 is now available
          </div>
          <Hero
            title="Interfaces with a little more intention."
            align="left"
            subtitle="jowaui is a considered collection of accessible React primitives for teams who care about the details, without slowing down delivery."
            actions={
              <div className="hero-actions">
                <Button
                  onClick={() =>
                    document
                      .getElementById("components")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore components <span aria-hidden="true">↗</span>
                </Button>
                <Button variant="outline" onClick={install}>
                  <span className="code-icon">&lt;/&gt;</span> npm install
                </Button>
              </div>
            }
            className="showcase-hero"
          />
          <div className="hero-note">
            <span>✦</span> Built for product teams who ship with care
          </div>
        </div>
      </section>

      <section className="dashboard-section" aria-label="Dashboard preview">
        <div className="container">
          <div className="dashboard-window">
            <div className="window-bar">
              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>
              <span>workspace / overview</span>
              <span className="window-status">
                <span /> All systems normal
              </span>
            </div>
            <div className="dashboard-layout">
              <Sidebar
                className="dashboard-sidebar"
                header={
                  <div className="mini-brand">
                    <span className="brand-mark">j</span>
                    <span>jowaui</span>
                  </div>
                }
                groups={[
                  {
                    heading: "Workspace",
                    items: [
                      { label: "Overview", icon: "◈", active: true },
                      { label: "Projects · 8", icon: "□" },
                      { label: "Activity", icon: "◌" },
                    ],
                  },
                  {
                    heading: "Manage",
                    items: [
                      { label: "Team", icon: "⊙" },
                      { label: "Settings", icon: "⚙" },
                    ],
                  },
                ]}
                footer={
                  <div className="sidebar-profile">
                    <Avatar alt="Maya Chen" size="sm" />
                    <div>
                      <strong>Maya Chen</strong>
                      <small>Admin</small>
                    </div>
                  </div>
                }
              />
              <div className="dashboard-main">
                <div className="dashboard-heading">
                  <div>
                    <p className="muted-label">Monday, October 21, 2024</p>
                    <h2>
                      Good morning, Maya <span>✦</span>
                    </h2>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setModalOpen(true)}
                  >
                    + New project
                  </Button>
                </div>
                <div className="stats-grid">
                  <StatCard
                    label="Active projects"
                    value="24"
                    change="12.5%"
                    trend="up"
                    icon="◈"
                  />
                  <StatCard
                    label="Team velocity"
                    value="86%"
                    change="8.2%"
                    trend="up"
                    icon="↗"
                  />
                  <StatCard
                    label="Hours saved"
                    value="128"
                    unit="hrs"
                    change="4.6%"
                    trend="up"
                    icon="◷"
                  />
                </div>
                <div className="dashboard-grid">
                  <Card className="chart-card">
                    <div className="card-heading">
                      <div>
                        <p className="muted-label">Weekly activity</p>
                        <h3>
                          3,842 <span className="positive">+18.4%</span>
                        </h3>
                      </div>
                      <Select
                        aria-label="Time range"
                        defaultValue="This week"
                        options={[
                          { label: "This week", value: "This week" },
                          { label: "This month", value: "This month" },
                        ]}
                      />
                    </div>
                    <Chart
                      data={chartData}
                      type="bar"
                      height={180}
                      color="#527c78"
                      showGrid
                      showLabels
                    />
                  </Card>
                  <Card className="health-card">
                    <div className="card-heading">
                      <div>
                        <p className="muted-label">Workspace health</p>
                        <h3>Looking good</h3>
                      </div>
                      <Badge variant="success">Healthy</Badge>
                    </div>
                    <Gauge
                      value={82}
                      label="of your workspace is on track"
                      size={140}
                    />
                    <div className="health-legend">
                      <span>
                        <i className="dot teal" /> On track <strong>82%</strong>
                      </span>
                      <span>
                        <i className="dot gold" /> Needs attention{" "}
                        <strong>18%</strong>
                      </span>
                    </div>
                  </Card>
                </div>
                <Card className="projects-card">
                  <div className="card-heading">
                    <div>
                      <p className="muted-label">Recent projects</p>
                      <h3>Keep momentum going</h3>
                    </div>
                    <Button variant="ghost" size="sm">
                      View all <span aria-hidden="true">→</span>
                    </Button>
                  </div>
                  <Table
                    columns={tableColumns}
                    data={projectRows}
                    rowKey="name"
                    hoverable
                    striped={false}
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="statement-section">
        <div className="container statement-grid">
          <div>
            <p className="section-kicker">Less friction. More focus.</p>
            <h2>
              The building blocks for your <em>best</em> work.
            </h2>
          </div>
          <p className="statement-copy">
            Good interfaces don't ask for attention. They make the important
            things feel obvious, the complex things feel possible, and every
            interaction feel just right.
          </p>
        </div>
      </section>

      <section className="components-section" id="components">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="section-kicker">
                A library that stays out of the way
              </p>
              <h2>
                Everything you need.
                <br />
                <em>Nothing you don’t.</em>
              </h2>
            </div>
            <p>
              Composed, accessible primitives with sensible defaults and enough
              flexibility to make them your own.
            </p>
          </div>
          <Tabs
            items={[
              { label: "Foundations", value: "foundations", content: null },
              { label: "Data display", value: "data", content: null },
              { label: "Feedback", value: "feedback", content: null },
            ]}
            value={activeTab}
            onChange={setActiveTab}
            className="showcase-tabs"
          />
          {activeTab === "foundations" && (
            <div className="component-grid">
              <Card className="component-card component-card-large">
                <div className="component-card-header">
                  <div>
                    <span className="component-number">01</span>
                    <h3>Make a confident first move</h3>
                    <p>
                      Buttons with clear hierarchy, thoughtful states, and a
                      size for every context.
                    </p>
                  </div>
                  <span className="component-arrow">↗</span>
                </div>
                <Divider />
                <div className="button-demo">
                  <Button>Primary action</Button>
                  <Button variant="outline">Secondary</Button>
                  <Button variant="ghost">Tertiary</Button>
                </div>
              </Card>
              <Card className="component-card">
                <div className="component-card-header">
                  <div>
                    <span className="component-number">02</span>
                    <h3>Forms that feel effortless</h3>
                    <p>Inputs that guide without getting in the way.</p>
                  </div>
                </div>
                <div className="form-demo">
                  <Input
                    label="Your email address"
                    placeholder="you@company.com"
                  />
                  <Select
                    label="Role"
                    options={[
                      { label: "Product designer", value: "designer" },
                      { label: "Developer", value: "developer" },
                    ]}
                  />
                </div>
              </Card>
              <Card className="component-card accent-card">
                <div className="accent-orb" />
                <div className="component-card-header">
                  <div>
                    <span className="component-number">03</span>
                    <h3>Details worth noticing</h3>
                    <p>Small moments that make products feel alive.</p>
                  </div>
                </div>
                <div className="detail-demo">
                  <Badge variant="success">Published</Badge>
                  <Badge variant="warning">In review</Badge>
                  <Badge variant="neutral">Draft</Badge>
                  <div className="avatar-stack">
                    <Avatar alt="Maya Chen" size="sm" />
                    <Avatar alt="Theo Harris" size="sm" />
                    <Avatar alt="Noah Williams" size="sm" />
                    <span>+4</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
          {activeTab === "data" && (
            <div className="tab-placeholder">
              <Chart
                data={chartData}
                type="line"
                height={260}
                color="#527c78"
                showGrid
                showLabels
              />
              <Sparkline
                data={[24, 38, 31, 48, 44, 68, 76, 82]}
                color="#d3965b"
              />
            </div>
          )}
          {activeTab === "feedback" && (
            <div className="feedback-grid">
              <Alert variant="info" title="A little context goes a long way">
                Inline feedback keeps people oriented without interrupting their
                flow.
              </Alert>
              <Alert variant="success" title="Your changes are saved">
                You can safely move on to the next step.
              </Alert>
              <Alert variant="warning" title="Review before publishing">
                Two required fields still need your attention.
              </Alert>
            </div>
          )}
        </div>
      </section>

      <section className="principles-section" id="principles">
        <div className="container principles-grid">
          <div className="principles-intro">
            <p className="section-kicker">The jowaui approach</p>
            <h2>
              Opinionated enough to be useful. <em>Open enough to be yours.</em>
            </h2>
            <Button variant="outline" onClick={() => setModalOpen(true)}>
              Read the principles <span>↗</span>
            </Button>
          </div>
          <div className="principle-list">
            <div>
              <span>01</span>
              <div>
                <h3>Quiet by default</h3>
                <p>
                  Visual noise is a tax on attention. We keep the interface calm
                  so your content can lead.
                </p>
              </div>
            </div>
            <div>
              <span>02</span>
              <div>
                <h3>Accessible by design</h3>
                <p>
                  Keyboard navigation, focus states, and readable contrast are
                  foundations, not afterthoughts.
                </p>
              </div>
            </div>
            <div>
              <span>03</span>
              <div>
                <h3>Composable at heart</h3>
                <p>
                  Use one piece or combine many. Every primitive is designed to
                  play well with the rest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <div className="container cta-inner">
          <span className="cta-spark">✦</span>
          <p className="section-kicker">Your next interface starts here</p>
          <h2>
            Make something <em>considered.</em>
          </h2>
          <p>
            Install jowaui and spend your time on the parts that make your
            product special.
          </p>
          <div className="cta-actions">
            <Button onClick={install}>
              Get started <span>↗</span>
            </Button>
            <Link to="#components" className="text-link">
              Browse the components <span>→</span>
            </Link>
          </div>
        </div>
      </section>
      <Footer
        brand="jowaui"
        groups={[
          {
            heading: "Explore",
            links: [
              { label: "Components", href: "#components" },
              { label: "Patterns", href: "#components" },
              { label: "Theming", href: "#principles" },
            ],
          },
          {
            heading: "Connect",
            links: [
              { label: "GitHub", href: "https://github.com/Jowaaaa/jowaui/" },
              {
                label: "Issues",
                href: "https://github.com/Jowaaaa/jowaui/issues",
              },
              { label: "Contact", href: "mailto:hello@jowaui.dev" },
            ],
          },
        ]}
        bottom="© 2024 jowaui. Made with love."
      />
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Start a new project"
      >
        <p className="modal-copy">
          A focused space for your next thoughtful interface. This is where your
          project creation flow would begin.
        </p>
        <div className="modal-actions">
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            Not now
          </Button>
          <Button
            onClick={() => {
              setModalOpen(false);
              setNotice("Project created: your new project is ready to shape.");
            }}
          >
            Create project
          </Button>
        </div>
      </Modal>
    </div>
  );
}
