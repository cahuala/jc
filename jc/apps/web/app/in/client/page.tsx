'use client'
import { ClientRegister } from "@/src/components/register/clients/ClientRegister";


export default function Home() {
  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100"> 
        <ClientRegister/>
      </div>
  );
}
