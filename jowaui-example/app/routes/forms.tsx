import { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  ColorPicker,
  Combobox,
  DatePicker,
  FileInput,
  MultiSelect,
  OtpInput,
  Radio,
  RadioGroup,
  RangeSlider,
  RichTextEditor,
  Switch,
  Textarea,
} from "@jowaaaa/jowaui";

export function meta() {
  return [{ title: "Forms | jowaui" }, { name: "description", content: "Form controls in jowaui." }];
}

const people = [
  { label: "Maya Chen", value: "maya" },
  { label: "Theo Harris", value: "theo" },
  { label: "Noah Williams", value: "noah" },
];

export default function Forms() {
  const [plan, setPlan] = useState("pro");
  const [features, setFeatures] = useState(["analytics"]);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="example-page">
      <div className="container">
        <header className="example-page__header">
          <p className="section-kicker">Inputs with intention</p>
          <h1>Forms that guide, not interrupt.</h1>
          <p>Compose familiar controls into clear, calm flows with useful feedback at every step.</p>
        </header>

        <div className="example-grid example-grid--wide">
          <Card>
            <div className="example-card__intro"><span>01</span><h2>Workspace details</h2><p>A compact setup flow using controlled and native form controls.</p></div>
            <div className="example-form">
              <div className="example-form__row"><Combobox options={people} defaultValue="maya" placeholder="Choose an owner" /><MultiSelect options={[{ label: "Analytics", value: "analytics" }, { label: "Billing", value: "billing" }, { label: "Automation", value: "automation" }]} value={features} onChange={setFeatures} /></div>
              <DatePicker label="Launch date" defaultValue="2026-11-20" hint="You can change this later." />
              <Textarea label="What are you building?" placeholder="A focused workspace for the team..." rows={4} />
              <div className="example-form__row example-form__row--align-end"><FileInput label="Brief" accept=".pdf,.doc,.docx" hint="PDF or Word document" /><ColorPicker label="Accent" defaultValue="#527c78" /></div>
              <div className="example-form__actions"><Button onClick={() => setSubmitted(true)}>Create workspace</Button>{submitted && <span className="example-success" role="status">Workspace ready to shape.</span>}</div>
            </div>
          </Card>

          <Card>
            <div className="example-card__intro"><span>02</span><h2>Preferences</h2><p>Small choices can make a product feel personal without adding friction.</p></div>
            <div className="example-form">
              <RadioGroup name="plan" label="Plan" value={plan} onChange={setPlan} orientation="horizontal" hint="You can change plans at any time."><Radio value="starter" label="Starter" /><Radio value="pro" label="Pro" /><Radio value="team" label="Team" /></RadioGroup>
              <Checkbox label="Send me a weekly progress summary" defaultChecked hint="Only the highlights, once a week." />
              <Switch label="Enable quiet hours" defaultChecked hint="Pause non-critical notifications after 18:00." />
              <RangeSlider min={0} max={100} defaultValue={[25, 75]} showTooltip />
              <div><p className="example-label">Verification code</p><OtpInput length={6} type="number" defaultValue="204826" /></div>
            </div>
          </Card>

          <Card className="example-card--full">
            <div className="example-card__intro"><span>03</span><h2>Long-form input</h2><p>A lightweight editor for notes, briefs, and other content that deserves room.</p></div>
            <RichTextEditor defaultValue="<h2>A thoughtful starting point</h2><p>Write a note for your team and keep the important context close to the work.</p>" placeholder="Start writing..." />
          </Card>
        </div>
      </div>
    </div>
  );
}
