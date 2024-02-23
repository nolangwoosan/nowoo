'use client'

import Image, { ImageProps } from 'next/image'

interface Props extends Omit<ImageProps, 'src'> {
  monsterId: string | number
}

export function MonsterImage(props: Props) {
  const { monsterId, ...rest } = props

  if (Number.isNaN(Number(monsterId))) {
    throw new Error('몬스터 아이디가 숫자가 아닙니다.')
  }

  return (
    <Image
      {...rest}
      src={`http://maplestory.io/api/gms/62/mob/animated/${monsterId}/move`}
      alt={props.alt}
      onError={(e) => {
        e.currentTarget.src = `https://maplestory.io/api/kms/284/mob/${monsterId}/icon?resize=3`
      }}
    />
  )
}
