import {
  BookOpenTextIcon,
  FileTextIcon,
  HomeIcon,
  LogOutIcon,
  MessageSquareIcon,
  UploadIcon,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar'
import { Separator } from './ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { useDocumentUploadDialog } from './document-upload-dialog'
import { Link, useForm, usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'

const menuItems = [
  {
    title: 'Home',
    icon: HomeIcon,
    href: '/',
    isActive: (route: string) => route === '/',
  },
  {
    title: 'Knowledge Base',
    icon: BookOpenTextIcon,
    href: '/documents',
    isActive: (route: string) => route.startsWith('/documents'),
  },
]

export function AppSidebar() {
  const { setOpen } = useDocumentUploadDialog()
  const {
    props: { recentDocuments, chats, user },
    url,
  } = usePage<SharedProps>()
  const { post } = useForm()

  const logout = () => {
    post('/logout')
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex-row items-center gap-2 p-4">
        {user && (
          <div className="flex items-center gap-3 text-sm">
            <Avatar>
              {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
              <AvatarFallback>{user.fullName?.charAt(0)}</AvatarFallback>
            </Avatar>

            {user.fullName}
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => {
              return (
                <SidebarMenuItem
                  key={item.title}
                  className="w-full justify-start gap-2 h-8 text-xs"
                >
                  <SidebarMenuButton asChild isActive={item.isActive(url)}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>

        <Separator />

        {chats.length > 0 && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Conversations</SidebarGroupLabel>

              <SidebarMenu>
                {chats.map((chat) => (
                  <SidebarMenuItem key={`chat-${chat.id}`}>
                    <SidebarMenuButton asChild isActive={url === `/chat/${chat.id}`}>
                      <Link href={`/chat/${chat.id}`}>
                        <MessageSquareIcon />
                        {chat.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>{' '}
            <Separator />
          </>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Recent Documents</SidebarGroupLabel>
          {recentDocuments?.length > 0 ? (
            recentDocuments.map((doc) => (
              <SidebarMenuItem key={doc.id}>
                <SidebarMenuButton asChild>
                  <Link href={`/documents/${doc.id}`}>
                    <FileTextIcon className="text-red-600" />
                    <span className="truncate">{doc.name}</span>
                    {/* <StarIcon className="h-3 w-3 text-yellow-500 ml-auto" /> */}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          ) : (
            <p className="text-xs mt-5 px-2 text-muted-foreground">No document</p>
          )}

          <Button className="mt-7" variant="outline" onClick={() => setOpen(true)}>
            <UploadIcon />
            Upload Documents
          </Button>
        </SidebarGroup>

        <SidebarFooter className="mt-auto mb-5">
          {user && (
            <Button variant="secondary" onClick={logout}>
              <LogOutIcon /> Log out
            </Button>
          )}
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
