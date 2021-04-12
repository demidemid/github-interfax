import { useEffect, useState } from "react";

const useLocalStorage = (key: string, initialValue = ``) => {
  const [value, setValue] = useState(
    () => localStorage.getItem(key) || initialValue
  );

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
