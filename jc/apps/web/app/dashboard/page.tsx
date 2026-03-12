'use client'
import { ClientDashboard } from "@/src/components/dashboard/ClientDashboard";
import { TopBanner } from "@/src/components/shared/TopBanner";

export default function Dashboard() {
  return (
    <>
      <TopBanner />
      <ClientDashboard />
    </>
  );
}