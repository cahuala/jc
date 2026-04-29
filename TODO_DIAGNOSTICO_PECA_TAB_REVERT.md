# TODO: Revert Dynamic Search to Static DB Fetch (Peças from Banco)

Status: Planned per user 'reverter todo'

## Changes:
- page_fixed.tsx → use static useProduto() like main page
- Remove debounce/refetch on search
- Tab already uses DB prop, client filter OK
- Backend no change needed ( /produto/all IS from DB)

## Steps:
1. Edit page_fixed.tsx - revert hook
2. Test static load
3. Complete
