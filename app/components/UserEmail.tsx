import { getCurrentUser } from '@/lib/dal'
import { UserIcon } from 'lucide-react'
import SignOutButton from './SignOutButton'
import Link from 'next/link'

const UserEmail = async () => {
  const user = await getCurrentUser()

  return (
    <div className="space-y-1">
      <Link className="flex items-center justify-start px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md" href="/profile">
        <UserIcon size={20} className="text-gray-500 mr-2" />
        <span className="hidden md:inline text-sm text-gray-700 dark:text-gray-300 truncate">
          {user?.email}
        </span>
      </Link>
      <SignOutButton />
    </div>
  )
}

export default UserEmail
