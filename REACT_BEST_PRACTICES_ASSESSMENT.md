# React Best Practices Assessment

## 🔴 CRITICAL - Quick Wins (High Impact, Low Effort)

### 1. **Avoid Barrel File Imports from lucide-react** 
**Impact:** CRITICAL - 200-800ms import cost, slow builds, large bundle size  
**Files:** `app/page.tsx`, `components/my-projection.tsx`, all UI components

**Current:**
```tsx
import { Filter, GithubIcon, Minus, Search, TrendingDown, TrendingUp } from "lucide-react"
```

**Fix:**
```tsx
// Option 1: Direct imports (best performance)
import Filter from "lucide-react/dist/esm/icons/filter"
import GithubIcon from "lucide-react/dist/esm/icons/github"
// ... etc

// Option 2: Next.js optimizePackageImports (easier, good performance)
// Add to next.config.mjs:
experimental: {
  optimizePackageImports: ['lucide-react']
}
```

**Expected Impact:** 15-70% faster dev boot, 28% faster builds, 40% faster cold starts

---

### 2. **Memoize Filtering Logic**
**Impact:** HIGH - Recomputes on every render  
**File:** `app/page.tsx:24`

**Current:**
```tsx
const filteredSenators = senateData.senators.filter((senator) => {
  // ... filtering logic
})
```

**Fix:**
```tsx
const filteredSenators = useMemo(() => {
  return senateData.senators.filter((senator) => {
    const matchesSearch =
      senator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      senator.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
      senator.state.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBloc = selectedBloc === "all" || senator.bloc === selectedBloc
    const matchesState = selectedState === "all" || senator.state === selectedState

    return matchesSearch && matchesBloc && matchesState
  })
}, [searchTerm, selectedBloc, selectedState])
```

**Expected Impact:** Eliminates unnecessary re-filtering on unrelated state changes

---

### 3. **Memoize List Items**
**Impact:** HIGH - Prevents re-renders of unchanged items  
**File:** `components/senator-card.tsx`

**Current:**
```tsx
export function SenatorCard({ senator }: SenatorCardProps) {
  // ...
}
```

**Fix:**
```tsx
import { memo } from "react"

export const SenatorCard = memo(function SenatorCard({ senator }: SenatorCardProps) {
  // ...
})
```

**Expected Impact:** Only re-renders when senator prop actually changes

---

### 4. **Extract Duplicate Helper Functions**
**Impact:** MEDIUM-HIGH - Reduces code duplication and improves maintainability  
**Files:** `components/senator-card.tsx`, `components/bloc-chart.tsx`, `components/brazil-map.tsx`, `components/my-projection.tsx`, `components/projection-chart.tsx`

**Current:** `getBlocColor` and `getBlocTextColor` duplicated in 5+ files

**Fix:** Create `lib/bloc-utils.ts`:
```tsx
export function getBlocColor(bloc: string): string {
  switch (bloc) {
    case "Centro-Esquerda":
      return "bg-red-100 text-red-800 border-red-200"
    case "Centro":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Centro-Direita":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function getBlocTextColor(bloc: string): string {
  switch (bloc) {
    case "Centro-Esquerda":
      return "text-red-700"
    case "Centro":
      return "text-yellow-700"
    case "Centro-Direita":
      return "text-blue-700"
    default:
      return "text-gray-700"
  }
}

export function getBlocHexColor(bloc: string): string {
  switch (bloc) {
    case "Centro-Esquerda":
      return "#ef4444"
    case "Centro":
      return "#eab308"
    case "Centro-Direita":
      return "#3b82f6"
    default:
      return "#6b7280"
  }
}
```

---

## 🟡 HIGH PRIORITY - Performance Optimizations

### 5. **Memoize Expensive Computations in my-projection.tsx**
**Impact:** MEDIUM - Already using useMemo, but can optimize further  
**File:** `components/my-projection.tsx`

**Current:** Good use of `useMemo` for aggregates, but `getBlocColor` and `getBlocTextColor` are recreated on every render

**Fix:**
```tsx
// Move these outside component or use useMemo
const getBlocColor = (bloc: string) => {
  // ... (or import from shared utils)
}

// Or if they need to be in component:
const getBlocColor = useCallback((bloc: string) => {
  // ...
}, [])
```

**Better:** Import from shared utils (see #4)

---

### 6. **Split Page into Server/Client Components**
**Impact:** HIGH - Reduces client bundle size  
**File:** `app/page.tsx`

**Current:** Entire page is `"use client"`

**Fix:** 
- Keep static content as Server Component
- Extract interactive parts (filters, tabs) to separate Client Components
- Use composition pattern

**Structure:**
```
app/page.tsx (Server Component)
  - components/senate-dashboard.tsx (Client Component - interactive parts)
  - components/summary-cards.tsx (Server Component - static data)
```

---

### 7. **Use React.cache() for Data Access**
**Impact:** MEDIUM - If you add data fetching later  
**File:** Future data fetching functions

**Fix:** When adding data fetching:
```tsx
import { cache } from 'react'

export const getSenateData = cache(async () => {
  // fetch data
  return data
})
```

---

## 🟢 MEDIUM PRIORITY - Code Quality

### 8. **Hoist Static JSX Elements**
**Impact:** MEDIUM - Avoids re-creation  
**Files:** Various components with static elements

**Example Fix:**
```tsx
// Before
function Component() {
  return <div>{loading && <LoadingSkeleton />}</div>
}

// After
const loadingSkeleton = <LoadingSkeleton />

function Component() {
  return <div>{loading && loadingSkeleton}</div>
}
```

---

### 9. **Optimize Conditional Rendering**
**Impact:** LOW-MEDIUM - Prevents rendering falsy values  
**Files:** Check for `&&` with numbers

**Current:** No issues found, but be aware:
```tsx
// Bad: renders "0" when count is 0
{count && <Badge>{count}</Badge>}

// Good: renders nothing when count is 0
{count > 0 ? <Badge>{count}</Badge> : null}
```

---

### 10. **Add Error Boundaries**
**Impact:** MEDIUM - Better error handling  
**File:** Create `app/error.tsx` and `app/error-boundary.tsx`

**Fix:**
```tsx
// app/error.tsx
'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Algo deu errado!</h2>
      <button onClick={reset}>Tentar novamente</button>
    </div>
  )
}
```

---

## 📊 Summary

### Quick Wins (Do First):
1. ✅ Fix lucide-react imports (15-70% dev speed improvement)
2. ✅ Memoize filteredSenators (eliminates unnecessary work)
3. ✅ Memoize SenatorCard (prevents list re-renders)
4. ✅ Extract duplicate helpers (DRY principle)

### High Priority:
5. Split page into server/client components
6. Add React.cache() when adding data fetching

### Medium Priority:
7. Hoist static JSX
8. Add error boundaries
9. Review conditional rendering patterns

### Estimated Impact:
- **Bundle Size:** -30-50% (from lucide-react fix)
- **Dev Performance:** +15-70% faster
- **Runtime Performance:** +20-40% (from memoization)
- **Code Maintainability:** Significantly improved

---

## Implementation Order

1. **Day 1:** Fix lucide-react imports (#1) - 30 min
2. **Day 1:** Memoize filtering (#2) - 15 min  
3. **Day 1:** Memoize SenatorCard (#3) - 10 min
4. **Day 1:** Extract helpers (#4) - 45 min
5. **Day 2:** Split server/client components (#6) - 2 hours
6. **Day 2:** Add error boundaries (#10) - 1 hour

**Total Quick Wins Time:** ~2 hours for 4 critical fixes

