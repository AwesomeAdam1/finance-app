import { Header } from '@/components/header'

type Props = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
    
      <div>
        {children}
      </div>
    </>
  )
}

export default DashboardLayout