import{r as n}from"./index-BCtMShv3.js";import{u as a}from"./index-bNP9aXDC.js";function b(t,c,{checkForDefaultPrevented:o=!0}={}){return function(e){if(t==null||t(e),o===!1||!e.defaultPrevented)return c==null?void 0:c(e)}}function P({prop:t,defaultProp:c,onChange:o=()=>{}}){const[s,e]=C({defaultProp:c,onChange:o}),u=t!==void 0,i=u?t:s,l=a(o),m=n.useCallback(f=>{if(u){const r=typeof f=="function"?f(t):f;r!==t&&l(r)}else e(f)},[u,t,e,l]);return[i,m]}function C({defaultProp:t,onChange:c}){const o=n.useState(t),[s]=o,e=n.useRef(s),u=a(c);return n.useEffect(()=>{e.current!==s&&(u(s),e.current=s)},[s,e,u]),o}export{b as c,P as u};
