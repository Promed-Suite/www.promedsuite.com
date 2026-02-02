import { useParams, usePathname } from "next/navigation";

// Extract the base path (departmentId)
export function getBasePath() {
  const pathname = usePathname();
  const params = useParams(); // Get params to access departmentId
  // If using Next.js dynamic routes like [departmentId]
  if (params.departmentId) {
    return `/${params.departmentId}`;
  }

  // Fallback to extracting from pathname
  const segments = pathname.split("/").filter(Boolean);
  return segments.length > 0 ? `/${segments[0]}` : "";
}

export function getUrlSegments(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  return {
    segments,
    firstSegment: segments[0] || "",
    lastSegment: segments.length > 0 ? segments[segments.length - 1] : "",
    segmentAt: (index: number) => segments[index] || "",
  };
}
