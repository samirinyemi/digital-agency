export function SectionTransition({
  from,
  to,
  height = "h-32 md:h-48",
}: {
  from: string;
  to: string;
  height?: string;
}) {
  return (
    <div
      className={`${height} w-full pointer-events-none`}
      style={{
        background: `linear-gradient(to bottom, ${from}, ${to})`,
      }}
    />
  );
}
