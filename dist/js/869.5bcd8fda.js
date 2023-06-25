"use strict";(self["webpackChunkparking_final"]=self["webpackChunkparking_final"]||[]).push([[869],{6647:function(e,t,a){a.d(t,{Y:function(){return s}});var l=a(7327),i=a(4161);class s{constructor(){(0,l.Z)(this,"axiosClient",void 0),this.axiosClient=i.Z.create({baseURL:"http://localhost:8081",headers:{"Content-type":"application/json"}})}async findById(e){try{const t=await this.axiosClient.get(`/api/veiculo/${e}`);return t.data}catch(t){return Promise.reject(t)}}async findByPlaca(e){try{const t=await i.Z.get(`http://localhost:8081/api/veiculo/placa?placa=${e}`);return t.data}catch(t){return Promise.reject(t)}}async findAll(){try{const e=await this.axiosClient.get("/api/veiculo/all");return e.data}catch(e){return console.error(e),[]}}async save(e){try{const t=await this.axiosClient.post("/api/veiculo",e);return t.data}catch(t){return Promise.reject(t)}}async update(e){try{const t=await this.axiosClient.put("http://localhost:8081/api/veiculo",e);return t.data}catch(t){return Promise.reject(t)}}async delete(e){try{await this.axiosClient.delete(`/api/veiculo?id=${e}`)}catch(t){return Promise.reject(t.response)}}async findByFiltrosPaginado(e){try{let t="";return t+=`page=${e.currentPage}`,t+=`&size=${e.pageSize}`,(await this.axiosClient.get(`/api/veiculo?${t}`)).data}catch(t){return Promise.reject(t.response)}}}},906:function(e,t,a){var l;a.d(t,{G:function(){return l}}),function(e){e["WHITE"]="WHITE",e["BLACK"]="BLACK",e["SILVER"]="SILVER",e["BLUE"]="BLUE",e["GRAY"]="GRAY",e["PINK"]="PINK"}(l||(l={}))},4452:function(e,t,a){a.d(t,{l:function(){return i}});var l=a(7327);class i{constructor(){(0,l.Z)(this,"currentPage",void 0),(0,l.Z)(this,"pageSize",void 0),(0,l.Z)(this,"direction",void 0),this.currentPage=0,this.direction="asc"}}},7928:function(e,t,a){var l;a.d(t,{w:function(){return l}}),function(e){e["CAR"]="CAR",e["MOTORCYCLE"]="MOTORCYCLE",e["VAN"]="VAN"}(l||(l={}))},8869:function(e,t,a){a.r(t),a.d(t,{default:function(){return X}});var l=a(3396),i=a(9242),s=a(7139);const r=e=>((0,l.dD)("data-v-1fddc7b4"),e=e(),(0,l.Cn)(),e),c={class:"access-content d-flex flex-column align-items-start justify-content-start"},n={class:"header d-flex align-content-start justify-content-between m-0"},o=r((()=>(0,l._)("p",{class:"title-pages"},"Access : Vehicles",-1))),d={class:"search-container"},u=r((()=>(0,l._)("i",{class:"bi bi-search search-icon"},null,-1))),h={class:"filter d-flex align-items-center my-4 gap-4 w-100"},p={class:"filter-container d-flex align-items-center gap-2"},g=r((()=>(0,l._)("label",{for:"year-filter"},"Year",-1))),f=r((()=>(0,l._)("option",{value:""},"All",-1))),m=["value"],_={class:"filter-container d-flex align-items-center gap-2"},w=r((()=>(0,l._)("label",{for:"month-filter"},"Month",-1))),v=r((()=>(0,l._)("option",{value:""},"All",-1))),C=["value"],y={class:"filter-container d-flex align-items-center gap-2"},b=r((()=>(0,l._)("label",{for:"tipo-filter"},"Type",-1))),P=r((()=>(0,l._)("option",{value:""},"All",-1))),Y=["value"],x={class:"filter-container d-flex align-items-center gap-2"},z=r((()=>(0,l._)("label",{for:"carro-filter"},"Color",-1))),k=r((()=>(0,l._)("option",{value:""},"All",-1))),D=["value"],L=r((()=>(0,l._)("i",{class:"bi bi-plus-square"},null,-1))),M={class:"table table-sm table-bordered w-100"},A=r((()=>(0,l._)("thead",null,[(0,l._)("tr",null,[(0,l._)("th",{scope:"col"},"Id"),(0,l._)("th",{scope:"col"},"Active"),(0,l._)("th",{scope:"col"},"Registration Date"),(0,l._)("th",{scope:"col"},"License Plate"),(0,l._)("th",{scope:"col"},"Vehicle Model"),(0,l._)("th",{scope:"col"},"Vehicle Brand"),(0,l._)("th",{scope:"col"},"Year"),(0,l._)("th",{scope:"col"},"Type"),(0,l._)("th",{scope:"col"},"Color")])],-1))),T={class:"d-flex justify-content-center gap-2"},V=["onClick"],I=r((()=>(0,l._)("i",{class:"bi bi-pencil-square"},null,-1))),S=[I],j=["onClick"],B=r((()=>(0,l._)("i",{class:"bi bi-trash"},null,-1))),U={class:"pagination-container align-self-end"},R={class:"pagination"},K=r((()=>(0,l._)("span",{"aria-hidden":"true"},"«",-1))),$=[K],E=["disabled"],F=r((()=>(0,l._)("span",{"aria-hidden":"true"},"»",-1))),Z=[F];function H(e,t,a,r,I,K){const F=(0,l.up)("router-link");return(0,l.wg)(),(0,l.iD)("div",c,[(0,l._)("div",n,[o,(0,l._)("div",d,[(0,l.wy)((0,l._)("input",{type:"text",class:"search-input",placeholder:"Search By License Plate or names ...","onUpdate:modelValue":t[0]||(t[0]=t=>e.searchQuery=t)},null,512),[[i.nr,e.searchQuery]]),u])]),(0,l._)("div",h,[(0,l._)("div",p,[g,(0,l.wy)((0,l._)("select",{id:"year-filter","onUpdate:modelValue":t[1]||(t[1]=t=>e.selectedYear=t),class:"form-select",style:{padding:"0.3rem 2rem 0.3rem 0.75rem"}},[f,((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.selectableYears,(e=>((0,l.wg)(),(0,l.iD)("option",{value:e},(0,s.zw)(e),9,m)))),256))],512),[[i.bM,e.selectedYear]])]),(0,l._)("div",_,[w,(0,l.wy)((0,l._)("select",{id:"month-filter","onUpdate:modelValue":t[2]||(t[2]=t=>e.selectedMonth=t),class:"form-select"},[v,((0,l.wg)(),(0,l.iD)(l.HY,null,(0,l.Ko)(12,(e=>(0,l._)("option",{value:e},(0,s.zw)(e),9,C))),64))],512),[[i.bM,e.selectedMonth]])]),(0,l._)("div",y,[b,(0,l.wy)((0,l._)("select",{id:"tipo-filter","onUpdate:modelValue":t[3]||(t[3]=t=>e.selectedTipo=t),class:"form-select"},[P,((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.selectableTipos,(e=>((0,l.wg)(),(0,l.iD)("option",{value:e},(0,s.zw)(e),9,Y)))),256))],512),[[i.bM,e.selectedTipo]])]),(0,l._)("div",x,[z,(0,l.wy)((0,l._)("select",{id:"carro-filter","onUpdate:modelValue":t[4]||(t[4]=t=>e.selectedCores=t),class:"form-select"},[k,((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.availableCores,(e=>((0,l.wg)(),(0,l.iD)("option",{value:e},(0,s.zw)(e),9,D)))),256))],512),[[i.bM,e.selectedCores]])]),(0,l.Wm)(F,{to:"/register-vehicle",class:"router"},{default:(0,l.w5)((()=>[L])),_:1})]),(0,l._)("table",M,[A,(0,l._)("tbody",null,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.carFilter,(t=>((0,l.wg)(),(0,l.iD)("tr",{key:t.id},[(0,l._)("td",null,(0,s.zw)(t.id),1),(0,l._)("td",null,(0,s.zw)(t.ativo),1),(0,l._)("td",null,(0,s.zw)(e.formatDate(t.cadastro)),1),(0,l._)("td",null,(0,s.zw)(t.placa),1),(0,l._)("td",null,(0,s.zw)(t.modelo.nome),1),(0,l._)("td",null,(0,s.zw)(t.modelo.marca.nome),1),(0,l._)("td",null,(0,s.zw)(t.ano),1),(0,l._)("td",null,(0,s.zw)(t.tipo),1),(0,l._)("td",null,(0,s.zw)(t.cor),1),(0,l._)("td",null,[(0,l._)("div",T,[(0,l._)("button",{class:"btn btn-sm btn-primary",onClick:a=>e.editItem(t),style:{width:"45px",height:"30px"}},S,8,V),(0,l._)("button",{class:"btn btn-sm btn-danger",onClick:a=>e.deleteItem(t),style:{width:"45px",height:"30px"}},[B,(0,l.Uk)(" Delete ")],8,j)])])])))),128))])]),(0,l._)("div",U,[(0,l._)("ul",R,[(0,l._)("li",{class:(0,s.C_)(["page-item",{disabled:0===e.currentPage}])},[(0,l._)("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:t[5]||(t[5]=(...t)=>e.previousPage&&e.previousPage(...t)),style:{color:"#3C3C43","background-color":"#B5C2C9"}},$)],2),(0,l._)("li",{class:"page-item",disabled:e.carFilter.length<e.pageSize},[(0,l._)("a",{class:"page-link",href:"#","aria-label":"Next",onClick:t[6]||(t[6]=(...t)=>e.nextPage&&e.nextPage(...t)),style:{color:"#3C3C43","background-color":"#B5C2C9"}},Z)],8,E)])])])}a(7658);var O=a(6647),N=a(7928),Q=a(906),G=a(4452),W=(0,l.aZ)({name:"AccessVehicleModelView",data(){return{cars:[],searchQuery:"",selectedYear:null,selectedMonth:null,selectedTipo:null,selectedCores:null,currentPage:0,pageSize:5}},computed:{carFilter(){if(this.searchQuery||this.selectedYear||this.selectedMonth||this.selectedTipo||this.selectedCores){const e=this.searchQuery.toLowerCase();return this.cars.filter((t=>{const a=new Date(t.cadastro),l=a.getFullYear(),i=a.getMonth()+1,s=t.id.toString().trim().toLowerCase().includes(e)||t.placa.toLowerCase().includes(e)||t.modelo.nome.toLowerCase().includes(e)||t.modelo.marca.nome.toLowerCase().includes(e),r=!this.selectedTipo||t.tipo===this.selectedTipo,c=!this.selectedCores||t.cor===this.selectedCores;return this.selectedYear&&this.selectedMonth?s&&l===this.selectedYear&&i===this.selectedMonth&&r&&c:this.selectedYear?s&&l===this.selectedYear&&r&&c:this.selectedMonth?s&&i===this.selectedMonth&&r&&c:s&&r&&c}))}return this.cars},selectableYears(){const e=(new Date).getFullYear(),t=[];for(let a=2019;a<=e;a++)t.push(a);return t},selectableTipos(){const e=Object.values(N.w);return e.map((e=>e.toUpperCase()))},availableCores(){const e=Object.values(Q.G);return e.map((e=>e.toUpperCase()))}},mounted(){this.fetchCar()},methods:{async fetchCar(){try{const e=new G.l;e.currentPage=this.currentPage,e.pageSize=this.pageSize;const t=new O.Y,a=await t.findByFiltrosPaginado(e);this.cars=a.content}catch(e){console.error(e)}},previousPage(){this.currentPage>0&&(this.currentPage--,this.fetchCar())},nextPage(){this.carFilter.length===this.pageSize&&(this.currentPage++,this.fetchCar())},formatDate(e){const t=new Date(e),a=t.toLocaleDateString(),l=t.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});return`${a} ${l}`},async deleteItem(e){const t=confirm("Are you sure you want to delete this vehicle modelo?");if(t)try{const t=new O.Y;await t.delete(e.id),this.cars=this.cars.filter((t=>t.id!==e.id))}catch(a){console.error(a)}},async editItem(e){new O.Y;const t=e.id;await this.$router.push({name:"edit-vehicle",params:{editVehicleId:t}})}}}),q=a(89);const J=(0,q.Z)(W,[["render",H],["__scopeId","data-v-1fddc7b4"]]);var X=J}}]);
//# sourceMappingURL=869.5bcd8fda.js.map