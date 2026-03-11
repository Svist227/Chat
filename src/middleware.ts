
// export {default} from 'next-auth/middleware'
  import { NextResponse } from 'next/server'
  import { NextRequest } from 'next/server'
  import { getToken } from 'next-auth/jwt'
  // This function can be marked `async` if using `await` inside

  
  export async function middleware(req: NextRequest) {
     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
      const isAuth = !!token
    console.log('isAuth', isAuth)


    const pathname = req.nextUrl.pathname

      const publicRoutes = ['/login', '/register']

    if (!isAuth && !publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    

    
    if ( isAuth && pathname !== '/') {
      return NextResponse.redirect(new URL('/', req.url))
    }


    return NextResponse.next();
  }
  
  // See "Matching Paths" below to learn more
  export const config = {
   matcher:   '/((?!_next|api|.*\\..*).*)',
  }


  //  matcher:   '/((?!_next|api|.*\\..*).*)',
