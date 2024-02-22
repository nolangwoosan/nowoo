"use client";

import Image, { ImageProps } from "next/image";

interface Props extends Omit<ImageProps, "src"> {
  monsterId: string | number;
}

export function MonsterImage(props: Props) {
  const { monsterId, ...rest } = props;

  return (
    <Image
      {...rest}
      src={`http://maplestory.io/api/gms/62/mob/animated/${monsterId}/move`}
      alt={props.alt}
      onError={(e) => {
        e.currentTarget.src = `https://maplestory.io/api/kms/284/mob/${monsterId}/icon?resize=3`;
      }}
    />
  );
}
