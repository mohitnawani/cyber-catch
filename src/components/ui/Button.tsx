type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }

export default function Button({ variant = 'primary', className = '', children, ...props }: Props) {
  const base = 'px-4 py-2 rounded-md text-sm font-semibold transition disabled:cursor-not-allowed disabled:bg-gray-mid disabled:text-white disabled:hover:bg-gray-mid'
  const styles = {
    primary: 'bg-brand text-white hover:bg-brand/90',
    secondary: 'border border-brand bg-white text-brand hover:bg-brand/5',
    ghost: 'bg-transparent text-brand hover:bg-brand/5'
  }
  return <button className={`${base} ${styles[variant]} ${className}`} {...props}>{children}</button>
}
