import {
  ButtonSection,
  AlertSection,
  CardSection,
  AvatarSection,
  StatsSection,
  TableSection,
  FormSection,
  SettingsSection,
  RatingSection,
  ProgressSection,
  LoadingSection,
  TooltipSection,
  KbdSection,
  SkeletonSection,
  DividerSection,
  AccordionSection,
  StepsSection,
  TabsSection,
  BadgeSection,
  ModalSection,
  TypographySection,
  DropdownSection,
  ChatSection,
  PaginationSection,
  TimelineSection,
  ColorPaletteSection,
  BreadcrumbsSection,
  CountdownSection,
  JoinSection,
} from "./_components";

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-base-100 border border-base-200 shadow-sm rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-base-content/30 px-1">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row2({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">{children}</div>;
}

function Row3({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

export default function Playground() {
  return (
    <div className="min-h-full bg-base-200/40 bg-dot-pattern">
      <div className="flex flex-col max-w-6xl gap-12 px-6 py-16 mx-auto">

        {/* Header */}
        <div>
          <h1 className="mb-1 text-3xl font-bold text-base-content">Playground</h1>
          <p className="text-base-content/50">daisyUI — interactive component showcase</p>
        </div>

        {/* Foundation */}
        <Group title="Foundation">
          <Panel><ColorPaletteSection /></Panel>
          <Panel><TypographySection /></Panel>
        </Group>

        {/* Data Display */}
        <Group title="Data Display">
          <Panel><StatsSection /></Panel>
          <Panel><TableSection /></Panel>
          <Panel><CardSection /></Panel>
          <Row2>
            <Panel><BadgeSection /></Panel>
            <Panel><AvatarSection /></Panel>
          </Row2>
          <Row2>
            <Panel><TimelineSection /></Panel>
            <Panel><RatingSection /></Panel>
          </Row2>
        </Group>

        {/* Navigation & Layout */}
        <Group title="Navigation & Layout">
          <Panel><StepsSection /></Panel>
          <Panel><TabsSection /></Panel>
          <Row3>
            <Panel><BreadcrumbsSection /></Panel>
            <Panel><PaginationSection /></Panel>
            <Panel><DropdownSection /></Panel>
          </Row3>
        </Group>

        {/* Inputs & Actions */}
        <Group title="Inputs & Actions">
          <Panel><ButtonSection /></Panel>
          <Row3>
            <Panel><FormSection /></Panel>
            <Panel><SettingsSection /></Panel>
            <Panel><JoinSection /></Panel>
          </Row3>
        </Group>

        {/* Feedback & Status */}
        <Group title="Feedback & Status">
          <Row3>
            <Panel><AlertSection /></Panel>
            <Panel><LoadingSection /></Panel>
            <Panel><ProgressSection /></Panel>
          </Row3>
          <Row3>
            <Panel><SkeletonSection /></Panel>
            <Panel><CountdownSection /></Panel>
            <Panel><ModalSection /></Panel>
          </Row3>
        </Group>

        {/* Content & Overlays */}
        <Group title="Content & Overlays">
          <Row2>
            <Panel><AccordionSection /></Panel>
            <Panel><ChatSection /></Panel>
          </Row2>
          <Row3>
            <Panel><DividerSection /></Panel>
            <Panel><TooltipSection /></Panel>
            <Panel><KbdSection /></Panel>
          </Row3>
        </Group>

      </div>
    </div>
  );
}
