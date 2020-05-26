(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{198:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return o})),r.d(t,"metadata",(function(){return s})),r.d(t,"rightToc",(function(){return c})),r.d(t,"default",(function(){return l}));var n=r(2),i=r(9),a=(r(0),r(283)),o={id:"getting-started",title:"Getting Started",sidebar_label:"Getting Started"},s={id:"version-4.x/yoshi-server/getting-started",title:"Getting Started",description:"Welcome to Yoshi Server documentation!",source:"@site/versioned_docs/version-4.x/yoshi-server/getting-started.md",permalink:"/yoshi/docs/yoshi-server/getting-started",editUrl:"https://github.com/wix/yoshi/edit/master/website/versioned_docs/version-4.x/yoshi-server/getting-started.md",version:"4.x",lastUpdatedBy:"yanivefraim",lastUpdatedAt:1589887875,sidebar_label:"Getting Started",sidebar:"version-4.x/yoshi-server",next:{title:"Consuming Data from the Server",permalink:"/yoshi/docs/yoshi-server/consuming-data-from-the-server"}},c=[{value:"Why we built Yoshi Server",id:"why-we-built-yoshi-server",children:[]},{value:"Setup",id:"setup",children:[]},{value:"Manual setup",id:"manual-setup",children:[]}],p={rightToc:c};function l(e){var t=e.components,r=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},p,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Welcome to Yoshi Server documentation!"),Object(a.b)("p",null,"Yoshi Server makes it easier to consume data from the server by adding an abstraction over client server communication, using conventions."),Object(a.b)("h2",{id:"why-we-built-yoshi-server"},"Why we built Yoshi Server"),Object(a.b)("h4",{id:"less-boilerplate"},"Less boilerplate"),Object(a.b)("p",null,"With Yoshi Server, there's no need to setup a ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/wix-platform/wix-node-platform"}),"node-platform")," server."),Object(a.b)("h4",{id:"type-safety-for-client-server-communication"},"Type safety for client-server communication"),Object(a.b)("p",null,"When using Typescript, client-server communication is fully typed."),Object(a.b)("h4",{id:"better-error-handling"},"Better error handling"),Object(a.b)("p",null,"Yoshi Server handles server errors and displays them on your browser."),Object(a.b)("h4",{id:"built-in-hmr-support"},"Built in HMR support"),Object(a.b)("p",null,"HMR support out of the box, no need to setup anything."),Object(a.b)("h4",{id:"get-updates-easier"},"Get updates easier"),Object(a.b)("p",null,"With Yoshi server, it will be easier to ship updates without breaking changes."),Object(a.b)("h2",{id:"setup"},"Setup"),Object(a.b)("p",null,"We recommend creating a new Yoshi Server app using the ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"https://wix.github.io/yoshi/docs/getting-started/create-app"}),Object(a.b)("inlineCode",{parentName:"a"},"create-yoshi-app")),". It is available for both Fullstack and Business Manager apps."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),"npx create-yoshi-app my-app-name\n")),Object(a.b)("h2",{id:"manual-setup"},"Manual setup"),Object(a.b)("h5",{id:"prerequisits"},"Prerequisits"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"A fullstack app (both server and client are together, using the same ",Object(a.b)("inlineCode",{parentName:"li"},"package.json")," file)."),Object(a.b)("li",{parentName:"ul"},"We currently support only projects using the ",Object(a.b)("inlineCode",{parentName:"li"},"app-flow"),' ("projectType": "app" in your Yoshi configuration). If you do not use it, please migrate first (see ',Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"https://wix.github.io/yoshi/docs/guides/app-flow"}),"https://wix.github.io/yoshi/docs/guides/app-flow")," for more details)")),Object(a.b)("p",null,"Install ",Object(a.b)("inlineCode",{parentName:"p"},"yoshi-server")," and ",Object(a.b)("inlineCode",{parentName:"p"},"yoshi-server-client"),":"),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{}),"npm install yoshi-server yoshi-server-client\n")),Object(a.b)("p",null,"Update ",Object(a.b)("inlineCode",{parentName:"p"},"yoshi.config.js")," of ",Object(a.b)("inlineCode",{parentName:"p"},"package.json"),"'s ",Object(a.b)("inlineCode",{parentName:"p"},"yoshi")," section:"),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-diff"}),'"yoshi": {\n  "projectType": "app",\n+  "yoshiServer": true,\n...\n}\n')),Object(a.b)("p",null,"Set your server to handle requests"),Object(a.b)("p",null,"Yoshi Server will handle server requests by convention (see ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"consuming-data-from-the-server#server-functions"}),"server functions")," and ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"exposing-route"}),"route functions"),"). All we have to do is bootstrap it from our ",Object(a.b)("inlineCode",{parentName:"p"},"index.js")," file:"),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),'require("yoshi-server/bootstrap");\n')),Object(a.b)("p",null,"Now you are ready to add your first Yoshi Server function."))}l.isMDXComponent=!0},283:function(e,t,r){"use strict";r.d(t,"a",(function(){return b})),r.d(t,"b",(function(){return h}));var n=r(0),i=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var p=i.a.createContext({}),l=function(e){var t=i.a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},b=function(e){var t=l(e.components);return i.a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},d=i.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,o=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),b=l(r),d=n,h=b["".concat(o,".").concat(d)]||b[d]||u[d]||a;return r?i.a.createElement(h,s(s({ref:t},p),{},{components:r})):i.a.createElement(h,s({ref:t},p))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,o=new Array(a);o[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:n,o[1]=s;for(var p=2;p<a;p++)o[p]=r[p];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);