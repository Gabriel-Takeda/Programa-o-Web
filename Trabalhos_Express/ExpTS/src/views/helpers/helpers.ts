import { Aluno, Tecnologia } from './helpersTypes'

export const listaALunos = (alunos: Aluno[]) => {
    return `<ul>${alunos.map(aluno => {
        return `<li>${aluno.name} - ${aluno.matricula}</li>`
    })}</ul>`
}

export const listaTecnologias = (tecnologias: Tecnologia[]) => {
    return `<ul>${tecnologias.map(tecnologia => {
        if(tecnologia.poweredByNodejs) return `<li>${tecnologia.name} ${tecnologia.type}</li>`
        console.log('ta aqui')
    })}</ul>`
}
