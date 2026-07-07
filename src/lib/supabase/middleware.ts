import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_PATHS = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/auth/callback',
]

const AUTH_PATHS = ['/login', '/register']

export async function supabaseMiddleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set({ name, value, ...(options ?? {}) })
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options ?? {})
          )
        },
      },
    }
  )

  // getUser() valida a sessão no servidor e dispara a renovação de cookies.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const isPublic = PUBLIC_PATHS.includes(pathname)
  const isAuthRoute = AUTH_PATHS.includes(pathname)

  // Usuário anônimo em rota privada → /login com erro
  if (!user && !isPublic) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    url.searchParams.set('error', 'unauthenticated')
    return NextResponse.redirect(url)
  }

  // Usuário autenticado em /login ou /register → redireciona preservando cookies renovados
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/gate'
    url.search = ''
    const redirectResponse = NextResponse.redirect(url)
    response.cookies.getAll().forEach((c) => redirectResponse.cookies.set(c.name, c.value))
    return redirectResponse
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}