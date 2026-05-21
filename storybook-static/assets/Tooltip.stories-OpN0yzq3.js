import{j as o}from"./jsx-runtime-Cf8x2fCZ.js";import{r as y}from"./index-BioFo8Zg.js";import{B as a}from"./button-Dg326Mda.js";import"./index-yBjzXJbu.js";const e=({content:t,position:g="top",children:f})=>{const[T,n]=y.useState(!1);return o.jsxs("span",{className:"jowa-tooltip-wrapper",onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),onFocus:()=>n(!0),onBlur:()=>n(!1),children:[f,T&&o.jsx("span",{role:"tooltip",className:`jowa-tooltip jowa-tooltip--${g}`,children:t})]})};e.displayName="Tooltip";e.__docgenInfo={description:"",methods:[],displayName:"Tooltip",props:{content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},position:{required:!1,tsType:{name:"union",raw:'"top" | "bottom" | "left" | "right"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'},{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:"",defaultValue:{value:'"top"',computed:!1}},children:{required:!0,tsType:{name:"ReactReactElement",raw:"React.ReactElement"},description:""}}};const R={title:"Components/Tooltip",component:e,tags:["autodocs"],argTypes:{position:{control:"select",options:["top","bottom","left","right"]}}},i={render:()=>o.jsx("div",{style:{padding:"60px",display:"inline-block"},children:o.jsx(e,{content:"This is a tooltip",position:"top",children:o.jsx(a,{children:"Hover me"})})})},r={render:()=>o.jsx("div",{style:{padding:"60px",display:"inline-block"},children:o.jsx(e,{content:"Tooltip on the bottom",position:"bottom",children:o.jsx(a,{variant:"outline",children:"Hover me"})})})},s={render:()=>o.jsx("div",{style:{padding:"80px",display:"flex",gap:"24px",flexWrap:"wrap"},children:["top","bottom","left","right"].map(t=>o.jsx(e,{content:`Position: ${t}`,position:t,children:o.jsx(a,{variant:"ghost",size:"sm",children:t})},t))})};var p,l,d;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: "60px",
    display: "inline-block"
  }}>\r
      <Tooltip content="This is a tooltip" position="top">\r
        <Button>Hover me</Button>\r
      </Tooltip>\r
    </div>
}`,...(d=(l=i.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var c,m,u;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: "60px",
    display: "inline-block"
  }}>\r
      <Tooltip content="Tooltip on the bottom" position="bottom">\r
        <Button variant="outline">Hover me</Button>\r
      </Tooltip>\r
    </div>
}`,...(u=(m=r.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var x,h,v;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: "80px",
    display: "flex",
    gap: "24px",
    flexWrap: "wrap"
  }}>\r
      {(["top", "bottom", "left", "right"] as const).map(pos => <Tooltip key={pos} content={\`Position: \${pos}\`} position={pos}>\r
          <Button variant="ghost" size="sm">{pos}</Button>\r
        </Tooltip>)}\r
    </div>
}`,...(v=(h=s.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};const E=["Top","Bottom","AllPositions"];export{s as AllPositions,r as Bottom,i as Top,E as __namedExportsOrder,R as default};
