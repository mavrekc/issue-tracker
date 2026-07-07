'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { FormSelect } from './ui/Form'
import { updateIssue } from '@/app/actions/issues'
import { ISSUE_STATUS } from '@/db/schema'
import { Status } from '@/lib/types'

export default function StatusSelect({
  issueId,
  status,
}: {
  issueId: number
  status: Status
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Status
    if (newStatus === status) return

    startTransition(async () => {
      const res = await updateIssue(issueId, { status: newStatus })
      if (!res.success) {
        toast.error(res.message)
      } else {
        router.refresh()
      }
    })
  }

  return (
    <FormSelect
      value={status}
      disabled={isPending}
      onChange={handleChange}
      className="h-8 text-xs"
      options={Object.values(ISSUE_STATUS)}
    />
  )
}
