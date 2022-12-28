import { Raleway } from '@next/font/google'

const raleway = Raleway({ subsets: ['latin'] })

type LayoutProps = { className?: string }

const Layout: React.FC<React.PropsWithChildren & LayoutProps> = ({
  children,
  className = ''
}) => {
  return (
    <main className={`min-h-screen text-gray-700 ${raleway.className} ${className}`}>
      {children}
    </main>
  )
}

export default Layout
