import { useEffect, useState, useRef } from 'react';

export const useOpenToggle = (initOpen) => {
  const [open, setOpen] = useState(initOpen);
  const ref = useRef(null);
  const buttonRef = useRef(null);

  const handleHideDropdown = (event) => {
    if (
      (event.key !== 'Enter' &&
        event.key !== 'Tab' &&
        event.key !== 'ArrowDown' &&
        event.key !== 'ArrowUp') ||
      event.key === 'Escape'
    ) {
      setOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, buttonRef, open, setOpen };
};
