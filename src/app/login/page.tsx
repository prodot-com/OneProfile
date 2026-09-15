import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-[#faf9f6] p-6 md:p-10 relative">
      <div className="absolute top-0 left-0 right-0 h-[400px] overflow-hidden -z-10 pointer-events-none opacity-50">
        <div className="absolute inset-0 bg-[url('/back.png')] bg-cover bg-top" />
        <div className="absolute bottom-0 h-40 w-full bg-gradient-to-t from-[#faf9f6] to-transparent" />
      </div>
      <div className="w-full max-w-sm md:max-w-4xl z-10">
        <LoginForm />
      </div>
    </div>
  )
}
