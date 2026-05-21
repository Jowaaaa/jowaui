import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import"./index-yBjzXJbu.js";const t=({items:o,separator:g="/",className:j=""})=>{const _=["jowa-breadcrumbs",j].filter(Boolean).join(" ");return e.jsx("nav",{"aria-label":"Breadcrumb",className:_,children:e.jsx("ol",{className:"jowa-breadcrumbs__list",children:o.map((n,l)=>{const x=l===o.length-1;return e.jsx("li",{className:"jowa-breadcrumbs__item",children:x?e.jsx("span",{className:"jowa-breadcrumbs__current","aria-current":"page",children:n.label}):e.jsxs(e.Fragment,{children:[e.jsx("a",{href:n.href??"#",className:"jowa-breadcrumbs__link",children:n.label}),e.jsx("span",{className:"jowa-breadcrumbs__sep","aria-hidden":"true",children:g})]})},l)})})})};t.displayName="Breadcrumbs";t.__docgenInfo={description:"",methods:[],displayName:"Breadcrumbs",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"BreadcrumbItem"}],raw:"BreadcrumbItem[]"},description:""},separator:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"",defaultValue:{value:'"/"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const B={title:"Components/Breadcrumbs",component:t,tags:["autodocs"],argTypes:{separator:{control:"text"}}},a={args:{items:[{label:"Home",href:"#"},{label:"Products",href:"#"},{label:"Running shoes"}]}},r={args:{items:[{label:"Home",href:"#"},{label:"Settings"}]}},s={args:{items:[{label:"Docs",href:"#"},{label:"Components",href:"#"},{label:"Breadcrumbs"}],separator:"›"}};var c,m,d;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    items: [{
      label: "Home",
      href: "#"
    }, {
      label: "Products",
      href: "#"
    }, {
      label: "Running shoes"
    }]
  }
}`,...(d=(m=a.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var u,i,p;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    items: [{
      label: "Home",
      href: "#"
    }, {
      label: "Settings"
    }]
  }
}`,...(p=(i=r.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var b,f,h;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    items: [{
      label: "Docs",
      href: "#"
    }, {
      label: "Components",
      href: "#"
    }, {
      label: "Breadcrumbs"
    }],
    separator: "›"
  }
}`,...(h=(f=s.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};const y=["Default","TwoLevels","CustomSeparator"];export{s as CustomSeparator,a as Default,r as TwoLevels,y as __namedExportsOrder,B as default};
