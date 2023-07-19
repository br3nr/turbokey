import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true));

  // this line is the key to avoid the error.
  if (!hasMounted) return null;

  return (
    <div className="flex justify-center items-center">
      <button
        className="text-1xl font-bold p-5"
        onClick={() => setTheme("light")}
      >
        Light
      </button>
      <button
        className="text-1xl font-bold p-5"
        onClick={() => setTheme("dark")}
      >
        Dark
      </button>
    </div>
  );
};

export default ThemeChanger;
