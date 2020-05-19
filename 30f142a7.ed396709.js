(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{174:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return b})),n.d(t,"rightToc",(function(){return o})),n.d(t,"default",(function(){return p}));var a=n(2),r=n(9),i=(n(0),n(278)),l={id:"library-flow",title:"Library Flow",sidebar_label:"Library Flow"},b={id:"library-flow",title:"Library Flow",description:"A zero configuraiton toolkit to create modern TypeScript libraries @ Wix.",source:"@site/docs/library-flow.md",permalink:"/yoshi/docs/next/library-flow",editUrl:"https://github.com/wix/yoshi/edit/master/website/docs/library-flow.md",version:"next",lastUpdatedBy:"Amit Dahan",lastUpdatedAt:1589879546,sidebar_label:"Library Flow"},o=[{value:"What is a library?",id:"what-is-a-library",children:[]},{value:"Features",id:"features",children:[]},{value:"Installation",id:"installation",children:[]},{value:"Usage",id:"usage",children:[]},{value:"Configuration",id:"configuration",children:[{value:"bundle",id:"bundle",children:[]},{value:"bundle.library",id:"bundlelibrary",children:[]},{value:"bundle.externals",id:"bundleexternals",children:[]},{value:"bundle.entry",id:"bundleentry",children:[]},{value:"bundle.port",id:"bundleport",children:[]},{value:"bundle.https",id:"bundlehttps",children:[]}]},{value:"FAQ",id:"faq",children:[{value:"What <code>build</code> command produces?",id:"what-build-command-produces",children:[]},{value:"Why does this supports only TypeScript?",id:"why-does-this-supports-only-typescript",children:[]},{value:"How can I use a library create by this Flow?",id:"how-can-i-use-a-library-create-by-this-flow",children:[]}]}],c={rightToc:o};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"A zero configuraiton toolkit to create modern TypeScript libraries @ Wix."),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"See ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://wix.github.io/yoshi/docs/guides/app-flow#__docusaurus"}),"App Flow")," for developing client applications")),Object(i.b)("p",null,Object(i.b)("img",Object(a.a)({parentName:"p"},{src:"https://user-images.githubusercontent.com/11733036/77347439-85e60400-6d40-11ea-8270-ae6ac2714a55.gif",alt:"Editor-flow-example"}))),Object(i.b)("h3",{id:"what-is-a-library"},"What is a library?"),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"In the scope of frontend development")),Object(i.b)("p",null,"A library is a chunk of code that you want to reuse between client applications, servers and other libraries. This toolkit focuses on ",Object(i.b)("strong",{parentName:"p"},"client libararies"),", or libraries that will be consumed in JavaScript client applications."),Object(i.b)("h2",{id:"features"},"Features"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"100% TypeScript"),Object(i.b)("li",{parentName:"ul"},"Bundle with webpack (optional)"),Object(i.b)("li",{parentName:"ul"},"Support tree-shaking and dynamic imports"),Object(i.b)("li",{parentName:"ul"},"Fast Slick watch mode"),Object(i.b)("li",{parentName:"ul"},"Optimized, fast build process"),Object(i.b)("li",{parentName:"ul"},"Zero configuration needed")),Object(i.b)("h2",{id:"installation"},"Installation"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"EXPERIMENTAL_FLOW_LIBRARY=true npx create-yoshi-app <my-library>\n")),Object(i.b)("p",null,"Choose ",Object(i.b)("inlineCode",{parentName:"p"},"flow-library")," & ",Object(i.b)("inlineCode",{parentName:"p"},"TypeScript"),"."),Object(i.b)("p",null,"In case you want to ship a ",Object(i.b)("inlineCode",{parentName:"p"},".css")," bundle with your library, also run ",Object(i.b)("inlineCode",{parentName:"p"},"npm install -D yoshi-style-dependencies"),"."),Object(i.b)("h2",{id:"usage"},"Usage"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"yoshi-library start")," - Start a development server which rebuilds on any change"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"yoshi-library test")," - Run the tests using ",Object(i.b)("inlineCode",{parentName:"li"},"jest")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"yoshi-library lint")," - Run ",Object(i.b)("inlineCode",{parentName:"li"},"eslint")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"yoshi-library build")," - Prepare the library for production deployment/publish")),Object(i.b)("h2",{id:"configuration"},"Configuration"),Object(i.b)("p",null,"We try to limit confugration, but there are still different use-cases that requires us to provide the following:"),Object(i.b)("h3",{id:"bundle"},"bundle"),Object(i.b)("p",null,"Adding a umd bundle which will be created on ",Object(i.b)("inlineCode",{parentName:"p"},"dist/statics/<packageJsonName>.umd.js")),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'{\n  "yoshiFlowLibrary": {\n    "bundle": true\n  }\n}\n')),Object(i.b)("h3",{id:"bundlelibrary"},"bundle.library"),Object(i.b)("p",null,"Changing how this library will be exposed (on the ",Object(i.b)("inlineCode",{parentName:"p"},"window")," object for example)"),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"This value corresponds to webpack's ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://webpack.js.org/configuration/output/#outputlibrary"}),"library option"))),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"The variable MyLibrary will be bound with the return value of your entry file, if the resulting output is included as a script tag in an HTML page. In this case on ",Object(i.b)("inlineCode",{parentName:"p"},"window.MyLibrary"))),Object(i.b)("p",null,"Defaults to your project name in ",Object(i.b)("inlineCode",{parentName:"p"},"package.json")),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'{\n  "yoshiFlowLibrary": {\n    "bundle": {\n      "library": "MyLibrary"\n    }\n  }\n}\n')),Object(i.b)("h3",{id:"bundleexternals"},"bundle.externals"),Object(i.b)("p",null,"The externals configuration option provides a way of excluding dependencies from the output bundles. Instead, the created bundle relies on that dependency to be present in the consumer's (any end-user application) environment. This feature is typically most useful to library developers, however there are a variety of applications for it."),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Corresponds with webpack's ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://webpack.js.org/configuration/externals/"}),"externals options"))),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'{\n  "yoshiFlowLibrary": {\n    "bundle": {\n      "externals": {\n        "react": "React",\n        "react-dom": "ReactDOM"\n      }\n    }\n  }\n}\n')),Object(i.b)("h3",{id:"bundleentry"},"bundle.entry"),Object(i.b)("p",null,"Adding another entry will create another bundle in the ",Object(i.b)("inlineCode",{parentName:"p"},"dist/statics")," directory."),Object(i.b)("p",null,"Defaults to ",Object(i.b)("inlineCode",{parentName:"p"},"index.ts")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Corresponds with webpack's ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://webpack.js.org/configuration/entry-context/#entry"}),"entry option"))),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"NOTE: All values here are relative to the ",Object(i.b)("inlineCode",{parentName:"p"},"src")," directory, the following example will take ",Object(i.b)("inlineCode",{parentName:"p"},"src/anotherEntry.ts"))),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'{\n  "yoshiFlowLibrary": {\n    "bundle": {\n      "entry": "anotherEntry.ts"\n    }\n  }\n}\n')),Object(i.b)("h3",{id:"bundleport"},"bundle.port"),Object(i.b)("p",null,"The port which will be used by ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/webpack/webpack-dev-server"}),"webpack-dev-server"),"."),Object(i.b)("p",null,"Defaults to ",Object(i.b)("inlineCode",{parentName:"p"},"3300")),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'{\n  "yoshiFlowLibrary": {\n    "bundle": {\n      "port": 3333\n    }\n  }\n}\n')),Object(i.b)("h3",{id:"bundlehttps"},"bundle.https"),Object(i.b)("p",null,"Whether ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/webpack/webpack-dev-server"}),"webpack-dev-server")," will run on ",Object(i.b)("inlineCode",{parentName:"p"},"https")," or ",Object(i.b)("inlineCode",{parentName:"p"},"http"),"."),Object(i.b)("p",null,"Defaults to ",Object(i.b)("inlineCode",{parentName:"p"},"false")," (",Object(i.b)("inlineCode",{parentName:"p"},"http"),")"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'{\n  "yoshiFlowLibrary": {\n    "bundle": {\n      "port": 3333\n    }\n  }\n}\n')),Object(i.b)("h2",{id:"faq"},"FAQ"),Object(i.b)("h3",{id:"what-build-command-produces"},"What ",Object(i.b)("inlineCode",{parentName:"h3"},"build")," command produces?"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-none"}),"\u2500\u2500\u2500 dist\n    \u251c\u2500\u2500 cjs (commonjs files)\n    \u251c\u2500\u2500 esm (esmodules files)\n    \u251c\u2500\u2500 statics (umd bundle) - [optional]\n    \u2514\u2500\u2500 types (d.ts files)\n")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"After installing the library through ",Object(i.b)("inlineCode",{parentName:"p"},"npm")," this is how its output is being routed using the following fields in its ",Object(i.b)("inlineCode",{parentName:"p"},"package.json")," file")),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),'{\n  "main": "dist/cjs/index.js", // for NodeJS, used in component tests\n  "module": "dist/es/index.js", // for webpack, because of dynamic import and Tree-Shaking\n  "types": "dist/types/index.d.ts", // for the IDE and other TypeScript projects\n  ...\n}\n')),Object(i.b)("p",null,"The bundle (",Object(i.b)("inlineCode",{parentName:"p"},"dist/statics")," directory) is deployed to the cdn (",Object(i.b)("inlineCode",{parentName:"p"},"parastorage"),") and should be used from there"),Object(i.b)("h3",{id:"why-does-this-supports-only-typescript"},"Why does this supports only TypeScript?"),Object(i.b)("p",null,"In Wix more than 80% of the frontend code is written with ",Object(i.b)("inlineCode",{parentName:"p"},"TypeScript"),". When creating a reusable library, having types is important for IDE features such a auto-completions and auto-import to work. It also helps preventing mistakes on other ",Object(i.b)("inlineCode",{parentName:"p"},"TypeScript")," projects that uses the library. It's also important to remember that there is a trade-off regarding maintaining support in multiple different use-cases and this trade-off means that when doing that, we won't be able to invest time deliver more features or make this flow more optimize. If you've only worked with JavaScript so far, I suggest you to let it an opportunity and see if it works for you."),Object(i.b)("h3",{id:"how-can-i-use-a-library-create-by-this-flow"},"How can I use a library create by this Flow?"),Object(i.b)("p",null,"There are 2 main ways to consume a libaray:"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},Object(i.b)("strong",{parentName:"li"},"from ",Object(i.b)("inlineCode",{parentName:"strong"},"npm"))," - import the library from the application's code and bundle it (Using ",Object(i.b)("inlineCode",{parentName:"li"},"yoshi"),"'s app flow is guaranteed to work)"),Object(i.b)("li",{parentName:"ol"},Object(i.b)("strong",{parentName:"li"},"from the ",Object(i.b)("inlineCode",{parentName:"strong"},"cdn"))," - Consume the already bundled library using a ",Object(i.b)("inlineCode",{parentName:"li"},'<script src="library.umd.js">')," tag. (You'll need to specify it in the ",Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"https://wix.github.io/yoshi/docs/api/configuration#externals"}),Object(i.b)("inlineCode",{parentName:"a"},"externals"))," configuration option)")),Object(i.b)("p",null,"Using the second method also enables the version of the library to be controlled by the library author, so things like ",Object(i.b)("inlineCode",{parentName:"p"},"GA")," of the library would be able to get to production without the application code needs to be modified."),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Here are some pros and cons")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null})),Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"from ",Object(i.b)("inlineCode",{parentName:"th"},"npm")),Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"from the ",Object(i.b)("inlineCode",{parentName:"th"},"cdn")))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Consume from a GA","*"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"X"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"V")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Tree-shake unused code"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"V"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"X")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Affects app's build time"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"V"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"X")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Perform dynamic import"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"V"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"V")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Share dependencies with your app"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"V"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"X")))))}p.isMDXComponent=!0},278:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return j}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createContext({}),p=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):b({},t,{},e)),n},s=function(e){var t=p(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),s=p(n),d=a,j=s["".concat(l,".").concat(d)]||s[d]||u[d]||i;return n?r.a.createElement(j,b({ref:t},c,{components:n})):r.a.createElement(j,b({ref:t},c))}));function j(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=d;var b={};for(var o in t)hasOwnProperty.call(t,o)&&(b[o]=t[o]);b.originalType=e,b.mdxType="string"==typeof e?e:a,l[1]=b;for(var c=2;c<i;c++)l[c]=n[c];return r.a.createElement.apply(null,l)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);