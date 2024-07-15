(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[941],{67:function(){},2061:function(){},3111:function(e,t,a){Promise.resolve().then(a.bind(a,6186))},6186:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return S}});var s=a(7437),n=a(1819),l=a(2034),r=a(2667),i=a(1715),c=a(5629),o=a(3288),d=a(8924),u=a(7185),h=a(7733),p=a(5381),m=a(6622),x=a(1505),f=a.n(x),g=a(2265);class y{init(){return new Promise((e,t)=>{if(this.db)e(this.db);else{let a=indexedDB.open("DEDB");a.onupgradeneeded=e=>{e.target.result.createObjectStore("dataHandle",{keyPath:"code"})},a.onsuccess=()=>{this.db=a.result,e(a.result)},a.onerror=e=>{t(e)}}})}async setItem(e,t){let a=await this.init();return new Promise((s,n)=>{let l=a.transaction([e],"readwrite").objectStore(e).put(t);l.onsuccess=e=>{s(l.result)},l.onerror=e=>{n(e)}})}async setAll(e,t){t.forEach(async t=>await this.setItem(e,t))}async getItem(e,t){let a=await this.init();return new Promise((s,n)=>{let l=a.transaction([e],"readwrite").objectStore(e).get(t);l.onsuccess=e=>{s(l.result)},l.onerror=e=>{n(e)}})}async getAll(e){let t=await this.init();return new Promise((a,s)=>{let n=[],l=t.transaction([e],"readwrite").objectStore(e).openCursor();l.onsuccess=e=>{let t=e.target.result;t?(n.push({...t.value,key:t.key}),t.continue()):a(n)},l.onerror=e=>{s(e)}})}async removeItem(e,t){let a=await this.init();return new Promise((s,n)=>{let l=a.transaction([e],"readwrite").objectStore(e).delete(t);l.onsuccess=()=>{s()},l.onerror=e=>{n(e)}})}async clear(e){let t=await this.init();return new Promise((a,s)=>{let n=t.transaction([e],"readwrite").objectStore(e).clear();n.onsuccess=()=>{a()},n.onerror=e=>{s(e)}})}constructor(){this.db=null,this.init()}}let j=new y;var w=a(7800);class _{importExcel(e,t){if(!e)return;let a=new FileReader;a.readAsArrayBuffer(e),a.onload=e=>{try{var a;let s=null===(a=e.target)||void 0===a?void 0:a.result,n=w.ij(s,{type:"binary"}).Sheets[this.sheetName],l=w.P6.sheet_to_json(n,this.options);null==t||t(l)}catch(e){}}}constructor(e){let{sheetName:t,...a}=e;this.sheetName=t,this.options=a}}var b=a(2599),k=a.n(b),Z=[{title:"编码",dataIndex:"code"},{title:"名称",dataIndex:"name"},{title:"规格",dataIndex:"spec"},{title:"品牌",dataIndex:"brand"}];let v={物料编码:"code",物料名称:"name",规格型号:"spec",品牌:"brand"},C=[{label:"手工录入",key:"hand"}];function S(){let[e,t]=(0,g.useState)(""),[a,x]=(0,g.useState)(!1),[y,w]=(0,g.useState)(!1),[b,S]=(0,g.useState)([]),[I,N]=(0,g.useState)([]),[P,E]=(0,g.useState)([]),[A,H]=(0,g.useState)(0),[D]=n.Z.useForm(),O=(0,g.useRef)(null),B=new _({sheetName:"外购件",range:3}),F=async()=>{try{let{record:e}=await D.validateFields();M(e),w(!0)}catch(e){}},K=()=>{D.resetFields()},M=e=>{console.log(e,b),E(e.map(e=>{let t=["code","name","spec","brand"],a=b.find(t=>t.code===e.code),s={...e};return k().isEqual(k().pick(a,t),k().pick(s,t))?s.flag="same":(s.flag="conflict",s.children=[{...a,flag:"conflict"}]),s}))},R=e=>{let t=Object.keys(v),a=e.map(e=>k().mapKeys(k().pick(e,t),(e,t)=>v[t]));j.setAll("dataHandle",a),q()},q=(0,g.useCallback)(async()=>{S(await j.getAll("dataHandle"))},[j]),L=(0,g.useCallback)(()=>{let t=RegExp("(".concat(e,")"),"gi"),a=k().cloneDeep(b).flatMap(a=>{let s=!1,n={...a};return e&&Object.keys(a).map(e=>{n[e]=a[e].replace(t,'<span style="background:black; color:white">$1</span>'),n[e]!==a[e]&&(s=!0)}),s||!e?n:[]});console.log(a),N(a)},[e,b]);return(0,g.useEffect)(()=>{L()},[L]),(0,g.useEffect)(()=>{q()},[q]),(0,g.useEffect)(()=>{N(b)},[b]),(0,s.jsxs)("div",{className:f().dataHandle,children:[(0,s.jsxs)("h3",{className:f().header,children:[(0,s.jsx)("span",{className:f().title,children:"数据处理"}),(0,s.jsxs)("div",{children:[(0,s.jsx)(l.Z.Button,{menu:{items:C,onClick:e=>{"hand"===e.key&&x(!0)}},onClick:()=>{var e;null===(e=O.current)||void 0===e||e.click()},children:"表格录入"},"excel"),(0,s.jsx)("input",{style:{display:"none"},ref:O,type:"file",accept:".xlsx",onChange:e=>{let t=e.target.files[0];B.importExcel(t,t=>{R(t.slice(0,-1)),e.target.value=null})}})]})]}),(0,s.jsx)(r.Z,{placeholder:"请输入关键字",allowClear:!0,value:e,onChange:e=>{t(e.target.value)}}),(0,s.jsx)(i.Z,{rowKey:"code",className:f().data,columns:Z.map(e=>({...e,render:e=>(0,s.jsx)("span",{dangerouslySetInnerHTML:{__html:e}})})),dataSource:I}),(0,s.jsxs)(c.Z,{title:"手工录入",open:a,closeIcon:!1,destroyOnClose:!0,width:500,onClose:()=>{x(!1),K()},extra:(0,s.jsx)(o.Z,{children:(0,s.jsx)(d.ZP,{onClick:F,ghost:!0,type:"primary",children:"确认"})}),children:[(0,s.jsx)(n.Z,{form:D,autoComplete:"off",initialValues:{record:[{}]},children:(0,s.jsx)(n.Z.List,{name:"record",children:(e,t)=>{let{add:a,remove:l}=t;return(0,s.jsxs)(s.Fragment,{children:[e.map(t=>{let{name:a}=t;return(0,s.jsx)(o.Z,{direction:"vertical",children:(0,s.jsx)(u.Z,{size:"small",title:"第 ".concat(a+1," 项"),extra:e.length>1?(0,s.jsx)(m.Z,{onClick:()=>l(a)}):null,children:(0,s.jsx)(h.Z,{gutter:[16,0],children:Z.map(e=>(0,s.jsx)(p.Z,{span:12,children:(0,s.jsx)(n.Z.Item,{label:e.title,name:[a,e.dataIndex],required:!0,rules:[{required:!0}],children:(0,s.jsx)(r.Z,{})})},e.dataIndex))})})},a)}),(0,s.jsx)(d.ZP,{style:{position:"sticky",bottom:"0"},onClick:()=>a(),type:"primary",block:!0,children:"添加新项"})]})}})}),(0,s.jsxs)(c.Z,{title:"数据对比",closeIcon:!1,onClose:()=>w(!1),open:y,width:600,destroyOnClose:!0,extra:(0,s.jsx)(o.Z,{children:(0,s.jsx)(d.ZP,{type:"primary",ghost:!0,onClick:()=>{},children:"提交"})}),children:[(0,s.jsx)("div",{}),(0,s.jsx)(o.Z,{}),(0,s.jsx)(i.Z,{className:f().viewData,rowKey:e=>e.code,rowSelection:{type:"checkbox",getCheckboxProps:e=>({disabled:"same"===e.flag}),defaultSelectedRowKeys:P.flatMap(e=>"same"===e.flag?[]:e.code),onSelectAll:(e,t,a)=>{console.log(e,t,a)}},dataSource:P,columns:Z,rowClassName:e=>e.flag?f()[e.flag]:""})]})]})]})}},1505:function(e){e.exports={dataHandle:"page_dataHandle__ApIjS",header:"page_header__s_ZBJ",title:"page_title__Mm_Jb",data:"page_data__NGH0t",viewData:"page_viewData__IGxhx",conflict:"page_conflict__bkBTe",same:"page_same__o2UVL"}}},function(e){e.O(0,[249,866,425,76,667,170,971,23,744],function(){return e(e.s=3111)}),_N_E=e.O()}]);