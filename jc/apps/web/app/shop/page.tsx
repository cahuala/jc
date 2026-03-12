'use client'

import { CarRegister } from "@/src/components/register/cars/CarRegister";


export default function Home() {
  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <CarRegister/>
      </div>
  );
}
