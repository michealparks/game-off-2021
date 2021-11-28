var Q=Object.defineProperty,X=Object.defineProperties;var Y=Object.getOwnPropertyDescriptors;var I=Object.getOwnPropertySymbols;var B=Object.prototype.hasOwnProperty,V=Object.prototype.propertyIsEnumerable;var $=(t,e,o)=>e in t?Q(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,w=(t,e)=>{for(var o in e||(e={}))B.call(e,o)&&$(t,o,e[o]);if(I)for(var o of I(e))V.call(e,o)&&$(t,o,e[o]);return t},C=(t,e)=>X(t,Y(e));var F=(t,e)=>{var o={};for(var s in t)B.call(t,s)&&e.indexOf(s)<0&&(o[s]=t[s]);if(t!=null&&I)for(var s of I(t))e.indexOf(s)<0&&V.call(t,s)&&(o[s]=t[s]);return o};import{c as D,a as p,i as z,u as P,j as H,b as E,r as m,A as ee,d as te,e as oe,f as re,g as se,h as ne,p as ae,T as ie,H as ce,k as v,l as b,m as x,n as O,M as W,o as le,s as de,q as ue,t as pe,B as me,C as he,V as ge,v as ve,w as fe,O as ye,R as we}from"./vendor.25cc1846.js";const be=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerpolicy&&(a.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?a.credentials="include":n.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}};be();const xe=D({id:"computer",initial:"running",context:{cpu:{harvester:0,soldier:0,defender:0},gpu:{harvester:0,soldier:0,defender:0},ram:{harvester:0,soldier:0,defender:0},ssd:{harvester:0,soldier:0,defender:0},psu:{harvester:0,soldier:0,defender:0}},states:{running:{on:{SEND_UNIT:{actions:"updateUnit"},RECALL_UNIT:{actions:"updateUnit"},KILL_UNIT:{actions:"updateUnit"}}}}},{actions:{updateUnit:p((t,e)=>{const{part:o,unit:s}=e,n=e.type==="SEND_UNIT"?1:-1;return{[o]:C(w({},t[o]),{[s]:t[o][s]+n})}})}}),S=z(xe);S.start();const l={minInterval:.1,interval:.5,cooldown:7,maxHarvester:10,maxSoldier:10,ssdHarvesterBonus:3,cpuHarvesterLimiter:.01,psuHarvesterLimiter:.05},M={harvester:5,soldier:10},j=t=>Number.parseFloat(t.toFixed(2)),Se=D({id:"player",initial:"idle",context:{elapsed:0,elapsedCooldown:{harvester:0,soldier:0},interval:0,cooldown:0,maxHarvester:0,maxSoldier:0,energy:0,harvester:0,soldier:0},states:{idle:{on:{START:{actions:"start",target:"running"}}},running:{invoke:{src:"tick"},on:{TICK:{actions:"process",target:"running"},CHANGE_SPEED:{actions:"changeSpeed"},BUILD_UNIT:{actions:"buildUnit",cond:"hasEnergyForUnit"},SEND_UNIT:{actions:"sendUnit",cond:"hasUnit"},RECALL_UNIT:{actions:"recallUnit",cond:"hasSentUnit"}}}}},{guards:{hasEnergyForUnit:(t,e)=>e.type==="BUILD_UNIT"&&t.energy>=M[e.unit],hasUnit:(t,e)=>e.type==="SEND_UNIT"&&t[e.unit]>0,hasSentUnit:(t,e)=>e.type==="RECALL_UNIT"&&S.state.context[e.part][e.unit]>=1},services:{tick:(t,e)=>o=>{const{interval:s}=t,n=setTimeout(o,1e3*s,"TICK");return()=>clearTimeout(n)}},actions:{start:p((t,e)=>e.type!=="START"?{}:w({elapsed:0,elapsedCooldown:0,interval:l.interval,cooldown:l.cooldown,maxHarvester:l.maxHarvester,maxSoldier:l.maxSoldier},e.resources)),process:p((t,e)=>{const{cpu:o,gpu:s,ram:n,ssd:a,psu:c}=S.state.context,d=-(o.harvester*l.cpuHarvesterLimiter),u=-(1+n.harvester/2),_=c.harvester*l.psuHarvesterLimiter,T=a.harvester*l.ssdHarvesterBonus;return{elapsed:t.elapsed+1,interval:Math.max(l.minInterval,l.interval+d),cooldown:l.cooldown,energy:j(t.energy+_),maxHarvester:l.maxHarvester+T,maxSoldier:l.maxHarvester+T,elapsedCooldown:{harvester:Math.max(0,t.elapsedCooldown.harvester+u),soldier:Math.max(0,t.elapsedCooldown.soldier+u)}}}),changeSpeed:p((t,e)=>e.type!=="CHANGE_SPEED"?{}:{interval:t.interval+e.amount}),buildUnit:p((t,e)=>{if(e.type!=="BUILD_UNIT")return{};const{unit:o}=e;return{energy:j(t.energy-M[o]),[o]:t[o]+1}}),sendUnit:p((t,e)=>{if(e.type!=="SEND_UNIT")return{};const{unit:o,part:s}=e;return S.send({type:"SEND_UNIT",unit:o,part:s}),{[o]:t[o]-1,elapsedCooldown:C(w({},t.elapsedCooldown),{[o]:l.cooldown})}}),recallUnit:p((t,e)=>{if(e.type!=="RECALL_UNIT")return{};const{unit:o,part:s}=e;return S.send({type:"RECALL_UNIT",unit:o,part:s}),{[o]:t[o]+1,elapsedCooldown:C(w({},t.elapsedCooldown),{[o]:l.cooldown})}})}}),h=z(Se);h.start();const Ue=D({id:"game",initial:"idle",context:{viewedModule:null},states:{idle:{on:{START:{target:"running",actions:"start"},RESUME:{target:"running",actions:"resume"}}},running:{on:{PAUSE:"paused",END_GAME:"ended",VIEW_MODULE:{actions:"setViewedModule"}}},paused:{on:{START:"running"}},ended:{on:{RESET:{target:"idle",actions:"reset"}}}}},{actions:{start:p((t,e)=>e.type!=="START"?{}:(h.send({type:"START",resources:e.resources}),{})),reset:p((t,e)=>e.type!=="END_GAME"?{}:(h.send({type:"START",resources:{energy:0,harvester:0,soldier:0}}),{viewedModule:null})),setViewedModule:p((t,e)=>e.type!=="VIEW_MODULE"?{}:{viewedModule:e.module})}}),G=z(Ue);G.start();const f=()=>P(G),K=()=>P(h),r=H.exports.jsx,i=H.exports.jsxs,A=H.exports.Fragment,_e=()=>{var s;const[t]=K(),{context:e}=t;let o=e.energy.toString();return o.split(".").length===1?o=`${o}.00`:((s=o.split(".").pop())==null?void 0:s.length)===1&&(o=`${o}0`),i("div",{className:"p-2",children:[i("p",{children:["elapsed: ",e.elapsed]}),i("p",{children:["interval: ",e.interval]}),r("h4",{children:"resources"}),i("p",{children:["energy: ",o]}),i("p",{children:["harvesters: ",e.harvester," / ",e.maxHarvester]}),i("p",{children:["soldiers: ",e.soldier," / ",e.maxSoldier]})]})},R=({label:t,onClick:e,className:o,disabled:s=!1})=>r("button",{onClick:e,type:"button",className:E("px-2 py-1 border rounded disabled:opacity-50 disabled:cursor-auto",o),disabled:s,children:t}),Ce=()=>{const[t,e]=f();return m.exports.useEffect(()=>{e({type:"START",resources:{energy:10,harvester:5,soldier:5}})},[]),i("div",{className:E("absolute inset-0 pointer-events-none h-full w-full z-10 flex flex-col justify-between items-end","select-none text-white"),children:[r(_e,{}),i("div",{className:"p-2 pointer-events-auto",children:[r(R,{onClick:()=>e("PAUSE"),label:"pause"}),r(R,{onClick:()=>h.send({type:"BUILD_UNIT",unit:"harvester"}),label:`Build harvester (-${M.harvester})`}),r(R,{onClick:()=>h.send({type:"BUILD_UNIT",unit:"soldier"}),label:`Build soldier (-${M.soldier})`})]}),t.matches("ended")&&r("p",{children:"Ended"}),t.matches("paused")&&i("div",{className:E("absolute z-50 w-full h-full bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm","grid place-content-center pointer-events-auto text-white"),children:[r("h2",{className:"uppercase text-8xl",children:"Paused"}),r(R,{onClick:()=>e("START"),label:"resume"})]})]})},Z=new ee,Ee=new te,k=new Map,Ne=async(t,e)=>{const o=await Ee.loadAsync(e),s=new oe(Z);s.setBuffer(o),s.setLoop(!1),s.setVolume(.5),k.set(t,s)},Le=t=>{k.get(t).play()},Te=t=>{const e=k.get(t);e.setLoop(!0),e.play()},Ie=(t,e)=>{k.get(t).setVolume(e)},g={create:Ne,play:Le,loop:Te,volume:Ie},Me=()=>{const{camera:t}=re();return m.exports.useEffect(()=>{t.add(Z)},[t]),i(se,{multisampling:8,children:[r(ne,{intensity:.7,height:200,luminanceThreshold:.4,luminanceSmoothing:.9}),r(ae,{opacity:.06}),r(ie,{eskil:!1,offset:0,darkness:1.3})]})},N=.1,U={mass:1,tension:1e3,friction:25,precision:1e-4},y=new URL("/game-off-2021/assets/computer.185dcdf2.glb",self.location).href,Ae=()=>P(S),q=({onClick:t,label:e,className:o})=>r("button",{type:"button",className:`px-2 py-1 ${o}`,onClick:t,children:e}),J=({unit:t,part:e})=>{const[o,s]=K(),{elapsedCooldown:n,cooldown:a}=o.context,c=n[t]>0;return i("div",{className:"relative overflow-hidden border rounded border-white bg-opacity-50",children:[c&&r("div",{style:{transform:`scale(${1-n[t]/a}, 1)`},className:"absolute w-full h-full bg-white origin-left transition-transform duration-500"}),r(q,{className:E("icon-plus border-r border-white",{"invisible pointer-events-none":c}),onClick:()=>s({type:"SEND_UNIT",unit:t,part:e})}),r(q,{className:E("icon-minus",{"invisible pointer-events-none":c}),onClick:()=>s({type:"RECALL_UNIT",unit:t,part:e})})]})},L=({name:t,description:e})=>{const[,o]=f(),[s]=Ae(),{harvester:n,soldier:a}=s.context[t];return i(ce,{as:"div",distanceFactor:.5,zIndexRange:[10,0],sprite:!0,className:"text-white bg-gray-800 text-xs p-3 cursor-default select-none min-w-[12rem] rounded-md",children:[i("div",{className:"flex justify-between items-center",children:[r("h3",{className:"text-base",children:t}),r("button",{onClick:()=>o({type:"VIEW_MODULE",module:null}),className:"icon-x p-2"})]}),r("p",{className:"my-2",children:e}),i("div",{className:"flex items-center justify-between gap-1 my-1",children:[r("div",{children:"Harvesters"}),r("div",{children:n}),r(J,{unit:"harvester",part:t})]}),i("div",{className:"flex items-center justify-between gap-1 my-1",children:[r("div",{children:"Soldiers"}),r("div",{children:a}),r(J,{unit:"soldier",part:t})]})]})},Re=`
Causes additional energy to be redistributed to the virus.
`,ke=()=>{const[t,e]=f(),o=t.context.viewedModule==="psu",{nodes:s}=v(y),[{z:n}]=b({z:o?N+.04:.04,config:U},[o]);return r(x.mesh,{name:"psu",castShadow:!0,onClick:a=>{a.stopPropagation(),g.play(o?"attach":"remove"),e({type:"VIEW_MODULE",module:o?null:"psu"})},geometry:s.psu.geometry,material:s.psu.material,"position-x":.002,"position-y":.159,"position-z":n,children:o&&r(L,{name:"psu",description:Re})})},De=`
Creates a greater chance every clock tick that a random unit will be generated.
`,ze=()=>{const t=.061,[e,o]=f(),s=e.context.viewedModule==="gpu",{nodes:n,materials:a}=v(y),[{z:c}]=b({z:s?N+t:t,config:U},[s]),d=m.exports.useRef(null);return O(()=>{d.current.rotation.y+=.01+1/h.state.context.interval}),i(x.group,{name:"gpu",onClick:u=>{u.stopPropagation(),g.play(s?"attach":"remove"),o({type:"VIEW_MODULE",module:s?null:"gpu"})},"position-x":.003,"position-y":-.076,"position-z":c,children:[r(W,{castShadow:!0,receiveShadow:!0,meshes:[n.Cube002,n.Cube002_1,n.Cube002_2],children:(u,_,T)=>i(A,{children:[r(u,{material:n.Cube002.material}),r(_,{material:n.Cube002_1.material}),r(T,{material:n.Cube002_2.material})]})}),r("mesh",{castShadow:!0,receiveShadow:!0,name:"gpu-fan",ref:d,geometry:n.gpu_fan.geometry,material:a.light_metal,position:[.0675,.015,.001]}),s&&r(L,{name:"gpu",description:De})]})},Pe=`
Speeds up the game clock for the virus.
`,He=()=>{const[t,e]=f(),o=t.context.viewedModule==="cpu",{nodes:s,materials:n}=v(y),[{z:a}]=b({z:o?N+.037:.037,config:U},[o]),[{z:c}]=b({z:o?.06:.012,config:U},[o]),d=m.exports.useRef(null);return O(()=>{d.current.rotation.z+=.01+1/h.state.context.interval*.01}),i(A,{children:[r(x.mesh,{castShadow:!0,receiveShadow:!0,name:"cpu",geometry:s.cpu.geometry,material:s.cpu.material,"position-x":0,"position-y":0,"position-z":c}),i(x.group,{name:"cpu-cooler",onClick:u=>{u.stopPropagation(),o?(g.play("attach"),e({type:"VIEW_MODULE",module:null})):(g.play("remove"),e({type:"VIEW_MODULE",module:"cpu"}))},"position-x":0,"position-y":0,"position-z":a,children:[r("mesh",{castShadow:!0,receiveShadow:!0,geometry:s.Cube011.geometry,material:s.Cube011.material}),r("mesh",{castShadow:!0,receiveShadow:!0,geometry:s.Cube011_1.geometry,material:n.sand}),r("mesh",{name:"cpu-fan",castShadow:!0,receiveShadow:!0,ref:d,geometry:s.cpu_fan.geometry,material:n.brown,position:[0,0,.01]}),o&&r(L,{name:"cpu",description:Pe})]})]})};var Oe="varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",Be="uniform float time;varying vec2 vUv;void main(){vec3 rgb=0.5+0.5*cos(time+vUv.xyx+vec3(0,2,4));gl_FragColor=vec4(rgb,1.0);}";const Ve=de({time:0},Oe,Be);le({RamMaterial:Ve});const $e=`
Results in faster cooldowns when assigning units.
`,Fe=()=>{const[t,e]=f(),o=t.context.viewedModule==="ram",{nodes:s,materials:n}=v(y),[{z:a}]=b({z:o?N+.047:.047,config:U},[o]),c=m.exports.useRef(null);return O(()=>c.current.uniforms.time.value+=.01),i(x.group,{onClick:d=>{d.stopPropagation(),g.play(o?"attach":"remove"),e({type:"VIEW_MODULE",module:o?null:"ram"})},"position-x":.068,"position-y":.013,"position-z":a,children:[r("mesh",{castShadow:!0,receiveShadow:!0,geometry:s.Cube009.geometry,material:s.Cube009.material}),r("mesh",{castShadow:!0,receiveShadow:!0,geometry:s.Cube009_1.geometry,material:s.Cube009_1.material}),r("mesh",{castShadow:!0,geometry:s.Cube009_2.geometry,material:n.red,children:r("ramMaterial",{ref:c,attach:"material",color:"hotpink"})}),o&&r(L,{name:"ram",description:$e})]})},We=`
allows additional units to be built.
`,je=()=>{const[t,e]=f(),o=t.context.viewedModule==="ssd",{nodes:s}=v(y),[{z:n}]=b({z:o?N+.016:.016,config:U},[o]);return r(x.mesh,{name:"ssd",castShadow:!0,receiveShadow:!0,onClick:a=>{a.stopPropagation(),g.play(o?"attach":"remove"),e({type:"VIEW_MODULE",module:o?null:"ssd"})},geometry:s.ssd.geometry,material:s.ssd.material,"position-x":0,"position-y":.062,"position-z":n,children:o&&r(L,{name:"ssd",description:We})})};v.preload(y);const Ge=e=>{var t=F(e,[]);const{nodes:o,materials:s}=v(y),n=[o.motherboard,o.io,o.motherboard_gpu_io,o.motherboard_cpu_io,o.ram_io];return i("group",C(w({},t),{dispose:null,children:[r(W,{castShadow:!0,receiveShadow:!0,meshes:n,children:(a,c,d,u,_)=>i(A,{children:[r(a,{name:"motherboard",material:s.green}),r(c,{name:"io",material:o.io.material,position:[-.092,.014,.032]}),r(d,{name:"motherboard_gpu_io",material:o.motherboard_gpu_io.material,position:[-.044,-.077,.009]}),r(u,{name:"motherboard_cpu_io",material:s.white,position:[0,0,.005]}),r(_,{name:"ram_io",material:o.ram_io.material,position:[.078,.013,.008]})]})}),r(ke,{}),r(ze,{}),r(Fe,{}),r(He,{}),r(je,{})]}))};ue({frustum:1.75,size:.005,near:2.5,samples:30,rings:11});const Ke=()=>{const t=1,{tier:e,gpu:o=""}=pe(),s=m.exports.useMemo(()=>e<2&&/apple (gpu|m1)/i.test(o)===!1,[e,o]);return i(A,{children:[s&&r(me,{}),r("ambientLight",{intensity:.1}),r("directionalLight",{castShadow:!0,position:[1,1,1],intensity:2,"shadow-mapSize-width":2048,"shadow-mapSize-height":2048,"shadow-camera-far":25,"shadow-camera-left":-t,"shadow-camera-right":t,"shadow-camera-top":t,"shadow-camera-bottom":-t,onUpdate:n=>n.lookAt(0,0,0)}),r("spotLight",{intensity:.5,position:[-5,10,2],angle:.2,penumbra:1,"shadow-mapSize":[2048,2048],onUpdate:n=>n.lookAt(0,0,0)}),r("rectAreaLight",{color:"red",intensity:.3,position:[1.5,-1,3],width:10,height:10,onUpdate:n=>n.lookAt(0,0,0)})]})};g.create("attach",new URL("/game-off-2021/assets/attach.3ec71000.wav",self.location).href);g.create("remove",new URL("/game-off-2021/assets/remove.34b2a270.wav",self.location).href);const Ze=()=>i("div",{className:"h-screen w-screen",children:[r(m.exports.Suspense,{fallback:null,children:i(he,{shadows:!0,mode:"concurrent",performance:{min:.7},dpr:Math.min(1.5,window.devicePixelRatio),gl:{alpha:!1,antialias:!1},camera:{position:new ge(.25,.15,.25)},children:[r(ve,{pixelated:!0}),r(fe,{}),r(Me,{}),r(ye,{enablePan:!1,enableZoom:!1,enableRotate:!0}),r(Ke,{}),r(Ge,{})]})}),r(Ce,{})]});we.render(r(m.exports.StrictMode,{children:r(Ze,{})}),document.getElementById("root"));
