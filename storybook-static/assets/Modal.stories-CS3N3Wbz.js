import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{r as c}from"./index-BioFo8Zg.js";import{r as v}from"./index-CncNTZwy.js";import{B as C}from"./button-Dg326Mda.js";import"./index-yBjzXJbu.js";import"./index-B6ujFmsw.js";const d=({open:o,onClose:t,title:r,children:w,className:x="",closeOnOverlayClick:f=!0,showCloseButton:g=!0})=>{const n=c.useCallback(s=>{s.key==="Escape"&&t()},[t]);return c.useEffect(()=>{if(o)return document.addEventListener("keydown",n),document.body.style.overflow="hidden",()=>{document.removeEventListener("keydown",n),document.body.style.overflow=""}},[o,n]),o?v.createPortal(e.jsx("div",{className:"jowa-modal-overlay",onClick:f?t:void 0,role:"dialog","aria-modal":"true","aria-labelledby":r?"jowa-modal-title":void 0,children:e.jsxs("div",{className:["jowa-modal",x].filter(Boolean).join(" "),onClick:s=>s.stopPropagation(),children:[g&&e.jsx("button",{className:"jowa-modal__close",onClick:t,"aria-label":"Close modal",children:"✕"}),r&&e.jsx("h2",{id:"jowa-modal-title",className:"jowa-modal__title",children:r}),w]})}),document.body):null};d.displayName="Modal";const D={title:"Components/Modal",component:d,tags:["autodocs"],argTypes:{open:{control:"boolean"},title:{control:"text"},closeOnOverlayClick:{control:"boolean"},showCloseButton:{control:"boolean"}}},j=o=>{const[t,r]=c.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(C,{onClick:()=>r(!0),children:"Open Modal"}),e.jsx(d,{...o,open:t,onClose:()=>r(!1)})]})},a={render:o=>e.jsx(j,{...o}),args:{title:"Example Modal",children:"This is the modal content. You can put anything here.",closeOnOverlayClick:!0,showCloseButton:!0}},l={render:o=>e.jsx(j,{...o}),args:{children:"Modal without a title.",closeOnOverlayClick:!0,showCloseButton:!0}};var i,m,u;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: args => <ModalDemo {...args} />,
  args: {
    title: "Example Modal",
    children: "This is the modal content. You can put anything here.",
    closeOnOverlayClick: true,
    showCloseButton: true
  }
}`,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var p,h,y;l.parameters={...l.parameters,docs:{...(p=l.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => <ModalDemo {...args} />,
  args: {
    children: "Modal without a title.",
    closeOnOverlayClick: true,
    showCloseButton: true
  }
}`,...(y=(h=l.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const N=["Default","NoTitle"];export{a as Default,l as NoTitle,N as __namedExportsOrder,D as default};
