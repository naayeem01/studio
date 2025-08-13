// src/app/admin/layout.tsx
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Home, ShoppingCart, User, LogOut } from "lucide-react";
import Link from 'next/link';
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
            <div className="flex items-center justify-center p-4">
               <Image src="https://oushodcloud.com/public/uploads/25/07/1752687224-974.svg" alt="OushodCloud Logo" width={170} height={40} />
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/admin" passHref>
                    <SidebarMenuButton tooltip="Dashboard">
                        <Home />
                        Dashboard
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/admin/orders" passHref>
                    <SidebarMenuButton tooltip="Orders">
                        <ShoppingCart />
                        Orders
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
               <SidebarMenuItem>
                   <SidebarMenuButton tooltip="Profile">
                        <User />
                        Profile
                   </SidebarMenuButton>
               </SidebarMenuItem>
                <SidebarMenuItem>
                   <SidebarMenuButton tooltip="Logout">
                        <LogOut />
                        Logout
                   </SidebarMenuButton>
               </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 bg-background border-b">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold">Admin Panel</h1>
        </header>
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
