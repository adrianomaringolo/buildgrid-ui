import{j as s}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./index-BCtMShv3.js";import{B as j}from"./button-BZUOcGxQ.js";import{I as b}from"./input-Bsbhu3VH.js";import{P}from"./progress-BqbnIBxG.js";import{c}from"./createLucideIcon-DluVjxd-.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=c("EyeOff",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=c("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);function q(a){const{showStrengthMeter:d=!0,className:u,strengthLabels:r={veryWeak:"Very weak",weak:"Weak",medium:"Medium",strong:"Strong",veryStrong:"Very strong"},showPasswordLabel:m="Show password",hidePasswordLabel:h="Hide password",strengthTitle:g="Password strength",...y}=a,[i,p]=l.useState(""),[n,f]=l.useState(!1),w=e=>{let t=0;return e.length>=8&&(t+=25),e.match(/[a-z]/)&&(t+=25),e.match(/[A-Z]/)&&(t+=25),e.match(/[0-9]/)&&(t+=25),t},v=e=>e===0?r.veryWeak:e<=25?r.weak:e<=50?r.medium:e<=75?r.strong:r.veryStrong,o=w(i),k=v(o),x=e=>{var t;p(e.target.value),(t=a.onChange)==null||t.call(a,e)};return s.jsxs("div",{className:"w-full space-y-4",children:[s.jsxs("div",{className:"relative",children:[s.jsx(b,{...y,type:n?"text":"password",value:i,onChange:x,className:`pr-10 ${u||""}`}),s.jsx(j,{type:"button",variant:"ghost",size:"icon",className:"absolute right-0 top-0 h-full",onClick:()=>f(!n),"aria-label":n?h:m,children:n?s.jsx(S,{className:"h-4 w-4"}):s.jsx(N,{className:"h-4 w-4"})})]}),d&&s.jsxs("div",{className:"space-y-2",children:[s.jsxs("div",{className:"flex justify-between text-sm",children:[s.jsxs("span",{children:[g,":"]}),s.jsx("span",{children:k})]}),s.jsx(P,{value:o,className:"h-2"})]})]})}q.__docgenInfo={description:"",methods:[],displayName:"PasswordInput",props:{showStrengthMeter:{required:!1,tsType:{name:"boolean"},description:""},strengthLabels:{required:!1,tsType:{name:"signature",type:"object",raw:`{
	veryWeak: string
	weak: string
	medium: string
	strong: string
	veryStrong: string
}`,signature:{properties:[{key:"veryWeak",value:{name:"string",required:!0}},{key:"weak",value:{name:"string",required:!0}},{key:"medium",value:{name:"string",required:!0}},{key:"strong",value:{name:"string",required:!0}},{key:"veryStrong",value:{name:"string",required:!0}}]}},description:""},showPasswordLabel:{required:!1,tsType:{name:"string"},description:""},hidePasswordLabel:{required:!1,tsType:{name:"string"},description:""},strengthTitle:{required:!1,tsType:{name:"string"},description:""}},composes:["Omit"]};export{q as P};
