import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import"./index-yBjzXJbu.js";const a=({label:o,orientation:i="horizontal",className:f=""})=>{const g=["jowa-divider",`jowa-divider--${i}`,f].filter(Boolean).join(" ");return e.jsx("div",{role:"separator","aria-orientation":i,className:g,children:o&&i==="horizontal"&&e.jsx("span",{className:"jowa-divider__label",children:o})})};a.displayName="Divider";a.__docgenInfo={description:"",methods:[],displayName:"Divider",props:{label:{required:!1,tsType:{name:"string"},description:""},orientation:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:"",defaultValue:{value:'"horizontal"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const y={title:"Components/Divider",component:a,tags:["autodocs"],argTypes:{orientation:{control:"select",options:["horizontal","vertical"]}}},r={args:{orientation:"horizontal"}},n={args:{label:"or continue with"}},t={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",height:32,gap:8,fontFamily:"Inter, sans-serif",fontSize:14},children:[e.jsx("span",{children:"Home"}),e.jsx(a,{orientation:"vertical"}),e.jsx("span",{children:"About"}),e.jsx(a,{orientation:"vertical"}),e.jsx("span",{children:"Contact"})]})};var s,l,c;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    orientation: "horizontal"
  }
}`,...(c=(l=r.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var d,p,m;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    label: "or continue with"
  }
}`,...(m=(p=n.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var u,v,h;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    height: 32,
    gap: 8,
    fontFamily: "Inter, sans-serif",
    fontSize: 14
  }}>\r
      <span>Home</span>\r
      <Divider orientation="vertical" />\r
      <span>About</span>\r
      <Divider orientation="vertical" />\r
      <span>Contact</span>\r
    </div>
}`,...(h=(v=t.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};const z=["Horizontal","WithLabel","Vertical"];export{r as Horizontal,t as Vertical,n as WithLabel,z as __namedExportsOrder,y as default};
