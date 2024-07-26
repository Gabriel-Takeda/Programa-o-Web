import { PrismaClient, User } from "@prisma/client"
import { CreateUserDto } from "../types/user"
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const createUser = async (user: CreateUserDto):Promise<User> => {
    const salt = await bcrypt.genSalt(parseInt(process.env.ROUNDS!))
    const password  = await bcrypt.hash(user.password, salt)
    return await prisma.user.create({ data: {...user, password} })
}