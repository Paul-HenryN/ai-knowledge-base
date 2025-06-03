import { Button } from '@/components/ui/button'
import { LucideIcon, MoreHorizontal } from 'lucide-react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
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
import { Link } from '@inertiajs/react'

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
  const pastBreadcrumbItems = breadcrumbData?.slice(0, breadcrumbData.length - 1)
  const activeBreadcrumbItem = breadcrumbData?.[breadcrumbData.length - 1]

  return (
    <QueryClientProvider>
      <DocumentUploadDialogProvider>
        <SidebarProvider>
          <AppSidebar />

          <div className="w-full">
            <header className="px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SidebarTrigger />

                  {pastBreadcrumbItems && (
                    <Breadcrumb>
                      <BreadcrumbList>
                        {pastBreadcrumbItems.map((item) => (
                          <>
                            <BreadcrumbItem>
                              <BreadcrumbLink className="flex gap-2" asChild>
                                <Link href={item.href}>
                                  {item.icon && <item.icon size={18} />}
                                  <span className="truncate max-w-[200px]"> {item.label}</span>
                                </Link>
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

            <main className="px-6">{children}</main>
          </div>
        </SidebarProvider>

        <DocumentUploadDialog />
      </DocumentUploadDialogProvider>
    </QueryClientProvider>
  )
}
