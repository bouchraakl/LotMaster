import { Marca } from "@/model/marca";
import { PageRequest } from "@/model/pagesModel/page-request";
import { PageResponse } from "@/model/pagesModel/page-response";
import axios, { AxiosInstance } from "axios";


export class MarcaClient {


    private axiosClient: AxiosInstance;
    

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8081',
            headers: {
                'Content-type': 'application/json'
            }
        });
    }

    public async findByNome(nome: string): Promise<Marca> {
        try {
          const response = await axios.get<Marca>(`http://localhost:8081/api/marca/nome?nome=${nome}`)
      
          return response.data;

        } catch (error) {
          return Promise.reject(error);
        }
      }


    public async findById(id:number): Promise<Marca> {

        try {
            const response = await this.axiosClient.get<Marca>(`/api/marca/${id}`);
            return response.data;
        }catch (error) {
            return Promise.reject(error);
        }
    }


    public async findAll(): Promise<Marca[]> {
        try {
          const response = await this.axiosClient.get<Marca[]>('/api/marca/all');
          return response.data;
        } catch (error) {
          console.error(error);
          return []; // Return an empty array if there's an error
        }
      }

    public async save(marca: Marca): Promise<Marca> {
        try {
            const response = await this.axiosClient.post<Marca>('/api/marca', marca);
            return response.data;
        }catch (error) {
            return Promise.reject(error);
        } 
    }

    public async update(marca: Marca): Promise<Marca> {
        try {
          const response = await this.axiosClient.put<Marca>('http://localhost:8081/api/marca', marca);
          return response.data;
        } catch (error) {
          return Promise.reject(error);
        }
      }      

    public async delete(id: number): Promise<void> {
        try {
            await this.axiosClient.delete(`/api/marca?id=${id}`)
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByFiltrosPaginado(pageRequest: PageRequest): Promise<PageResponse<Marca>> {
		try {
			let requestPath = ''

			requestPath += `page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`

			return (await this.axiosClient.get<PageResponse<Marca>>(`/api/marca?${requestPath}`)).data
		} catch (error:any) { 
			return Promise.reject(error.response) 
		}
	}

}