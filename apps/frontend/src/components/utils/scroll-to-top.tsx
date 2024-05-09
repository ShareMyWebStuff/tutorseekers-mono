"use client";

import { Button } from "@/components/ui/button";

interface ScrollToTopProps {}

export const ScrollToTop = ({}: ScrollToTopProps) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      // variant="auth"
      onClick={handleScrollToTop}
    >
      Top of page
    </Button>
  );
};
