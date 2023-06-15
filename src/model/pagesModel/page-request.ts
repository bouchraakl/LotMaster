export class PageRequest {
    currentPage!: number
    pageSize!: number
    direction!: string

    constructor() {
      this.currentPage = 0
      this.direction = 'asc'
    }

}