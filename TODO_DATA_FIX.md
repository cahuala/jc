# TODO Progress Tracker - OrdemServicoTable Data Compatibility Fix

## Issues from Real API Data (User Sample)
- Dates: \"DD/MM/YYYY\" strings → formatDateTime fails (expects ISO).
- Vehicle: `viatura` → map to `veiculo`.
- Mechanic: `mecanicos[]` → first `nome`.
- Peças: `precoUnitario`/`precoTotal` → map to `preco`/`quantidade`.
- Currency: Standardize \"Kz\".
- Totals: Use direct `valorServicos`/`valorPecas`/`valorTotal`.

## Approved Plan Breakdown
- [ ] Step 1: Update interfaces to match API (add viatura, mecanicos, precoUnitario/precoTotal).
- [ ] Step 2: Transform data in component (map fields, handle dates).
- [ ] Step 3: Fix currency/formatting in renders.
- [ ] Step 4: Update totals display (direct props).
- [ ] Step 5: Test with sample data.
- [ ] Step 6: Complete & merge with original TODO.md.

**Next**: Interface + mapping edits.

