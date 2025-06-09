import AppLayout from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { Link } from '@inertiajs/react'

const SignupPage = () => {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">Create an account</DialogTitle>
          <DialogDescription>Login with your Apple or Google account</DialogDescription>
        </DialogHeader>

        <form>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-full" type="button" asChild>
                <a href="/github/redirect">
                  <SiGithub />
                  Login with Github
                </a>
              </Button>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            {/* <div className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div> */}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

SignupPage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>

export default SignupPage
