import { useEffect } from "react";

export default function useCommentModal(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling
      document.body.style.overflow = "";
    }

    // Cleanup function to enable scroll when the component is unmounted or isOpen changes
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
}
