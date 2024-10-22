import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCSSVariable(variableName: string): string {
  const root = document.documentElement;
  const hslValue = getComputedStyle(root).getPropertyValue(variableName).trim();
  return `hsl(${hslValue})`; // Convert the HSL value into standard hsl(240, 5.9%, 10%) format

};
