import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode;
    className?: string;
}

export default function Title({children,className}: Props) {
  return (
    <h1 className={`font-semibold text-xl text-primary ${className}`}>{children}</h1>
  )
}