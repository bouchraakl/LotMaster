import { AbstractEntity } from "./abstract-entity";
import { Cor } from "./cor";
import { Modelo } from "./modelo";
import { Tipo } from "./tipo";

export class Veiculo extends AbstractEntity {

    placa!: string
    modelo!: Modelo
    ano!: number
    cor!: Cor
    tipo!: Tipo

    constructor() {
        super()
        this.ativo = true
        this.modelo = new Modelo()
    }
}