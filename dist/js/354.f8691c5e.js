"use strict";(self["webpackChunkparking_final"]=self["webpackChunkparking_final"]||[]).push([[354],{4468:function(e,t,a){a.d(t,{K:function(){return n}});var l=a(7327),s=a(4161);class n{constructor(){(0,l.Z)(this,"axiosClient",void 0),this.axiosClient=s.Z.create({baseURL:"http://localhost:8081",headers:{"Content-type":"application/json"}})}async findById(e){try{const t=await this.axiosClient.get(`/api/configuracao?id=${e}`);return t.data}catch(t){return Promise.reject(t)}}async findByLast(){try{const e=await this.axiosClient.get("/api/configuracao/last");return e.data}catch(e){return Promise.reject(e)}}async findAll(){try{const e=await this.axiosClient.get("/api/configuracao/all");return e.data}catch(e){return console.error(e),[]}}async save(e){try{const t=await this.axiosClient.post("/api/configuracao",e);return t.data}catch(t){return Promise.reject(t)}}async update(e){try{const t=await this.axiosClient.put(`${e.id}`,e);return t.data}catch(t){return Promise.reject(t)}}async delete(e){try{await this.axiosClient.delete(`/api/configuracao?id=${e}`)}catch(t){return Promise.reject(t.response)}}}},5354:function(e,t,a){a.r(t),a.d(t,{default:function(){return G}});var l=a(3396),s=a(9242);const n=e=>((0,l.dD)("data-v-11d9dc33"),e=e(),(0,l.Cn)(),e),i={class:"main-content"},o={class:"header d-flex align-items-center justify-content-between"},r=n((()=>(0,l._)("div",{class:"sub-header d-flex flex-column"},[(0,l._)("p",{class:"title m-0"},"Settings"),(0,l._)("p",{class:"sub-title"},"Complete System Configuration")],-1))),c={action:"",class:"form-app d-flex flex-column align-items-start mt-4 gap-3"},u={class:"d-flex align-items-center gap-4"},d={class:"d-flex flex-column align-items-start gap-1"},p=n((()=>(0,l._)("label",{for:"openTime",class:"form-label"},"Opening time:",-1))),m={class:"d-flex flex-column align-items-start gap-1"},f=n((()=>(0,l._)("label",{for:"closeTime",class:"form-label"},"Closing time:",-1))),h={class:"d-flex align-items-center gap-5"},g={class:"d-flex flex-column align-items-start justify-content-between gap-1"},y=n((()=>(0,l._)("label",{for:"hourRate",class:"form-label",style:{width:"130px"}},"Hourly Rate:",-1))),x={class:"input-group",style:{width:"200px"}},b=n((()=>(0,l._)("span",{class:"input-group-text"},"$",-1))),w=n((()=>(0,l._)("span",{class:"input-group-text"},"0.00",-1))),V={class:"d-flex flex-column align-items-start justify-content-between gap-1"},_=n((()=>(0,l._)("label",{for:"fineMinute",class:"form-label",style:{width:"160px"}},"Minute fine value:",-1))),v={class:"input-group",style:{width:"200px"}},C=n((()=>(0,l._)("span",{class:"input-group-text"},"$",-1))),D=n((()=>(0,l._)("span",{class:"input-group-text"},"0.00",-1))),S={class:"d-flex align-items-center gap-5"},k={class:"d-flex flex-column align-items-start justify-content-between gap-1"},T=n((()=>(0,l._)("label",{for:"discountthreshold",class:"form-label",style:{width:"190px"}},"Discount time threshold:",-1))),j={class:"d-flex flex-column align-items-start justify-content-between gap-1"},U=n((()=>(0,l._)("label",{for:"discountDuration",class:"form-label",style:{width:"160px"}},"Discount duration:",-1))),M={class:"form-check align-self-end"},N=n((()=>(0,l._)("label",{class:"form-check-label",for:"flexCheckChecked"}," Generate discount ",-1))),R={class:"d-flex align-items-center gap-5"},$={class:"d-flex flex-column align-items-start justify-content-between gap-1"},I=n((()=>(0,l._)("label",{for:"carSpots",class:"form-label"},"Car parking spots:",-1))),P={class:"d-flex flex-column align-items-start justify-content-between gap-1"},B=n((()=>(0,l._)("label",{for:"motoSpots",class:"form-label"},"Motorcycle parking spots:",-1))),L={class:"d-flex flex-column align-items-start justify-content-between gap-1"},Z=n((()=>(0,l._)("label",{for:"vanSpots",class:"form-label"},"Van parking spots:",-1)));function K(e,t,a,n,K,E){return(0,l.wg)(),(0,l.iD)("div",i,[(0,l._)("div",o,[r,(0,l._)("i",{class:"bi bi-pencil-square",onClick:t[0]||(t[0]=t=>e.editItem())})]),(0,l._)("form",c,[(0,l._)("div",u,[(0,l._)("div",d,[p,(0,l.wy)((0,l._)("input",{type:"text",class:"form-control",id:"openTime",disabled:"","onUpdate:modelValue":t[1]||(t[1]=t=>e.openTimeValue=t),style:{width:"300px"}},null,512),[[s.nr,e.openTimeValue]])]),(0,l._)("div",m,[f,(0,l.wy)((0,l._)("input",{type:"text",class:"form-control",id:"closeTime",disabled:"","onUpdate:modelValue":t[2]||(t[2]=t=>e.closeTimeValue=t),style:{width:"300px"}},null,512),[[s.nr,e.closeTimeValue]])])]),(0,l._)("div",h,[(0,l._)("div",g,[y,(0,l._)("div",x,[(0,l.wy)((0,l._)("input",{type:"text",class:"form-control",disabled:"","onUpdate:modelValue":t[3]||(t[3]=t=>e.hourRateValue=t),"aria-label":"Dollar amount (with dot and two decimal places)"},null,512),[[s.nr,e.hourRateValue]]),b,w])]),(0,l._)("div",V,[_,(0,l._)("div",v,[(0,l.wy)((0,l._)("input",{type:"text",class:"form-control",disabled:"","onUpdate:modelValue":t[4]||(t[4]=t=>e.fineMinuteValue=t),"aria-label":"Dollar amount (with dot and two decimal places)"},null,512),[[s.nr,e.fineMinuteValue]]),C,D])])]),(0,l._)("div",S,[(0,l._)("div",k,[T,(0,l.wy)((0,l._)("input",{type:"text",class:"form-control",id:"discountthreshold",disabled:"","onUpdate:modelValue":t[5]||(t[5]=t=>e.discountThresholdValue=t),style:{width:"300px"}},null,512),[[s.nr,e.discountThresholdValue]])]),(0,l._)("div",j,[U,(0,l.wy)((0,l._)("input",{type:"text",class:"form-control",id:"discountDuration",disabled:"","onUpdate:modelValue":t[6]||(t[6]=t=>e.discountDurationValue=t),style:{width:"300px"}},null,512),[[s.nr,e.discountDurationValue]])]),(0,l._)("div",M,[(0,l.wy)((0,l._)("input",{class:"form-check-input",type:"checkbox",value:"",id:"flexCheckChecked",disabled:"","onUpdate:modelValue":t[7]||(t[7]=t=>e.generateDiscountValue=t)},null,512),[[s.e8,e.generateDiscountValue]]),N])]),(0,l._)("div",R,[(0,l._)("div",$,[I,(0,l.wy)((0,l._)("input",{type:"number",class:"form-control",id:"carSpots",disabled:"","onUpdate:modelValue":t[8]||(t[8]=t=>e.carSpotsValue=t),style:{width:"300px"}},null,512),[[s.nr,e.carSpotsValue]])]),(0,l._)("div",P,[B,(0,l.wy)((0,l._)("input",{type:"number",class:"form-control",id:"motoSpots",disabled:"","onUpdate:modelValue":t[9]||(t[9]=t=>e.motoSpotsValue=t),style:{width:"300px"}},null,512),[[s.nr,e.motoSpotsValue]])]),(0,l._)("div",L,[Z,(0,l.wy)((0,l._)("input",{type:"number",class:"form-control",id:"vanSpots",disabled:"","onUpdate:modelValue":t[10]||(t[10]=t=>e.vanSpotsValue=t),style:{width:"300px"}},null,512),[[s.nr,e.vanSpotsValue]])])])])])}a(7658);var E=a(4468),H=(0,l.aZ)({name:"ControleView",data(){return{openTimeValue:new Date,closeTimeValue:new Date,hourRateValue:Number(),fineMinuteValue:Number(),discountThresholdValue:Number(),discountDurationValue:Number(),generateDiscountValue:!1,carSpotsValue:Number(),motoSpotsValue:Number(),vanSpotsValue:Number()}},mounted(){this.fetchConfig()},methods:{async fetchConfig(){try{const e=new E.K,t=await e.findByLast();console.log(t),this.openTimeValue=t.inicioExpediente,this.closeTimeValue=t.fimExpediente,this.hourRateValue=t.valorHora,this.fineMinuteValue=t.valorMinutoMulta,this.discountThresholdValue=t.tempoParaDesconto,this.discountDurationValue=t.tempoDeDesconto,this.generateDiscountValue=t.gerarDesconto,this.carSpotsValue=t.vagasCarro,this.motoSpotsValue=t.vagasMoto,this.vanSpotsValue=t.vagasVan}catch(e){console.error(e)}},async editItem(){try{const e=new E.K,t=await e.findByLast();if(t){const e=t.id;await this.$router.push({name:"edit-config",params:{editConfigId:e}})}else await this.$router.push({name:"edit-config",params:{editConfigId:0}})}catch(e){console.error(e)}}}}),q=a(89);const A=(0,q.Z)(H,[["render",K],["__scopeId","data-v-11d9dc33"]]);var G=A}}]);
//# sourceMappingURL=354.f8691c5e.js.map