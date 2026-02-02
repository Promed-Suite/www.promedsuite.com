"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Ban,
  Eye,
  MonitorX,
  MoreVertical,
  Search,
  Shield,
  UserX,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import type { User } from "@/lib/auth/auth-client";

import { authClient } from "@/lib/auth/auth-client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Input } from "@workspace/ui/components/input";
import { Spinner } from "@workspace/ui/components/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";

export function UsersTab() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { refetch: refetchSession } = authClient.useSession();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isImpersonating, setIsImpersonating] = useState(false);

  // Fetch users using React Query
  const {
    data: users = [],
    isLoading: isLoadingUsers,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const { data, error } = await authClient.admin.listUsers({
          query: {
            limit: 100,
            sortBy: "name",
            sortDirection: "desc",
          },
        });

        if (error) {
          throw new Error(error.message);
        }

        return data?.users || [];
      }
      catch (error) {
        console.error("Failed to fetch users:", error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
  });

  // Ban/Unban mutation
  const banMutation = useMutation({
    mutationFn: async ({
      userId,
      isBanned,
    }: {
      userId: string;
      isBanned: boolean;
    }) => {
      if (isBanned) {
        const { error } = await authClient.admin.unbanUser({ userId });
        if (error)
          throw error;
      }
      else {
        const { error } = await authClient.admin.banUser({ userId });
        if (error)
          throw error;
      }
    },
    onMutate: async ({ userId, isBanned }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["users"] });

      // Snapshot the previous value
      const previousUsers = queryClient.getQueryData<User[]>(["users"]);

      // Optimistically update to the new value
      queryClient.setQueryData<User[]>(
        ["users"],
        old =>
          old?.map(user =>
            user.id === userId ? { ...user, banned: !isBanned } : user,
          ) || [],
      );

      return { previousUsers };
    },
    onSuccess: () => {
      toast.success(selectedUser?.banned ? "User Unbanned" : "User Banned", {
        description: `${selectedUser?.name} has been ${selectedUser?.banned ? "unbanned" : "banned"}.`,
      });
    },
    onError: (error: any, variables, context) => {
      // Rollback on error
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
      toast.error(
        error.error?.message
        || `Failed to ${variables.isBanned ? "unban" : "ban"} user`,
      );
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setShowBanDialog(false);
      setSelectedUser(null);
    },
  });

  // Revoke sessions mutation
  const revokeMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await authClient.admin.revokeUserSessions({ userId });
      if (error)
        throw error;
    },
    onSuccess: () => {
      toast.success(`${selectedUser?.name}'s sessions revoked`);
      setSelectedUser(null);
    },
    onError: (error: any) => {
      toast.error(error.error?.message || "Failed to revoke user sessions");
    },
  });

  // Delete user mutation
  const deleteMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await authClient.admin.removeUser({ userId });
      if (error)
        throw error;
    },
    onMutate: async (userId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["users"] });

      // Snapshot the previous value
      const previousUsers = queryClient.getQueryData<User[]>(["users"]);

      // Optimistically update to the new value
      queryClient.setQueryData<User[]>(
        ["users"],
        old => old?.filter(user => user.id !== userId) || [],
      );

      return { previousUsers };
    },
    onSuccess: () => {
      toast.success("User Deleted", {
        description: `${selectedUser?.name} has been removed from the system.`,
      });
    },
    onError: (error: any, userId, context) => {
      // Rollback on error
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
      toast.error(error.error?.message || "Failed to remove user");
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setShowDeleteDialog(false);
      setSelectedUser(null);
    },
  });

  // Impersonate user mutation
  const impersonateMutation = useMutation({
    mutationFn: async (userId: string) => {
      setIsImpersonating(true);
      const { error } = await authClient.admin.impersonateUser({ userId });
      if (error)
        throw error;
    },
    onSuccess: async () => {
      // Refetch session to get new impersonated session
      await refetchSession();
      toast.success(`Impersonating ${selectedUser?.name}`);
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error.error?.message || "Failed to impersonate user");
      setIsImpersonating(false);
    },
  });

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
      || user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleBanUser = () => {
    if (!selectedUser)
      return;
    banMutation.mutate({
      userId: selectedUser.id,
      isBanned: selectedUser.banned || false,
    });
  };

  const handleRevokeSession = () => {
    if (!selectedUser)
      return;
    revokeMutation.mutate(selectedUser.id);
  };

  const handleDeleteUser = () => {
    if (!selectedUser)
      return;
    deleteMutation.mutate(selectedUser.id);
  };

  const handleImpersonate = (user: User) => {
    setSelectedUser(user);
    impersonateMutation.mutate(user.id);
  };

  if (isLoadingUsers) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner className="h-8 w-8" />
        <span className="ml-2">Loading users...</span>
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <h3 className="text-lg font-medium">Failed to load users</h3>
          <p className="text-sm text-muted-foreground">
            {usersError instanceof Error
              ? usersError.message
              : "An error occurred"}
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ["users"] })}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage user accounts, permissions, and access control
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {filteredUsers.length}
              {" "}
              {filteredUsers.length === 1 ? "user" : "users"}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ["users"] })}
              disabled={isLoadingUsers}
            >
              Refresh
            </Button>
          </div>

          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0
                  ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center py-8 text-muted-foreground"
                        >
                          {searchQuery
                            ? "No users match your search"
                            : "No users found"}
                        </TableCell>
                      </TableRow>
                    )
                  : (
                      filteredUsers.map(user => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium text-foreground">
                                {user.name}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {user.email}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.role === "admin" ? "default" : "secondary"
                              }
                              className="capitalize"
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.banned === false
                                  ? "default"
                                  : user.banned === true
                                    ? "destructive"
                                    : "secondary"
                              }
                              className="capitalize"
                            >
                              {user.banned ? "Banned" : "Active"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Intl.DateTimeFormat(navigator.language, {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                              hour12: false,
                            }).format(new Date(user.updatedAt))}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  disabled={isImpersonating}
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleImpersonate(user)}
                                  disabled={isImpersonating}
                                >
                                  {isImpersonating
                                    && selectedUser?.id === user.id
                                    ? (
                                        <Spinner className="mr-2 h-4 w-4" />
                                      )
                                    : (
                                        <Eye className="mr-2 h-4 w-4" />
                                      )}
                                  Impersonate User
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedUser(user);
                                    handleRevokeSession();
                                  }}
                                  disabled={revokeMutation.isPending}
                                >
                                  {revokeMutation.isPending
                                    && selectedUser?.id === user.id
                                    ? (
                                        <Spinner className="mr-2 h-4 w-4" />
                                      )
                                    : (
                                        <MonitorX className="mr-2 h-4 w-4" />
                                      )}
                                  Revoke Session
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Shield className="mr-2 h-4 w-4" />
                                  Change Role
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setShowBanDialog(true);
                                  }}
                                  disabled={banMutation.isPending}
                                >
                                  {banMutation.isPending
                                    && selectedUser?.id === user.id
                                    ? (
                                        <Spinner className="mr-2 h-4 w-4" />
                                      )
                                    : (
                                        <Ban className="mr-2 h-4 w-4" />
                                      )}
                                  {user.banned ? "Unban User" : "Ban User"}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setShowDeleteDialog(true);
                                  }}
                                  disabled={deleteMutation.isPending}
                                >
                                  {deleteMutation.isPending
                                    && selectedUser?.id === user.id
                                    ? (
                                        <Spinner className="mr-2 h-4 w-4" />
                                      )
                                    : (
                                        <UserX className="mr-2 h-4 w-4" />
                                      )}
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Ban Dialog */}
      <AlertDialog open={showBanDialog} onOpenChange={setShowBanDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedUser?.banned ? "Unban User" : "Ban User"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedUser?.banned
                ? `Are you sure you want to unban ${selectedUser?.name}? They will regain access to the platform.`
                : `Are you sure you want to ban ${selectedUser?.name}? They will lose access to the platform immediately.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={banMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBanUser}
              disabled={banMutation.isPending}
            >
              {banMutation.isPending
                ? (
                    <Spinner className="mr-2 h-4 w-4" />
                  )
                : selectedUser?.banned
                  ? (
                      "Unban"
                    )
                  : (
                      "Ban"
                    )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete
              {" "}
              {selectedUser?.name}
              ?
              This action cannot be undone and all user data will be removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-destructive text-destructive-foreground"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending
                ? (
                    <Spinner className="mr-2 h-4 w-4" />
                  )
                : (
                    "Delete"
                  )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

// "use client";

// import { authClient, User } from "@/lib/auth-client";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@workspace/ui/components/alert-dialog";
// import { Badge } from "@workspace/ui/components/badge";
// import { Button } from "@workspace/ui/components/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@workspace/ui/components/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@workspace/ui/components/dropdown-menu";
// import { Input } from "@workspace/ui/components/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@workspace/ui/components/table";
// import {
//   Ban,
//   Eye,
//   MonitorX,
//   MoreVertical,
//   Search,
//   Shield,
//   UserX,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import * as React from "react";
// import { useState } from "react";
// import { toast } from "sonner";

// export function UsersTab() {
//   const router = useRouter();
//   const { refetch } = authClient.useSession();

//   const [users, setUsers] = useState<User[] | undefined>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [showBanDialog, setShowBanDialog] = useState(false);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);

//   const filteredUsers = users?.filter(
//     (user) =>
//       user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleBanUser = () => {
//     if (!selectedUser) return;
//     // setUsers(users?.filter((u) => u.id !== selectedUser.id));
//     if (selectedUser.banned) {
//       authClient.admin.unbanUser(
//         { userId: selectedUser.id },
//         {
//           onError: (error) => {
//             toast.error(error.error.message || "Failed to unban user");
//           },
//           onSuccess: () => {
//             toast.success(
//               selectedUser.banned ? "User Unbanned" : "User Banned",
//               {
//                 description: `${selectedUser.name} has been ${selectedUser.banned ? "unbanned" : "banned"}.`,
//               }
//             );
//             router.refresh();
//           },
//         }
//       );
//     } else {
//       authClient.admin.banUser(
//         { userId: selectedUser.id },
//         {
//           onError: (error) => {
//             toast.error(error.error.message || "Failed to ban user");
//           },
//           onSuccess: () => {
//             toast.success(
//               selectedUser.banned ? "User Unbanned" : "User Banned",
//               {
//                 description: `${selectedUser.name} has been ${selectedUser.banned ? "unbanned" : "banned"}.`,
//               }
//             );
//             router.refresh();
//           },
//         }
//       );
//     }
//     setShowBanDialog(false);
//   };

//   const handleRevokeSession = () => {
//     if (!selectedUser) return;
//     // setUsers(users?.filter((u) => u.id !== selectedUser.id));
//     authClient.admin.revokeUserSessions(
//       { userId: selectedUser.id },
//       {
//         onError: (error) => {
//           toast.error(error.error.message || "Failed to revoke user sessions");
//         },
//         onSuccess: () => {
//           toast.success(`${selectedUser.name}'s sessions revoked`);
//         },
//       }
//     );
//   };

//   const handleDeleteUser = () => {
//     if (!selectedUser) return;
//     authClient.admin.removeUser(
//       { userId: selectedUser.id },
//       {
//         onError: (error) => {
//           toast.error(error.error.message || "Failed to remove user");
//         },
//         onSuccess: () => {
//           toast.success("User Deleted", {
//             description: `${selectedUser.name} has been removed from the system.`,
//           });
//           router.refresh();
//         },
//       }
//     );
//     setShowDeleteDialog(false);
//   };

//   const handleImpersonate = (user: User) => {
//     if (!user) return;
//     authClient.admin.impersonateUser(
//       { userId: user.id },
//       {
//         onError: (error) => {
//           toast.error(error.error.message || "Failed to impersonate user");
//         },
//         onSuccess: () => {
//           refetch();
//           router.push("/");
//         },
//       }
//     );
//     setShowDeleteDialog(false);
//   };

//   React.useEffect(() => {
//     const listUsers = async () => {
//       try {
//         const { data: users, error } = await authClient.admin.listUsers({
//           query: {
//             limit: 100,
//             sortBy: "name",
//             sortDirection: "desc",
//           },
//         });
//         console.log({ users });

//         setUsers(users?.users);
//       } catch (error) {
//         console.error("Failed to fetch users:", error);
//       }
//     };

//     listUsers();
//   }, []);

//   return (
//     <>
//       <Card>
//         <CardHeader>
//           <CardTitle>User Management</CardTitle>
//           <CardDescription>
//             Manage user accounts, permissions, and access control
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex items-center gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//               <Input
//                 placeholder="Search users by name or email..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-9"
//               />
//             </div>
//             <Badge variant="secondary" className="px-3 py-1">
//               {filteredUsers?.length}{" "}
//               {filteredUsers?.length === 1 ? "user" : "users"}
//             </Badge>
//           </div>

//           <div className="rounded-lg border border-border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>User</TableHead>
//                   <TableHead>Role</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Updated At</TableHead>
//                   <TableHead className="w-[50px]"></TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredUsers?.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell>
//                       <div className="flex flex-col">
//                         <span className="font-medium text-foreground">
//                           {user.name}
//                         </span>
//                         <span className="text-sm text-muted-foreground">
//                           {user.email}
//                         </span>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <Badge
//                         variant={
//                           user.role === "admin" ? "default" : "secondary"
//                         }
//                         className="capitalize"
//                       >
//                         {user.role}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <Badge
//                         variant={
//                           user.banned === false
//                             ? "default"
//                             : user.banned === true
//                               ? "destructive"
//                               : "secondary"
//                         }
//                         className="capitalize"
//                       >
//                         {user.banned ? "Banned" : "Active"}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="text-sm text-muted-foreground">
//                       {new Intl.DateTimeFormat(navigator.language, {
//                         year: "numeric",
//                         month: "numeric",
//                         day: "numeric",
//                         hour: "numeric",
//                         minute: "numeric",
//                         second: "numeric",
//                         hour12: false,
//                         timeZone: "America/Los_Angeles",
//                       }).format(user.updatedAt)}
//                       {/* "30 mins ago" */}
//                     </TableCell>
//                     <TableCell>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <MoreVertical className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem
//                             onClick={() => handleImpersonate(user)}
//                           >
//                             <Eye className="mr-2 h-4 w-4" />
//                             Impersonate User
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             onClick={() => {
//                               setSelectedUser(user);
//                               handleRevokeSession();
//                             }}
//                           >
//                             <MonitorX className="mr-2 h-4 w-4" />
//                             Revoke Session
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>
//                             <Shield className="mr-2 h-4 w-4" />
//                             Change Role
//                           </DropdownMenuItem>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem
//                             onClick={() => {
//                               setSelectedUser(user);
//                               setShowBanDialog(true);
//                             }}
//                           >
//                             <Ban className="mr-2 h-4 w-4" />
//                             {user.banned ? "Unban User" : "Ban User"}
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             className="text-destructive"
//                             onClick={() => {
//                               setSelectedUser(user);
//                               setShowDeleteDialog(true);
//                             }}
//                           >
//                             <UserX className="mr-2 h-4 w-4" />
//                             Delete User
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Ban Dialog */}
//       <AlertDialog open={showBanDialog} onOpenChange={setShowBanDialog}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>
//               {selectedUser?.banned ? "Unban User" : "Ban User"}
//             </AlertDialogTitle>
//             <AlertDialogDescription>
//               {selectedUser?.banned
//                 ? `Are you sure you want to unban ${selectedUser?.name}? They will regain access to the platform.`
//                 : `Are you sure you want to ban ${selectedUser?.name}? They will lose access to the platform immediately.`}
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={handleBanUser}>
//               {selectedUser?.banned ? "Unban" : "Ban"}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       {/* Delete Dialog */}
//       <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Delete User</AlertDialogTitle>
//             <AlertDialogDescription>
//               Are you sure you want to permanently delete {selectedUser?.name}?
//               This action cannot be undone and all user data will be removed.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleDeleteUser}
//               className="bg-destructive text-destructive-foreground"
//             >
//               Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// }
