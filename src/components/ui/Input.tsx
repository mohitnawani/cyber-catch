export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="w-full rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm outline-none focus:border-blue-500" {...props} />
}
