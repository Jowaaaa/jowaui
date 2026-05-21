import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{S as C}from"./sparkline-Dw7tk694.js";import"./index-yBjzXJbu.js";const D={up:"↑",down:"↓",neutral:"→"},c=({label:q,value:k,unit:o,change:i,trend:l="neutral",icon:d,chart:u,className:p})=>e.jsxs("div",{className:`jowa-statcard${p?` ${p}`:""}`,children:[e.jsxs("div",{className:"jowa-statcard__header",children:[e.jsx("span",{className:"jowa-statcard__label",children:q}),d&&e.jsx("span",{className:"jowa-statcard__icon",children:d})]}),e.jsxs("div",{className:"jowa-statcard__value-row",children:[e.jsx("span",{className:"jowa-statcard__value",children:k}),o&&e.jsx("span",{className:"jowa-statcard__unit",children:o})]}),e.jsxs("div",{className:"jowa-statcard__footer",children:[i&&e.jsxs("span",{className:`jowa-statcard__change jowa-statcard__change--${l}`,children:[e.jsx("span",{className:"jowa-statcard__trend-icon","aria-hidden":"true",children:D[l]}),i]}),u&&e.jsx("span",{className:"jowa-statcard__chart",children:u})]})]});c.displayName="StatCard";c.__docgenInfo={description:"",methods:[],displayName:"StatCard",props:{label:{required:!0,tsType:{name:"string"},description:"Main metric label"},value:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"Primary value to display"},unit:{required:!1,tsType:{name:"string"},description:"Optional secondary unit or description"},change:{required:!1,tsType:{name:"string"},description:'Change indicator (e.g. "+12%" or "-3.4%")'},trend:{required:!1,tsType:{name:"union",raw:'"up" | "down" | "neutral"',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"literal",value:'"neutral"'}]},description:"Direction of the change",defaultValue:{value:'"neutral"',computed:!1}},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Icon or visual element in the top-right slot"},chart:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Inline chart slot (e.g. <Sparkline />)"},className:{required:!1,tsType:{name:"string"},description:""}}};const W={title:"Components/StatCard",component:c,tags:["autodocs"],args:{label:"Total Revenue",value:"$48,295",change:"+12.4%",trend:"up"}},a={},r={args:{label:"Active Users",value:"3,842",change:"+8.1%",trend:"up",chart:e.jsx(C,{data:[22,31,28,40,36,50,45,62,58,72],width:100,height:32})}},t={args:{label:"Bounce Rate",value:"43.2",unit:"%",change:"-2.3%",trend:"down",chart:e.jsx(C,{data:[55,52,49,50,47,44,43],width:100,height:32,color:"oklch(52% 0.22 25)"})}},s={args:{label:"Avg. Session",value:"4m 22s",change:"0.0%",trend:"neutral",icon:"⏱"}},n={args:{label:"Orders",value:"1,204",change:"+23",trend:"up",icon:"🛒"}};var m,h,g;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(g=(h=a.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var w,j,v;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: "Active Users",
    value: "3,842",
    change: "+8.1%",
    trend: "up",
    chart: <Sparkline data={[22, 31, 28, 40, 36, 50, 45, 62, 58, 72]} width={100} height={32} />
  }
}`,...(v=(j=r.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};var _,N,x;t.parameters={...t.parameters,docs:{...(_=t.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    label: "Bounce Rate",
    value: "43.2",
    unit: "%",
    change: "-2.3%",
    trend: "down",
    chart: <Sparkline data={[55, 52, 49, 50, 47, 44, 43]} width={100} height={32} color="oklch(52% 0.22 25)" />
  }
}`,...(x=(N=t.parameters)==null?void 0:N.docs)==null?void 0:x.source}}};var S,f,b;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: "Avg. Session",
    value: "4m 22s",
    change: "0.0%",
    trend: "neutral",
    icon: "⏱"
  }
}`,...(b=(f=s.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var y,R,T;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    label: "Orders",
    value: "1,204",
    change: "+23",
    trend: "up",
    icon: "🛒"
  }
}`,...(T=(R=n.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};const $=["Default","WithChart","Down","Neutral","WithIcon"];export{a as Default,t as Down,s as Neutral,r as WithChart,n as WithIcon,$ as __namedExportsOrder,W as default};
