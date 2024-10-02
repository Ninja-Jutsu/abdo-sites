'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

type NavLink = {
  href: string
  label: string
}

export const adminLinks: NavLink[] = [
  { href: '/admin/category', label: 'Create Category' },
  { href: '/admin/link', label: 'Create Link' },
  //   { href: '/admin/products/create', label: 'create product' },
]

function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className='flex justify-around md:block md:border-r pr-4'>
      {adminLinks.map((link) => {
        const isActivePage = pathname === link.href
        const variant = isActivePage ? 'default' : 'ghost'
        return (
          <Button
            key={link.label}
            asChild
            className='md:w-full mb-2 capitalize font-normal justify-start'
            variant={variant}
          >
            <Link
              key={link.href}
              href={link.href}
            >
              {link.label}
            </Link>
          </Button>
        )
      })}
    </aside>
  )
}
export default Sidebar
