export class AbstractEntity {
    id! : number
    cadastro! : Date
    atualizacao! : Date
    ativo! : boolean

    constructor() {
        this.ativo = true
    }
}