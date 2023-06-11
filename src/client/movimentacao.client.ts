import { Movimentacao } from "@/model/movimentacao";
import { PageRequest } from "@/model/pagesModel/page-request";
import { PageResponse } from "@/model/pagesModel/page-response";
import axios, { AxiosInstance } from "axios";


export class MovimentacaoClient {

    private axiosClient: AxiosInstance;
    

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8081',
            headers: {
                'Content-type': 'application/json'
            }
        });
    }

    public async findById(id:number): Promise<Movimentacao> {

        try {
            const response = await this.axiosClient.get<Movimentacao>(`/api/movimentacao?id=${id}`);
            return response.data;
        }catch (error) {
            return Promise.reject(error);
        }
    }


    public async findAll(): Promise<Movimentacao[]> {
        try {
          const response = await this.axiosClient.get<Movimentacao[]>('/api/movimentacao/all');
          return response.data;
        } catch (error) {
          console.error(error);
          return []; // Return an empty array if there's an error
        }
      }

    public async save(movimentacao: Movimentacao): Promise<Movimentacao> {
        try {
            const response = await this.axiosClient.post<Movimentacao>('/api/movimentacao', movimentacao);
            return response.data;
        }catch (error) {
            return Promise.reject(error);
        } 
    }

    public async update(movimentacao: Movimentacao): Promise<Movimentacao> {
        try {
            const response = await this.axiosClient.put<Movimentacao>(`${movimentacao.id}`, movimentacao);
            return response.data;
        }catch (error) {
            return Promise.reject(error);
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            await this.axiosClient.delete(`/api/movimentacao?id=${id}`)
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByFiltrosPaginado(pageRequest: PageRequest): Promise<PageResponse<Movimentacao>> {
		try {
			let requestPath = ''

			requestPath += `?page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`
			requestPath += `&sort=${pageRequest.sortField === undefined ? '' : pageRequest.sortField},${pageRequest.direction}`

			return (await this.axiosClient.get<PageResponse<Movimentacao>>(requestPath, { params: { filtros: pageRequest.filter } })).data
		} catch (error:any) { 
			return Promise.reject(error.response) 
		}
	}

}