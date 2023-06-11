import { AbstractEntity } from "./abstract-entity";

export class Condutor extends AbstractEntity{

    nome! : string
    cpf! : string
    telefone! : string
    tempoPagoHoras! : number
    tempoPagoMinutos! : number
    tempoDescontoHoras! : number

    constructor() {
        super()
        this.ativo = true
    }

}