type ButtonProps = { onClick?: () => void; className?: string }

const Button: React.FC<React.PropsWithChildren & ButtonProps> = ({
  children,
  onClick,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`border text-gray-800 text-sm hover:bg-gray-50 shadow-md rounded inline-flex py-2 px-5 ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
