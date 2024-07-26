import { PrismaClient, User } from '@prisma/client'
import { LoginDto } from '../types/auth'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const checkAuth = async(credentials: LoginDto): Promise<User | null> => {
    const user = await prisma.user.findFirst({ where: { email: credentials.email}});
    if (!user) return null;
    const ok = await bcrypt.compare(credentials.password, user.password)
    if(ok) return user
    return null
}