type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }

export default function Button({ variant = 'primary', className = '', children, ...props }: Props) {
  const base = 'px-4 py-2 rounded-lg font-medium'
  const styles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-zinc-700 text-white hover:bg-zinc-600',
    ghost: 'bg-transparent border border-zinc-600 hover:bg-zinc-800'
  }
  return <button className={`${base} ${styles[variant]} ${className}`} {...props}>{children}</button>
}
