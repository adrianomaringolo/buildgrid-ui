"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4198],{31404:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>j,default:()=>b,frontMatter:()=>x,metadata:()=>s,toc:()=>g});const s=JSON.parse('{"id":"components/button.docs","title":"Button","description":"The Button component is a versatile, customizable button designed to meet various design and interaction needs. It includes support for accessibility, multiple styles (variants), sizes, loading states, and more.","source":"@site/docs/components/button.docs.mdx","sourceDirName":"components","slug":"/components/button.docs","permalink":"/buildgrid-ui/docs/components/button.docs","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/components/button.docs.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Components","permalink":"/buildgrid-ui/docs/category/components"},"next":{"title":"Tutorial - Basics","permalink":"/buildgrid-ui/docs/category/tutorial---basics"}}');var i=n(74848),d=n(28453),r=n(90580),l=n(96540),o=n(98027),c=n(59879),a=n(38866),h=n(91213);const u=e=>{let{code:t,children:n}=e;const[s,d]=(0,l.useState)(!1);return(0,i.jsxs)("div",{className:"border border-gray-300 rounded-md p-4 dark:border-gray-700",children:[(0,i.jsx)("div",{className:"flex justify-end mb-2",children:(0,i.jsx)("button",{onClick:()=>d(!s),className:(0,r.cn)("bg-gray-200 dark:bg-gray-800 dark:text-white px-3 py-1 rounded text-sm font-medium","focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary","dark:focus-visible:ring-offset-gray-900"),children:(0,i.jsx)("span",{className:"flex items-center gap-2",children:s?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(c.unx,{}),"Preview"]}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o.FSj,{}),"Code"]})})})}),(0,i.jsx)("div",{className:"p-4 bg-gray-100 dark:bg-gray-900 rounded-md",children:s?(0,i.jsx)(a.A,{language:"jsx",style:h.A,customStyle:{background:"transparent",margin:0,padding:0},children:t}):(0,i.jsx)("div",{children:n})})]})},x={},j="Button",p={},g=[{value:"Features",id:"features",level:2},{value:"Usage",id:"usage",level:2},{value:"With a Loading State",id:"with-a-loading-state",level:2},{value:"Variants",id:"variants",level:2},{value:"Sizes",id:"sizes",level:2},{value:"Accessibility",id:"accessibility",level:2},{value:"Example",id:"example",level:2}];function m(e){const t={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,d.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"button",children:"Button"})}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"Button"})," component is a versatile, customizable button designed to meet various design and interaction needs. It includes support for accessibility, multiple styles (variants), sizes, loading states, and more."]}),"\n",(0,i.jsx)(t.h2,{id:"features",children:"Features"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Variants:"})," Multiple pre-designed styles (default, destructive, outline, etc.)."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Sizes:"})," Flexible size options ranging from small to extra-large."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Loading State:"})," Built-in loading spinner for asynchronous actions."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Customizability:"})," Supports custom classes and ",(0,i.jsx)(t.code,{children:"asChild"})," for rendering as different HTML elements."]}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,i.jsxs)(t.p,{children:["Import the ",(0,i.jsx)(t.code,{children:"Button"})," component and use it like any other React component. Here\u2019s a basic example:"]}),"\n",(0,i.jsx)(u,{code:"<Button>Click Me</Button>",children:(0,i.jsx)(r.Button,{children:"Click Me"})}),"\n",(0,i.jsx)(t.h2,{id:"with-a-loading-state",children:"With a Loading State"}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"Button"})," component supports a loading state using the ",(0,i.jsx)(t.code,{children:"isLoading"})," prop."]}),"\n",(0,i.jsx)(u,{code:"<Button isLoading>Submitting...</Button>",children:(0,i.jsx)(r.Button,{isLoading:!0,children:"Submitting..."})}),"\n",(0,i.jsx)(t.h2,{id:"variants",children:"Variants"}),"\n",(0,i.jsxs)(u,{code:'<Button>Default</Button>\n<Button variant="destructive">Delete</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="link">Link</Button>',children:[(0,i.jsx)(r.Button,{children:"Default"}),(0,i.jsx)(r.Button,{variant:"destructive",children:"Delete"}),(0,i.jsx)(r.Button,{variant:"outline",children:"Outline"}),(0,i.jsx)(r.Button,{variant:"secondary",children:"Secondary"}),(0,i.jsx)(r.Button,{variant:"ghost",children:"Ghost"}),(0,i.jsx)(r.Button,{variant:"link",children:"Link"})]}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"variant"})," prop controls the button\u2019s appearance. The following variants are available:"]}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Variant"}),(0,i.jsx)(t.th,{children:"Description"}),(0,i.jsx)(t.th,{children:"Example"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"default"})}),(0,i.jsx)(t.td,{children:"Primary button for main actions."}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"<Button>Default</Button>"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"destructive"})}),(0,i.jsx)(t.td,{children:"Indicates a destructive or negative action."}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:'<Button variant="destructive">Delete</Button>'})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"outline"})}),(0,i.jsx)(t.td,{children:"Outlined button with a minimal design."}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:'<Button variant="outline">Outline</Button>'})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"secondary"})}),(0,i.jsx)(t.td,{children:"Secondary actions with softer visuals."}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:'<Button variant="secondary">Secondary</Button>'})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"ghost"})}),(0,i.jsx)(t.td,{children:"Button with a transparent background."}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:'<Button variant="ghost">Ghost</Button>'})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"link"})}),(0,i.jsx)(t.td,{children:"Styled as a hyperlink."}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:'<Button variant="link">Link</Button>'})})]})]})]}),"\n",(0,i.jsx)(t.h2,{id:"sizes",children:"Sizes"}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"size"})," prop adjusts the button's dimensions. The following sizes are available:"]}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Size"}),(0,i.jsx)(t.th,{children:"Description"}),(0,i.jsx)(t.th,{children:"Example"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"default"})}),(0,i.jsx)(t.td,{children:"Standard size."}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:'<Button size="default">Default</Button>'})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"sm"})}),(0,i.jsx)(t.td,{children:"Small button."}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:'<Button size="sm">Small</Button>'})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"lg"})}),(0,i.jsx)(t.td,{children:"Large button."}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:'<Button size="lg">Large</Button>'})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"xl"})}),(0,i.jsx)(t.td,{children:"Extra-large button."}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:'<Button size="xl">Extra Large</Button>'})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"icon"})}),(0,i.jsx)(t.td,{children:"Square button for icons only."}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:'<Button size="icon">+</Button>'})})]})]})]}),"\n",(0,i.jsx)(t.h2,{id:"accessibility",children:"Accessibility"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["The button uses ",(0,i.jsx)(t.code,{children:"focus-visible"})," styles to provide clear focus indication."]}),"\n",(0,i.jsx)(t.li,{children:"Loading state disables interaction to prevent multiple submissions."}),"\n",(0,i.jsx)(t.li,{children:"ARIA roles are applied correctly when used in different contexts."}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"example",children:"Example"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-tsx",children:'<Button variant="primary" size="lg" isLoading>\n  Loading...\n</Button>\n'})}),"\n",(0,i.jsx)(t.p,{children:"Explore the full power of the Button component by combining different props for your specific needs!"})]})}function b(e={}){const{wrapper:t}={...(0,d.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(m,{...e})}):m(e)}}}]);