"use strict";(self["webpackChunkparking_final"]=self["webpackChunkparking_final"]||[]).push([[394],{1259:function(t,e,o){o.d(e,{a:function(){return i}});var a=o(7327),s=o(4161);class i{constructor(){(0,a.Z)(this,"axiosClient",void 0),this.axiosClient=s.Z.create({baseURL:"http://localhost:8081",headers:{"Content-type":"application/json"}})}async findById(t){try{const e=await this.axiosClient.get(`/api/condutor/${t}`);return e.data}catch(e){return Promise.reject(e)}}async findByNome(t){try{const e=await s.Z.get(`http://localhost:8081/api/condutor/nome?nome=${t}`);return e.data}catch(e){return Promise.reject(e)}}async getByCPF(t){try{const e=await s.Z.get(`http://localhost:8081/api/condutor/cpf?cpf=${t}`);return e.data}catch(e){return Promise.reject(e)}}async findAll(){try{const t=await this.axiosClient.get("/api/condutor/all");return t.data}catch(t){return console.error(t),[]}}async save(t){try{const e=await this.axiosClient.post("/api/condutor",t);return e.data}catch(e){return Promise.reject(e)}}async update(t){try{const e=await this.axiosClient.put("http://localhost:8081/api/condutor",t);return e.data}catch(e){return Promise.reject(e)}}async delete(t){try{await this.axiosClient.delete(`/api/condutor?id=${t}`)}catch(e){return Promise.reject(e.response)}}async findByFiltrosPaginado(t){try{let e="";return e+=`page=${t.currentPage}`,e+=`&size=${t.pageSize}`,(await this.axiosClient.get(`/api/condutor?${e}`)).data}catch(e){return Promise.reject(e.response)}}}},6647:function(t,e,o){o.d(e,{Y:function(){return i}});var a=o(7327),s=o(4161);class i{constructor(){(0,a.Z)(this,"axiosClient",void 0),this.axiosClient=s.Z.create({baseURL:"http://localhost:8081",headers:{"Content-type":"application/json"}})}async findById(t){try{const e=await this.axiosClient.get(`/api/veiculo/${t}`);return e.data}catch(e){return Promise.reject(e)}}async findByPlaca(t){try{const e=await s.Z.get(`http://localhost:8081/api/veiculo/placa?placa=${t}`);return e.data}catch(e){return Promise.reject(e)}}async findAll(){try{const t=await this.axiosClient.get("/api/veiculo/all");return t.data}catch(t){return console.error(t),[]}}async save(t){try{const e=await this.axiosClient.post("/api/veiculo",t);return e.data}catch(e){return Promise.reject(e)}}async update(t){try{const e=await this.axiosClient.put("http://localhost:8081/api/veiculo",t);return e.data}catch(e){return Promise.reject(e)}}async delete(t){try{await this.axiosClient.delete(`/api/veiculo?id=${t}`)}catch(e){return Promise.reject(e.response)}}async findByFiltrosPaginado(t){try{let e="";return e+=`page=${t.currentPage}`,e+=`&size=${t.pageSize}`,(await this.axiosClient.get(`/api/veiculo?${e}`)).data}catch(e){return Promise.reject(e.response)}}}},8167:function(t,e,o){o.d(e,{F:function(){return s}});var a=o(7327);class s{constructor(){(0,a.Z)(this,"id",void 0),(0,a.Z)(this,"cadastro",void 0),(0,a.Z)(this,"atualizacao",void 0),(0,a.Z)(this,"ativo",void 0),this.ativo=!0}}},4715:function(t,e,o){o.d(e,{v:function(){return i}});var a=o(7327),s=o(8167);class i extends s.F{constructor(){super(),(0,a.Z)(this,"nome",void 0),(0,a.Z)(this,"cpf",void 0),(0,a.Z)(this,"telefone",void 0),(0,a.Z)(this,"tempoPagoHoras",void 0),(0,a.Z)(this,"tempoPagoMinutos",void 0),(0,a.Z)(this,"tempoDescontoHoras",void 0),this.ativo=!0}}},4164:function(t,e,o){o.d(e,{h:function(){return i}});var a=o(7327),s=o(8167);class i extends s.F{constructor(){super(),(0,a.Z)(this,"nome",void 0),this.ativo=!0}}},4753:function(t,e,o){o.d(e,{Z:function(){return r}});var a=o(7327),s=o(8167),i=o(4164);class r extends s.F{constructor(){super(),(0,a.Z)(this,"nome",void 0),(0,a.Z)(this,"marca",void 0),this.ativo=!0,this.marca=new i.h}}},9151:function(t,e,o){o.d(e,{T:function(){return n}});var a=o(7327),s=o(8167),i=o(4715),r=o(7744);class n extends s.F{constructor(){super(),(0,a.Z)(this,"veiculo",void 0),(0,a.Z)(this,"condutor",void 0),(0,a.Z)(this,"entrada",void 0),(0,a.Z)(this,"saida",void 0),(0,a.Z)(this,"tempoHoras",void 0),(0,a.Z)(this,"tempoMinutos",void 0),(0,a.Z)(this,"tempoDesconto",void 0),(0,a.Z)(this,"tempoMultaHoras",void 0),(0,a.Z)(this,"tempoMultaMinutos",void 0),(0,a.Z)(this,"valorDesconto",void 0),(0,a.Z)(this,"valorMulta",void 0),(0,a.Z)(this,"valorTotal",void 0),(0,a.Z)(this,"valorHora",void 0),(0,a.Z)(this,"valorHoraMulta",void 0),this.ativo=!0,this.veiculo=new r.C,this.condutor=new i.v}}},7744:function(t,e,o){o.d(e,{C:function(){return r}});var a=o(7327),s=o(8167),i=o(4753);class r extends s.F{constructor(){super(),(0,a.Z)(this,"placa",void 0),(0,a.Z)(this,"modelo",void 0),(0,a.Z)(this,"ano",void 0),(0,a.Z)(this,"cor",void 0),(0,a.Z)(this,"tipo",void 0),this.ativo=!0,this.modelo=new i.Z}}},1394:function(t,e,o){o.r(e),o.d(e,{default:function(){return E}});var a=o(3396),s=o(9242),i=o(7139);const r=t=>((0,a.dD)("data-v-32c4365d"),t=t(),(0,a.Cn)(),t),n={class:"access-content d-flex flex-column align-items-start justify-content-start"},c=r((()=>(0,a._)("p",{class:"title-pages"},"Edit : Open Movement",-1))),l={class:"form-application d-flex flex-column custom-section"},d={class:"d-flex align-items-center align-self-start gap-3"},u={class:"d-flex flex-column"},h=r((()=>(0,a._)("label",{for:"exampleDataList",class:"form-label"},"Associated Condutor",-1))),v={id:"datalistOptionsCondutor"},m=["value"],p={class:"d-flex align-items-center align-self-start gap-3"},f={class:"d-flex flex-column"},g=r((()=>(0,a._)("label",{for:"exampleDataList",class:"form-label"},"Associated Vehicle",-1))),y={id:"datalistOptionsVeiculo"},C=["value"],w={class:"d-flex align-items-center align-self-start gap-3"},x={class:"d-flex flex-column"},Z=r((()=>(0,a._)("label",{for:"entry",class:"form-label"},"Entry Date",-1))),P={class:"mt-3 d-flex align-items-center gap-3"},M=r((()=>(0,a._)("button",{type:"submit"},"Update Movement",-1)));function F(t,e,o,r,F,_){return(0,a.wg)(),(0,a.iD)("div",n,[c,(0,a._)("div",l,[(0,a._)("form",{class:"form-app d-flex flex-column align-items-start mt-4 h-100 gap-3",onSubmit:e[4]||(e[4]=(0,s.iM)(((...e)=>t.submitForm&&t.submitForm(...e)),["prevent"]))},[(0,a._)("div",d,[(0,a._)("div",u,[h,(0,a.wy)((0,a._)("input",{class:"form-control",list:"datalistOptionsCondutor",id:"exampleDataList",placeholder:"Search By CPF ...",style:{width:"300px"},"onUpdate:modelValue":e[0]||(e[0]=e=>t.moveCPF=e)},null,512),[[s.nr,t.moveCPF]]),(0,a._)("datalist",v,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.datalistOptionsCondutor,(t=>((0,a.wg)(),(0,a.iD)("option",{value:t},null,8,m)))),256))])])]),(0,a._)("div",p,[(0,a._)("div",f,[g,(0,a.wy)((0,a._)("input",{class:"form-control",list:"datalistOptionsVeiculo",id:"exampleDataList",placeholder:"Search By lisence plate ...",style:{width:"300px"},"onUpdate:modelValue":e[1]||(e[1]=e=>t.movePlaca=e)},null,512),[[s.nr,t.movePlaca]]),(0,a._)("datalist",y,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.datalistOptionsVeiculo,(t=>((0,a.wg)(),(0,a.iD)("option",{value:t},null,8,C)))),256))])])]),(0,a._)("div",w,[(0,a._)("div",x,[Z,(0,a.wy)((0,a._)("input",{class:"form-control",type:"datetime-local",id:"entry",style:{width:"300px"},"onUpdate:modelValue":e[2]||(e[2]=e=>t.moveEntrada=e)},null,512),[[s.nr,t.moveEntrada]])])]),(0,a._)("div",P,[M,(0,a._)("button",{type:"button",onClick:e[3]||(e[3]=(...e)=>t.cancelEdit&&t.cancelEdit(...e))},"Cancel"),(0,a._)("p",{class:(0,i.C_)(["error-message","success"===t.errorMessage.status?"text-success":"text-danger"])},(0,i.zw)(t.errorMessage.message),3)])],32)])])}o(7658);var _=o(5276),b=o(1259),j=o(6647),D=o(9151),I=(0,a.aZ)({data(){return{move:new D.T,datalistOptionsCondutor:[],datalistOptionsVeiculo:[],moves:[],errorMessage:{status:"",message:""},moveCPF:"",movePlaca:"",moveEntrada:new Date}},computed:{moveClient(){return new _.M}},async mounted(){try{await this.fetchItems();const t=new j.Y,e=new b.a,o=await t.findAll(),a=await e.findAll();this.datalistOptionsVeiculo=o.map((t=>t.placa)),this.datalistOptionsCondutor=a.map((t=>t.cpf))}catch(t){console.error("Failed to fetch veiculo data:",this.datalistOptionsVeiculo),console.error("Failed to fetch condutor data:",this.datalistOptionsCondutor)}},methods:{async submitForm(){if(!this.moveCPF)return this.errorMessage.status="error",void(this.errorMessage.message="CPF cannot be null.");if(!this.movePlaca)return this.errorMessage.status="error",void(this.errorMessage.message="Placa cannot be null.");if(!this.moveEntrada)return this.errorMessage.status="error",void(this.errorMessage.message="Entry Date cannot be null.");console.log(this.moveCPF),console.log(this.movePlaca),console.log(this.moveEntrada),this.move.condutor.cpf=this.moveCPF,this.move.veiculo.placa=this.movePlaca,this.move.entrada=this.moveEntrada;try{console.log(this.move),this.move.id=Number(this.$route.params.editMovemId),console.log(this.move.id),await this.fetchCondutorId(),await this.fetchVeiculoId(),await this.moveClient.update(this.move),this.errorMessage.status="success",this.errorMessage.message="Movement edited successfully"}catch(t){if(this.errorMessage.status="error",t.response&&t.response.data){console.error(t.response.data);const e=Object.values(t.response.data);this.errorMessage.message=e.join(", ")}else this.errorMessage.message="An error occurred during updating."}},async fetchCondutorId(){try{const t=new b.a,e=await t.getByCPF(this.move.condutor.cpf);e&&e.id?this.move.condutor.id=e.id:console.error("Condutor not found")}catch(t){console.error("Failed to fetch condutor ID:",t)}},async fetchVeiculoId(){try{const t=new j.Y,e=await t.findByPlaca(this.move.veiculo.placa);e&&e.id?this.move.veiculo.id=e.id:console.error("Veiculo not found")}catch(t){console.error("Failed to fetch veiculo ID:",t)}},async fetchItems(){const t=Number(this.$route.params.editMovemId);if(isNaN(t))console.log("Invalid editMovemId parameter");else try{const e=await this.moveClient.findById(t);this.moveCPF=e.condutor.cpf,this.movePlaca=e.veiculo.placa,this.moveEntrada=e.entrada,this.move=e,console.log(e)}catch(e){console.log(e)}},cancelEdit(){this.$router.push("/access-movement")}}}),$=o(89);const O=(0,$.Z)(I,[["render",F],["__scopeId","data-v-32c4365d"]]);var E=O}}]);
//# sourceMappingURL=394.9b4fa484.js.map