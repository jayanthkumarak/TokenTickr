"use client";

// NUX presets now live inline in `comparison-layout.tsx` as a dismissible,
// non-blocking preset bar. This component is kept so existing `page.tsx`
// imports don't break; it renders nothing and never opens a modal.
export function NUXPopup() {
    return null;
}
