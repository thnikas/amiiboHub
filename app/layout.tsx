import './globals.css'
import { Inter } from 'next/font/google'
import { Navbar,Footer } from '@/components'
import { AmiiboArray } from './context/amiiboArray'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Amiibo hub',
  description: 'Discover the best amiibo in the world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='relative'>
        <AmiiboArray>
          <Navbar/>
          {children}
          <Footer/>
        </AmiiboArray>
      </body>
    </html>
  )
}
