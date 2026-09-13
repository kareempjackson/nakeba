"use client";

import { useRouter } from "next/navigation";
import { VisualEditing } from "next-sanity/visual-editing/client-component";

/**
 * Mounted only in Draft Mode, inside the Studio's Presentation tool. It keeps
 * the preview in step with the editor: every change made in the Studio
 * re-renders the page on the server with the latest draft.
 *
 * The site doesn't use Sanity Live (it needs Cache Components), so without
 * this handler an edit would only show after a manual reload.
 */
export function PreviewBridge() {
  const router = useRouter();

  return (
    <VisualEditing
      refresh={() => {
        router.refresh();
        // Presentation shows a spinner until this settles; a refresh gives no
        // completion signal, so allow it a moment.
        return new Promise((resolve) => setTimeout(resolve, 800));
      }}
    />
  );
}
