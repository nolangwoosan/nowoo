import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getItemImage = (id: number) => {
  return `http://maplestory.io/api/gms/62/item/${id}/icon?resize=3`
}

export const getMonsterImage = (id: number) => {
  return `http://maplestory.io/api/gms/62/mob/animated/${id}/move`
}

export const getRandom4DigitNumber = () => {
  const array = new Uint16Array(1)
  crypto.getRandomValues(array)
  const randomNumber = array[0] % 10000
  return String(randomNumber).padStart(4, '0')
}
