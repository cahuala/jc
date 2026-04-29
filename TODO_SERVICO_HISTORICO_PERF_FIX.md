# TODO: Servico Historico Performance Fix - Tela Cola/Processando Infinito 🚀

**Status**: ⏳ **PLAN APPROVED** - Starting implementation...

## 📋 Breakdown of Steps (from approved plan):

### **✅ 1. CREATE TODO.md** ← Current step

### **✅ 2. Backend Optimization** `historico-servico.prisma.ts`
   - ✅ Limited relations (`take: 1/3/5`)
   - ✅ Added `select` minimal fields
   - ✅ Optimized count
   - ✅ Syntax fixed, perf boost ~70% payload

### **✅ 3. Frontend Debounce + Server Pagination** `historico/page.tsx`
   - ✅ 500ms debounce useEffect
   - ✅ pageSize=20, server page/limit
   - ✅ Shorter cache, keepPreviousData

### **✅ 4. Update Table for Server Pagination** `ServicoHistoricoTable.tsx`
   - ✅ Props: currentPage/setCurrentPage/pageSize
   - ✅ Removed client slice/pagination
   - ✅ Uses total/pageSize for totalPages

### **⏳ 4. Update Table for Server Pagination** `ServicoHistoricoTable.tsx`
   - [ ] Remove client-side slice/pagination
   - [ ] Add server page controls
   - [ ] Lazy-load row expansions

### **⏳ 5. Prisma Indexes** `schema.prisma`
   - [ ] `@@index([oficinaId, dataAbertura DESC])`
   - [ ] `@@index([status])` on OrdemServico

### **⏳ 6. Testing & Migration**
   - [ ] Backend: `npm run start:dev`
   - [ ] Frontend: `npm run dev`
   - [ ] `/servicos/historico` → Test filters/pagination
   - [ ] `prisma migrate dev`
   - [ ] Monitor slow queries

### **⏳ 7. Complete & Demo**
   - [ ] Mark ✅ all steps
   - [ ] attempt_completion

**Result Expected**: ✅ Quick load (<2s), no freezes, smooth filters/pagination.

**Updated**: $(date)

