import React, { createContext, ReactNode, useState } from 'react'

type ContextProps = {
  chatOpen: boolean,
  setChatOpen: (open: boolean) => void
}

export const LayoutContext = createContext<ContextProps>({
  chatOpen: true,
  setChatOpen: (open) => open
})

type Props = {
  children: ReactNode
}

export const LayoutContextProvider: React.FC<Props> = ({ children }) => {
  const [chatOpen, setChatOpen] = useState(true)

  return (
    <LayoutContext.Provider value={{ chatOpen, setChatOpen }}
    >
      {children}
    </LayoutContext.Provider>
  )
}
