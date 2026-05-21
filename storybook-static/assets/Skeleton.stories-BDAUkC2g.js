import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import"./index-yBjzXJbu.js";const t=({variant:p="rect",width:r,height:a,lines:d=1,className:n})=>{if(p==="text"&&d>1)return e.jsx("div",{className:`jowa-skeleton-lines${n?` ${n}`:""}`,children:Array.from({length:d}).map((C,u)=>e.jsx("span",{className:"jowa-skeleton jowa-skeleton--text",style:{width:u===d-1?"72%":"100%"},"aria-hidden":"true"},u))});const m={};return r&&(m.width=typeof r=="number"?`${r}px`:r),a&&(m.height=typeof a=="number"?`${a}px`:a),e.jsx("span",{className:`jowa-skeleton jowa-skeleton--${p}${n?` ${n}`:""}`,style:m,"aria-hidden":"true"})};t.displayName="Skeleton";t.__docgenInfo={description:"",methods:[],displayName:"Skeleton",props:{variant:{required:!1,tsType:{name:"union",raw:'"text" | "rect" | "circle"',elements:[{name:"literal",value:'"text"'},{name:"literal",value:'"rect"'},{name:"literal",value:'"circle"'}]},description:"Shape variant",defaultValue:{value:'"rect"',computed:!1}},width:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},height:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},lines:{required:!1,tsType:{name:"number"},description:"Number of text lines to render",defaultValue:{value:"1",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const R={title:"Feedback/Skeleton",component:t,tags:["autodocs"]},s={args:{variant:"text",width:240}},i={args:{variant:"rect",width:320,height:160}},o={args:{variant:"circle",width:48,height:48}},l={args:{variant:"text",lines:4,width:320}},c={render:()=>e.jsxs("div",{style:{display:"flex",gap:"1rem",alignItems:"center",width:320},children:[e.jsx(t,{variant:"circle",width:48,height:48}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:"0.5rem"},children:[e.jsx(t,{variant:"text",width:"60%"}),e.jsx(t,{variant:"text",width:"90%"}),e.jsx(t,{variant:"text",width:"75%"})]})]})};var x,h,g;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: "text",
    width: 240
  }
}`,...(g=(h=s.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var v,f,w;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    variant: "rect",
    width: 320,
    height: 160
  }
}`,...(w=(f=i.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var y,j,k;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    variant: "circle",
    width: 48,
    height: 48
  }
}`,...(k=(j=o.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};var S,b,T;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    variant: "text",
    lines: 4,
    width: 320
  }
}`,...(T=(b=l.parameters)==null?void 0:b.docs)==null?void 0:T.source}}};var $,q,_;c.parameters={...c.parameters,docs:{...($=c.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    width: 320
  }}>\r
      <Skeleton variant="circle" width={48} height={48} />\r
      <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem"
    }}>\r
        <Skeleton variant="text" width="60%" />\r
        <Skeleton variant="text" width="90%" />\r
        <Skeleton variant="text" width="75%" />\r
      </div>\r
    </div>
}`,...(_=(q=c.parameters)==null?void 0:q.docs)==null?void 0:_.source}}};const D=["Text","Rect","Circle","MultiLine","CardSkeleton"];export{c as CardSkeleton,o as Circle,l as MultiLine,i as Rect,s as Text,D as __namedExportsOrder,R as default};
