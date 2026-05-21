import{j as a}from"./jsx-runtime-Cf8x2fCZ.js";import{r as R}from"./index-BioFo8Zg.js";import"./index-yBjzXJbu.js";const r=({variant:o="neutral",onRemove:n,children:e,className:c="",...p})=>{const w=["jowa-tag",`jowa-tag--${o}`,c].filter(Boolean).join(" ");return a.jsxs("span",{className:w,...p,children:[e,n&&a.jsx("button",{className:"jowa-tag__remove",onClick:n,"aria-label":"Remove",type:"button",children:"×"})]})};r.displayName="Tag";r.__docgenInfo={description:"",methods:[],displayName:"Tag",props:{variant:{required:!1,tsType:{name:"union",raw:'"neutral" | "primary" | "success" | "warning" | "danger"',elements:[{name:"literal",value:'"neutral"'},{name:"literal",value:'"primary"'},{name:"literal",value:'"success"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"danger"'}]},description:"",defaultValue:{value:'"neutral"',computed:!1}},onRemove:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},className:{defaultValue:{value:'""',computed:!1},required:!1}}};const _={title:"Components/Tag",component:r,tags:["autodocs"],argTypes:{variant:{control:"select",options:["neutral","primary","success","warning","danger"]}}},s={args:{children:"React",variant:"neutral"}},t={args:{children:"TypeScript",variant:"primary"}},i={render:()=>{const[o,n]=R.useState(["React","TypeScript","CSS","Storybook"]);return a.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:o.map(e=>a.jsx(r,{variant:"primary",onRemove:()=>n(c=>c.filter(p=>p!==e)),children:e},e))})}},l={render:()=>a.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[a.jsx(r,{variant:"neutral",children:"Neutral"}),a.jsx(r,{variant:"primary",children:"Primary"}),a.jsx(r,{variant:"success",children:"Success"}),a.jsx(r,{variant:"warning",children:"Warning"}),a.jsx(r,{variant:"danger",children:"Danger"})]})};var d,m,u;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    children: "React",
    variant: "neutral"
  }
}`,...(u=(m=s.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var g,v,y;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    children: "TypeScript",
    variant: "primary"
  }
}`,...(y=(v=t.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var T,f,x;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => {
    const [tags, setTags] = useState(["React", "TypeScript", "CSS", "Storybook"]);
    return <div style={{
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }}>\r
        {tags.map(t => <Tag key={t} variant="primary" onRemove={() => setTags(prev => prev.filter(x => x !== t))}>\r
            {t}\r
          </Tag>)}\r
      </div>;
  }
}`,...(x=(f=i.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var S,j,h;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 8,
    flexWrap: "wrap"
  }}>\r
      <Tag variant="neutral">Neutral</Tag>\r
      <Tag variant="primary">Primary</Tag>\r
      <Tag variant="success">Success</Tag>\r
      <Tag variant="warning">Warning</Tag>\r
      <Tag variant="danger">Danger</Tag>\r
    </div>
}`,...(h=(j=l.parameters)==null?void 0:j.docs)==null?void 0:h.source}}};const k=["Default","Primary","Removable","AllVariants"];export{l as AllVariants,s as Default,t as Primary,i as Removable,k as __namedExportsOrder,_ as default};
