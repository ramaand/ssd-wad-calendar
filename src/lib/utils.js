import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export const getDayName = (day) => {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(day);
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
