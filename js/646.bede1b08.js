"use strict";(self["webpackChunkparking_final"]=self["webpackChunkparking_final"]||[]).push([[646],{1259:function(t,e,o){o.d(e,{a:function(){return i}});var a=o(7327),s=o(4161);class i{constructor(){(0,a.Z)(this,"axiosClient",void 0),this.axiosClient=s.Z.create({baseURL:"http://localhost:8081",headers:{"Content-type":"application/json"}})}async findById(t){try{const e=await this.axiosClient.get(`/api/condutor/${t}`);return e.data}catch(e){return Promise.reject(e)}}async findByNome(t){try{const e=await s.Z.get(`http://localhost:8081/api/condutor/nome?nome=${t}`);return e.data}catch(e){return Promise.reject(e)}}async getByCPF(t){try{const e=await s.Z.get(`http://localhost:8081/api/condutor/cpf?cpf=${t}`);return e.data}catch(e){return Promise.reject(e)}}async findAll(){try{const t=await this.axiosClient.get("/api/condutor/all");return t.data}catch(t){return console.error(t),[]}}async save(t){try{const e=await this.axiosClient.post("/api/condutor",t);return e.data}catch(e){return Promise.reject(e)}}async update(t){try{const e=await this.axiosClient.put("http://localhost:8081/api/condutor",t);return e.data}catch(e){return Promise.reject(e)}}async delete(t){try{await this.axiosClient.delete(`/api/condutor?id=${t}`)}catch(e){return Promise.reject(e.response)}}async findByFiltrosPaginado(t){try{let e="";return e+=`page=${t.currentPage}`,e+=`&size=${t.pageSize}`,(await this.axiosClient.get(`/api/condutor?${e}`)).data}catch(e){return Promise.reject(e.response)}}}},6647:function(t,e,o){o.d(e,{Y:function(){return i}});var a=o(7327),s=o(4161);class i{constructor(){(0,a.Z)(this,"axiosClient",void 0),this.axiosClient=s.Z.create({baseURL:"http://localhost:8081",headers:{"Content-type":"application/json"}})}async findById(t){try{const e=await this.axiosClient.get(`/api/veiculo/${t}`);return e.data}catch(e){return Promise.reject(e)}}async findByPlaca(t){try{const e=await s.Z.get(`http://localhost:8081/api/veiculo/placa?placa=${t}`);return e.data}catch(e){return Promise.reject(e)}}async findAll(){try{const t=await this.axiosClient.get("/api/veiculo/all");return t.data}catch(t){return console.error(t),[]}}async save(t){try{const e=await this.axiosClient.post("/api/veiculo",t);return e.data}catch(e){return Promise.reject(e)}}async update(t){try{const e=await this.axiosClient.put("http://localhost:8081/api/veiculo",t);return e.data}catch(e){return Promise.reject(e)}}async delete(t){try{await this.axiosClient.delete(`/api/veiculo?id=${t}`)}catch(e){return Promise.reject(e.response)}}async findByFiltrosPaginado(t){try{let e="";return e+=`page=${t.currentPage}`,e+=`&size=${t.pageSize}`,(await this.axiosClient.get(`/api/veiculo?${e}`)).data}catch(e){return Promise.reject(e.response)}}}},8167:function(t,e,o){o.d(e,{F:function(){return s}});var a=o(7327);class s{constructor(){(0,a.Z)(this,"id",void 0),(0,a.Z)(this,"cadastro",void 0),(0,a.Z)(this,"atualizacao",void 0),(0,a.Z)(this,"ativo",void 0),this.ativo=!0}}},4715:function(t,e,o){o.d(e,{v:function(){return i}});var a=o(7327),s=o(8167);class i extends s.F{constructor(){super(),(0,a.Z)(this,"nome",void 0),(0,a.Z)(this,"cpf",void 0),(0,a.Z)(this,"telefone",void 0),(0,a.Z)(this,"tempoPagoHoras",void 0),(0,a.Z)(this,"tempoPagoMinutos",void 0),(0,a.Z)(this,"tempoDescontoHoras",void 0),this.ativo=!0}}},4164:function(t,e,o){o.d(e,{h:function(){return i}});var a=o(7327),s=o(8167);class i extends s.F{constructor(){super(),(0,a.Z)(this,"nome",void 0),this.ativo=!0}}},4753:function(t,e,o){o.d(e,{Z:function(){return n}});var a=o(7327),s=o(8167),i=o(4164);class n extends s.F{constructor(){super(),(0,a.Z)(this,"nome",void 0),(0,a.Z)(this,"marca",void 0),this.ativo=!0,this.marca=new i.h}}},9151:function(t,e,o){o.d(e,{T:function(){return r}});var a=o(7327),s=o(8167),i=o(4715),n=o(7744);class r extends s.F{constructor(){super(),(0,a.Z)(this,"veiculo",void 0),(0,a.Z)(this,"condutor",void 0),(0,a.Z)(this,"entrada",void 0),(0,a.Z)(this,"saida",void 0),(0,a.Z)(this,"tempoHoras",void 0),(0,a.Z)(this,"tempoMinutos",void 0),(0,a.Z)(this,"tempoDesconto",void 0),(0,a.Z)(this,"tempoMultaHoras",void 0),(0,a.Z)(this,"tempoMultaMinutos",void 0),(0,a.Z)(this,"valorDesconto",void 0),(0,a.Z)(this,"valorMulta",void 0),(0,a.Z)(this,"valorTotal",void 0),(0,a.Z)(this,"valorHora",void 0),(0,a.Z)(this,"valorHoraMulta",void 0),this.ativo=!0,this.veiculo=new n.C,this.condutor=new i.v}}},7744:function(t,e,o){o.d(e,{C:function(){return n}});var a=o(7327),s=o(8167),i=o(4753);class n extends s.F{constructor(){super(),(0,a.Z)(this,"placa",void 0),(0,a.Z)(this,"modelo",void 0),(0,a.Z)(this,"ano",void 0),(0,a.Z)(this,"cor",void 0),(0,a.Z)(this,"tipo",void 0),this.ativo=!0,this.modelo=new i.Z}}},646:function(t,e,o){o.r(e),o.d(e,{default:function(){return H}});var a=o(3396),s=o(9242),i=o(7139);const n=t=>((0,a.dD)("data-v-1e730c26"),t=t(),(0,a.Cn)(),t),r={class:"access-content d-flex flex-column align-items-start justify-content-start"},c=n((()=>(0,a._)("p",{class:"title-pages"},"Register : Open Movement",-1))),l={class:"form-application d-flex flex-column custom-section"},d={class:"d-flex align-items-center align-self-start gap-3"},u={class:"d-flex flex-column"},h=n((()=>(0,a._)("label",{for:"exampleDataList",class:"form-label"},"Associated Condutor",-1))),p={id:"datalistOptionsCondutor"},v=["value"],m=n((()=>(0,a._)("button",{class:"moveBtn m-0"},"Or Register New Conductor",-1))),f={class:"d-flex align-items-center align-self-start gap-3"},g={class:"d-flex flex-column"},y=n((()=>(0,a._)("label",{for:"exampleDataList",class:"form-label"},"Associated Vehicle",-1))),w={id:"datalistOptionsVeiculo"},x=["value"],Z=n((()=>(0,a._)("button",{class:"moveBtn m-0"},"Or Register New Veichle",-1))),C={class:"d-flex align-items-center align-self-start gap-3"},_={class:"d-flex flex-column"},P=n((()=>(0,a._)("label",{for:"entry",class:"form-label"},"Entry Date",-1))),M={class:"mt-3 d-flex align-items-center gap-3"},O=n((()=>(0,a._)("button",{type:"submit"},"Open Movimentation",-1))),b=n((()=>(0,a._)("button",{style:{width:"250px"}},"Access Open Movements",-1)));function j(t,e,o,n,j,F){const D=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)("div",r,[c,(0,a._)("div",l,[(0,a._)("form",{class:"form-app d-flex flex-column align-items-start mt-4 h-100 gap-3",onSubmit:e[3]||(e[3]=(0,s.iM)(((...e)=>t.submitForm&&t.submitForm(...e)),["prevent"]))},[(0,a._)("div",d,[(0,a._)("div",u,[h,(0,a.wy)((0,a._)("input",{class:"form-control",list:"datalistOptionsCondutor",id:"exampleDataList",placeholder:"Search By CPF ...",style:{width:"300px"},"onUpdate:modelValue":e[0]||(e[0]=e=>t.move.condutor.cpf=e)},null,512),[[s.nr,t.move.condutor.cpf]]),(0,a._)("datalist",p,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.datalistOptionsCondutor,(t=>((0,a.wg)(),(0,a.iD)("option",{value:t},null,8,v)))),256))])]),(0,a.Wm)(D,{to:"/register-conductor",class:"align-self-end"},{default:(0,a.w5)((()=>[m])),_:1})]),(0,a._)("div",f,[(0,a._)("div",g,[y,(0,a.wy)((0,a._)("input",{class:"form-control",list:"datalistOptionsVeiculo",id:"exampleDataList",placeholder:"Search By lisence plate ...",style:{width:"300px"},"onUpdate:modelValue":e[1]||(e[1]=e=>t.move.veiculo.placa=e)},null,512),[[s.nr,t.move.veiculo.placa]]),(0,a._)("datalist",w,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.datalistOptionsVeiculo,(t=>((0,a.wg)(),(0,a.iD)("option",{value:t},null,8,x)))),256))])]),(0,a.Wm)(D,{to:"/register-vehicle",class:"align-self-end"},{default:(0,a.w5)((()=>[Z])),_:1})]),(0,a._)("div",C,[(0,a._)("div",_,[P,(0,a.wy)((0,a._)("input",{class:"form-control",type:"datetime-local",id:"entry",style:{width:"300px"},"onUpdate:modelValue":e[2]||(e[2]=e=>t.move.entrada=e)},null,512),[[s.nr,t.move.entrada]])])]),(0,a._)("div",M,[O,(0,a.Wm)(D,{to:"/access-movement",class:"m-0 edits"},{default:(0,a.w5)((()=>[b])),_:1}),(0,a._)("p",{class:(0,i.C_)(["error-message","success"===t.errorMessage.status?"text-success":"text-danger"])},(0,i.zw)(t.errorMessage.message),3)])],32)])])}var F=o(5276),D=o(1259),V=o(6647),B=o(9151),$=(0,a.aZ)({data(){return{move:new B.T,datalistOptionsCondutor:[],datalistOptionsVeiculo:[],moves:[],errorMessage:{status:"",message:""}}},computed:{moveClient(){return new F.M}},async mounted(){try{const t=new V.Y,e=new D.a,o=await t.findAll(),a=await e.findAll();this.datalistOptionsVeiculo=o.map((t=>t.placa)),this.datalistOptionsCondutor=a.map((t=>t.cpf)),console.log(this.datalistOptionsCondutor),console.log(this.datalistOptionsVeiculo)}catch(t){console.error("Failed to fetch veiculo data:",this.datalistOptionsVeiculo),console.error("Failed to fetch condutor data:",this.datalistOptionsCondutor)}},methods:{async submitForm(){try{await this.fetchCondutorId(),await this.fetchVeiculoId();const t=await this.moveClient.findAllByOpen(this.move.veiculo.placa);if(t.length>0)return this.errorMessage.status="error",void(this.errorMessage.message="There is already an open movement for this vehicle plate.");await this.moveClient.save(this.move);this.errorMessage.status="success",this.errorMessage.message="Movement Opened successfully"}catch(t){if(this.errorMessage.status="error",t.response&&t.response.data){const e=Object.values(t.response.data);this.errorMessage.message=e.join("")}else this.errorMessage.message="An error occurred during registration."}},async fetchCondutorId(){try{const t=new D.a,e=await t.getByCPF(this.move.condutor.cpf);e&&e.id?this.move.condutor.id=e.id:console.error("Condutor not found")}catch(t){console.error("Failed to fetch condutor ID:",t)}},async fetchVeiculoId(){try{const t=new V.Y,e=await t.findByPlaca(this.move.veiculo.placa);e&&e.id?this.move.veiculo.id=e.id:console.error("Veiculo not found")}catch(t){console.error("Failed to fetch veiculo ID:",t)}}}}),A=o(89);const I=(0,A.Z)($,[["render",j],["__scopeId","data-v-1e730c26"]]);var H=I}}]);
//# sourceMappingURL=646.bede1b08.js.map