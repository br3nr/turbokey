import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true));

  // this line is the key to avoid the error.
  if (!hasMounted) return null;

  return (
      <div className="flex justify-center items-center space-x-5">
        <button
          className="text-1xl font-bold"
          onClick={() => setTheme("light")}
        >
          Light
        </button>
        <button
          className="text-1xl font-bold"
          onClick={() => setTheme("dark")}
        >
          Dark
        </button>
      </div>
  );
};

export default ThemeChanger;
