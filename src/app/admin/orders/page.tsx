
// src/app/admin/orders/page.tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { getOrders, updateOrderStatus, deleteOrder } from "@/ai/flows/order-flow";
import { type Order, type OrderStatus, OrderStatusSchema } from "@/lib/types/order";
import { useToast } from "@/hooks/use-toast";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger 
} from "@/components/ui/alert-dialog";


export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const fetchOrders = async () => {
    setLoading(true);
    try {
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast({ title: "Error", description: "Failed to load orders.", variant: "destructive" });
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (id: string, status: OrderStatus) => {
    startTransition(async () => {
      try {
        const success = await updateOrderStatus(id, status);
        if (success) {
          toast({ title: "Success", description: "Order status updated." });
          await fetchOrders(); // Re-fetch to show the latest state
        } else {
          toast({ title: "Error", description: "Could not update status.", variant: "destructive" });
        }
      } catch (error) {
        console.error("Failed to update status:", error);
        toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
      }
    });
  };

  const handleDeleteOrder = (id: string) => {
    startTransition(async () => {
      try {
        const success = await deleteOrder(id);
        if (success) {
          toast({ title: "Success", description: "Order deleted." });
          await fetchOrders();
        } else {
          toast({ title: "Error", description: "Could not delete order.", variant: "destructive" });
        }
      } catch (error) {
        console.error("Failed to delete order:", error);
        toast({ title: "Error", description: "An unexpected error occurred during deletion.", variant: "destructive" });
      }
    });
  };

  const getStatusBadgeVariant = (status: OrderStatus) => {
    switch (status) {
        case "Paid":
            return "default"; // Greenish
        case "Shipped":
            return "default";
        case "Pending Payment":
            return "secondary"; // Yellowish/Gray
        case "Processing":
            return "outline"; // Bluish
        case "Cancelled":
            return "destructive"; // Red
        default:
            return "outline";
    }
  };

  const filteredOrders = orders.filter(order =>
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.mobile.includes(searchTerm)
  );

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Orders</h2>
        <div className="w-1/3">
            <Input 
                placeholder="Search by Order ID or Phone Number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell className="font-medium">{order.orderId}</TableCell>
                  <TableCell>
                    <div className="font-medium">{order.customer.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {order.customer.email}
                    </div>
                  </TableCell>
                  <TableCell>{order.mobile}</TableCell>
                  <TableCell>{order.plan}</TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0" disabled={isPending}>
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger disabled={isPending}>Change Status</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                    {OrderStatusSchema.options.map((status) => (
                                        <DropdownMenuItem
                                            key={status}
                                            onClick={() => handleStatusChange(order.orderId, status)}
                                            disabled={isPending || order.status === status}
                                        >
                                            {status}
                                        </DropdownMenuItem>
                                    ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuSeparator />
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="text-destructive" disabled={isPending}>
                                    Delete Order
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                          </DropdownMenuContent>
                      </DropdownMenu>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the order
                                  for {order.customer.name} ({order.orderId}).
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteOrder(order.orderId)} className="bg-destructive hover:bg-destructive/90">
                                  Yes, delete order
                              </AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">No orders found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
       <Pagination className="mt-6">
        <PaginationContent>
            <PaginationItem>
            <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationLink href="#" isActive>
                2
            </PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
            <PaginationNext href="#" />
            </PaginationItem>
        </PaginationContent>
        </Pagination>
    </div>
  );
}
