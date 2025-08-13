// src/app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Users, MessageSquareQuote } from "lucide-react";
import { getOrders } from "@/ai/flows/order-flow";
import { getDemoRequests } from "@/ai/flows/demo-request-flow";
import { type Order } from "@/lib/types/order";
import { type DemoRequest } from "@/lib/types/demo-request";
import { Skeleton } from "@/components/ui/skeleton";

// Helper to parse price strings like "৳3,999" into numbers
const parsePrice = (priceStr: string): number => {
    if (typeof priceStr !== 'string' || !priceStr) return 0;
    return Number(priceStr.replace(/[^0-9.-]+/g, ""));
};


export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedOrders, fetchedRequests] = await Promise.all([
          getOrders(),
          getDemoRequests()
        ]);
        setOrders(fetchedOrders);
        setRequests(fetchedRequests);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + parsePrice(order.totalPrice), 0);
  const totalOrders = orders.length;
  const uniqueCustomers = new Set(orders.map(order => order.customer.email)).size;
  const totalRequests = requests.length;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
                <Skeleton className="h-8 w-3/4" />
            ) : (
                <div className="text-2xl font-bold">৳{totalRevenue.toLocaleString('en-IN')}</div>
            )}
            <p className="text-xs text-muted-foreground">
              From all processed orders
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             {loading ? (
                <Skeleton className="h-8 w-1/4" />
            ) : (
                <div className="text-2xl font-bold">{totalOrders}</div>
            )}
            <p className="text-xs text-muted-foreground">
              Total orders received
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             {loading ? (
                <Skeleton className="h-8 w-1/4" />
            ) : (
                <div className="text-2xl font-bold">{uniqueCustomers}</div>
            )}
            <p className="text-xs text-muted-foreground">
              Based on unique email addresses
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demo Requests</CardTitle>
            <MessageSquareQuote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             {loading ? (
                <Skeleton className="h-8 w-1/4" />
            ) : (
                <div className="text-2xl font-bold">{totalRequests}</div>
            )}
            <p className="text-xs text-muted-foreground">
              Total demo requests received
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
