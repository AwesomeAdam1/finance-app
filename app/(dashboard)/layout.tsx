import { Header } from '@/components/header'
import { Suspense } from 'react'

type Props = {
  children: React.ReactNode
}

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