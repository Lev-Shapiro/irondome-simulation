import React, { FC } from 'react'

interface ConditionedProps {
  is: boolean
  children: React.ReactNode
}

export const Conditioned: FC<ConditionedProps> = ({ is, children }) => {
  if (!is) return <></>

  return children
}

export const condition = (condition: boolean, children: React.ReactNode) =>
  condition ? children : <></>
