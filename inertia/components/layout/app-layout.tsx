import { Button } from '@/components/ui/button'
import { LucideIcon, MoreHorizontal } from 'lucide-react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'
import { DocumentUploadDialog, DocumentUploadDialogProvider } from '../document-upload-dialog'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'
import { QueryClientProvider } from '../query-client-provider'

type BreadcrumbItem = {
  label: string
  icon?: LucideIcon
  href: string
}

export default function AppLayout({
  children,
  breadcrumbData,
}: {
  children: React.ReactNode
  breadcrumbData?: BreadcrumbItem[]
}) {
  const { props } = usePage<SharedProps>()
  const pastBreadcrumbItems = breadcrumbData?.slice(0, breadcrumbData.length - 1)
  const activeBreadcrumbItem = breadcrumbData?.[breadcrumbData.length - 1]

  return (
    <QueryClientProvider>
      <DocumentUploadDialogProvider>
        <SidebarProvider>
          <AppSidebar recentDocuments={props.recentDocuments} />

          <div className="w-full">
            <header className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SidebarTrigger />

                  {pastBreadcrumbItems && (
                    <Breadcrumb>
                      <BreadcrumbList>
                        {pastBreadcrumbItems.map((item) => (
                          <>
                            <BreadcrumbItem>
                              <BreadcrumbLink href={item.href} className="flex gap-2">
                                {item.icon && <item.icon size={18} />}
                                <span className="truncate max-w-[200px]"> {item.label}</span>
                              </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />
                          </>
                        ))}

                        {activeBreadcrumbItem && (
                          <BreadcrumbItem>
                            <BreadcrumbPage className="flex gap-2">
                              {activeBreadcrumbItem.icon && <activeBreadcrumbItem.icon />}
                              <span className="truncate max-w-[300px]">
                                {activeBreadcrumbItem.label}
                              </span>
                            </BreadcrumbPage>
                          </BreadcrumbItem>
                        )}
                      </BreadcrumbList>
                    </Breadcrumb>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </header>

            <main className="p-6">{children}</main>
          </div>
        </SidebarProvider>

        <DocumentUploadDialog />
      </DocumentUploadDialogProvider>
    </QueryClientProvider>
  )
}
