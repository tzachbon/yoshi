(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{203:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return a})),t.d(r,"metadata",(function(){return i})),t.d(r,"rightToc",(function(){return c})),t.d(r,"default",(function(){return l}));var n=t(2),o=t(9),s=(t(0),t(283)),a={id:"custom-server",title:"Custom Server",sidebar_label:"Custom Server"},i={id:"yoshi-server/custom-server",title:"Custom Server",description:"Yoshi Server is handling all incoming requests to your server. This means that your server code is made of server functions and routes, and you do not have your own server file for handling the requests.",source:"@site/docs/yoshi-server/custom-server.md",permalink:"/yoshi/docs/next/yoshi-server/custom-server",editUrl:"https://github.com/wix/yoshi/edit/master/website/docs/yoshi-server/custom-server.md",version:"next",lastUpdatedBy:"wix-renovate",lastUpdatedAt:1589875777,sidebar_label:"Custom Server",sidebar:"yoshi-server",previous:{title:"Middlewares",permalink:"/yoshi/docs/next/yoshi-server/middlewares"},next:{title:"Testing",permalink:"/yoshi/docs/next/yoshi-server/testing"}},c=[],u={rightToc:c};function l(e){var r=e.components,t=Object(o.a)(e,["components"]);return Object(s.b)("wrapper",Object(n.a)({},u,t,{components:r,mdxType:"MDXLayout"}),Object(s.b)("p",null,"Yoshi Server is handling all incoming requests to your server. This means that your server code is made of server functions and routes, and you do not have your own server file for handling the requests."),Object(s.b)("p",null,"Sometimes, you need to use custom setup, such as custom middlewares, routing, db connection, etc. To do that, add your own server file, which handles specific API calls, and then delegate to all other requests to Yoshi Server. This is also very useful when having a gradual migration to Yoshi Server."),Object(s.b)("blockquote",null,Object(s.b)("p",{parentName:"blockquote"},"Before deciding to use a custom server, please keep in mind that it should only be used when Yoshi Server does not meet your requirements.")),Object(s.b)("p",null,"To add a custom server, start by creating a ",Object(s.b)("inlineCode",{parentName:"p"},"src/server.ts")," (or ",Object(s.b)("inlineCode",{parentName:"p"},"src/server.js"),") file to your project:"),Object(s.b)("pre",null,Object(s.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),'// server.ts\nimport { Server } from "yoshi-server";\nimport { Router } from "express";\nimport bootstrap from "@wix/wix-bootstrap-ng";\nimport { BootstrapContext } from "@wix/wix-bootstrap-ng/typed";\n\nbootstrap()\n  .express(async (app: Router, context: BootstrapContext) => {\n    // Initialise Yoshi Server instance\n    const server = await Server.create(context);\n\n    // Use custom middleware, routing, db connection\n    // or even mount `yoshi-server` on a different path\n    app.get("/foo", (req, res) => {\n      res.send("bar");\n    });\n\n    // All other requests are handled by Yoshi Server\n    app.all("*", server.handle);\n\n    return app;\n  })\n  .start();\n')),Object(s.b)("p",null,"Then, update your ",Object(s.b)("inlineCode",{parentName:"p"},"index.js")," file to require the transpiled version of your server file:"),Object(s.b)("pre",null,Object(s.b)("code",Object(n.a)({parentName:"pre"},{className:"language-diff"}),'-require("yoshi-server/bootstrap");\n+require("./dist/server");\n')))}l.isMDXComponent=!0},283:function(e,r,t){"use strict";t.d(r,"a",(function(){return p})),t.d(r,"b",(function(){return b}));var n=t(0),o=t.n(n);function s(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){s(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},s=Object.keys(e);for(n=0;n<s.length;n++)t=s[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)t=s[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var u=o.a.createContext({}),l=function(e){var r=o.a.useContext(u),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},p=function(e){var r=l(e.components);return o.a.createElement(u.Provider,{value:r},e.children)},d={inlineCode:"code",wrapper:function(e){var r=e.children;return o.a.createElement(o.a.Fragment,{},r)}},m=o.a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,s=e.originalType,a=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=l(t),m=n,b=p["".concat(a,".").concat(m)]||p[m]||d[m]||s;return t?o.a.createElement(b,i(i({ref:r},u),{},{components:t})):o.a.createElement(b,i({ref:r},u))}));function b(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var s=t.length,a=new Array(s);a[0]=m;var i={};for(var c in r)hasOwnProperty.call(r,c)&&(i[c]=r[c]);i.originalType=e,i.mdxType="string"==typeof e?e:n,a[1]=i;for(var u=2;u<s;u++)a[u]=t[u];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,t)}m.displayName="MDXCreateElement"}}]);