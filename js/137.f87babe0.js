"use strict";(self["webpackChunkparking_final"]=self["webpackChunkparking_final"]||[]).push([[137],{4452:function(e,t,l){l.d(t,{l:function(){return s}});var a=l(7327);class s{constructor(){(0,a.Z)(this,"currentPage",void 0),(0,a.Z)(this,"pageSize",void 0),(0,a.Z)(this,"direction",void 0),this.currentPage=0,this.direction="asc"}}},1137:function(e,t,l){l.r(t),l.d(t,{default:function(){return ie}});var a=l(3396),s=l(9242),o=l(7139);const n=e=>((0,a.dD)("data-v-58a33b9f"),e=e(),(0,a.Cn)(),e),i={class:"access-content d-flex flex-column align-items-start justify-content-start"},c={class:"header d-flex align-content-start justify-content-between m-0"},r=n((()=>(0,a._)("p",{class:"title-pages"},"Access : Open Movements",-1))),d={class:"search-container"},u=n((()=>(0,a._)("i",{class:"bi bi-search search-icon"},null,-1))),p={class:"filter d-flex align-items-center my-4 gap-4 w-100"},h={class:"filter-container d-flex align-items-center gap-2"},v=n((()=>(0,a._)("label",{for:"year-filter"},"Year:",-1))),m=n((()=>(0,a._)("option",{value:""},"All",-1))),b=["value"],f={class:"filter-container d-flex align-items-center gap-2"},_=n((()=>(0,a._)("label",{for:"month-filter"},"Month:",-1))),g=n((()=>(0,a._)("option",{value:""},"All",-1))),w=["value"],y=n((()=>(0,a._)("i",{class:"bi bi-plus-square"},null,-1))),M={class:"table table-sm table-bordered w-100"},C=n((()=>(0,a._)("thead",null,[(0,a._)("tr",null,[(0,a._)("th",{scope:"col"},"Id"),(0,a._)("th",{scope:"col"},"Active"),(0,a._)("th",{scope:"col"},"Registration Date"),(0,a._)("th",{scope:"col"},"License Plate"),(0,a._)("th",{scope:"col"},"Conductor Name"),(0,a._)("th",{scope:"col"},"Entry Date"),(0,a._)("th",{scope:"col"},"Actions")])],-1))),z={class:"d-flex justify-content-center gap-2"},x=["onClick"],D=n((()=>(0,a._)("i",{class:"bi bi-pencil-square"},null,-1))),P=[D],k=["onClick"],Y=n((()=>(0,a._)("i",{class:"bi bi-trash"},null,-1))),I=[Y],V=["onClick"],S=n((()=>(0,a._)("i",{class:"bi bi-check-circle"},null,-1))),L=[S],A=["onClick"],F=n((()=>(0,a._)("i",{class:"bi bi-eye"},null,-1))),H=[F],Q={class:"modal fade",id:"details",tabindex:"-1","aria-labelledby":"details","aria-hidden":"true"},$={class:"modal-dialog"},B={class:"modal-content"},N=n((()=>(0,a._)("div",{class:"modal-header"},[(0,a._)("h5",{class:"modal-title",id:"exampleModalLabel"},"Movement Details"),(0,a._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1))),Z={class:"modal-body d-flex justify-content-between align-items-center"},j=(0,a.uE)('<div class="modal-col d-flex flex-column" style="text-align:start;" data-v-58a33b9f><p data-v-58a33b9f>Movement ID :</p><p data-v-58a33b9f>Active :</p><p data-v-58a33b9f>Registration Date :</p><hr data-v-58a33b9f><p data-v-58a33b9f>Driver Name :</p><p data-v-58a33b9f>Driver CPF :</p><p data-v-58a33b9f>Driver Phone :</p><p data-v-58a33b9f>Driver Total Payed Hours :</p><p data-v-58a33b9f>Driver Discount Hours :</p><hr data-v-58a33b9f><p data-v-58a33b9f>Vehicle License Plate :</p><p data-v-58a33b9f>Vehicle Brand Name :</p><p data-v-58a33b9f>Vehicle Modal Name :</p><p data-v-58a33b9f>Vehicle Type :</p><p data-v-58a33b9f>Vehicle Year :</p><p data-v-58a33b9f>Vehicle Color :</p><hr data-v-58a33b9f><p data-v-58a33b9f>Entry Date :</p></div>',1),q={class:"modal-col d-flex flex-column"},E=n((()=>(0,a._)("hr",null,null,-1))),K=n((()=>(0,a._)("hr",null,null,-1))),T=n((()=>(0,a._)("hr",null,null,-1))),U=n((()=>(0,a._)("div",{class:"modal-footer"},[(0,a._)("button",{type:"button",class:"btn btn-sm btn-secondary","data-bs-dismiss":"modal"},"Close")],-1))),R={class:"pagination-container align-self-end"},O={class:"pagination"},W=n((()=>(0,a._)("span",{"aria-hidden":"true"},"«",-1))),G=[W],J=["disabled"],X=n((()=>(0,a._)("span",{"aria-hidden":"true"},"»",-1))),ee=[X];function te(e,t,l,n,D,Y){const S=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)("div",i,[(0,a._)("div",c,[r,(0,a._)("div",d,[(0,a.wy)((0,a._)("input",{type:"text",class:"search-input",placeholder:"Search By license plate or name...","onUpdate:modelValue":t[0]||(t[0]=t=>e.searchQuery=t)},null,512),[[s.nr,e.searchQuery]]),u])]),(0,a._)("div",p,[(0,a._)("div",h,[v,(0,a.wy)((0,a._)("select",{id:"year-filter","onUpdate:modelValue":t[1]||(t[1]=t=>e.selectedYear=t),class:"form-select",style:{padding:"0.3rem 2rem 0.3rem 0.75rem"}},[m,((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.selectableYears,(e=>((0,a.wg)(),(0,a.iD)("option",{value:e},(0,o.zw)(e),9,b)))),256))],512),[[s.bM,e.selectedYear]])]),(0,a._)("div",f,[_,(0,a.wy)((0,a._)("select",{id:"month-filter","onUpdate:modelValue":t[2]||(t[2]=t=>e.selectedMonth=t),class:"form-select"},[g,((0,a.wg)(),(0,a.iD)(a.HY,null,(0,a.Ko)(12,(e=>(0,a._)("option",{value:e},(0,o.zw)(e),9,w))),64))],512),[[s.bM,e.selectedMonth]])]),(0,a.Wm)(S,{to:"/register-movement",class:"router"},{default:(0,a.w5)((()=>[y])),_:1})]),(0,a._)("table",M,[C,(0,a._)("tbody",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.openFilter,(t=>((0,a.wg)(),(0,a.iD)("tr",{key:t.id},[(0,a._)("td",null,(0,o.zw)(t.id),1),(0,a._)("td",null,(0,o.zw)(t.ativo),1),(0,a._)("td",null,(0,o.zw)(e.formatDate(t.cadastro)),1),(0,a._)("td",null,(0,o.zw)(t.veiculo.placa),1),(0,a._)("td",null,(0,o.zw)(t.condutor.nome),1),(0,a._)("td",null,(0,o.zw)(e.formatDate(t.entrada)),1),(0,a._)("td",null,[(0,a._)("div",z,[(0,a._)("button",{class:"btn btn-sm btn-primary",onClick:l=>e.editItem(t),style:{width:"45px",height:"30px"}},P,8,x),(0,a._)("button",{class:"btn btn-sm btn-danger",onClick:l=>e.deleteItem(t),style:{width:"45px",height:"30px"}},I,8,k),(0,a._)("button",{class:"btn btn-sm btn-success",onClick:l=>e.closeItem(t),style:{width:"45px",height:"30px"}},L,8,V),(0,a._)("button",{type:"button",class:"btn btn-sm btn-info","data-bs-toggle":"modal","data-bs-target":"#details",style:{width:"45px",height:"30px",color:"#fff","font-weight":"bold"},onClick:l=>e.viewItem(t)},H,8,A)])])])))),128))])]),(0,a._)("div",Q,[(0,a._)("div",$,[(0,a._)("div",B,[N,(0,a._)("div",Z,[j,(0,a._)("div",q,[(0,a._)("p",null,(0,o.zw)(e.selectedMove?.id),1),(0,a._)("p",null,(0,o.zw)(e.selectedMove?.ativo),1),(0,a._)("p",null,(0,o.zw)(e.selectedMove?.cadastro),1),E,(0,a._)("p",null,(0,o.zw)(e.selectedMove?.condutor.nome),1),(0,a._)("p",null,(0,o.zw)(e.selectedMove?.condutor.cpf),1),(0,a._)("p",null,(0,o.zw)(e.selectedMove?.condutor.telefone),1),(0,a._)("p",null,(0,o.zw)(e.selectedMove?.condutor.tempoPagoHoras),1),(0,a._)("p",null,(0,o.zw)(e.selectedMove?.tempoDesconto),1),K,(0,a._)("p",null,(0,o.zw)(e.selectedMove?.veiculo.placa),1),(0,a._)("p",null,(0,o.zw)(e.selectedMove?.veiculo.modelo.marca.nome),1),(0,a._)("p",null,(0,o.zw)(e.selectedMove?.veiculo.modelo.nome),1),(0,a._)("p",null,(0,o.zw)(e.selectedMove?.veiculo.tipo),1),(0,a._)("p",null,(0,o.zw)(e.selectedMove?.veiculo.ano),1),(0,a._)("p",null,(0,o.zw)(e.selectedMove?.veiculo.cor),1),T,(0,a._)("p",null,(0,o.zw)(e.selectedMove?.entrada),1)])]),U])])]),(0,a._)("div",R,[(0,a._)("ul",O,[(0,a._)("li",{class:(0,o.C_)(["page-item",{disabled:0===e.currentPage}])},[(0,a._)("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:t[3]||(t[3]=(...t)=>e.previousPage&&e.previousPage(...t)),style:{color:"#3C3C43","background-color":"#B5C2C9"}},G)],2),(0,a._)("li",{class:"page-item",disabled:e.openFilter.length<e.pageSize},[(0,a._)("a",{class:"page-link",href:"#","aria-label":"Next",onClick:t[4]||(t[4]=(...t)=>e.nextPage&&e.nextPage(...t)),style:{color:"#3C3C43","background-color":"#B5C2C9"}},ee)],8,J)])])])}l(7658);var le=l(5276),ae=l(4452),se=(0,a.aZ)({name:"AccessVehicleModelView",data(){return{moves:[],searchQuery:"",selectedYear:null,selectedMonth:null,selectedMove:null,currentPage:0,pageSize:100}},created(){this.$route.query.licensePlate&&(this.searchQuery=this.$route.query.licensePlate.toLocaleString())},computed:{openFilter(){if(this.searchQuery||this.selectedYear||this.selectedMonth){const e=this.searchQuery.toLowerCase();return this.moves.filter((t=>{const l=new Date(t.entrada),a=l.getFullYear(),s=l.getMonth()+1,o=t.veiculo.placa.toLowerCase().includes(e)||t.condutor.nome.toLowerCase().includes(e);return this.selectedYear&&this.selectedMonth?o&&a===this.selectedYear&&s===this.selectedMonth:this.selectedYear?o&&a===this.selectedYear:this.selectedMonth?o&&s===this.selectedMonth:o}))}return this.moves},selectableYears(){const e=(new Date).getFullYear(),t=[];for(let l=2019;l<=e;l++)t.push(l);return t}},mounted(){this.fetchMoves()},methods:{async fetchMoves(){try{const e=new ae.l;e.currentPage=this.currentPage,e.pageSize=this.pageSize;const t=new le.M,l=await t.findByFiltrosPaginado(e);this.moves=l.content.filter((e=>null===e.saida))}catch(e){console.error(e)}},previousPage(){this.currentPage>0&&(this.currentPage--,this.fetchMoves())},nextPage(){this.openFilter.length===this.pageSize&&(this.currentPage++,this.fetchMoves())},formatDate(e){const t=new Date(e),l=t.toLocaleDateString(),a=t.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});return`${l} ${a}`},async deleteItem(e){const t=confirm("Are you sure you want to delete this driver?");if(t)try{const t=new le.M;await t.delete(e.id),this.moves=this.moves.filter((t=>t.id!==e.id))}catch(l){console.error(l)}},async editItem(e){try{new le.M;const t=e.id;await this.$router.push({name:"edit-movement",params:{editMovemId:t}})}catch(t){console.error(t)}},async closeItem(e){try{new le.M;const t=e.id;await this.$router.push({name:"register-closemovement",params:{movemId:t}})}catch(t){console.error(t)}},async viewItem(e){this.selectedMove=e}}}),oe=l(89);const ne=(0,oe.Z)(se,[["render",te],["__scopeId","data-v-58a33b9f"]]);var ie=ne}}]);
//# sourceMappingURL=137.f87babe0.js.map