export class PageRequest {
    currentPage!: number
    pageSize!: number
    direction!: string

    constructor() {
      this.currentPage = 0
      this.pageSize = 2
      this.direction = 'asc'
    }

}