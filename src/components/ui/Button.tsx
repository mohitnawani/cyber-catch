type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }

export default function Button({ variant = 'primary', className = '', children, ...props }: Props) {
  const base = 'inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-semibold leading-5 transition whitespace-nowrap disabled:cursor-not-allowed disabled:bg-gray-mid disabled:text-white disabled:hover:bg-gray-mid'
  const styles = {
    primary: 'bg-brand text-white hover:bg-brand/90',
    secondary: 'border border-brand bg-white text-brand hover:bg-brand/5',
    ghost: 'bg-transparent text-brand hover:bg-brand/5'
  }
  return <button className={`${base} ${styles[variant]} ${className}`} {...props}>{children}</button>
}
