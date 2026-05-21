import{j as t}from"./jsx-runtime-Cf8x2fCZ.js";import{r as o}from"./index-BioFo8Zg.js";import{r as I}from"./index-CncNTZwy.js";import{B as P}from"./button-Dg326Mda.js";import"./index-yBjzXJbu.js";import"./index-B6ujFmsw.js";const O={info:"ℹ",success:"✓",warning:"⚠",danger:"✕"},V=o.createContext(null);function W(e,r){switch(r.type){case"ADD":return{toasts:[...e.toasts,r.toast]};case"REMOVE":return{toasts:e.toasts.filter(a=>a.id!==r.id)}}}const m=({children:e,position:r="top-right",defaultDuration:a=4e3})=>{const[n,f]=o.useReducer(W,{toasts:[]}),B=o.useCallback(s=>{const v=Math.random().toString(36).slice(2);return f({type:"ADD",toast:{...s,id:v,duration:s.duration??a}}),v},[a]),g=o.useCallback(s=>{f({type:"REMOVE",id:s})},[]);return t.jsxs(V.Provider,{value:{toast:B,dismiss:g},children:[e,I.createPortal(t.jsx("div",{className:`jowa-toast-region jowa-toast-region--${r}`,"aria-live":"polite","aria-atomic":"false",children:n.toasts.map(s=>t.jsx(q,{item:s,onDismiss:g},s.id))}),document.body)]})},q=({item:e,onDismiss:r})=>{const a=o.useRef(null);o.useEffect(()=>(e.duration&&e.duration>0&&(a.current=setTimeout(()=>r(e.id),e.duration)),()=>{a.current&&clearTimeout(a.current)}),[e.id,e.duration,r]);const n=e.variant??"info";return t.jsxs("div",{className:`jowa-toast jowa-toast--${n}`,role:"alert","aria-live":"assertive",children:[t.jsx("span",{className:"jowa-toast__icon","aria-hidden":"true",children:O[n]}),t.jsxs("div",{className:"jowa-toast__body",children:[e.title&&t.jsx("p",{className:"jowa-toast__title",children:e.title}),t.jsx("p",{className:"jowa-toast__message",children:e.message})]}),t.jsx("button",{className:"jowa-toast__close",onClick:()=>r(e.id),"aria-label":"Dismiss notification",children:"✕"})]})};function A(){const e=o.useContext(V);if(!e)throw new Error("useToast must be used inside <ToastProvider>");return e}m.displayName="ToastProvider";m.__docgenInfo={description:"",methods:[],displayName:"ToastProvider",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},position:{required:!1,tsType:{name:"union",raw:'"top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center"',elements:[{name:"literal",value:'"top-right"'},{name:"literal",value:'"top-left"'},{name:"literal",value:'"top-center"'},{name:"literal",value:'"bottom-right"'},{name:"literal",value:'"bottom-left"'},{name:"literal",value:'"bottom-center"'}]},description:"",defaultValue:{value:'"top-right"',computed:!1}},defaultDuration:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"4000",computed:!1}}}};const H={title:"Feedback/Toast",tags:["autodocs"],decorators:[e=>t.jsx(m,{children:t.jsx(e,{})})]},p=({variant:e})=>{const{toast:r}=A();return t.jsxs(P,{variant:"primary",onClick:()=>r({variant:e,title:e?`${e.charAt(0).toUpperCase()+e.slice(1)}!`:"Notification",message:"This is a toast notification."}),children:["Show ",e??"info"," toast"]})},i={render:()=>t.jsx(p,{variant:"info"})},c={render:()=>t.jsx(p,{variant:"success"})},d={render:()=>t.jsx(p,{variant:"warning"})},l={render:()=>t.jsx(p,{variant:"danger"})},u={render:()=>{const{toast:e}=A();return t.jsx("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap"},children:["info","success","warning","danger"].map(r=>t.jsx(P,{variant:"outline",onClick:()=>e({variant:r,title:r,message:"Toast message here."}),children:r},r))})},decorators:[e=>t.jsx(m,{position:"top-right",children:t.jsx(e,{})})]};var x,h,j;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <ToastDemo variant="info" />
}`,...(j=(h=i.parameters)==null?void 0:h.docs)==null?void 0:j.source}}};var T,w,y;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <ToastDemo variant="success" />
}`,...(y=(w=c.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var b,_,N;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <ToastDemo variant="warning" />
}`,...(N=(_=d.parameters)==null?void 0:_.docs)==null?void 0:N.source}}};var C,D,S;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <ToastDemo variant="danger" />
}`,...(S=(D=l.parameters)==null?void 0:D.docs)==null?void 0:S.source}}};var E,R,k;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => {
    const {
      toast
    } = useToast();
    return <div style={{
      display: "flex",
      gap: "0.5rem",
      flexWrap: "wrap"
    }}>\r
        {(["info", "success", "warning", "danger"] as const).map(v => <Button key={v} variant="outline" onClick={() => toast({
        variant: v,
        title: v,
        message: "Toast message here."
      })}>\r
            {v}\r
          </Button>)}\r
      </div>;
  },
  decorators: [Story => <ToastProvider position="top-right"><Story /></ToastProvider>]
}`,...(k=(R=u.parameters)==null?void 0:R.docs)==null?void 0:k.source}}};const J=["Info","Success","Warning","Danger","AllVariants"];export{u as AllVariants,l as Danger,i as Info,c as Success,d as Warning,J as __namedExportsOrder,H as default};
