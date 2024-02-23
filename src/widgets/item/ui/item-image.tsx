'use client'

import Image, { ImageProps } from 'next/image'

interface Props extends Omit<ImageProps, 'src'> {
  itemId: string | number
}

export function ItemImage(props: Props) {
  const { itemId, ...rest } = props

  if (Number.isNaN(Number(itemId))) {
    throw new Error('아이템 아이디가 숫자가 아닙니다.')
  }

  return (
    <Image
      {...rest}
      src={`http://maplestory.io/api/gms/62/item/${itemId}/icon?resize=3`}
      alt={props.alt}
      onError={(e) => {
        e.currentTarget.src = `https://maplestory.io/api/kms/284/item/${itemId}/icon?resize=3`
      }}
    />
  )
}
