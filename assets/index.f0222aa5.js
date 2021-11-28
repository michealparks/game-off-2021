var $=Object.defineProperty,G=Object.defineProperties;var W=Object.getOwnPropertyDescriptors;var _=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable;var P=(t,e,r)=>e in t?$(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,U=(t,e)=>{for(var r in e||(e={}))D.call(e,r)&&P(t,r,e[r]);if(_)for(var r of _(e))z.call(e,r)&&P(t,r,e[r]);return t},T=(t,e)=>G(t,W(e));var H=(t,e)=>{var r={};for(var o in t)D.call(t,o)&&e.indexOf(o)<0&&(r[o]=t[o]);if(t!=null&&_)for(var o of _(t))e.indexOf(o)<0&&z.call(t,o)&&(r[o]=t[o]);return r};import{c as L,a as d,i as I,u as M,j as R,b as A,r as x,d as K,e as Z,p as q,T as Y,y as J,B as Q,H as X,f as p,g as y,h as v,k,l as ee,s as te,m as re,C as ne,V as oe,A as se,O as ae,R as ie}from"./vendor.f2527ba5.js";const ce=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerpolicy&&(a.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?a.credentials="include":s.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}};ce();const le=L({id:"computer",initial:"running",context:{cpu:{harvester:0,soldier:0,defender:0},gpu:{harvester:0,soldier:0,defender:0},ram:{harvester:0,soldier:0,defender:0},ssd:{harvester:0,soldier:0,defender:0},psu:{harvester:0,soldier:0,defender:0}},states:{running:{on:{SEND_UNIT:{actions:"updateUnit"},RECALL_UNIT:{actions:"updateUnit"},KILL_UNIT:{actions:"updateUnit"}}}}},{actions:{updateUnit:d((t,e)=>{const{part:r,unit:o}=e,s=e.type==="SEND_UNIT"?1:-1;return{[r]:T(U({},t[r]),{[o]:t[r][o]+s})}})}}),f=I(le);f.start();const l={minInterval:.1,interval:.5,cooldown:7,maxHarvester:10,maxSoldier:10,ssdHarvesterBonus:3,cpuHarvesterLimiter:.01,psuHarvesterLimiter:.05},C={harvester:5,soldier:10},de=L({id:"player",initial:"idle",context:{elapsed:0,elapsedCooldown:0,interval:0,cooldown:0,maxHarvester:0,maxSoldier:0,energy:0,harvester:0,soldier:0},states:{idle:{on:{START:{actions:"start",target:"running"}}},running:{invoke:{src:"tick"},on:{TICK:{actions:"process",target:"running"},CHANGE_SPEED:{actions:"changeSpeed"},BUILD_UNIT:{actions:"buildUnit",cond:"hasEnergyForUnit"},SEND_UNIT:{actions:"sendUnit",cond:"hasUnit"},RECALL_UNIT:{actions:"recallUnit",cond:"hasSentUnit"}}}}},{guards:{hasEnergyForUnit:(t,e)=>e.type==="BUILD_UNIT"&&t.energy>=C[e.unit],hasUnit:(t,e)=>e.type==="SEND_UNIT"&&t[e.unit]>0,hasSentUnit:(t,e)=>e.type==="RECALL_UNIT"&&f.state.context[e.part][e.unit]>=1},services:{tick:(t,e)=>r=>{const{interval:o}=t,s=setTimeout(r,1e3*o,"TICK");return()=>clearTimeout(s)}},actions:{start:d((t,e)=>e.type!=="START"?{}:U({elapsed:0,elapsedCooldown:0,interval:l.interval,cooldown:l.cooldown,maxHarvester:l.maxHarvester,maxSoldier:l.maxSoldier},e.resources)),process:d((t,e)=>{const{cpu:r,gpu:o,ram:s,ssd:a,psu:c}=f.state.context;return{elapsed:t.elapsed+1,elapsedCooldown:Math.max(0,t.elapsedCooldown-1),interval:Math.max(l.minInterval,l.interval-r.harvester*l.cpuHarvesterLimiter),cooldown:l.cooldown,energy:Number.parseFloat((t.energy+c.harvester*l.psuHarvesterLimiter).toFixed(2)),maxHarvester:l.maxHarvester+a.harvester*l.ssdHarvesterBonus,maxSoldier:l.maxHarvester+a.harvester*l.ssdHarvesterBonus}}),changeSpeed:d((t,e)=>e.type!=="CHANGE_SPEED"?{}:{interval:t.interval+e.amount}),buildUnit:d((t,e)=>{if(e.type!=="BUILD_UNIT")return{};const{unit:r}=e;return{energy:t.energy-C[r],[r]:t[r]+1}}),sendUnit:d((t,e)=>{if(e.type!=="SEND_UNIT")return{};const{unit:r,part:o}=e;return f.send({type:"SEND_UNIT",unit:r,part:o}),{[r]:t[r]-1,elapsedCooldown:l.cooldown}}),recallUnit:d((t,e)=>{if(e.type!=="RECALL_UNIT")return{};const{unit:r,part:o}=e;return f.send({type:"RECALL_UNIT",unit:r,part:o}),{[r]:t[r]+1}})}}),u=I(de);u.start();const ue=L({id:"game",initial:"idle",context:{viewedModule:null},states:{idle:{on:{START:{target:"running",actions:"start"},RESUME:{target:"running",actions:"resume"}}},running:{on:{PAUSE:"paused",END_GAME:"ended",VIEW_MODULE:{actions:"setViewedModule"}}},paused:{on:{START:"running"}},ended:{on:{RESET:{target:"idle",actions:"reset"}}}}},{actions:{start:d((t,e)=>e.type!=="START"?{}:(u.send({type:"START",resources:e.resources}),{})),reset:d((t,e)=>e.type!=="END_GAME"?{}:(u.send({type:"START",resources:{energy:0,harvester:0,soldier:0}}),{viewedModule:null})),setViewedModule:d((t,e)=>e.type!=="VIEW_MODULE"?{}:{viewedModule:e.module})}}),O=I(ue);O.start();const h=()=>M(O),B=()=>M(u),n=R.exports.jsx,i=R.exports.jsxs,F=R.exports.Fragment,me=()=>{const[t]=B(),{context:e}=t;return i("div",{className:"p-2",children:[i("p",{children:["elapsed: ",e.elapsed]}),i("p",{children:["interval: ",e.interval]}),n("h4",{children:"resources"}),i("p",{children:["energy: ",e.energy]}),i("p",{children:["harvesters: ",e.harvester," / ",e.maxHarvester]}),i("p",{children:["soldiers: ",e.soldier," / ",e.maxSoldier]})]})},E=({label:t,onClick:e,className:r,disabled:o=!1})=>n("button",{onClick:e,type:"button",className:A("px-2 py-1 border rounded disabled:opacity-50 disabled:cursor-auto",r),disabled:o,children:t}),pe=()=>{const[t,e]=h();return x.exports.useEffect(()=>{e({type:"START",resources:{energy:10,harvester:5,soldier:5}})},[]),i("div",{className:"absolute inset-0 pointer-events-none h-full w-full z-10 flex flex-col justify-between items-end select-none text-white",children:[n(me,{}),i("div",{className:"p-2 pointer-events-auto",children:[n(E,{onClick:()=>e("PAUSE"),label:"pause"}),n(E,{onClick:()=>u.send({type:"BUILD_UNIT",unit:"harvester"}),label:`Build harvester (-${C.harvester})`}),n(E,{onClick:()=>u.send({type:"BUILD_UNIT",unit:"soldier"}),label:`Build soldier (-${C.soldier})`})]}),t.matches("ended")&&n("p",{children:"Ended"}),t.matches("paused")&&i("div",{className:"absolute z-50 w-full h-full bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm grid place-content-center pointer-events-auto text-white",children:[n("h2",{className:"uppercase text-8xl",children:"Paused"}),n(E,{onClick:()=>e("START"),label:"resume"})]})]})},he=()=>i(K,{multisampling:8,children:[n(Z,{intensity:.9,height:300,luminanceThreshold:.4,luminanceSmoothing:.9}),n(q,{opacity:.1}),n(Y,{eskil:!1,offset:.1,darkness:1.1}),n(J,{blendFunction:Q.MULTIPLY,samples:30,rings:4,distanceThreshold:1,distanceFalloff:0,rangeThreshold:.5,rangeFalloff:.1,luminanceInfluence:0,radius:20,scale:1,bias:.035})]}),w=.1,b={mass:1,tension:1e3,friction:25,precision:1e-4},g=new URL("/game-off-2021/assets/computer.185dcdf2.glb",self.location).href,ge=()=>M(f),V=({onClick:t,label:e,className:r})=>n("button",{type:"button",className:`px-2 py-1 ${r}`,onClick:t,children:e});let ye=0;const j=({unit:t,part:e})=>{const[r,o]=B(),{elapsedCooldown:s,cooldown:a}=r.context,c=s>0;return i("div",{className:"relative overflow-hidden border rounded border-white bg-opacity-50",children:[c&&n("div",{style:{transform:`scale(${1-s/a}, 1)`},className:"absolute w-full h-full bg-white origin-left transition-transform duration-300"}),n(V,{className:A("icon-plus border-r border-white",{"invisible pointer-events-none":c}),onClick:()=>o({type:"SEND_UNIT",unit:t,part:e})}),n(V,{className:A("icon-minus",{"invisible pointer-events-none":c}),onClick:()=>o({type:"RECALL_UNIT",unit:t,part:e})})]})},S=({name:t,description:e})=>{const[,r]=h(),[o]=ge(),{harvester:s,soldier:a}=o.context[t];return console.log(ye++),i(X,{as:"div",distanceFactor:.5,zIndexRange:[10,0],sprite:!0,className:"text-white bg-gray-800 text-xs p-3 cursor-default select-none min-w-[12rem] rounded-md",children:[i("div",{className:"flex justify-between items-center",children:[n("h3",{className:"text-base",children:t}),n("button",{onClick:()=>r({type:"VIEW_MODULE",module:null}),className:"icon-x p-2"})]}),n("p",{className:"my-2",children:e}),i("div",{className:"flex items-center justify-between gap-1 my-1",children:[n("div",{children:"Harvesters"}),n("div",{children:s}),n(j,{unit:"harvester",part:t})]}),i("div",{className:"flex items-center justify-between gap-1 my-1",children:[n("div",{children:"Soldiers"}),n("div",{children:a}),n(j,{unit:"soldier",part:t})]})]})},ve=`
Causes additional energy to be redistributed to the virus.
`,fe=()=>{const[t,e]=h(),r=t.context.viewedModule==="psu",{nodes:o}=p(g),[{z:s}]=y({z:r?w+.04:.04,config:b},[r]);return n(v.mesh,{name:"psu",castShadow:!0,onClick:a=>{a.stopPropagation(),e({type:"VIEW_MODULE",module:r?null:"psu"})},geometry:o.psu.geometry,material:o.psu.material,"position-x":.002,"position-y":.159,"position-z":s,children:r&&n(S,{name:"psu",description:ve})})},be=`
Creates a greater chance every clock tick that a random unit will be generated.
`,xe=()=>{const t=.061,[e,r]=h(),o=e.context.viewedModule==="gpu",{nodes:s,materials:a}=p(g),[{z:c}]=y({z:o?w+t:t,config:b},[o]),m=x.exports.useRef(null);return k(()=>{m.current.rotation.y+=.01+1/u.state.context.interval}),i(v.group,{name:"gpu",castShadow:!0,onClick:N=>{N.stopPropagation(),r({type:"VIEW_MODULE",module:o?null:"gpu"})},"position-x":.003,"position-y":-.076,"position-z":c,children:[n("mesh",{geometry:s.Cube002.geometry,material:s.Cube002.material}),n("mesh",{geometry:s.Cube002_1.geometry,material:s.Cube002_1.material}),n("mesh",{geometry:s.Cube002_2.geometry,material:s.Cube002_2.material}),n("mesh",{name:"gpu-fan",ref:m,geometry:s.gpu_fan.geometry,material:a.light_metal,position:[.07,.015,.001]}),o&&n(S,{name:"gpu",description:be})]})},we=`
Speeds up the game clock for the virus.
`,Se=()=>{const[t,e]=h(),r=t.context.viewedModule==="cpu",{nodes:o,materials:s}=p(g),[{z:a}]=y({z:r?w+.037:.037,config:b},[r]),[{z:c}]=y({z:r?.06:.012,config:b},[r]),m=x.exports.useRef(null);return k(()=>{m.current.rotation.z+=.01+1/u.state.context.interval*.01}),i(F,{children:[n(v.mesh,{castShadow:!0,name:"cpu",geometry:o.cpu.geometry,material:o.cpu.material,"position-x":0,"position-y":0,"position-z":c}),i(v.group,{name:"cpu-cooler",onClick:N=>{N.stopPropagation(),e({type:"VIEW_MODULE",module:r?null:"cpu"})},"position-x":0,"position-y":0,"position-z":a,children:[n("mesh",{geometry:o.Cube011.geometry,material:o.Cube011.material}),n("mesh",{geometry:o.Cube011_1.geometry,material:s.sand}),n("mesh",{name:"cpu-fan",ref:m,geometry:o.cpu_fan.geometry,material:s.brown,position:[0,0,.01]}),r&&n(S,{name:"cpu",description:we})]})]})};var _e="varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",Ue="uniform float time;varying vec2 vUv;void main(){vec3 rgb=0.5+0.5*cos(time+vUv.xyx+vec3(0,2,4));gl_FragColor=vec4(rgb,1.0);}";const Ce=te({time:0},_e,Ue);ee({RamMaterial:Ce});const Ee=`
Results in faster cooldowns when assigning units.
`,Ne=()=>{const[t,e]=h(),r=t.context.viewedModule==="ram",{nodes:o,materials:s}=p(g),[{z:a}]=y({z:r?w+.047:.047,config:b},[r]),c=x.exports.useRef(null);return k(()=>c.current.uniforms.time.value+=.01),i(v.group,{onClick:m=>{m.stopPropagation(),e({type:"VIEW_MODULE",module:r?null:"ram"})},"position-x":.068,"position-y":.013,"position-z":a,children:[n("mesh",{castShadow:!0,geometry:o.Cube009.geometry,material:o.Cube009.material}),n("mesh",{castShadow:!0,geometry:o.Cube009_1.geometry,material:o.Cube009_1.material}),n("mesh",{castShadow:!0,geometry:o.Cube009_2.geometry,material:s.red,children:n("ramMaterial",{ref:c,attach:"material",color:"hotpink"})}),r&&n(S,{name:"ram",description:Ee})]})},Te=`
allows additional units to be built.
`,Le=()=>{const[t,e]=h(),r=t.context.viewedModule==="ssd",{nodes:o}=p(g),[{z:s}]=y({z:r?w+.016:.016,config:b},[r]);return n(v.mesh,{name:"ssd",castShadow:!0,onClick:a=>{a.stopPropagation(),e({type:"VIEW_MODULE",module:r?null:"ssd"})},geometry:o.ssd.geometry,material:o.ssd.material,"position-x":0,"position-y":.062,"position-z":s,children:r&&n(S,{name:"ssd",description:Te})})};p.preload(g);const Ie=e=>{var t=H(e,[]);const{nodes:r,materials:o}=p(g);return i("group",T(U({},t),{dispose:null,children:[n("mesh",{name:"motherboard",receiveShadow:!0,geometry:r.motherboard.geometry,material:o.green}),n("mesh",{castShadow:!0,receiveShadow:!0,name:"io",geometry:r.io.geometry,material:r.io.material,position:[-.092,.014,.032]}),n("mesh",{castShadow:!0,receiveShadow:!0,name:"motherboard_gpu_io",geometry:r.motherboard_gpu_io.geometry,material:r.motherboard_gpu_io.material,position:[-.044,-.077,.009]}),n("mesh",{castShadow:!0,receiveShadow:!0,name:"motherboard_cpu_io",geometry:r.motherboard_cpu_io.geometry,material:o.white,position:[0,0,.005]}),n("mesh",{castShadow:!0,receiveShadow:!0,name:"ram_io",geometry:r.ram_io.geometry,material:r.ram_io.material,position:[.078,.013,.008]}),n(fe,{}),n(xe,{}),n(Ne,{}),n(Se,{}),n(Le,{})]}))},Me=()=>i(F,{children:[n("ambientLight",{intensity:.1}),n("directionalLight",{castShadow:!0,intensity:.1,position:[2,2,20],color:"red"}),n("spotLight",{intensity:2,position:[-5,10,2],angle:.2,penumbra:1,castShadow:!0,"shadow-mapSize":[2048,2048],onUpdate:t=>t.lookAt(0,0,0)}),n("rectAreaLight",{intensity:1,position:[4.5,0,2],width:10,height:10})]});re({frustum:10.75,size:10.5,near:9.5,samples:17,rings:30});const Re=()=>i("div",{className:"h-screen w-screen",children:[i(ne,{shadows:!0,mode:"concurrent",performance:{min:.5},dpr:Math.min(2,window.devicePixelRatio),gl:{alpha:!1,antialias:!1},camera:{position:new oe(-.25,.25,.25)},children:[n(se,{}),n(Me,{}),n(ae,{enablePan:!1,enableZoom:!1,enableRotate:!0}),n(Ie,{}),n(he,{})]}),n(pe,{})]});ie.render(n(x.exports.StrictMode,{children:n(Re,{})}),document.getElementById("root"));
