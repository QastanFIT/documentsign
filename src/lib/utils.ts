import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type SigningOptions<T> = (keyof T)[];
export function hasSingleSigningOption<T extends Record<string, any>>(obj: T, keys: SigningOptions<T>): boolean {
    const trueCount = keys.reduce((count, key) => count + (obj[key] === true ? 1 : 0), 0);
    return trueCount === 1 ? true : false;
}