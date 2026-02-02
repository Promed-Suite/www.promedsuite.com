import * as React from "react";

import { getOrganizations } from "@/lib/auth/auth";

export const getCachedOrganizations = React.cache(async () => {
  return await getOrganizations();
});
