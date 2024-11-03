import { useEffect, useRef, useState } from "react";

const useOnClickOutside = (initialValue) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, { capture: true });

    return () => {
      document.removeEventListener("click", handleClickOutside, {
        capture: true,
      });
    };
  });

  return { isOpen, ref, setIsOpen };
};

export default useOnClickOutside;
