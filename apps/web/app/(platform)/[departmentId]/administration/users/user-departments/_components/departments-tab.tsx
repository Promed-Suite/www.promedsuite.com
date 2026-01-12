"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Building2,
  MoreVertical,
  Pencil,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { redirect } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import { toast } from "sonner";

import type { Department, User } from "@/lib/auth/auth-client";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Textarea } from "@workspace/ui/components/textarea";

export type IDepartmentsTabProps = object;

export default function DepartmentsTab(_: IDepartmentsTabProps) {
  const [availableUsers, setAvailableUsers] = React.useState<
    User[] | undefined
  >(undefined);

  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedDepartment, setSelectedDepartment]
    = useState<Department | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    organizationHead: "",
  });

  // Query to fetch departments
  const {
    data: departments = [],
    isLoading: isLoadingDepartments,
    error: departmentsError,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      try {
        const { data, error } = await authClient.organization.list({
          query: {
            limit: 100,
            sortBy: "name",
            sortDirection: "desc",
          },
        });

        if (error) {
          throw new Error(error.message);
        }

        return data || [];
      }
      catch (error) {
        console.error("Failed to fetch departments:", error);
        throw error;
      }
    },
  });

  // Update department mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedDepartment: {
      id: string;
      name: string;
      description?: string;
      organizationHead?: string;
    }) => {
      const { data, error } = await authClient.organization.update({
        organizationId: updatedDepartment.id,
        data: {
          name: updatedDepartment.name,
          description: updatedDepartment.description,
          organizationHead: updatedDepartment.organizationHead,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Department Updated", {
        description: "Department has been successfully updated.",
      });
      setShowEditDialog(false);
      setSelectedDepartment(null);
      setFormData({ name: "", description: "", organizationHead: "" });
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error.message);
      toast.error("Failed to update department", {
        description: error.message,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });

  // Delete department mutation
  const deleteMutation = useMutation({
    mutationFn: async (organizationId: string) => {
      const { error } = await authClient.organization.delete({
        organizationId,
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    onMutate: async (organizationId: string) => {
      await queryClient.cancelQueries({ queryKey: ["departments"] });

      const previousDepartments = queryClient.getQueryData<Department[]>([
        "departments",
      ]);

      // Optimistic update
      queryClient.setQueryData<Department[]>(
        ["departments"],
        old => old?.filter(dept => dept.id !== organizationId) || [],
      );

      return { previousDepartments };
    },
    onSuccess: () => {
      toast.success("Department Deleted", {
        description: `${selectedDepartment?.name} has been removed from the system.`,
      });
    },
    onError: (error: Error, organizationId, context) => {
      // Rollback on error
      if (context?.previousDepartments) {
        queryClient.setQueryData(["departments"], context.previousDepartments);
      }
      toast.error("Failed to remove department", {
        description: error.message,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      setShowDeleteDialog(false);
      setSelectedDepartment(null);
    },
  });

  const filteredDepartments = departments.filter(
    dept =>
      dept.name.toLowerCase().includes(searchQuery.toLowerCase())
      || dept.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const openEditDialog = (dept: Department) => {
    setSelectedDepartment(dept);
    setFormData({
      name: dept.name,
      description: dept.description ?? "",
      organizationHead: dept.organizationHead ?? "",
    });
    setShowEditDialog(true);
  };

  const openDeleteDialog = (dept: Department) => {
    setSelectedDepartment(dept);
    setShowDeleteDialog(true);
  };

  const handleEditDepartment = () => {
    if (!selectedDepartment)
      return;
    updateMutation.mutate({
      id: selectedDepartment.id,
      ...formData,
    });
  };

  const handleDeleteDepartment = () => {
    if (!selectedDepartment)
      return;
    deleteMutation.mutate(selectedDepartment.id);
  };

  // Handle loading and error states
  if (departmentsError) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-destructive">
            <p>Failed to load departments. Please try again.</p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ["departments"] })}
            >
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  React.useEffect(() => {
    const listUsers = async () => {
      try {
        const { data, error } = await authClient.admin.listUsers({
          query: {
            limit: 100,
            sortBy: "name",
            sortDirection: "desc",
          },
        });

        setAvailableUsers(data?.users);

        if (error) {
          throw new Error(error.message);
        }
      }
      catch (error) {
        console.error("Fetching users failed:", error);
        redirect("/");
      }
    };

    listUsers();
  }, []);

  return (
    <>
      <Card className="sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Departments</CardTitle>
              <CardDescription>
                Manage organizational departments and team structure
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search departments..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {filteredDepartments.length}
              {" "}
              {filteredDepartments.length === 1 ? "department" : "departments"}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ["departments"] })}
              disabled={isLoadingDepartments}
            >
              Refresh
            </Button>
          </div>

          <div className="rounded-lg border border-border">
            {isLoadingDepartments
              ? (
                  <div className="flex h-32 items-center justify-center">
                    <p>Loading departments...</p>
                  </div>
                )
              : filteredDepartments.length === 0
                ? (
                    <div className="flex h-32 items-center justify-center">
                      <p className="text-muted-foreground">
                        {searchQuery
                          ? "No departments found matching your search."
                          : "No departments found."}
                      </p>
                    </div>
                  )
                : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Department</TableHead>
                          <TableHead>Lead</TableHead>
                          <TableHead>Members</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDepartments.map(dept => (
                          <TableRow key={dept.id}>
                            <TableCell>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <Building2 className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium text-foreground">
                                    {dept.name}
                                  </span>
                                </div>
                                {dept.description && (
                                  <span className="text-sm text-muted-foreground">
                                    {dept.description}
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              {dept.organizationHead || "Not assigned"}
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {2}
                                {" "}
                                members
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="default" className="capitalize">
                                active
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
                              }).format(new Date(dept.createdAt))}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => openEditDialog(dept)}
                                  >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit Department
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Users className="mr-2 h-4 w-4" />
                                    View Members
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => openDeleteDialog(dept)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Department
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>Update department information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-dept-name">Department Name</Label>
              <Input
                id="edit-dept-name"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-dept-description">Description</Label>
              <Textarea
                id="edit-dept-description"
                value={formData.description}
                onChange={e =>
                  setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-dept-organization-head">
                Department Lead
              </Label>
              <Select
                name="edit-dept-organizationHead"
                value={formData.organizationHead}
                onValueChange={(value) => {
                  setFormData({ ...formData, organizationHead: value });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select from users..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Users</SelectLabel>
                    {availableUsers?.map(({ id, name }) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleEditDepartment}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Department</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete
              {" "}
              {selectedDepartment?.name}
              ? This
              action cannot be undone and all department data will be removed.
              Members will need to be reassigned.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteDepartment}
              className="bg-destructive text-destructive-foreground"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

// "use client";

// import { authClient, Department } from "@/lib/auth-client";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@workspace/ui/components/dialog";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@workspace/ui/components/dropdown-menu";
// import { Input } from "@workspace/ui/components/input";
// import { Label } from "@workspace/ui/components/label";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@workspace/ui/components/table";
// import { Textarea } from "@workspace/ui/components/textarea";
// import {
//   Building2,
//   MoreVertical,
//   Pencil,
//   Search,
//   Trash2,
//   Users,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";

// // type Department = {
// //   id: string;
// //   name: string;
// //   description: string;
// //   memberCount: number;
// //   organizationHead: string;
// //   createdDate: string | undefined;
// //   status: "active" | "inactive";
// // };

// // const mockDepartments: Department[] = [
// //   {
// //     id: "1",
// //     name: "Engineering",
// //     description: "Software development and technical infrastructure",
// //     memberCount: 45,
// //     organizationHead: "Alice Johnson",
// //     createdDate: "2024-01-15",
// //     status: "active",
// //   },
// //   {
// //     id: "2",
// //     name: "Design",
// //     description: "Product design and user experience",
// //     memberCount: 12,
// //     organizationHead: "Bob Smith",
// //     createdDate: "2024-02-01",
// //     status: "active",
// //   },
// //   {
// //     id: "3",
// //     name: "Marketing",
// //     description: "Brand development and customer acquisition",
// //     memberCount: 18,
// //     organizationHead: "Carol White",
// //     createdDate: "2024-01-20",
// //     status: "active",
// //   },
// //   {
// //     id: "4",
// //     name: "Sales",
// //     description: "Revenue generation and client relationships",
// //     memberCount: 24,
// //     organizationHead: "David Brown",
// //     createdDate: "2024-02-10",
// //     status: "active",
// //   },
// //   {
// //     id: "5",
// //     name: "Customer Support",
// //     description: "Client assistance and issue resolution",
// //     memberCount: 15,
// //     organizationHead: "Eve Martinez",
// //     createdDate: "2024-03-01",
// //     status: "inactive",
// //   },
// // ];

// export interface IDepartmentsTabProps {}

// export default function DepartmentsTab(props: IDepartmentsTabProps) {
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   // const [departments, setDepartments] = useState<Department[]>(mockDepartments);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showCreateDialog, setShowCreateDialog] = useState(false);
//   const [showEditDialog, setShowEditDialog] = useState(false);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [selectedDepartment, setSelectedDepartment] =
//     useState<Department | null>(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     organizationHead: "",
//   });

//   const handleEditDepartment = () => {
//     // if (!selectedDepartment) return;
//     // setDepartments(
//     //   departments.map((dept) =>
//     //     dept.id === selectedDepartment.id
//     //       ? {
//     //           ...dept,
//     //           name: formData.name,
//     //           description: formData.description,
//     //           organizationHead: formData.organizationHead,
//     //         }
//     //       : dept
//     //   )
//     // );
//     // setShowEditDialog(false);
//     // setSelectedDepartment(null);
//     // setFormData({ name: "", description: "", organizationHead: "" });
//     // toast.success("Department Updated", {
//     //   description: `${formData.name} has been successfully updated.`,
//     // });
//   };

//   const {
//     data: departments = [],
//     isLoading: isLoadingDepartments,
//     error: departmentsError,
//   } = useQuery({
//     queryKey: ["departments"],
//     queryFn: async () => {
//       try {
//         const { data, error } = await authClient.organization.list({
//           query: {
//             limit: 100,
//             sortBy: "name",
//             sortDirection: "desc",
//           },
//         });

//         if (error) {
//           throw new Error(error.message);
//         }

//         return data || [];
//       } catch (error) {
//         console.error("Failed to fetch departments:", error);
//         throw error;
//       }
//     },
//   });

//   const filteredDepartments = departments.filter(
//     (dept) =>
//       dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       dept.description?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const openEditDialog = (dept: Department) => {
//     setSelectedDepartment(dept);
//     setFormData({
//       name: dept.name,
//       description: dept.description ?? "",
//       organizationHead: dept.organizationHead ?? "",
//     });
//     setShowEditDialog(true);
//   };

//   const openDeleteDialog = (dept: Department) => {
//     setSelectedDepartment(dept);
//     setShowDeleteDialog(true);
//   };

//   // Delete department mutation
//   const deleteMutation = useMutation({
//     mutationFn: async (organizationId: string) => {
//       const { error } = await authClient.organization.delete({
//         organizationId,
//       });
//     },
//     onMutate: async (organizationId: string) => {
//       await queryClient.cancelQueries({ queryKey: ["departments"] });

//       const previousDepartments = queryClient.getQueryData<Department[]>([
//         "departments",
//       ]);

//       // Optimistic update
//       queryClient.setQueryData<Department[]>(
//         ["departments"],
//         (old) => old?.filter((dept) => dept.id !== organizationId) || []
//       );

//       return { previousDepartments };
//     },
//     onSuccess: () => {
//       toast.success("Department Deleted", {
//         description: `${selectedDepartment?.name} has been removed from the system.`,
//       });
//     },
//     onError: (error: any, organizationId, context) => {
//       // Rollback on error
//       if (context?.previousDepartments) {
//         queryClient.setQueryData(["departments"], context.previousDepartments);
//       }
//       toast.error(error.error?.message || "Failed to remove department");
//     },
//     onSettled: () => {
//       // Always refetch after error or success
//       queryClient.invalidateQueries({ queryKey: ["departments"] });
//       setShowDeleteDialog(false);
//       setSelectedDepartment(null);
//     },
//   });

//   const handleDeleteDepartment = () => {
//     if (!selectedDepartment) return;
//     deleteMutation.mutate(selectedDepartment.id);
//   };

//   return (
//     <>
//       <Card className="sm">
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle>Departments</CardTitle>
//               <CardDescription>
//                 Manage organizational departments and team structure
//               </CardDescription>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex items-center gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//               <Input
//                 placeholder="Search departments..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-9"
//               />
//             </div>
//             <Badge variant="secondary" className="px-3 py-1">
//               {filteredDepartments.length}{" "}
//               {filteredDepartments.length === 1 ? "department" : "departments"}
//             </Badge>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() =>
//                 queryClient.invalidateQueries({ queryKey: ["departments"] })
//               }
//               disabled={isLoadingDepartments}
//             >
//               Refresh
//             </Button>
//           </div>

//           <div className="rounded-lg border border-border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Department</TableHead>
//                   <TableHead>Lead</TableHead>
//                   <TableHead>Members</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Created</TableHead>
//                   <TableHead className="w-[50px]"></TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredDepartments.map((dept) => (
//                   <TableRow key={dept.id}>
//                     <TableCell>
//                       <div className="flex flex-col">
//                         <div className="flex items-center gap-2">
//                           <Building2 className="h-4 w-4 text-muted-foreground" />
//                           <span className="font-medium text-foreground">
//                             {dept.name}
//                           </span>
//                         </div>
//                         {/* <span className="text-sm text-muted-foreground">
//                           {dept.description}
//                         </span> */}
//                       </div>
//                     </TableCell>
//                     <TableCell className="text-sm">
//                       {dept.organizationHead}
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant="secondary">
//                         {10} {"members"}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant={"default"} className="capitalize">
//                         {"Active"}
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
//                       }).format(new Date(dept.createdAt))}
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
//                             // onClick={() => openEditDialog(dept)}
//                             onClick={() => {}}
//                           >
//                             <Pencil className="mr-2 h-4 w-4" />
//                             Edit Department
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>
//                             <Users className="mr-2 h-4 w-4" />
//                             View Members
//                           </DropdownMenuItem>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem
//                             className="text-destructive"
//                             // onClick={() => openDeleteDialog(dept)}
//                             onClick={() => {}}
//                           >
//                             <Trash2 className="mr-2 h-4 w-4" />
//                             Delete Department
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

//       {/* Edit Dialog */}
//       <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Department</DialogTitle>
//             <DialogDescription>Update department information</DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <Label htmlFor="edit-dept-name">Department Name</Label>
//               <Input
//                 id="edit-dept-name"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="edit-dept-description">Description</Label>
//               <Textarea
//                 id="edit-dept-description"
//                 value={formData.description}
//                 onChange={(e) =>
//                   setFormData({ ...formData, description: e.target.value })
//                 }
//                 rows={3}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="edit-dept-organization-head">
//                 Department Lead
//               </Label>
//               <Input
//                 id="edit-dept-organizationHead"
//                 value={formData.organizationHead}
//                 onChange={(e) =>
//                   setFormData({ ...formData, organizationHead: e.target.value })
//                 }
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setShowEditDialog(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleEditDepartment}>Save Changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Dialog */}
//       <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Delete Department</AlertDialogTitle>
//             <AlertDialogDescription>
//               Are you sure you want to delete {selectedDepartment?.name}? This
//               action cannot be undone and all department data will be removed.
//               Members will need to be reassigned.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleDeleteDepartment}
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
