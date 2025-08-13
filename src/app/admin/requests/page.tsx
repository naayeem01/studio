// src/app/admin/requests/page.tsx
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
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { getDemoRequests, updateDemoRequestStatus } from "@/ai/flows/demo-request-flow";
import { type DemoRequest, type DemoRequestStatus, DemoRequestStatusSchema } from "@/lib/types/demo-request";
import { useToast } from "@/hooks/use-toast";


export default function DemoRequestsPage() {
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const fetchRequests = async () => {
    try {
      const fetchedRequests = await getDemoRequests();
      setRequests(fetchedRequests);
    } catch (error) {
      console.error("Failed to fetch demo requests:", error);
      toast({ title: "Error", description: "Failed to load requests.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = (id: string, status: DemoRequestStatus) => {
    startTransition(async () => {
      try {
        const success = await updateDemoRequestStatus(id, status);
        if (success) {
          toast({ title: "Success", description: "Request status updated." });
          // Re-fetch to show the latest state
          await fetchRequests();
        } else {
          toast({ title: "Error", description: "Could not update status.", variant: "destructive" });
        }
      } catch (error) {
        console.error("Failed to update status:", error);
        toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
      }
    });
  };

  const getStatusBadgeVariant = (status: DemoRequestStatus) => {
    switch (status) {
        case "Pending":
            return "secondary";
        case "Contacted":
            return "default";
        case "Completed":
            return "default"; // Could be a success variant if you add one
        case "Cancelled":
            return "destructive";
        default:
            return "outline";
    }
  }

  if (loading) {
    return <div>Loading requests...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Demo Requests</h2>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>{request.mobile}</TableCell>
                  <TableCell className="max-w-xs truncate">{request.message || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(request.status)}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0" disabled={isPending}>
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {DemoRequestStatusSchema.options.map((status) => (
                                <DropdownMenuItem
                                    key={status}
                                    onClick={() => handleStatusChange(request.id, status)}
                                    disabled={isPending || request.status === status}
                                >
                                    Mark as {status}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">No demo requests found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
