import { getCurrentUser, getIssues } from '@/lib/dal'
import Link from 'next/link'
import Button from '../components/ui/Button'
import { PlusIcon } from 'lucide-react'
import Badge from '../components/ui/Badge'
import { formatRelativeTime } from '@/lib/utils'
import { Priority, Status } from '@/lib/types'
import { ISSUE_STATUS, ISSUE_PRIORITY } from '@/db/schema'
import IssueFilters from '../components/IssueFilters'

const PRIORITY_RANK: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const q = typeof params.q === 'string' ? params.q : ''
  const status = typeof params.status === 'string' ? params.status : ''
  const priority = typeof params.priority === 'string' ? params.priority : ''
  const sort = typeof params.sort === 'string' ? params.sort : ''

  await getCurrentUser()
  const issues = await getIssues()

  const inProgressCount = issues.filter(
    (issue) => issue.status === 'in_progress'
  ).length
  const doneCount = issues.filter((issue) => issue.status === 'done').length

  let filteredIssues = issues

  if (q) {
    const query = q.toLowerCase()
    filteredIssues = filteredIssues.filter(
      (issue) =>
        issue.title.toLowerCase().includes(query) ||
        (issue.description ?? '').toLowerCase().includes(query)
    )
  }

  if (status) {
    filteredIssues = filteredIssues.filter((issue) => issue.status === status)
  }

  if (priority) {
    filteredIssues = filteredIssues.filter(
      (issue) => issue.priority === priority
    )
  }

  filteredIssues = [...filteredIssues].sort((a, b) => {
    if (sort === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }
    if (sort === 'priority') {
      return (
        PRIORITY_RANK[a.priority as Priority] -
        PRIORITY_RANK[b.priority as Priority]
      )
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Issues</h1>
        <Link href="/issues/new">
          <Button>
            <span className="flex items-center">
              <PlusIcon size={18} className="mr-2" />
              New Issue
            </span>
          </Button>
        </Link>
      </div>

      {issues.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-high p-8">
          <h3 className="text-lg font-medium mb-2">No issues found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Get started by creating your first issue.
          </p>
          <Link href="/issues/new">
            <Button>
              <span className="flex items-center">
                <PlusIcon size={18} className="mr-2" />
                Create Issue
              </span>
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="rounded-lg border border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-high p-4">
              <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Total
              </p>
              <p className="mt-1 text-2xl font-bold">{issues.length}</p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-high p-4">
              <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                In Progress
              </p>
              <p className="mt-1 text-2xl font-bold text-amber-600 dark:text-amber-400">
                {inProgressCount}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-high p-4">
              <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Done
              </p>
              <p className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
                {doneCount}
              </p>
            </div>
          </div>

          <IssueFilters />

          {filteredIssues.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-high shadow-sm">
              {/* Header row */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-dark-elevated border-b border-gray-200 dark:border-dark-border-default">
                <div className="col-span-5">Title</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Priority</div>
                <div className="col-span-3">Created</div>
              </div>

              {/* Issue rows */}
              <div className="divide-y divide-gray-200 dark:divide-dark-border-default">
                {filteredIssues.map((issue) => (
                  <Link
                    key={issue.id}
                    href={`/issues/${issue.id}`}
                    className="block hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors"
                  >
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                      <div className="col-span-5 font-medium truncate">
                        {issue.title}
                      </div>
                      <div className="col-span-2">
                        <Badge status={issue.status as Status}>
                          {ISSUE_STATUS[issue.status as Status].label}
                        </Badge>
                      </div>
                      <div className="col-span-2">
                        <Badge priority={issue.priority as Priority}>
                          {ISSUE_PRIORITY[issue.priority as Priority].label}
                        </Badge>
                      </div>
                      <div className="col-span-3 text-sm text-gray-500 dark:text-gray-400">
                        {formatRelativeTime(new Date(issue.createdAt))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-high p-8">
              <h3 className="text-lg font-medium mb-2">
                No issues match your filters.
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
