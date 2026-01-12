import { redirect } from "next/navigation";

import { EmptyOrganization } from "@/components/empty-organization";
import { setActiveOrganization } from "@/lib/auth/auth";
import { getCachedOrganizations } from "@/utils/get-cached-organizations";

type IPlatformPageProps = object;

export default async function PlatformPage(_: IPlatformPageProps) {
  const { data: organizations } = await getCachedOrganizations();

  if (organizations && organizations.length > 0) {
    await setActiveOrganization(
      // eslint-disable-next-line ts/no-non-null-asserted-optional-chain
      organizations[0]?.id!,
      // eslint-disable-next-line ts/no-non-null-asserted-optional-chain
      organizations[0]?.slug!,
    );

    return redirect(`/${organizations[0]?.id}`);
  }

  return <EmptyOrganization />;
}
