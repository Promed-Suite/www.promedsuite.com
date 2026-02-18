import * as React from "react";

import { listPasskeys } from "@/lib/auth/auth";

export const getCachedUserPasskeys = React.cache(async () => {
  return await listPasskeys();
});
