import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/service-detail";
import { getService } from "@/lib/services";

const service = getService("ai-operating-system");

export const metadata: Metadata = {
  title: service?.name,
  description: service?.summary,
};

export default function AiOperatingSystemPage() {
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
