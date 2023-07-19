
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes'

const ThemeChanger = () => {
    const { theme, setTheme } = useTheme()
    const [hasMounted, setHasMounted] = useState(false);
  
    useEffect(() => setHasMounted(true));
    
    // this line is the key to avoid the error.
    if (!hasMounted) return null;
  
    return (
      <div >
        <button onClick={() => setTheme('light')}>Light Mode</button>
        <button onClick={() => setTheme('dark')}>Dark Mode</button>
      </div>
    )
  }
  
  export default ThemeChanger;