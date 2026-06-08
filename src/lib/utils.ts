import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string): string {
  return dateStr
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}
