import { useState, useEffect } from "react";

interface MousePosition {
  x: number;
  y: number;
}

const useMousePosition = (): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  const updateMousePosition = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []); // Passing an empty dependency array to useEffect to ensure it runs only once

  return mousePosition;
};

export default useMousePosition;
