import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{R as l,r as z}from"./index-BioFo8Zg.js";import"./index-yBjzXJbu.js";const h=l.forwardRef(({label:b,hint:m,error:r,indeterminate:x,className:g,id:F,...H},a)=>{const O=z.useId(),s=F??O,p=l.useRef(null),Y=u=>{p.current=u,typeof a=="function"?a(u):a&&(a.current=u)};return l.useEffect(()=>{p.current&&(p.current.indeterminate=!!x)},[x]),e.jsxs("div",{className:`jowa-checkbox-wrapper${g?` ${g}`:""}`,children:[e.jsxs("label",{className:"jowa-checkbox-label",htmlFor:s,children:[e.jsx("input",{ref:Y,type:"checkbox",id:s,className:`jowa-checkbox${r?" jowa-checkbox--error":""}`,"aria-invalid":!!r,"aria-describedby":r?`${s}-error`:m?`${s}-hint`:void 0,...H}),e.jsx("span",{className:"jowa-checkbox-box","aria-hidden":"true"}),b&&e.jsx("span",{className:"jowa-checkbox-text",children:b})]}),r&&e.jsx("p",{id:`${s}-error`,className:"jowa-checkbox-error",children:r}),!r&&m&&e.jsx("p",{id:`${s}-hint`,className:"jowa-checkbox-hint",children:m})]})});h.displayName="Checkbox";h.__docgenInfo={description:"",methods:[],displayName:"Checkbox",props:{label:{required:!1,tsType:{name:"string"},description:""},hint:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},indeterminate:{required:!1,tsType:{name:"boolean"},description:""}},composes:["Omit"]};const J={title:"Forms/Checkbox",component:h,tags:["autodocs"],args:{label:"I agree to the terms"}},t={},o={args:{defaultChecked:!0}},c={args:{indeterminate:!0,label:"Select all"}},n={args:{hint:"Required to continue."}},i={args:{error:"You must accept the terms."}},d={args:{disabled:!0}};var f,j,k;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:"{}",...(k=(j=t.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};var w,y,R;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    defaultChecked: true
  }
}`,...(R=(y=o.parameters)==null?void 0:y.docs)==null?void 0:R.source}}};var C,N,S;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    indeterminate: true,
    label: "Select all"
  }
}`,...(S=(N=c.parameters)==null?void 0:N.docs)==null?void 0:S.source}}};var I,$,q;n.parameters={...n.parameters,docs:{...(I=n.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    hint: "Required to continue."
  }
}`,...(q=($=n.parameters)==null?void 0:$.docs)==null?void 0:q.source}}};var E,D,T;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    error: "You must accept the terms."
  }
}`,...(T=(D=i.parameters)==null?void 0:D.docs)==null?void 0:T.source}}};var W,_,v;d.parameters={...d.parameters,docs:{...(W=d.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(v=(_=d.parameters)==null?void 0:_.docs)==null?void 0:v.source}}};const K=["Default","Checked","Indeterminate","WithHint","WithError","Disabled"];export{o as Checked,t as Default,d as Disabled,c as Indeterminate,i as WithError,n as WithHint,K as __namedExportsOrder,J as default};
