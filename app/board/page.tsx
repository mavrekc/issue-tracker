import { getCurrentUser, getIssues } from '@/lib/dal'
import Link from 'next/link'
import Button from '../components/ui/Button'
import { PlusIcon } from 'lucide-react'
import Badge from '../components/ui/Badge'
import StatusSelect from '../components/StatusSelect'
import { ISSUE_STATUS, ISSUE_PRIORITY } from '@/db/schema'
import { Priority, Status } from '@/lib/types'

const COLUMNS: Status[] = ['backlog', 'todo', 'in_progress', 'done']

export default async function BoardPage() {
  await getCurrentUser()
  const issues = await getIssues()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Board</h1>
        <Link href="/issues/new">
          <Button>
            <span className="flex items-center">
              <PlusIcon size={18} className="mr-2" />
              New Issue
            </span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const columnIssues = issues.filter((i) => i.status === col)

          return (
            <div
              key={col}
              className="rounded-lg border border-gray-200 dark:border-dark-border-default bg-gray-50 dark:bg-dark-elevated p-3"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold">
                  {ISSUE_STATUS[col].label}
                </h2>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {columnIssues.length}
                </span>
              </div>

              <div className="space-y-2">
                {columnIssues.length > 0 ? (
                  columnIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className="rounded-md border border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-high p-3"
                    >
                      <Link
                        href={`/issues/${issue.id}`}
                        className="block text-sm font-medium hover:underline line-clamp-2"
                      >
                        {issue.title}
                      </Link>
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <Badge priority={issue.priority as Priority}>
                          {ISSUE_PRIORITY[issue.priority as Priority].label}
                        </Badge>
                        <StatusSelect
                          issueId={issue.id}
                          status={issue.status as Status}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 dark:text-gray-500 text-center py-6">
                    No issues
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
