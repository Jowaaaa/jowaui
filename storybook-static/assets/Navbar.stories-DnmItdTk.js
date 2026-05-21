import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{B as j}from"./button-Dg326Mda.js";import"./index-yBjzXJbu.js";import"./index-BioFo8Zg.js";const o=({title:v="MyBrand",logoSrc:l,logoAlt:y="Logo",links:n,actions:i,className:N="",style:x})=>e.jsxs("nav",{className:["jowa-navbar",N].filter(Boolean).join(" "),style:x,children:[e.jsx("a",{className:"jowa-navbar__brand",href:"/",children:l?e.jsx("img",{src:l,alt:y}):e.jsx("span",{children:v})}),n&&n.length>0&&e.jsx("ul",{className:"jowa-navbar__links",children:n.map(s=>e.jsx("li",{children:e.jsx("a",{className:"jowa-navbar__link",href:s.href,children:s.label})},s.href))}),i&&e.jsx("div",{className:"jowa-navbar__actions",children:i})]});o.displayName="Navbar";o.__docgenInfo={description:"",methods:[],displayName:"Navbar",props:{title:{required:!1,tsType:{name:"string"},description:"Brand title text — shown when no logoSrc is provided",defaultValue:{value:'"MyBrand"',computed:!1}},logoSrc:{required:!1,tsType:{name:"string"},description:"URL of the logo image"},logoAlt:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Logo"',computed:!1}},links:{required:!1,tsType:{name:"Array",elements:[{name:"NavbarLink"}],raw:"NavbarLink[]"},description:"Navigation links"},actions:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Slot for extra content on the right (e.g. buttons, avatar)"},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""}}};const k={title:"Components/Navbar",component:o,tags:["autodocs"],parameters:{layout:"fullscreen"},argTypes:{title:{control:"text"},logoSrc:{control:"text"},logoAlt:{control:"text"}}},a={args:{title:"MyBrand",links:[{label:"Home",href:"/"},{label:"About",href:"/about"},{label:"Contact",href:"/contact"}]}},r={args:{title:"MyBrand",links:[{label:"Home",href:"/"},{label:"Docs",href:"/docs"}],actions:e.jsx(j,{variant:"outline",size:"sm",children:"Sign in"})}},t={args:{title:"Minimal"}};var c,d,m;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    title: "MyBrand",
    links: [{
      label: "Home",
      href: "/"
    }, {
      label: "About",
      href: "/about"
    }, {
      label: "Contact",
      href: "/contact"
    }]
  }
}`,...(m=(d=a.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var p,u,f;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    title: "MyBrand",
    links: [{
      label: "Home",
      href: "/"
    }, {
      label: "Docs",
      href: "/docs"
    }],
    actions: <Button variant="outline" size="sm">Sign in</Button>
  }
}`,...(f=(u=r.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var g,h,b;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    title: "Minimal"
  }
}`,...(b=(h=t.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};const M=["Default","WithActions","NoLinks"];export{a as Default,t as NoLinks,r as WithActions,M as __namedExportsOrder,k as default};
