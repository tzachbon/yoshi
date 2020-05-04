(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{143:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return p}));var o=n(1),r=n(6),a=(n(0),n(216)),i={title:"Yoshi 4 - Slick and polished",author:"Ran Yitzhaki, Ronen Amiel, Yair Haimovitch, Yaniv Efraim, Netanel Gilad, Artem Yavorsky"},s={permalink:"/yoshi/blog/2019/03/12/yoshi-4",source:"@site/blog/2019-03-12-yoshi-4.md",description:"We're happy to announce the next major version of Yoshi (4). It's been almost 9 months since the last release and a lot have changed. We hope this release has helpful features for everyone. We tried to polish Yoshi as much as we can in this version to deliver better developer experience.",date:"2019-03-12T00:00:00.000Z",tags:[],title:"Yoshi 4 - Slick and polished",truncated:!1,nextItem:{title:"Yoshi 3.0",permalink:"/yoshi/blog/2018/06/02/yoshi-3"}},l=[{value:"Highlights",id:"highlights",children:[{value:"Underlying tools version bumps",id:"underlying-tools-version-bumps",children:[]},{value:"SVGs as React components",id:"svgs-as-react-components",children:[]},{value:"App flow",id:"app-flow",children:[]}]},{value:"The future",id:"the-future",children:[]}],c={rightToc:l};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(a.b)("wrapper",Object(o.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"We're happy to announce the next major version of Yoshi (4). It's been almost 9 months since the last release and a lot have changed. We hope this release has helpful features for everyone. We tried to polish Yoshi as much as we can in this version to deliver better developer experience."),Object(a.b)("p",null,"The highlights of the version are listed below. For the migration guide, follow ",Object(a.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/wix/yoshi/blob/master/docs/migration/version-4.md"}),"this link"),"."),Object(a.b)("h2",{id:"highlights"},"Highlights"),Object(a.b)("p",null,"Not all of the changes introduced in Yoshi 4 are listed here. For a full list of all changes see the ",Object(a.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/wix/yoshi/blob/master/CHANGELOG.md"}),"changelog"),"."),Object(a.b)("h3",{id:"underlying-tools-version-bumps"},"Underlying tools version bumps"),Object(a.b)("p",null,"We've upgraded the version of ",Object(a.b)("a",Object(o.a)({parentName:"p"},{href:"https://babeljs.io/blog/2018/08/27/7.0.0"}),"Babel to 7"),", ",Object(a.b)("a",Object(o.a)({parentName:"p"},{href:"https://jestjs.io/blog/2019/01/25/jest-24-refreshing-polished-typescript-friendly"}),"Jest's version to 24")," and ",Object(a.b)("a",Object(o.a)({parentName:"p"},{href:"https://eslint.org/blog/2018/06/eslint-v5.0.0-released"}),"ESLint's version to 5"),". We've also upgraded many versions of smaller dependencies."),Object(a.b)("p",null,"Some of these changes improve build times and reduce bundle sizes."),Object(a.b)("h3",{id:"svgs-as-react-components"},"SVGs as React components"),Object(a.b)("p",null,"We've added a handy way of working with SVGs: Instead of running ",Object(a.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/wix/svg2react-icon"}),"svg2react-icon")," as a pre-build step, you can now import SVGs directly as React components:"),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),'import { ReactComponent as Logo } from "./logo.svg";\n\nconst App = () => (\n  <div>\n    {/* Logo is an actual React component */}\n    <Logo />\n  </div>\n);\n')),Object(a.b)("h3",{id:"app-flow"},"App flow"),Object(a.b)("p",null,"We want to deliver awesome developer experience, one that's specific to the type of application that you build."),Object(a.b)("p",null,"App flow is an improved developer experience that is specific to apps. Internally, instead of running many different tools (babel/typescript, sass/less) on various glob patterns, it creates a dedicated Webpack bundle, specifically for the server."),Object(a.b)("p",null,"This has a few advantages:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"Clean output, clear errors:")," If your build fails or your server throws you should know about it immediately and clearly. Forget of long stack traces or errors that show multiple times; See your server's output in your terminal."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"Faster build times:")," Now that Yoshi knows it targets apps, it can only run relevant build operations which can result in a significant speed boost."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"Faster server reload:")," When you're working in watch mode and you change a file, Yoshi knows whether to reload your server, client or both. With the addition of ",Object(a.b)("strong",{parentName:"li"},"server-side HMR"),", Yoshi will be able to reload your ",Object(a.b)("inlineCode",{parentName:"li"},"wix-bootstrap-ng")," server almost instantly.")),Object(a.b)("p",null,"In the future, we plan on providing many features specifically for apps. We want to encourage applications to use the new flow."),Object(a.b)("p",null,Object(a.b)("img",Object(o.a)({parentName:"p"},{src:"https://user-images.githubusercontent.com/11733036/80118554-3c801300-8591-11ea-9dea-483007ac3020.png",alt:"A terminal showing the new app flow"}))),Object(a.b)("h2",{id:"the-future"},"The future"),Object(a.b)("p",null,"One of our goals is to create a community around Yoshi. That other developers in the company will take an active part in its development. We work hard to create issues for problems and explain how we think they can be solved. We also try to maintain a ",Object(a.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/wix/yoshi/blob/master/CONTRIBUTING.md"}),"good place to start")," if you want to contribute."),Object(a.b)("p",null,"We want to thank ",Object(a.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/saarkuriel"}),"@saarkuriel")," and ",Object(a.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/matveyok"}),"@matveyok")," on their amazing work on Yoshi v4. Thank you."),Object(a.b)("p",null,"We are already making plans for Yoshi v5 but more than anything, we want to hear your feedback. Please tell us what is slowing you down and what isn't working too well and we will invest time to make it better."))}p.isMDXComponent=!0},216:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return d}));var o=n(0),r=n.n(o);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createContext({}),p=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s({},t,{},e)),n},b=function(e){var t=p(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},h=Object(o.forwardRef)((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),b=p(n),h=o,d=b["".concat(i,".").concat(h)]||b[h]||u[h]||a;return n?r.a.createElement(d,s({ref:t},c,{components:n})):r.a.createElement(d,s({ref:t},c))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}h.displayName="MDXCreateElement"}}]);