import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{R as A,r as C}from"./index-BioFo8Zg.js";import"./index-yBjzXJbu.js";const p=A.forwardRef(({label:m,hint:d,error:a,options:P,placeholder:u,size:R="md",className:g,id:W,..._},F)=>{const k=C.useId(),r=W??k;return e.jsxs("div",{className:`jowa-select-wrapper${g?` ${g}`:""}`,children:[m&&e.jsx("label",{className:"jowa-select-label",htmlFor:r,children:m}),e.jsxs("div",{className:"jowa-select-control",children:[e.jsxs("select",{ref:F,id:r,className:`jowa-select jowa-select--${R}${a?" jowa-select--error":""}`,"aria-invalid":!!a,"aria-describedby":a?`${r}-error`:d?`${r}-hint`:void 0,..._,children:[u&&e.jsx("option",{value:"",disabled:!0,children:u}),P.map(s=>e.jsx("option",{value:s.value,disabled:s.disabled,children:s.label},s.value))]}),e.jsx("span",{className:"jowa-select-chevron","aria-hidden":"true",children:"▾"})]}),a&&e.jsx("p",{id:`${r}-error`,className:"jowa-select-error",children:a}),!a&&d&&e.jsx("p",{id:`${r}-hint`,className:"jowa-select-hint",children:d})]})});p.displayName="Select";p.__docgenInfo={description:"",methods:[],displayName:"Select",props:{label:{required:!1,tsType:{name:"string"},description:""},hint:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},options:{required:!0,tsType:{name:"Array",elements:[{name:"SelectOption"}],raw:"SelectOption[]"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}}},composes:["Omit"]};const H=[{value:"apple",label:"Apple"},{value:"banana",label:"Banana"},{value:"cherry",label:"Cherry"},{value:"durian",label:"Durian",disabled:!0}],G={title:"Forms/Select",component:p,tags:["autodocs"],args:{options:H,label:"Fruit",placeholder:"Choose a fruit…"}},t={},o={args:{hint:"Pick your favourite."}},l={args:{error:"Please select an option."}},i={args:{disabled:!0,value:"apple"}},n={args:{size:"sm"}},c={args:{size:"lg"}};var h,v,j;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:"{}",...(j=(v=t.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var b,f,S;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    hint: "Pick your favourite."
  }
}`,...(S=(f=o.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var x,y,w;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    error: "Please select an option."
  }
}`,...(w=(y=l.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var N,$,T;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    disabled: true,
    value: "apple"
  }
}`,...(T=($=i.parameters)==null?void 0:$.docs)==null?void 0:T.source}}};var q,O,z;n.parameters={...n.parameters,docs:{...(q=n.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    size: "sm"
  }
}`,...(z=(O=n.parameters)==null?void 0:O.docs)==null?void 0:z.source}}};var D,E,I;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    size: "lg"
  }
}`,...(I=(E=c.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};const J=["Default","WithHint","WithError","Disabled","Small","Large"];export{t as Default,i as Disabled,c as Large,n as Small,l as WithError,o as WithHint,J as __namedExportsOrder,G as default};
