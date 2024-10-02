import { Merriweather } from 'next/font/google'
import Container from '@/components/Container'
import Link from 'next/link'

const merriweather = Merriweather({ subsets: ['latin'], weight: ['400'] })

type Link = {
  label: string
  url: string
}

const links: Link[] = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Links',
    url: '/links',
  },
  {
    label: 'Categories',
    url: '/categories',
  },
  {
    label: 'Admin',
    url: '/admin',
  },
]

function Navbar() {
  return (
    <nav className='border-b'>
      <Container className='flex justify-center items-center gap-4 py-8'>
        <ul className='flex gap-4'>
          {links.map(({ label, url }) => {
            return (
              <li
                key={label}
                className={merriweather.className}
              >
                <Link
                  href={url}
                  className='p-4 hover:bg-slate-100 active:bg-slate-200 transition-all duration-300'
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </nav>
  )
}
export default Navbar
