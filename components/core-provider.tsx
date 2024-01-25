'use client'

import { Fragment, type PropsWithChildren } from 'react'

export default function CoreProvider({ children }: Readonly<PropsWithChildren>) {
  return <Fragment>{children}</Fragment>
}
