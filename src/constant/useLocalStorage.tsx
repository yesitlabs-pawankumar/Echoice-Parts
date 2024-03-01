"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

type UseLocalStorageReturnType<T> = [T, Dispatch<SetStateAction<T>>];

function getStorageValue<T>(key: string, defaultValue: T): T {
  // getting stored value
  let saved: any = null;
  if (typeof window !== "undefined") {
    saved = localStorage.getItem(key);
  }

  const initial = saved ? JSON.parse(saved) : defaultValue;
  return initial;
}

function useLocalStorage<T>(
  key: string,
  defaultValue: T
): UseLocalStorageReturnType<T> {
  const [value, setValue] = useState(() => {
    return getStorageValue<T>(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;

export const removeStorage = (keyName: string): void => {
  localStorage.removeItem(keyName);
};
