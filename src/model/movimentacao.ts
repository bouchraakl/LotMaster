import { AbstractEntity } from "./abstract-entity"
import { Condutor } from "./condutor"
import { Veiculo } from "./veiculo"

export class Movimentacao extends AbstractEntity {

    veiculo!: Veiculo
    condutor!: Condutor
    entrada!: Date
    saida!: Date
    tempoHoras!: number
    tempoMinutos!: number
    tempoDesconto!: number
    tempoMultaHoras!: number
    tempoMultaMinutos!: number
    valorDesconto!: number
    valorMulta!: number
    valorTotal!: number
    valorHora!: number
    valorHoraMulta!: number

    constructor() {
        super()
        this.ativo = true
        this.veiculo = new Veiculo()
        this.condutor = new Condutor()
    }

}
