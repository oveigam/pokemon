import { DragOverlay, useDndContext } from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { GripVerticalIcon, MoveIcon } from "lucide-react";

import { Card } from "@ui/components/core/card";

export function OrderingDnDIndicator({
  children,
}: {
  children: (value: string) => React.ReactNode;
}) {
  const ctx = useDndContext();

  return (
    <DragOverlay style={{ width: "unset" }} modifiers={[snapCenterToCursor]}>
      {ctx.active?.id && (
        <Card className="text-card-foreground/90 flex min-w-32 cursor-grabbing items-center gap-1 px-2 py-2 font-normal">
          <GripVerticalIcon className="text-foreground/50 mr-1 size-4" />
          <MoveIcon className="text-foreground/75 size-4" />
          <span className="truncate">{children(`${ctx.active.id}`)}</span>
        </Card>
      )}
    </DragOverlay>
  );
}
