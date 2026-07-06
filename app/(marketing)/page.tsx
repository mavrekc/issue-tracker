import Link from 'next/link'
import { CheckCircle2, Filter, Zap } from 'lucide-react'
import { Timestamp } from '../components/Timestamp'
import Button from '../components/ui/Button'

const FEATURES = [
  {
    icon: Zap,
    title: 'Fast',
    description: 'Create and update issues in seconds',
  },
  {
    icon: Filter,
    title: 'Organized',
    description: 'Search, filter, and sort your work',
  },
  {
    icon: CheckCircle2,
    title: 'Simple',
    description: 'A clean UI that stays out of your way',
  },
]

export default async function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <div className="text-center">
              <span className="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-950 px-3 py-1 text-sm font-medium text-primary-700 dark:text-primary-300">
                Plan, track, and resolve — fast
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Issue tracking <br className="hidden sm:block" />
                <span className="text-primary-600 dark:text-primary-400">
                  simplified.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                A minimal and elegant issue tracking tool for modern teams. Manage
                your projects with ease.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link href="/signin">
                  <Button variant="outline" size="lg">
                    Sign in
                  </Button>
                </Link>
              </div>
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
                {FEATURES.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex flex-col items-center text-center">
                    <Icon className="text-primary-600" size={22} />
                    <p className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
                      {title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-dark-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              © <Timestamp /> Mode. Built for Next.js Fundamentals.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
