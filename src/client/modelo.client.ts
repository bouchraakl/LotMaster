import { Modelo } from "@/model/modelo";
import { PageRequest } from "@/model/pagesModel/page-request";
import { PageResponse } from "@/model/pagesModel/page-response";
import axios, { AxiosInstance } from "axios";


export class ModeloClient {

    private axiosClient: AxiosInstance;
    

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8081',
            headers: {
                'Content-type': 'application/json'
            }
        });
    }

    public async findById(id:number): Promise<Modelo> {

        try {
            const response = await this.axiosClient.get<Modelo>(`/api/modelo/${id}`);
            return response.data;
        }catch (error) {
            return Promise.reject(error);
        }
    }

    public async findByNome(nome: string): Promise<Modelo> {
        try {
          const response = await axios.get<Modelo>(`http://localhost:8081/api/modelo/nome/${nome}`)
      
          return response.data;

        } catch (error) {
          return Promise.reject(error);
        }
      }

    public async findAll(): Promise<Modelo[]> {
        try {
          const response = await this.axiosClient.get<Modelo[]>('/api/modelo/all');
          return response.data;
        } catch (error) {
          console.error(error);
          return []; // Return an empty array if there's an error
        }
      }

    public async save(modelo: Modelo): Promise<Modelo> {
        try {
            const response = await this.axiosClient.post<Modelo>('/api/modelo', modelo);
            return response.data;
        }catch (error) {
            return Promise.reject(error);
        } 
    }

    public async update(modelo: Modelo): Promise<Modelo> {
        try {
          const response = await this.axiosClient.put<Modelo>('http://localhost:8081/api/modelo', modelo);
          return response.data;
        } catch (error) {
          return Promise.reject(error);
        }
      }   

    public async delete(id: number): Promise<void> {
        try {
            await this.axiosClient.delete(`http://localhost:8081/api/modelo?id=${id}`)
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByFiltrosPaginado(pageRequest: PageRequest): Promise<PageResponse<Modelo>> {
		try {
			let requestPath = ''

			requestPath += `page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`

			return (await this.axiosClient.get<PageResponse<Modelo>>(`/api/modelo?${requestPath}`)).data
		} catch (error:any) { 
			return Promise.reject(error.response) 
		}
	}

}