import { Request, Response } from 'express';
import { LoremIpsum } from "lorem-ipsum";

const testCookie = (req:Request, res: Response) => {
    if( req.cookies &&  !("test" in req.cookies)) {
        res.cookie("test", '1')
        res.send("você ainda não tinha o cookie. Criando...")
    } else {
        res.send("você ja tinha o cookie.")
    }
}

const hb1 = (req: Request ,res: Response)=> {
    res.render("main/hb1", { message:"Alguma mensagem" })
}

const hb2 = (req: Request, res: Response)=> {
    res.render('main/hb2', {
        vencedorCaprichoso:false,
    })
}

const hb3 = (req: Request, res: Response)=> {
    const alunos = [
        {name: 'Alunol', matricula: 1},
        {name: 'Aluno2', matricula: 2},
        {name: 'Aluno3', matricula: 3},
    ]
    res.render('main/hb3', {
        alunos,
    })
}

const hb4 = (req: Request, res: Response)=> {
    const alunos = [
        {name: 'Alunol', matricula: 1},
        {name: 'Aluno2', matricula: 2},
        {name: 'Aluno3', matricula: 3},
    ]
    res.render('main/hb4', {
        alunos,
    })
}

const hb5 = (req: Request, res: Response) => {
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
        ];
    res.render('main/hb5', {
        technologies,
    })
}

const bemvindo = (req: Request,res: Response) => {
    res.send('pagina inicial do site')
}

const sobrenos = (req: Request,res: Response) => {
    res.send('Página sobre')
}

const lorem = (req: Request,res: Response) => {
    res.send(new LoremIpsum().generateParagraphs(Number(3)));
}

export default { hb1, hb2, hb3, hb4, hb5, bemvindo, sobrenos, lorem, testCookie}