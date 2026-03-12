'use client'
import { Features } from "@/src/components/features/Features";
import { Hero } from "@/src/components/hero/Hero";
import { WorkshopList } from "@/src/components/oficinas-list/WorkShopList";
import { CarsForSale } from "@/src/components/shop/cars/CarsForSale";
import { Testimonials } from "@/src/components/testimonials/Testimonials";
import { AppDownload } from "@/src/components/app-download/AppDownload";
import { AdsAndPromotions } from "@/src/components/ads/AdsAndPromotions";

export default function Home() {
  return (
    <>
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Hero/>
        <CarsForSale/>
        <AdsAndPromotions/>
        <WorkshopList/>
        <Features/>
        <AppDownload/>
        <Testimonials/>
      </main>
    </>
  );
}
