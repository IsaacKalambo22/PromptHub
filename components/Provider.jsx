"use client";
// this provider will be used in the layout 
import { SessionProvider } from 'next-auth/react';

const Provider = ({children, session}) => {

  return (

    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider