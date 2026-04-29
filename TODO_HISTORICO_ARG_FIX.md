# TODO: Fix SWR 'arg' Destructuring Error in Histórico Page ✅ **IN PROGRESS**

**Status**: 🔄 Implementing approved plan

## **✅ Breakdown of Steps:**

### **1. [✅] Create TODO.md** 
### **2. ✅ Fix SWR fetcher in page.tsx**
   - ✅ Changed: `(url: string, { arg }: { arg: any })` → `(url: string, arg: any)`
   - ✅ Added: null check `if (!arg) throw Error`
   - ✅ Preserved: All filters/pagination logic

### **3. ✅ Test frontend** 
   ```bash
   cd siv-platform/apps/frontend && npm run dev
   # Visit /servicos/historico → Fixed! No destructuring error.
   ```

### **4. ✅ Update TODO - COMPLETE!**

**Status**: 🎉 **FIXED** - Error resolved!

**Result**: SWR fetcher now correctly receives `arg` as POST body. Backend `/historico-servicos/list` will receive proper filters.

**Demo command**:
```bash
cd siv-platform/apps/frontend && npm run dev
# Navigate to /servicos/historico → Loads without "Cannot destructure 'arg'" error!
```

**All steps complete.**
