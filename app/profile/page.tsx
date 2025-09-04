import { getCurrentUser } from "@/lib/dal";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import UserProfileCard from "../components/ProfileCard";

export default async function ProfilePage() {

	return (
		<div className="max-w-3xl mx-auto p-4 md:p-8">
			<Link
				href="/dashboard"
				className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-6"
			>
				<ArrowLeftIcon size={16} className="mr-1" />
				Back to Dashboard
			</Link>

			<h1 className="text-2xl font-bold mb-6">User Profile</h1>

			<Suspense fallback={<div>loading ... </div>}>
				<UserProfileCard />
			</Suspense>
		</div>
	)
}