'use client'
import { LoginPage } from "@/src/components/auth/LoginPage";
export default function Home() {
  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100"> 
        <LoginPage/>
      </div>
  );
}
