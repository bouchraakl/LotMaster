import { Condutor } from "@/model/condutor";
import { PageRequest } from "@/model/pagesModel/page-request";
import { PageResponse } from "@/model/pagesModel/page-response";
import axios, { AxiosInstance } from "axios";


export class CondutorClient {

    private axiosClient: AxiosInstance;
    

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8081',
            headers: {
                'Content-type': 'application/json'
            }
        });
    }

    public async findById(id:number): Promise<Condutor> {

        try {
            const response = await this.axiosClient.get<Condutor>(`/api/condutor?id=${id}`);
            return response.data;
        }catch (error) {
            return Promise.reject(error);
        }
    }


    public async findAll(): Promise<Condutor[]> {
        try {
          const response = await this.axiosClient.get<Condutor[]>('/api/condutor/all');
          return response.data;
        } catch (error) {
          console.error(error);
          return []; // Return an empty array if there's an error
        }
      }

    public async save(condutor: Condutor): Promise<Condutor> {
        try {
            const response = await this.axiosClient.post<Condutor>('/api/veiculo', condutor);
            return response.data;
        }catch (error) {
            return Promise.reject(error);
        } 
    }

    public async update(condutor: Condutor): Promise<Condutor> {
        try {
            const response = await this.axiosClient.put<Condutor>(`${condutor.id}`, condutor);
            return response.data;
        }catch (error) {
            return Promise.reject(error);
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            await this.axiosClient.delete(`/api/condutor?id=${id}`)
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByFiltrosPaginado(pageRequest: PageRequest): Promise<PageResponse<Condutor>> {
		try {
			let requestPath = ''

			requestPath += `?page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`
			requestPath += `&sort=${pageRequest.sortField === undefined ? '' : pageRequest.sortField},${pageRequest.direction}`

			return (await this.axiosClient.get<PageResponse<Condutor>>(requestPath, { params: { filtros: pageRequest.filter } })).data
		} catch (error:any) { 
			return Promise.reject(error.response) 
		}
	}

}