import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import BoardPage from '../page'
import { getIssues, getCurrentUser } from '@/lib/dal'
import { ISSUE_STATUS } from '@/db/schema'
import { Status, Priority } from '@/lib/types'

// Mock the dependencies
vi.mock('@/lib/dal', () => ({
  getIssues: vi.fn(),
  getCurrentUser: vi.fn(),
}))

// Mock Next.js components
vi.mock('next/link', () => ({
  default: ({
    href,
    children,
  }: {
    href: string
    children: React.ReactNode
  }) => (
    <a href={href} data-testid="next-link">
      {children}
    </a>
  ),
}))

// Mock next/navigation hooks used by StatusSelect
vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}))

// Mock the updateIssue server action used by StatusSelect
vi.mock('@/app/actions/issues', () => ({
  updateIssue: vi.fn(),
}))

// Mock cn used by Badge/Form
vi.mock('@/lib/utils', () => ({
  cn: (...args: unknown[]) => args.join(' '),
}))

describe('BoardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('groups issues into status columns', async () => {
    const mockIssues = [
      {
        id: 1,
        title: 'Todo Issue',
        description: 'Test description',
        status: 'todo' as Status,
        priority: 'medium' as Priority,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'user1',
        user: {
          id: 'user1',
          email: 'user1@example.com',
          password: 'hashed-password',
          createdAt: new Date(),
        },
      },
      {
        id: 2,
        title: 'In Progress Issue',
        description: null,
        status: 'in_progress' as Status,
        priority: 'high' as Priority,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'user2',
        user: {
          id: 'user2',
          email: 'user2@example.com',
          password: 'hashed-password',
          createdAt: new Date(),
        },
      },
      {
        id: 3,
        title: 'Done Issue',
        description: null,
        status: 'done' as Status,
        priority: 'low' as Priority,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'user3',
        user: {
          id: 'user3',
          email: 'user3@example.com',
          password: 'hashed-password',
          createdAt: new Date(),
        },
      },
    ]

    vi.mocked(getIssues).mockResolvedValue(mockIssues)
    vi.mocked(getCurrentUser).mockResolvedValue(null)

    const Component = await BoardPage()
    render(Component)

    expect(screen.getByText('Todo Issue')).toBeInTheDocument()
    expect(screen.getByText('In Progress Issue')).toBeInTheDocument()
    expect(screen.getByText('Done Issue')).toBeInTheDocument()

    // Column headers collide with StatusSelect option labels, so use getAllByText
    expect(
      screen.getAllByText(ISSUE_STATUS.backlog.label).length
    ).toBeGreaterThan(0)
    expect(
      screen.getAllByText(ISSUE_STATUS.todo.label).length
    ).toBeGreaterThan(0)
    expect(
      screen.getAllByText(ISSUE_STATUS.in_progress.label).length
    ).toBeGreaterThan(0)
    expect(
      screen.getAllByText(ISSUE_STATUS.done.label).length
    ).toBeGreaterThan(0)
  })
})
