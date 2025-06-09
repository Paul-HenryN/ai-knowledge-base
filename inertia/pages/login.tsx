import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { SiGithub, SiGoogle } from '@icons-pack/react-simple-icons'

export default function LoginPage() {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">Login</DialogTitle>
          <DialogDescription>Login with your favourite provider</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-2">
          <Button variant="outline" className="w-full" type="button" size="lg" asChild>
            <a href="/github/redirect">
              <SiGithub />
              Login with Github
            </a>
          </Button>

          <Button variant="outline" className="w-full" type="button" size="lg" asChild>
            <a href="/google/redirect">
              <SiGoogle />
              Login with Google
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
