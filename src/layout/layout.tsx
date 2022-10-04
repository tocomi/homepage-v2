import { AppBar, Container, Link, Toolbar } from '@mui/material'
import Head from 'next/head'
import { FC, ReactNode } from 'react'

const links = [
  {
    name: 'HOME',
    href: '/',
  },
  {
    name: 'ARTIFACTS',
    href: '/artifacts',
  },
]

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>nextjs-mui-boilerplate</title>
        <meta name="description" content="nextjs-mui-boilerplate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar disableGutters>
            {links.map((link) => {
              return (
                <Link href={link.href} key={link.href} sx={{ color: 'white', mx: 8 }}>
                  {link.name}
                </Link>
              )
            })}
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="md" sx={{ p: 8 }}>
        <main>{children}</main>
      </Container>
    </>
  )
}
