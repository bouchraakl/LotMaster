"use strict";(self["webpackChunkparking_final"]=self["webpackChunkparking_final"]||[]).push([[371],{4468:function(t,e,a){a.d(e,{K:function(){return i}});var s=a(7327),o=a(4161);class i{constructor(){(0,s.Z)(this,"axiosClient",void 0),this.axiosClient=o.Z.create({baseURL:"http://localhost:8081",headers:{"Content-type":"application/json"}})}async findById(t){try{const e=await this.axiosClient.get(`/api/configuracao?id=${t}`);return e.data}catch(e){return Promise.reject(e)}}async findByLast(){try{const t=await this.axiosClient.get("/api/configuracao/last");return t.data}catch(t){return Promise.reject(t)}}async findAll(){try{const t=await this.axiosClient.get("/api/configuracao/all");return t.data}catch(t){return console.error(t),[]}}async save(t){try{const e=await this.axiosClient.post("/api/configuracao",t);return e.data}catch(e){return Promise.reject(e)}}async update(t){try{const e=await this.axiosClient.put(`${t.id}`,t);return e.data}catch(e){return Promise.reject(e)}}async delete(t){try{await this.axiosClient.delete(`/api/configuracao?id=${t}`)}catch(e){return Promise.reject(e.response)}}}},8167:function(t,e,a){a.d(e,{F:function(){return o}});var s=a(7327);class o{constructor(){(0,s.Z)(this,"id",void 0),(0,s.Z)(this,"cadastro",void 0),(0,s.Z)(this,"atualizacao",void 0),(0,s.Z)(this,"ativo",void 0),this.ativo=!0}}},4371:function(t,e,a){a.r(e),a.d(e,{default:function(){return J}});var s=a(3396),o=a(9242),i=a(7139);const n=t=>((0,s.dD)("data-v-00b5a9a2"),t=t(),(0,s.Cn)(),t),l={class:"main-content"},r=n((()=>(0,s._)("div",{class:"header d-flex align-items-center justify-content-between"},[(0,s._)("div",{class:"sub-header d-flex flex-column"},[(0,s._)("p",{class:"title m-0"},"Settings"),(0,s._)("p",{class:"sub-title"},"Complete System Configuration")])],-1))),c={class:"d-flex align-items-center gap-4"},d={class:"d-flex flex-column align-items-start gap-1"},u=n((()=>(0,s._)("label",{for:"openTime",class:"form-label"},"Opening time:",-1))),p={class:"d-flex flex-column align-items-start gap-1"},f=n((()=>(0,s._)("label",{for:"closeTime",class:"form-label"},"Closing time:",-1))),m={class:"d-flex align-items-center gap-5"},g={class:"d-flex flex-column align-items-start justify-content-between gap-1"},h=n((()=>(0,s._)("label",{for:"hourRate",class:"form-label",style:{width:"130px"}},"Hourly Rate:",-1))),x={class:"input-group",style:{width:"200px"}},v=n((()=>(0,s._)("span",{class:"input-group-text"},"$",-1))),y=n((()=>(0,s._)("span",{class:"input-group-text"},"0.00",-1))),_={class:"d-flex flex-column align-items-start justify-content-between gap-1"},w=n((()=>(0,s._)("label",{for:"fineMinute",class:"form-label",style:{width:"160px"}},"Minute fine value:",-1))),b={class:"input-group",style:{width:"200px"}},C=n((()=>(0,s._)("span",{class:"input-group-text"},"$",-1))),M=n((()=>(0,s._)("span",{class:"input-group-text"},"0.00",-1))),D={class:"d-flex align-items-center gap-5"},k={class:"d-flex flex-column align-items-start justify-content-between gap-1"},Z=n((()=>(0,s._)("label",{for:"discountthreshold",class:"form-label",style:{width:"190px"}},"Discount time threshold:",-1))),j={class:"d-flex flex-column align-items-start justify-content-between gap-1"},V=n((()=>(0,s._)("label",{for:"discountDuration",class:"form-label",style:{width:"160px"}},"Discount duration:",-1))),U={class:"form-check align-self-end"},E=n((()=>(0,s._)("label",{class:"form-check-label",for:"flexCheckChecked"}," Generate discount ",-1))),S={class:"d-flex align-items-center gap-5"},P={class:"d-flex flex-column align-items-start justify-content-between gap-1"},$=n((()=>(0,s._)("label",{for:"carSpots",class:"form-label"},"Car parking spots:",-1))),F={class:"d-flex flex-column align-items-start justify-content-between gap-1"},H=n((()=>(0,s._)("label",{for:"motoSpots",class:"form-label"},"Motorcycle parking spots:",-1))),R={class:"d-flex flex-column align-items-start justify-content-between gap-1"},T=n((()=>(0,s._)("label",{for:"vanSpots",class:"form-label"},"Van parking spots:",-1))),z={class:"mt-3 d-flex align-items-center gap-3"},A=n((()=>(0,s._)("button",{type:"submit",style:{width:"300px"}},"Register New Configurations",-1)));function B(t,e,a,n,B,I){return(0,s.wg)(),(0,s.iD)("div",l,[r,(0,s._)("form",{action:"",class:"form-app d-flex flex-column align-items-start mt-4 gap-3",onSubmit:e[11]||(e[11]=(0,o.iM)(((...e)=>t.submitForm&&t.submitForm(...e)),["prevent"]))},[(0,s._)("div",c,[(0,s._)("div",d,[u,(0,s.wy)((0,s._)("input",{type:"time",class:"form-control",id:"openTime","onUpdate:modelValue":e[0]||(e[0]=e=>t.config.inicioExpediente=e),style:{width:"300px"}},null,512),[[o.nr,t.config.inicioExpediente]])]),(0,s._)("div",p,[f,(0,s.wy)((0,s._)("input",{type:"time",class:"form-control",id:"closeTime","onUpdate:modelValue":e[1]||(e[1]=e=>t.config.fimExpediente=e),style:{width:"300px"}},null,512),[[o.nr,t.config.fimExpediente]])])]),(0,s._)("div",m,[(0,s._)("div",g,[h,(0,s._)("div",x,[(0,s.wy)((0,s._)("input",{type:"text",class:"form-control","onUpdate:modelValue":e[2]||(e[2]=e=>t.config.valorHora=e),"aria-label":"Dollar amount (with dot and two decimal places)"},null,512),[[o.nr,t.config.valorHora]]),v,y])]),(0,s._)("div",_,[w,(0,s._)("div",b,[(0,s.wy)((0,s._)("input",{type:"text",class:"form-control","onUpdate:modelValue":e[3]||(e[3]=e=>t.config.valorMinutoMulta=e),"aria-label":"Dollar amount (with dot and two decimal places)"},null,512),[[o.nr,t.config.valorMinutoMulta]]),C,M])])]),(0,s._)("div",D,[(0,s._)("div",k,[Z,(0,s.wy)((0,s._)("input",{type:"text",class:"form-control",id:"discountthreshold","onUpdate:modelValue":e[4]||(e[4]=e=>t.config.tempoParaDesconto=e),style:{width:"300px"}},null,512),[[o.nr,t.config.tempoParaDesconto]])]),(0,s._)("div",j,[V,(0,s.wy)((0,s._)("input",{type:"text",class:"form-control",id:"discountDuration","onUpdate:modelValue":e[5]||(e[5]=e=>t.config.tempoDeDesconto=e),style:{width:"300px"}},null,512),[[o.nr,t.config.tempoDeDesconto]])]),(0,s._)("div",U,[(0,s.wy)((0,s._)("input",{class:"form-check-input",type:"checkbox",value:"",id:"flexCheckChecked","onUpdate:modelValue":e[6]||(e[6]=e=>t.config.gerarDesconto=e)},null,512),[[o.e8,t.config.gerarDesconto]]),E])]),(0,s._)("div",S,[(0,s._)("div",P,[$,(0,s.wy)((0,s._)("input",{type:"number",class:"form-control",id:"carSpots",style:{width:"300px"},"onUpdate:modelValue":e[7]||(e[7]=e=>t.config.vagasCarro=e)},null,512),[[o.nr,t.config.vagasCarro]])]),(0,s._)("div",F,[H,(0,s.wy)((0,s._)("input",{type:"number",class:"form-control",id:"motoSpots",style:{width:"300px"},"onUpdate:modelValue":e[8]||(e[8]=e=>t.config.vagasMoto=e)},null,512),[[o.nr,t.config.vagasMoto]])]),(0,s._)("div",R,[T,(0,s.wy)((0,s._)("input",{type:"number",class:"form-control",id:"vanSpots",style:{width:"300px"},"onUpdate:modelValue":e[9]||(e[9]=e=>t.config.vagasVan=e)},null,512),[[o.nr,t.config.vagasVan]])])]),(0,s._)("div",z,[A,(0,s._)("button",{type:"button",onClick:e[10]||(e[10]=(...e)=>t.cancelEdit&&t.cancelEdit(...e))},"Cancel"),(0,s._)("p",{class:(0,i.C_)(["error-message","success"===t.errorMessage.status?"text-success":"text-danger"])},(0,i.zw)(t.errorMessage.message),3)])],32)])}a(7658);var I=a(4468),K=a(7327),L=a(8167);class O extends L.F{constructor(){super(),(0,K.Z)(this,"valorHora",void 0),(0,K.Z)(this,"valorMinutoMulta",void 0),(0,K.Z)(this,"inicioExpediente",void 0),(0,K.Z)(this,"fimExpediente",void 0),(0,K.Z)(this,"tempoParaDesconto",void 0),(0,K.Z)(this,"tempoDeDesconto",void 0),(0,K.Z)(this,"gerarDesconto",void 0),(0,K.Z)(this,"vagasMoto",void 0),(0,K.Z)(this,"vagasCarro",void 0),(0,K.Z)(this,"vagasVan",void 0),this.ativo=!0}}var G=(0,s.aZ)({name:"EditConfigView",data(){return{config:new O,errorMessage:{status:"",message:""}}},computed:{configClient(){return new I.K}},methods:{async submitForm(){try{await this.configClient.save(this.config);this.errorMessage.status="success",this.errorMessage.message="Configuration registered successfully"}catch(t){if(this.errorMessage.status="error",t.response&&t.response.data){const e=Object.values(t.response.data);this.errorMessage.message=e.join("")}else this.errorMessage.message="An error occurred during registration."}},cancelEdit(){this.$router.push("/controle")}}}),N=a(89);const q=(0,N.Z)(G,[["render",B],["__scopeId","data-v-00b5a9a2"]]);var J=q}}]);
//# sourceMappingURL=371.bda71a86.js.map