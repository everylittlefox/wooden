import { Montserrat } from '@next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

type LayoutProps = { className?: string }

const Layout: React.FC<React.PropsWithChildren & LayoutProps> = ({
  children,
  className = ''
}) => {
  return (
    <main className={`min-h-screen ${montserrat.className} ${className}`}>
      {children}
    </main>
  )
}

export default Layout
