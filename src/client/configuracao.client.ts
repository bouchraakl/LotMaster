import { Configuracao } from "@/model/configuracao";
import { PageRequest } from "@/model/pagesModel/page-request";
import { PageResponse } from "@/model/pagesModel/page-response";
import axios, { AxiosInstance } from "axios";


export class ConfiguracaoClient {

    private axiosClient: AxiosInstance;
    

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8081',
            headers: {
                'Content-type': 'application/json'
            }
        });
    }

    public async findById(id:number): Promise<Configuracao> {

        try {
            const response = await this.axiosClient.get<Configuracao>(`/api/configuracao?id=${id}`);
            return response.data;
        }catch (error) {
            return Promise.reject(error);
        }
    }

    public async findByLast(): Promise<Configuracao> {

        try {
            const response = await this.axiosClient.get<Configuracao>(`/api/configuracao/last`);
            return response.data;
        }catch (error) {
            return Promise.reject(error);
        }
    }




    public async findAll(): Promise<Configuracao[]> {
        try {
          const response = await this.axiosClient.get<Configuracao[]>('/api/configuracao/all');
          return response.data;
        } catch (error) {
          console.error(error);
          return []; // Return an empty array if there's an error
        }
      }

    public async save(configuracao: Configuracao): Promise<Configuracao> {
        try {
            const response = await this.axiosClient.post<Configuracao>('/api/configuracao', configuracao);
            return response.data;
        }catch (error) {
            return Promise.reject(error);
        } 
    }

    public async update(configuracao: Configuracao): Promise<Configuracao> {
        try {
            const response = await this.axiosClient.put<Configuracao>(`${configuracao.id}`, configuracao);
            return response.data;
        }catch (error) {
            return Promise.reject(error);
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            await this.axiosClient.delete(`/api/configuracao?id=${id}`)
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

}