import { User } from "@prisma/client"

export type CreateUserDto = Pick<User, "fullname" | "email" | "majorId" | "password" >