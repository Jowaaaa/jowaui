import{j as n}from"./jsx-runtime-Cf8x2fCZ.js";import{r as a,R as S}from"./index-BioFo8Zg.js";import{B as c}from"./button-Dg326Mda.js";import"./index-yBjzXJbu.js";const t=({trigger:D,items:C,align:_="left",className:k=""})=>{const[p,o]=a.useState(!1),l=a.useRef(null);a.useEffect(()=>{const e=r=>{l.current&&!l.current.contains(r.target)&&o(!1)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),a.useEffect(()=>{const e=r=>{r.key==="Escape"&&o(!1)};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)},[]);const E=S.cloneElement(D,{onClick:()=>o(e=>!e),"aria-haspopup":"true","aria-expanded":p}),B=["jowa-dropdown",k].filter(Boolean).join(" "),R=["jowa-dropdown__menu",`jowa-dropdown__menu--${_}`,p?"jowa-dropdown__menu--open":""].filter(Boolean).join(" ");return n.jsxs("div",{className:B,ref:l,children:[E,n.jsx("div",{className:R,role:"menu",children:C.map((e,r)=>{if(e.divider)return n.jsx("hr",{className:"jowa-dropdown__divider"},r);const N=e.href?"a":"button";return n.jsx(N,{role:"menuitem",href:e.href,className:["jowa-dropdown__item",e.disabled?"jowa-dropdown__item--disabled":""].filter(Boolean).join(" "),onClick:()=>{var u;e.disabled||((u=e.onClick)==null||u.call(e),o(!1))},tabIndex:e.disabled?-1:0,"aria-disabled":e.disabled,children:e.label},r)})})]})};t.displayName="Dropdown";t.__docgenInfo={description:"",methods:[],displayName:"Dropdown",props:{trigger:{required:!0,tsType:{name:"ReactReactElement",raw:"React.ReactElement"},description:""},items:{required:!0,tsType:{name:"Array",elements:[{name:"DropdownItem"}],raw:"DropdownItem[]"},description:""},align:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:"",defaultValue:{value:'"left"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const L={title:"Components/Dropdown",component:t,tags:["autodocs"]},y=[{label:"Profile",onClick:()=>{}},{label:"Settings",onClick:()=>{}},{divider:!0,label:""},{label:"Sign out",onClick:()=>{}}],s={render:()=>n.jsx("div",{style:{padding:"40px"},children:n.jsx(t,{trigger:n.jsx(c,{children:"Options ▾"}),items:y})})},i={render:()=>n.jsx("div",{style:{padding:"40px",display:"flex",justifyContent:"flex-end"},children:n.jsx(t,{trigger:n.jsx(c,{variant:"outline",children:"Account ▾"}),items:y,align:"right"})})},d={render:()=>n.jsx("div",{style:{padding:"40px"},children:n.jsx(t,{trigger:n.jsx(c,{variant:"ghost",children:"More ▾"}),items:[{label:"Edit",onClick:()=>{}},{label:"Duplicate",onClick:()=>{}},{divider:!0,label:""},{label:"Delete",onClick:()=>{},disabled:!0}]})})};var m,g,f;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: "40px"
  }}>\r
      <Dropdown trigger={<Button>Options ▾</Button>} items={items} />\r
    </div>
}`,...(f=(g=s.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var v,w,x;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: "40px",
    display: "flex",
    justifyContent: "flex-end"
  }}>\r
      <Dropdown trigger={<Button variant="outline">Account ▾</Button>} items={items} align="right" />\r
    </div>
}`,...(x=(w=i.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};var h,j,b;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: "40px"
  }}>\r
      <Dropdown trigger={<Button variant="ghost">More ▾</Button>} items={[{
      label: "Edit",
      onClick: () => {}
    }, {
      label: "Duplicate",
      onClick: () => {}
    }, {
      divider: true,
      label: ""
    }, {
      label: "Delete",
      onClick: () => {},
      disabled: true
    }]} />\r
    </div>
}`,...(b=(j=d.parameters)==null?void 0:j.docs)==null?void 0:b.source}}};const O=["Default","AlignRight","WithDisabled"];export{i as AlignRight,s as Default,d as WithDisabled,O as __namedExportsOrder,L as default};
