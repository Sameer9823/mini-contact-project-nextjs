"use client";

import { updateContactStatus } from "@/actions";
import { Button } from "./ui/button";
import { useTransition } from "react";

type Props = {
  contactId: string;
  currentStatus: "new" | "in-progress" | "resolved";
};

export default function ContactStatusButtons({
  contactId,
  currentStatus,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function updateStatus(status: "new" | "in-progress" | "resolved") {
    startTransition(async () => {
      await updateContactStatus(contactId, status);
    });
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant={currentStatus === "new" ? "default" : "outline"}
        disabled={isPending}
        onClick={() => updateStatus("new")}
      >
        New
      </Button>

      <Button
        size="sm"
        variant={currentStatus === "in-progress" ? "default" : "outline"}
        disabled={isPending}
        onClick={() => updateStatus("in-progress")}
      >
        In Progress
      </Button>

      <Button
        size="sm"
        variant={currentStatus === "resolved" ? "default" : "outline"}
        disabled={isPending}
        onClick={() => updateStatus("resolved")}
      >
        Resolved
      </Button>
    </div>
  );
}
