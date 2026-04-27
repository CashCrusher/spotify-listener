import { PointerHighlight } from "@/components/ui/pointer-highlight";

export default function PointerHighlightDemo() {
  return (
    <div className="mx-auto max-w-lg py-20 text-2xl font-bold tracking-tight md:text-4xl text-center">
      The best way to grow is to{" "}
      <PointerHighlight rectangleClassName="rounded-sm">
        <span className="text-blue px-1">collaborate</span>
      </PointerHighlight>
    </div>
  );
}
