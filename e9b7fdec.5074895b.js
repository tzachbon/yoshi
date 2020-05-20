(window.webpackJsonp=window.webpackJsonp||[]).push([[126],{265:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return p})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return s}));var r=n(2),i=n(9),o=(n(0),n(284)),a={id:"application",title:"Application Level",sidebar_label:"Application Level"},p={id:"version-4.x/editor-flow/structure-api/application",title:"Application Level",description:"Under `src` directory located: `viewer.app.ts`, `editor.app.ts`, `assets` and `components`.",source:"@site/versioned_docs/version-4.x/editor-flow/structure-api/application.md",permalink:"/yoshi/docs/editor-flow/structure-api/application",editUrl:"https://github.com/wix/yoshi/edit/master/website/versioned_docs/version-4.x/editor-flow/structure-api/application.md",version:"4.x",lastUpdatedBy:"Artem Yavorsky",lastUpdatedAt:1589968552,sidebar_label:"Application Level",sidebar:"version-4.x/editor-flow",previous:{title:"App Configuration Level",permalink:"/yoshi/docs/editor-flow/structure-api/app-configuration"},next:{title:"Component Level",permalink:"/yoshi/docs/editor-flow/structure-api/component"}},c=[{value:"<code>viewer.app.ts</code>",id:"viewerappts",children:[{value:"<code>initAppForPage</code>",id:"initappforpage",children:[]}]},{value:"<code>editor.app.ts</code>",id:"editorappts",children:[]}],l={rightToc:c};function s(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Under ",Object(o.b)("inlineCode",{parentName:"p"},"src")," directory located: ",Object(o.b)("inlineCode",{parentName:"p"},"viewer.app.ts"),", ",Object(o.b)("inlineCode",{parentName:"p"},"editor.app.ts"),", ",Object(o.b)("inlineCode",{parentName:"p"},"assets")," and ",Object(o.b)("inlineCode",{parentName:"p"},"components"),"."),Object(o.b)("h2",{id:"viewerappts"},Object(o.b)("inlineCode",{parentName:"h2"},"viewer.app.ts")),Object(o.b)("p",null,"Entry point for Viewer Script file."),Object(o.b)("h3",{id:"initappforpage"},Object(o.b)("inlineCode",{parentName:"h3"},"initAppForPage")),Object(o.b)("p",null,"A general call to the service where it should initiate its reusable data across components.\nIt's called with the basic configuration of the application before the Viewer knows which components exist on the page."),Object(o.b)("p",null,"\u26a0\ufe0f You shouldn't use ",Object(o.b)("inlineCode",{parentName:"p"},"createControllers"),". We will generate it under the hood."),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"src/viewer.app.ts")),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"export const initAppForPage = (\n  initParams,\n  platformApis,\n  wixCodeApi,\n  platformServicesApis,\n  flowAPI\n) => {\n  fetchExperiments();\n  initStorage();\n};\n")),Object(o.b)("p",null,"For more info related to ",Object(o.b)("inlineCode",{parentName:"p"},"initAppForPage")," check the ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://bo.wix.com/wix-docs/client/client-viewer-platform/articles/lifecycle#client-viewer-platform_articles_lifecycle_initappforpage"}),"Viewer platform official docs")),Object(o.b)("h2",{id:"editorappts"},Object(o.b)("inlineCode",{parentName:"h2"},"editor.app.ts")),Object(o.b)("p",null,"Entry point for Editor Script file.",Object(o.b)("br",{parentName:"p"}),"\n","We are preserving the ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://bo.wix.com/wix-docs/client/editor-platform/editor-application-reference/editor-platform-app"}),"Editor Script API"),", but adding ",Object(o.b)("inlineCode",{parentName:"p"},"flowAPI")," with useful helpers as a last argument.",Object(o.b)("br",{parentName:"p"}),"\n","It provides already initialized ",Object(o.b)("inlineCode",{parentName:"p"},"sentryMonitor")," and ",Object(o.b)("inlineCode",{parentName:"p"},"fedopsLogger")," objects, ",Object(o.b)("inlineCode",{parentName:"p"},"reportError")," helper function and ",Object(o.b)("inlineCode",{parentName:"p"},"getExperiments")," accessor. For more info about flowAPI, please read ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"./component#flowapi"}),"Component Level page")),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"src/editor.app.ts")),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"export const editorReady = async (\n  editorSDK,\n  appDefinitionId,\n  platformOptions,\n  flowAPI\n) => {\n  const platform = new AppPlatform(editorSDK, appDefinitionId);\n\n  if (platformOptions.firstInstall) {\n    await platform.install();\n  } else {\n    await platform.hackForTemplates();\n  }\n};\n\nexport const getAppManifest = async () => {\n  return getManifest();\n};\n")))}s.isMDXComponent=!0},284:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return u}));var r=n(0),i=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=i.a.createContext({}),s=function(e){var t=i.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):p({},t,{},e)),n},d=function(e){var t=s(e.components);return i.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},f=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,a=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=s(n),f=r,u=d["".concat(a,".").concat(f)]||d[f]||b[f]||o;return n?i.a.createElement(u,p({ref:t},l,{components:n})):i.a.createElement(u,p({ref:t},l))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,a=new Array(o);a[0]=f;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p.mdxType="string"==typeof e?e:r,a[1]=p;for(var l=2;l<o;l++)a[l]=n[l];return i.a.createElement.apply(null,a)}return i.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"}}]);