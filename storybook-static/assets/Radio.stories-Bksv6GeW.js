import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{r as t,R as T}from"./index-BioFo8Zg.js";import"./index-yBjzXJbu.js";const G=t.createContext(null),d=({name:o,value:n,onChange:u,label:c,hint:s,error:l,orientation:b="vertical",children:p,className:a})=>{const i=t.useId();return e.jsx(G.Provider,{value:{name:o,value:n,onChange:u},children:e.jsxs("fieldset",{className:`jowa-radio-group jowa-radio-group--${b}${a?` ${a}`:""}`,"aria-describedby":l?`${i}-error`:s?`${i}-hint`:void 0,children:[c&&e.jsx("legend",{className:"jowa-radio-group__legend",children:c}),e.jsx("div",{className:"jowa-radio-group__options",children:p}),l&&e.jsx("p",{id:`${i}-error`,className:"jowa-radio-error",children:l}),!l&&s&&e.jsx("p",{id:`${i}-hint`,className:"jowa-radio-hint",children:s})]})})},r=T.forwardRef(({label:o,value:n,className:u,id:c,...s},l)=>{const b=t.useId(),p=c??b,a=t.useContext(G),i=a?a.value===n:s.checked,q=a?()=>{var g;return(g=a.onChange)==null?void 0:g.call(a,n)}:s.onChange;return e.jsxs("label",{className:`jowa-radio-label${u?` ${u}`:""}`,htmlFor:p,children:[e.jsx("input",{ref:l,type:"radio",id:p,name:a==null?void 0:a.name,value:n,checked:i,onChange:q,className:"jowa-radio",...s}),e.jsx("span",{className:"jowa-radio-dot","aria-hidden":"true"}),o&&e.jsx("span",{className:"jowa-radio-text",children:o})]})});r.displayName="Radio";d.displayName="RadioGroup";d.__docgenInfo={description:"",methods:[],displayName:"RadioGroup",props:{name:{required:!0,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"string"},description:""},hint:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},orientation:{required:!1,tsType:{name:"union",raw:'"vertical" | "horizontal"',elements:[{name:"literal",value:'"vertical"'},{name:"literal",value:'"horizontal"'}]},description:"",defaultValue:{value:'"vertical"',computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};r.__docgenInfo={description:"",methods:[],displayName:"Radio",props:{label:{required:!1,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"string"},description:""}},composes:["Omit"]};const $={title:"Forms/Radio",tags:["autodocs"]},m={render:()=>{const[o,n]=t.useState("b");return e.jsxs(d,{name:"fruit",value:o,onChange:n,label:"Pick a fruit",orientation:"vertical",children:[e.jsx(r,{value:"a",label:"Apple"}),e.jsx(r,{value:"b",label:"Banana"}),e.jsx(r,{value:"c",label:"Cherry"}),e.jsx(r,{value:"d",label:"Durian (disabled)",disabled:!0})]})}},v={render:()=>{const[o,n]=t.useState("xs");return e.jsxs(d,{name:"size",value:o,onChange:n,label:"Size",orientation:"horizontal",children:[e.jsx(r,{value:"xs",label:"XS"}),e.jsx(r,{value:"sm",label:"SM"}),e.jsx(r,{value:"md",label:"MD"}),e.jsx(r,{value:"lg",label:"LG"})]})}},h={render:()=>e.jsxs(d,{name:"plan",label:"Choose plan",error:"Please select a plan.",children:[e.jsx(r,{value:"free",label:"Free"}),e.jsx(r,{value:"pro",label:"Pro"})]})};var j,x,R;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState("b");
    return <RadioGroup name="fruit" value={val} onChange={setVal} label="Pick a fruit" orientation="vertical">\r
        <Radio value="a" label="Apple" />\r
        <Radio value="b" label="Banana" />\r
        <Radio value="c" label="Cherry" />\r
        <Radio value="d" label="Durian (disabled)" disabled />\r
      </RadioGroup>;
  }
}`,...(R=(x=m.parameters)==null?void 0:x.docs)==null?void 0:R.source}}};var f,y,C;v.parameters={...v.parameters,docs:{...(f=v.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState("xs");
    return <RadioGroup name="size" value={val} onChange={setVal} label="Size" orientation="horizontal">\r
        <Radio value="xs" label="XS" />\r
        <Radio value="sm" label="SM" />\r
        <Radio value="md" label="MD" />\r
        <Radio value="lg" label="LG" />\r
      </RadioGroup>;
  }
}`,...(C=(y=v.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var w,N,S;h.parameters={...h.parameters,docs:{...(w=h.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <RadioGroup name="plan" label="Choose plan" error="Please select a plan.">\r
      <Radio value="free" label="Free" />\r
      <Radio value="pro" label="Pro" />\r
    </RadioGroup>
}`,...(S=(N=h.parameters)==null?void 0:N.docs)==null?void 0:S.source}}};const P=["Vertical","Horizontal","WithError"];export{v as Horizontal,m as Vertical,h as WithError,P as __namedExportsOrder,$ as default};
