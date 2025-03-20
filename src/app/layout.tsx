import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import { FiMenu } from "react-icons/fi";

import { API } from '@/api'
import { strict } from 'node:assert';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Hudson Farias - Admin',
  description: 'Admin',
}

interface NavMenuItemI {
  label: string,
  redirectUrl: string
  subItems: NavMenuItemI[]
}

const navMenuItems: NavMenuItemI[] = [
  {
    label: 'Sobre',
    redirectUrl: '/admin',
    subItems: []
  },
  {
    label: 'Experiências',
    redirectUrl: '/admin/experiences',
    subItems: []
  },
  {
    label: 'Projetos',
    redirectUrl: '/admin/projects',
    subItems: []
  },
  {
    label: 'Social',
    redirectUrl: '/admin/social-networks',
    subItems: []
  },
  {
    label: 'Skills',
    redirectUrl: '/admin/skills',
    subItems: []
  },
]


export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  const hasAuth = await API.hasToken()

  return (
    <html lang='en' data-theme='black'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <div className='bg-base-100 h-screen grid grid-rows-[1fr_14fr] overflow-hidden'>

          <div className='navbar shadow-sm'>

            <div className="navbar-start">

              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                  <FiMenu className='w-6 h-6' />
                </div>

                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                  {navMenuItems.map((item, index) => (
                    <li key={`nav-item-${index}-mobile`}>
                      <a href={item.redirectUrl}>{item.label}</a>
                      {item.subItems.length != 0 &&
                        <ul className="p-2">
                          {item.subItems.map((subItem, index) => (
                            <li key={`${item.label}-item-${index}-mobile`}>
                              <a href={subItem.redirectUrl}>{subItem.label}</a>
                            </li>
                          ))}
                        </ul>
                      }
                    </li>
                  ))
                  }
                </ul>
              </div>

              <a href='/' className='btn btn-ghost text-xl text-info-content'>HudsonDev</a>
            </div>

            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                {navMenuItems.map((item, index) => (
                  <li key={`nav-item-${index}`}>
                    {item.subItems.length == 0 ? <a href={item.redirectUrl}>{item.label}</a> :
                      <details>
                        <summary>{item.label}</summary>

                        <ul className="p-2">
                          {item.subItems.map((subItem, index) => (
                            <li key={`${item.label}-item-${index}`}>
                              <a href={subItem.redirectUrl}>{subItem.label}</a>
                            </li>
                          ))}
                        </ul>
                      </details>
                    }


                  </li>
                ))
                }
              </ul>
            </div>

            {/* {item.subItems && item.subItems.length > 1 &&
                        <ul className="p-2">
                          {item.subItems.map((subItem, index) => (
                            <li>
                              {item.redirectUrl ? <a href={item.redirectUrl}>{item.label}</a> : <span>{item.label}</span>}
                            </li>
                          ))}
                        </ul>
                      // } */}

            {!hasAuth &&
              <div className='flex items-center navbar-end'>
                <a href={`${process.env.NEXT_PUBLIC_AUTH_URL}/discord/redirect`} target='_blank' className='btn btn-ghost text-xl'>Login</a>
              </div>
            }
          </div>

          <div className='flex justify-center overflow-auto'>
            {children}
          </div>

        </div>

      </body>
    </html>
  )
}
