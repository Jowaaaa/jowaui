import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import"./index-yBjzXJbu.js";const a=({src:n,alt:t="",initials:x,size:A="md",className:f="",...z})=>{const j=["jowa-avatar",`jowa-avatar--${A}`,f].filter(Boolean).join(" ");return e.jsx("span",{className:j,...z,children:n?e.jsx("img",{className:"jowa-avatar__img",src:n,alt:t}):e.jsx("span",{className:"jowa-avatar__initials","aria-label":t,children:x??t.slice(0,2).toUpperCase()})})};a.displayName="Avatar";a.__docgenInfo={description:"",methods:[],displayName:"Avatar",props:{src:{required:!1,tsType:{name:"string"},description:""},alt:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},initials:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg" | "xl"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},className:{defaultValue:{value:'""',computed:!1},required:!1}}};const h={title:"Components/Avatar",component:a,tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg","xl"]}}},s={args:{initials:"JD",size:"md"}},i={args:{src:"https://i.pravatar.cc/150?img=3",alt:"Jane Doe",size:"md"}},r={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(a,{initials:"AB",size:"sm"}),e.jsx(a,{initials:"AB",size:"md"}),e.jsx(a,{initials:"AB",size:"lg"}),e.jsx(a,{initials:"AB",size:"xl"})]})};var l,o,m;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    initials: "JD",
    size: "md"
  }
}`,...(m=(o=s.parameters)==null?void 0:o.docs)==null?void 0:m.source}}};var c,d,p;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    src: "https://i.pravatar.cc/150?img=3",
    alt: "Jane Doe",
    size: "md"
  }
}`,...(p=(d=i.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var u,g,v;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    gap: "12px"
  }}>\r
      <Avatar initials="AB" size="sm" />\r
      <Avatar initials="AB" size="md" />\r
      <Avatar initials="AB" size="lg" />\r
      <Avatar initials="AB" size="xl" />\r
    </div>
}`,...(v=(g=r.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};const _=["Initials","WithImage","AllSizes"];export{r as AllSizes,s as Initials,i as WithImage,_ as __namedExportsOrder,h as default};
