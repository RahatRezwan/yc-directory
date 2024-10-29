import React from "react";
import Navbar from "../components/navbar";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className='font-work-sans'>
      <Navbar />
      {children}
    </main>
  );
}
