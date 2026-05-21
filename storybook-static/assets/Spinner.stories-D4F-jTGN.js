import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import"./index-yBjzXJbu.js";const s=({size:j="md",label:o="Loading…",className:y=""})=>{const v=["jowa-spinner",`jowa-spinner--${j}`,y].filter(Boolean).join(" ");return e.jsxs("span",{role:"status","aria-label":o,className:v,children:[e.jsx("span",{className:"jowa-spinner__ring","aria-hidden":"true"}),e.jsx("span",{className:"jowa-sr-only",children:o})]})};s.displayName="Spinner";s.__docgenInfo={description:"",methods:[],displayName:"Spinner",props:{size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},label:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Loading…"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const h={title:"Components/Spinner",component:s,tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"]}}},a={args:{size:"sm"}},r={args:{size:"md"}},n={args:{size:"lg"}},i={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.jsx(s,{size:"sm"}),e.jsx(s,{size:"md"}),e.jsx(s,{size:"lg"})]})};var l,t,m;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    size: "sm"
  }
}`,...(m=(t=a.parameters)==null?void 0:t.docs)==null?void 0:m.source}}};var d,p,c;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    size: "md"
  }
}`,...(c=(p=r.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var u,g,z;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    size: "lg"
  }
}`,...(z=(g=n.parameters)==null?void 0:g.docs)==null?void 0:z.source}}};var f,x,S;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    gap: "16px"
  }}>\r
      <Spinner size="sm" />\r
      <Spinner size="md" />\r
      <Spinner size="lg" />\r
    </div>
}`,...(S=(x=i.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};const w=["Small","Medium","Large","AllSizes"];export{i as AllSizes,n as Large,r as Medium,a as Small,w as __namedExportsOrder,h as default};
