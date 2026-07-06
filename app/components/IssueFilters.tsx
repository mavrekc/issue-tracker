'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ISSUE_STATUS, ISSUE_PRIORITY } from '@/db/schema'
import { FormInput, FormSelect } from './ui/Form'
import Button from './ui/Button'
import { Search, X } from 'lucide-react'

export default function IssueFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('q') ?? '')

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(updates)) {
      if (!value) params.delete(key)
      else params.set(key, value)
    }
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  // Debounce the search input; only `search` should re-arm the timer.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (search === (searchParams.get('q') ?? '')) return
    const t = setTimeout(() => updateParams({ q: search }), 300)
    return () => clearTimeout(t)
  }, [search])

  const hasFilters =
    !!searchParams.get('q') ||
    !!searchParams.get('status') ||
    !!searchParams.get('priority') ||
    !!searchParams.get('sort')

  const handleClear = () => {
    setSearch('')
    router.replace(pathname, { scroll: false })
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-6">
      <div className="relative sm:flex-1">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <FormInput
          type="text"
          placeholder="Search issues..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <FormSelect
        className="sm:w-44"
        value={searchParams.get('status') ?? ''}
        onChange={(e) => updateParams({ status: e.target.value })}
        options={[
          { label: 'All statuses', value: '' },
          ...Object.values(ISSUE_STATUS),
        ]}
      />

      <FormSelect
        className="sm:w-44"
        value={searchParams.get('priority') ?? ''}
        onChange={(e) => updateParams({ priority: e.target.value })}
        options={[
          { label: 'All priorities', value: '' },
          ...Object.values(ISSUE_PRIORITY),
        ]}
      />

      <FormSelect
        className="sm:w-44"
        value={searchParams.get('sort') ?? 'newest'}
        onChange={(e) =>
          updateParams({
            sort: e.target.value === 'newest' ? '' : e.target.value,
          })
        }
        options={[
          { label: 'Newest', value: 'newest' },
          { label: 'Oldest', value: 'oldest' },
          { label: 'Priority', value: 'priority' },
        ]}
      />

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={handleClear}>
          <span className="flex items-center">
            <X size={14} className="mr-1" />
            Clear
          </span>
        </Button>
      )}
    </div>
  )
}
