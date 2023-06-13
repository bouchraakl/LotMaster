import { PageRequest } from "@/model/pagesModel/page-request";
import { PageResponse } from "@/model/pagesModel/page-response";
import { Veiculo } from "@/model/veiculo";
import axios, { AxiosInstance } from "axios";


export class VeiculoClient {

    private axiosClient: AxiosInstance;
    

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8081',
            headers: {
                'Content-type': 'application/json'
            }
        });
    }

    public async findById(id:number): Promise<Veiculo> {

        try {
            const response = await this.axiosClient.get<Veiculo>(`/api/veiculo/${id}`);
            return response.data;
        }catch (error) {
            return Promise.reject(error);
        }
    }


    public async findAll(): Promise<Veiculo[]> {
        try {
          const response = await this.axiosClient.get<Veiculo[]>('/api/veiculo/all');
          return response.data;
        } catch (error) {
          console.error(error);
          return []; // Return an empty array if there's an error
        }
      }

    public async save(veiculo: Veiculo): Promise<Veiculo> {
        try {
            const response = await this.axiosClient.post<Veiculo>('/api/veiculo', veiculo);
            return response.data;
        }catch (error) {
            return Promise.reject(error);
        } 
    }

    public async update(veiculo: Veiculo): Promise<Veiculo> {
        try {
            const response = await this.axiosClient.put<Veiculo>(`${veiculo.id}`, veiculo);
            return response.data;
        }catch (error) {
            return Promise.reject(error);
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            await this.axiosClient.delete(`/api/veiculo?id=${id}`)
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByFiltrosPaginado(pageRequest: PageRequest): Promise<PageResponse<Veiculo>> {
		try {
			let requestPath = ''

			requestPath += `page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`

			return (await this.axiosClient.get<PageResponse<Veiculo>>(`/api/veiculo?${requestPath}`)).data
		} catch (error:any) { 
			return Promise.reject(error.response) 
		}
	}

}