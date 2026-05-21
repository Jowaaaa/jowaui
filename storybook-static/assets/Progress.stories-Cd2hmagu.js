import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{P as l}from"./progress-CkitU53o.js";import"./index-yBjzXJbu.js";const C={title:"Components/Progress",component:l,tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","success","warning","danger"]},size:{control:"select",options:["sm","md","lg"]},value:{control:{type:"range",min:0,max:100}}}},r={args:{value:60}},a={args:{value:45,label:"Uploading…",showValue:!0}},s={args:{value:100,variant:"success",label:"Complete",showValue:!0}},n={args:{value:78,variant:"warning",label:"Storage",showValue:!0}},o={args:{value:95,variant:"danger",label:"Memory",showValue:!0}},t={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:400},children:[e.jsx(l,{value:60,size:"sm"}),e.jsx(l,{value:60,size:"md"}),e.jsx(l,{value:60,size:"lg"})]})};var c,u,i;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    value: 60
  }
}`,...(i=(u=r.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};var m,p,g;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    value: 45,
    label: "Uploading…",
    showValue: true
  }
}`,...(g=(p=a.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var d,v,x;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    value: 100,
    variant: "success",
    label: "Complete",
    showValue: true
  }
}`,...(x=(v=s.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var h,S,w;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    value: 78,
    variant: "warning",
    label: "Storage",
    showValue: true
  }
}`,...(w=(S=n.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var b,f,y;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    value: 95,
    variant: "danger",
    label: "Memory",
    showValue: true
  }
}`,...(y=(f=o.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var z,V,j;t.parameters={...t.parameters,docs:{...(z=t.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16,
    maxWidth: 400
  }}>\r
      <Progress value={60} size="sm" />\r
      <Progress value={60} size="md" />\r
      <Progress value={60} size="lg" />\r
    </div>
}`,...(j=(V=t.parameters)==null?void 0:V.docs)==null?void 0:j.source}}};const A=["Default","WithLabel","Success","Warning","Danger","AllSizes"];export{t as AllSizes,o as Danger,r as Default,s as Success,n as Warning,a as WithLabel,A as __namedExportsOrder,C as default};
