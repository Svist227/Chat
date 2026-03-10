import { NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebaseAdmin'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/auth'
import { randomUUID } from "crypto"

export async function GET() {
    const session = await getServerSession(authConfig)
    
    if (!session?.user?.email){
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const uid = randomUUID()
    const token = await adminAuth.createCustomToken(uid)



    // данная функция просто возвращает json 
  return NextResponse.json({
    token: token
  })
}
