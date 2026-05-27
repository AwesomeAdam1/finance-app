import { Header } from '@/components/header'
import { Metadata } from 'next';
import { Suspense } from 'react'

type Props = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Finance App",
  description: "Finance SaaS platform for managing your finances",
  icons: {
    icon: "/logo.svg",
  },
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
    
      <Suspense fallback={null}>
        <div>
          {children}
        </div>
      </Suspense>
    </>
  )
}

export default DashboardLayout