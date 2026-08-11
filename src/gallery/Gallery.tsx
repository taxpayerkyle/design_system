import { useState } from "react";
import {
  AppHeader,
  Banner,
  BottomSheet,
  Button,
  Card,
  Checkbox,
  IOSHeader,
  Icon,
  LineItem,
  ListItem,
  LockedFooter,
  Modal,
  Pill,
  Radio,
  SectionLabel,
  TextInput,
  Toggle,
} from "../lib";
import styles from "./Gallery.module.css";

const NEUTRALS = [
  ["light.0", "#FFFFFF"],
  ["light.20", "#F2F2F2"],
  ["light.40", "#DEDEDE"],
  ["dark.10", "#B5B5B5"],
  ["dark.70", "#777777"],
  ["dark.90", "#1B1B1B"],
  ["dark.100", "#000000"],
];
const SEMANTIC = [
  ["green", "#297B33"],
  ["brand / red", "#FE4F40"],
  ["amber", "#B8860B"],
  ["orange", "#FF5C21"],
  ["yellow", "#EDFF53"],
];
const TYPE = [
  ["text-display-lg", "Refund ready", "Test Tiempos · 38 / 400"],
  ["text-heading-lg", "Review your W-2", "Beausite · 26 / 500"],
  ["text-body-md-strong", "Federal refund", "Beausite · 16 / 500"],
  ["text-body-md", "We pulled these figures from your uploaded form.", "Beausite · 16 / 400"],
  ["text-body-sm", "Estimated, not final", "Beausite · 13 / 400"],
  ["text-body-xs", "Encrypted and stored securely", "Beausite · 11 / 400"],
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section} id={id}>
      <h2 className={`text-heading-lg ${styles.sectionHead}`}>{title}</h2>
      {children}
    </section>
  );
}

