import { NotFound } from "@/components/shared/NotFound/NotFound";

// notFound() from a page inside (site) — e.g. /services/<unknown-slug> —
// lands here, already wrapped by the (site) layout's navbar and footer. The
// root not-found.tsx adds that chrome itself, so using it here showed the
// navbar twice.
export default function SiteNotFound() {
  return <NotFound />;
}
