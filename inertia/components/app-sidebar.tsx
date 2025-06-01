import { FileTextIcon, HomeIcon, SparkleIcon, StarIcon, UploadIcon } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
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
import { SharedProps } from '@adonisjs/inertia/types'
import { useDocumentUploadDialog } from './document-upload-dialog'
import { Link } from '@inertiajs/react'

const menuItems = [
  {
    title: 'Home',
    icon: HomeIcon,
    href: '/',
  },
  {
    title: 'Ask Nali',
    icon: SparkleIcon,
    href: '/chat',
  },
  {
    title: 'Favorites',
    icon: StarIcon,
    href: '/favorites',
  },
]

export function AppSidebar({ recentDocuments }: SharedProps) {
  const { setOpen } = useDocumentUploadDialog()

  return (
    <Sidebar>
      <SidebarHeader className="flex-row items-center gap-2 p-4">
        <div className="flex items-center gap-3 text-sm">
          <Avatar className="border border-white">
            <AvatarImage src="https://i.pravatar.cc/300" />
            <AvatarFallback>PN</AvatarFallback>
          </Avatar>
          Paul-Henry Ngounou
        </div>
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
                  <SidebarMenuButton asChild>
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

        <SidebarGroup>
          <SidebarGroupLabel>Recent Documents</SidebarGroupLabel>
          {recentDocuments?.map((doc) => (
            <SidebarMenuItem key={doc.id}>
              <SidebarMenuButton asChild>
                <Link href={`/documents/${doc.id}`}>
                  <FileTextIcon className="text-red-600" />
                  <span className="truncate">{doc.name}</span>
                  {/* <StarIcon className="h-3 w-3 text-yellow-500 ml-auto" /> */}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          <Button className="mt-7" variant="outline" onClick={() => setOpen(true)}>
            <UploadIcon />
            Upload Documents
          </Button>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
