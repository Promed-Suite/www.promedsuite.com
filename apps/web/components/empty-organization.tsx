import { ArrowUpRightIcon, Building2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@workspace/ui/components/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty";

export function EmptyOrganization() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Building2 />
        </EmptyMedia>
        <EmptyTitle>No Departments</EmptyTitle>
        <EmptyDescription>
          Before you start using the system, create an organization to manage
          your team
        </EmptyDescription>
      </EmptyHeader>
      {/* <EmptyContent>
        <div className="flex gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent> */}
      <Button
        variant="link"
        asChild
        // className="hover:text-primary underline-offset-4 hover:underline"
        size="sm"
      >
        <Link href="/administration/users/user-departments">
          Create your first organization
          {" "}
          <ArrowUpRightIcon />
        </Link>
      </Button>
    </Empty>
  );
}
