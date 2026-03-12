'use client';
'lucide-react';

export default function ConfiguracoesLayout({ children }) {
 

  return (
    <div className="flex h-screen bg-gray-100">
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}