import {
  AIChatSection,
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
} from "./_components";

function Panel({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={`bg-base-100 border border-base-200 shadow-sm rounded-2xl p-6 overflow-hidden ${wide ? "col-span-full" : ""}`}
    >
      {children}
    </div>
  );
}

export default function Playground() {
  return (
    <div className="min-h-full bg-base-200/40 bg-dot-pattern">
      <div className="flex flex-col max-w-6xl gap-10 px-6 py-16 mx-auto">
        <div>
          <h1 className="mb-1 text-3xl font-bold text-base-content">
            Playground
          </h1>
          <p className="text-base-content/50">
            daisyUI — interactive component showcase
          </p>
        </div>

        {/* <AIChatSection /> */}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Panel wide>
            <ButtonSection />
          </Panel>
          <Panel wide>
            <CardSection />
          </Panel>
          <Panel wide>
            <StatsSection />
          </Panel>
          <Panel wide>
            <TableSection />
          </Panel>
          <Panel wide>
            <StepsSection />
          </Panel>
          <Panel wide>
            <TabsSection />
          </Panel>
          <Panel wide>
            <BadgeSection />
          </Panel>
          <Panel wide>
            <TypographySection />
          </Panel>

          <Panel>
            <AlertSection />
          </Panel>
          <Panel>
            <AvatarSection />
          </Panel>
          <Panel>
            <FormSection />
          </Panel>
          <Panel>
            <SettingsSection />
          </Panel>
          <Panel>
            <RatingSection />
          </Panel>
          <Panel>
            <ProgressSection />
          </Panel>
          <Panel>
            <LoadingSection />
          </Panel>
          <Panel>
            <TooltipSection />
          </Panel>
          <Panel>
            <KbdSection />
          </Panel>
          <Panel>
            <SkeletonSection />
          </Panel>
          <Panel>
            <DividerSection />
          </Panel>
          <Panel>
            <AccordionSection />
          </Panel>
          <Panel>
            <ModalSection />
          </Panel>
        </div>
      </div>
    </div>
  );
}
