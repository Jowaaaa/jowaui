import{j as r}from"./jsx-runtime-Cf8x2fCZ.js";import{R as D,r as I}from"./index-BioFo8Zg.js";import"./index-yBjzXJbu.js";const l=D.forwardRef(({label:d,hint:c,error:e,resize:$="vertical",className:m,id:q,...E},M)=>{const S=I.useId(),a=q??S;return r.jsxs("div",{className:`jowa-textarea-wrapper${m?` ${m}`:""}`,children:[d&&r.jsx("label",{className:"jowa-textarea-label",htmlFor:a,children:d}),r.jsx("textarea",{ref:M,id:a,className:`jowa-textarea${e?" jowa-textarea--error":""}`,style:{resize:$},"aria-invalid":!!e,"aria-describedby":e?`${a}-error`:c?`${a}-hint`:void 0,...E}),e&&r.jsx("p",{id:`${a}-error`,className:"jowa-textarea-error",children:e}),!e&&c&&r.jsx("p",{id:`${a}-hint`,className:"jowa-textarea-hint",children:c})]})});l.displayName="Textarea";l.__docgenInfo={description:"",methods:[],displayName:"Textarea",props:{label:{required:!1,tsType:{name:"string"},description:""},hint:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},resize:{required:!1,tsType:{name:"union",raw:'"none" | "vertical" | "horizontal" | "both"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"vertical"'},{name:"literal",value:'"horizontal"'},{name:"literal",value:'"both"'}]},description:"",defaultValue:{value:'"vertical"',computed:!1}}}};const H={title:"Forms/Textarea",component:l,tags:["autodocs"],args:{label:"Message",placeholder:"Type your message…",rows:4}},s={},t={args:{hint:"Max 500 characters."}},o={args:{error:"Message is required."}},i={args:{disabled:!0,value:"Read-only text"}},n={args:{resize:"none"}};var p,u,x;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(x=(u=s.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var g,h,f;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    hint: "Max 500 characters."
  }
}`,...(f=(h=t.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var v,j,y;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    error: "Message is required."
  }
}`,...(y=(j=o.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var b,w,T;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    disabled: true,
    value: "Read-only text"
  }
}`,...(T=(w=i.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};var N,R,z;n.parameters={...n.parameters,docs:{...(N=n.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    resize: "none"
  }
}`,...(z=(R=n.parameters)==null?void 0:R.docs)==null?void 0:z.source}}};const O=["Default","WithHint","WithError","Disabled","NoResize"];export{s as Default,i as Disabled,n as NoResize,o as WithError,t as WithHint,O as __namedExportsOrder,H as default};
