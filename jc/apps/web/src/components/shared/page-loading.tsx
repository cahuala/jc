"use client";

export function PageLoading({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-xl bg-white px-8 py-6 shadow-xl">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#9fc031] border-t-transparent" />
        <span className="text-sm font-medium text-slate-700">
          A processar...
        </span>
      </div>
    </div>
  );
}
