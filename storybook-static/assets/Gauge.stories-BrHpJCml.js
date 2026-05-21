import{j as r}from"./jsx-runtime-Cf8x2fCZ.js";import"./index-yBjzXJbu.js";const h=({value:y,max:b=100,size:e=120,strokeWidth:g=10,label:v,variant:I="primary",className:w})=>{const x=Math.max(0,Math.min(1,y/b)),a=(e-g)/2,s=e/2,t=e/2,n=135,j=270,o=i=>i*Math.PI/180,R=s+a*Math.cos(o(n)),z=t+a*Math.sin(o(n)),M=i=>{if(i<=0)return"";const f=Math.min(i,359.99),O=s+a*Math.cos(o(n+f)),X=t+a*Math.sin(o(n+f)),Y=f>180?1:0;return`M ${R.toFixed(2)} ${z.toFixed(2)} A ${a} ${a} 0 ${Y} 1 ${O.toFixed(2)} ${X.toFixed(2)}`},$=Math.round(x*100);return r.jsx("span",{className:`jowa-gauge jowa-gauge--${I}${w?` ${w}`:""}`,role:"meter","aria-valuenow":y,"aria-valuemin":0,"aria-valuemax":b,"aria-label":v??`${$}%`,children:r.jsxs("svg",{width:e,height:e,viewBox:`0 0 ${e} ${e}`,children:[r.jsx("path",{className:"jowa-gauge__track",d:M(j),strokeWidth:g,fill:"none",strokeLinecap:"round"}),x>0&&r.jsx("path",{className:"jowa-gauge__fill",d:M(x*j),strokeWidth:g,fill:"none",strokeLinecap:"round"}),r.jsxs("text",{className:"jowa-gauge__value",x:s,y:t,textAnchor:"middle",dominantBaseline:"middle",children:[$,"%"]}),v&&r.jsx("text",{className:"jowa-gauge__label",x:s,y:t+16,textAnchor:"middle",dominantBaseline:"middle",children:v})]})})};h.displayName="Gauge";h.__docgenInfo={description:"",methods:[],displayName:"Gauge",props:{value:{required:!0,tsType:{name:"number"},description:"Value between 0 and max"},max:{required:!1,tsType:{name:"number"},description:"Maximum value (default: 100)",defaultValue:{value:"100",computed:!1}},size:{required:!1,tsType:{name:"number"},description:"Size in px (default: 120)",defaultValue:{value:"120",computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"Stroke width (default: 10)",defaultValue:{value:"10",computed:!1}},label:{required:!1,tsType:{name:"string"},description:"Label shown in center"},variant:{required:!1,tsType:{name:"union",raw:'"primary" | "success" | "warning" | "danger"',elements:[{name:"literal",value:'"primary"'},{name:"literal",value:'"success"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"danger"'}]},description:"Color variant",defaultValue:{value:'"primary"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const K={title:"Components/Gauge",component:h,tags:["autodocs"],args:{value:68,max:100,size:120,strokeWidth:10,variant:"primary",label:"CPU"}},l={},c={args:{value:82,variant:"success",label:"Uptime"}},u={args:{value:55,variant:"warning",label:"Memory"}},d={args:{value:92,variant:"danger",label:"Disk"}},m={args:{size:80,strokeWidth:7,label:void 0}},p={args:{size:160,strokeWidth:14}};var S,_,k;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:"{}",...(k=(_=l.parameters)==null?void 0:_.docs)==null?void 0:k.source}}};var q,N,T;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    value: 82,
    variant: "success",
    label: "Uptime"
  }
}`,...(T=(N=c.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};var A,D,W;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    value: 55,
    variant: "warning",
    label: "Memory"
  }
}`,...(W=(D=u.parameters)==null?void 0:D.docs)==null?void 0:W.source}}};var L,V,F;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    value: 92,
    variant: "danger",
    label: "Disk"
  }
}`,...(F=(V=d.parameters)==null?void 0:V.docs)==null?void 0:F.source}}};var G,B,C;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    size: 80,
    strokeWidth: 7,
    label: undefined
  }
}`,...(C=(B=m.parameters)==null?void 0:B.docs)==null?void 0:C.source}}};var P,U,E;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    size: 160,
    strokeWidth: 14
  }
}`,...(E=(U=p.parameters)==null?void 0:U.docs)==null?void 0:E.source}}};const Q=["Default","Success","Warning","Danger","Small","Large"];export{d as Danger,l as Default,p as Large,m as Small,c as Success,u as Warning,Q as __namedExportsOrder,K as default};