export function Gallery() {
  const [toggle, setToggle] = useState<"total" | "federal" | "state">("total");
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState("direct");
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className={styles.page}>
      <header className={styles.masthead}>
        <h1 className={`text-display-lg ${styles.title}`}>Assembly Design System</h1>
        <p className={`text-body-md-strong ${styles.tagline}`}>
          Minimalist, accessible, and clear.
        </p>
        <p className={`text-body-md ${styles.lede}`}>
          Core component kit for v1 / React + CSS-variable tokens / Built from Figma foundations.
        </p>
      </header>

      {/* ---------------------------------------------------------- Color */}
      <Section id="color" title="Color">
        <div className={styles.subLabel}>Neutrals</div>
        <div className={styles.grid}>
          {NEUTRALS.map(([name, hex]) => (
            <div className={styles.swatch} key={name}>
              <div className={styles.chip} style={{ background: hex }} />
              <span className={`text-body-sm-strong ${styles.chipName}`}>{name}</span>
              <span className={`text-body-xs ${styles.chipVal}`}>{hex}</span>
            </div>
          ))}
        </div>
        <div className={styles.subLabel}>Semantic</div>
        <div className={styles.grid}>
          {SEMANTIC.map(([name, hex]) => (
            <div className={styles.swatch} key={name}>
              <div className={styles.chip} style={{ background: hex }} />
              <span className={`text-body-sm-strong ${styles.chipName}`}>{name}</span>
              <span className={`text-body-xs ${styles.chipVal}`}>{hex}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------- Typography */}
      <Section id="type" title="Typography">
        {TYPE.map(([cls, sample, meta]) => (
          <div className={styles.typeRow} key={cls}>
            <div className={cls}>{sample}</div>
            <div className={`text-body-xs ${styles.typeMeta}`}>
              {cls} — {meta}
            </div>
          </div>
        ))}
      </Section>

      {/* --------------------------------------------------------- Buttons */}
      <Section id="buttons" title="Buttons">
        <div className={styles.subLabel}>Variants (lg)</div>
        <div className={styles.row}>
          <Button variant="primary">Continue</Button>
          <Button variant="secondary">Back</Button>
          <Button variant="negative">Delete</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
        <div className={styles.subLabel}>Sizes</div>
        <div className={styles.row}>
          <Button size="lg">Large</Button>
          <Button size="md">Medium</Button>
          <Button size="sm">Small</Button>
          <Button size="xs">Edit</Button>
        </div>
        <div className={styles.subLabel}>With icon</div>
        <div className={styles.row}>
          <Button>
            <Icon name="lock" size={18} color="var(--color-light-0)" /> Pay securely
          </Button>
          <Button variant="secondary" size="xs">
            <Icon name="edit" size={14} color="var(--color-dark-100)" /> Edit
          </Button>
        </div>
      </Section>

      {/* ----------------------------------------------------------- Cards */}
      <Section id="cards" title="Cards">
        <div className={styles.stack} style={{ maxWidth: 358 }}>
          <div>
            <SectionLabel>Refund summary</SectionLabel>
            <Card elevated flush>
              <LineItem label="Federal refund" value="$3,420" tone="green" />
              <LineItem label="State refund" value="$680" tone="green" />
              <LineItem label="Filing fee" value="−$59" tone="red" />
              <LineItem label="Total refund" value="$4,041" total last />
            </Card>
          </div>
          <div>
            <SectionLabel>Bank account</SectionLabel>
            <Card>
              <div className="text-body-md-strong">Chase •••• 4021</div>
              <div className="text-body-sm" style={{ color: "var(--color-dark-70)", marginTop: 4 }}>
                Direct deposit — arrives in 1–2 days
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Inputs */}
      <Section id="inputs" title="Form inputs">
        <div className={styles.stack}>
          <TextInput label="Legal first name" placeholder="Jordan" defaultValue="Jordan" />
          <TextInput
            label="Email"
            placeholder="you@email.com"
            leadingIcon={<Icon name="mail" size={18} />}
            helper="We'll send your filing confirmation here."
          />
          <TextInput
            label="Social Security number"
            placeholder="000-00-0000"
            error="Enter a valid 9-digit SSN."
          />
          <TextInput label="Employer" placeholder="Disabled" disabled />
        </div>
      </Section>

      {/* ----------------------------------------------- Selection controls */}
      <Section id="selection" title="Selection controls">
        <div className={styles.subLabel}>Toggle</div>
        <Toggle
          value={toggle}
          onChange={setToggle}
          options={[
            { label: "Total", value: "total" },
            { label: "Federal", value: "federal" },
            { label: "State", value: "state" },
          ]}
        />
        <div className={styles.subLabel}>Checkbox</div>
        <Checkbox
          checked={checked}
          onChange={setChecked}
          label="I confirm these figures match my W-2."
        />
        <div className={styles.subLabel}>Radio</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Radio selected={radio === "direct"} onSelect={() => setRadio("direct")} label="Direct deposit" />
          <Radio selected={radio === "check"} onSelect={() => setRadio("check")} label="Paper check" />
        </div>
      </Section>

      {/* -------------------------------------------------- Status & labels */}
      <Section id="status" title="Status & labels">
        <div className={styles.subLabel}>Pills</div>
        <div className={styles.row}>
          <Pill tone="success" dot>Refund due</Pill>
          <Pill tone="warning" dot>Action needed</Pill>
          <Pill tone="error" dot>Owed</Pill>
          <Pill tone="neutral">Draft</Pill>
        </div>
        <div className={styles.subLabel}>Banners</div>
        <div className={styles.stack} style={{ maxWidth: 420 }}>
          <Banner tone="success" title="Return accepted">
            The IRS accepted your federal return.
          </Banner>
          <Banner tone="warning" title="Missing form">
            Upload your 1099-INT to continue.
          </Banner>
          <Banner tone="error" title="Payment failed">
            Your card was declined. Try another method.
          </Banner>
          <Banner tone="neutral" onDismiss={() => {}}>
            Estimates update as you add income.
          </Banner>
        </div>
      </Section>

      {/* ------------------------------------------------------- List items */}
      <Section id="lists" title="List items">
        <Card flush style={{ maxWidth: 358 }}>
          <ListItem leadingIcon="description" title="W-2 — Acme Corp" subtitle="Uploaded · 2 forms" onClick={() => {}} />
          <div style={{ height: 0.6, background: "var(--color-border-card)", margin: "0 20px" }} />
          <ListItem leadingIcon="account_balance" title="Chase checking" subtitle="Direct deposit" value="•••• 4021" onClick={() => {}} />
          <div style={{ height: 0.6, background: "var(--color-border-card)", margin: "0 20px" }} />
          <ListItem leadingIcon="draw" title="Signature" subtitle="Required to file" onClick={() => {}} />
        </Card>
      </Section>

      {/* -------------------------------------------------------- Overlays */}
      <Section id="overlays" title="Overlays">
        <div className={styles.row}>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>Open modal</Button>
          <Button variant="secondary" onClick={() => setSheetOpen(true)}>Open bottom sheet</Button>
        </div>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Delete this draft?">
          <p className="text-body-sm" style={{ color: "var(--color-dark-80)" }}>
            This can't be undone. Your uploaded forms will be kept.
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="secondary" fluid shadow={false} onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="negative" fluid onClick={() => setModalOpen(false)}>Delete</Button>
          </div>
        </Modal>
        <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Choose refund method">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Radio selected label="Direct deposit — fastest" onSelect={() => {}} />
            <Radio selected={false} label="Paper check — 3 weeks" onSelect={() => {}} />
            <Button fluid style={{ marginTop: 16 }} onClick={() => setSheetOpen(false)}>Confirm</Button>
          </div>
        </BottomSheet>
      </Section>

      {/* -------------------------------------------- Composed phone demo */}
      <Section id="demo" title="Composed screen">
        <div className={styles.phone}>
          <IOSHeader />
          <AppHeader title="Review" leading={{ icon: "arrow_back" }} trailing={{ icon: "help" }} />
          <div className={styles.phoneBody}>
            <div>
              <SectionLabel>Your federal refund</SectionLabel>
              <Card elevated flush>
                <LineItem label="Adjusted gross income" value="$68,400" />
                <LineItem label="Total tax" value="$8,912" />
                <LineItem label="Withheld" value="$12,953" />
                <LineItem label="Refund" value="$4,041" total tone="green" last />
              </Card>
            </div>
            <Banner tone="success" title="Looks good">
              Everything checks out. You're ready to file.
            </Banner>
            <Checkbox checked={checked} onChange={setChecked} label="I confirm this is accurate." />
          </div>
          <LockedFooter disclaimer="By filing you agree to Accountable's Terms.">
            <Button fluid>File federal return</Button>
          </LockedFooter>
        </div>
      </Section>
    </div>
  );
}
