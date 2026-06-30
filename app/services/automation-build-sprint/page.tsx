import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/service-detail";
import { getService } from "@/lib/services";

const service = getService("automation-build-sprint");

export const metadata: Metadata = {
  title: service?.name,
  description: service?.summary,
};

export default function AutomationBuildSprintPage() {
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
