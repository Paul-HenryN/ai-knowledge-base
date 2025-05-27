import {
  BookIcon,
  ClockIcon,
  FileIcon,
  FileSpreadsheet,
  FileTextIcon,
  HomeIcon,
  ImageIcon,
  MessageSquare,
  SearchIcon,
  StarIcon,
} from 'lucide-react'
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

const menuItems = [
  {
    title: 'Home',
    icon: HomeIcon,
    href: '/home',
  },
  {
    title: 'Search',
    icon: SearchIcon,
    href: '/search',
  },
  {
    title: 'Messages',
    icon: MessageSquare,
    href: '/messages',
  },
  {
    title: 'Notifications',
    icon: ClockIcon,
    href: '/notifications',
  },
  {
    title: 'Favorites',
    icon: StarIcon,
    href: '/favorites',
  },
]

const documents = [
  {
    id: 'getting-started',
    name: 'Getting Started Guide',
    type: 'pdf',
    size: '2.4 MB',
    modified: '2 hours ago',
    starred: true,
  },
  {
    id: 'api-docs',
    name: 'API Documentation',
    type: 'pdf',
    size: '1.8 MB',
    modified: '1 day ago',
    starred: false,
  },
  {
    id: 'user-manual',
    name: 'User Manual v2.1',
    type: 'pdf',
    size: '5.2 MB',
    modified: '3 days ago',
    starred: true,
  },
  {
    id: 'meeting-notes',
    name: 'Q4 Meeting Notes',
    type: 'doc',
    size: '890 KB',
    modified: '1 week ago',
    starred: false,
  },
  {
    id: 'product-specs',
    name: 'Product Specifications',
    type: 'xlsx',
    size: '1.2 MB',
    modified: '2 weeks ago',
    starred: false,
  },
]

export function AppSidebar() {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileTextIcon className="h-4 w-4 text-red-500" />
      case 'doc':
        return <FileIcon className="h-4 w-4 text-blue-500" />
      case 'xlsx':
        return <FileSpreadsheet className="h-4 w-4 text-green-500" />
      case 'image':
        return <ImageIcon className="h-4 w-4 text-purple-500" />
      default:
        return <FileIcon className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex-row items-center gap-2 p-4">
        <BookIcon className="size-6 text-gray-800" />

        <div>
          <h1 className="font-semibold text-gray-900">KnowledgeAI</h1>
          <p className="text-xs text-gray-500">Workspace</p>
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
                  <SidebarMenuButton>
                    <item.icon className="h-4 w-4" />
                    <span className="truncate">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>

        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel>Recent Documents</SidebarGroupLabel>
          {documents.map((doc) => (
            <SidebarMenuItem key={doc.id}>
              <SidebarMenuButton>
                {getFileIcon(doc.type)}

                <span className="truncate">{doc.name}</span>

                {doc.starred && <StarIcon className="h-3 w-3 text-yellow-500 ml-auto" />}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
