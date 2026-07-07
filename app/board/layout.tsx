import Navigation from '../components/Navigation'

export default async function BoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pl-16 md:pl-64 pt-0 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
