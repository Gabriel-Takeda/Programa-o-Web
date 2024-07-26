import { Request, Response } from 'express'
import { getMajors } from '../service/major'
import { createUser } from '../service/user';
import { checkAuth } from '../service/auth';

const signup = async ( req:Request, res:Response ) => {
    if(req.method === 'GET') {
        const majors = await getMajors();
        res.render('auth/signup', {majors})
    } else {
        try {
            await createUser(req.body)
            res.redirect("/auth/login")
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }
}

const login = async ( req: Request, res: Response ) => { 
   if ( req.method === 'GET' ) {
        res.render("auth/login");
   } else {
        const user = await checkAuth(req.body)
        if (!user) return res.redirect('/auth/login')
        res.redirect("/major")
   }
}

const logout = async ( req: Request, res: Response ) => {
    req.session.destroy((err) => {
        if(err) console.log(err);
        else res.redirect('/auth/login')
    })
}

export default { signup, login, logout }