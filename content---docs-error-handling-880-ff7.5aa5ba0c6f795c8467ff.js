(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{48:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return i})),t.d(r,"rightToc",(function(){return s})),t.d(r,"default",(function(){return c}));t(0);var n=t(64);function a(){return(a=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}function o(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i={id:"error_handling",title:"Error Handling"},s=[{value:"The four ways a repeater can error",id:"the-four-ways-a-repeater-can-error",children:[{value:"1. Calling stop with an error",id:"1-calling-stop-with-an-error",children:[]},{value:"2. A promise passed to the push function rejects",id:"2-a-promise-passed-to-the-push-function-rejects",children:[]},{value:"3. The executor throws an error",id:"3-the-executor-throws-an-error",children:[]},{value:"4. Calling the throw method",id:"4-calling-the-throw-method",children:[]}]}],p={rightToc:s},l="wrapper";function c(e){var r=e.components,t=o(e,["components"]);return Object(n.b)(l,a({},p,t,{components:r,mdxType:"MDXLayout"}),Object(n.b)("p",null,"Because error handling is an important part of creating robust applications, repeaters catch and propagate any errors they receive in a predictable, well-specified manner. Every promise which is passed to a repeater is preemptively caught to prevent unhandled promise rejections."),Object(n.b)("h2",{id:"the-four-ways-a-repeater-can-error"},"The four ways a repeater can error"),Object(n.b)("h3",{id:"1-calling-stop-with-an-error"},"1. Calling ",Object(n.b)("inlineCode",{parentName:"h3"},"stop")," with an error"),Object(n.b)("p",null,"The most common way to cause a repeater to error is to call the ",Object(n.b)("inlineCode",{parentName:"p"},"stop")," function with the error."),Object(n.b)("pre",null,Object(n.b)("code",a({parentName:"pre"},{className:"language-js"}),'const repeater = new Repeater((push, stop) => {\n  for (let i = 0; i < 100; i++) {\n    push(i);\n  }\n\n  stop(new Error("Stop in the name of love 😘"));\n});\n\n(async function() {\n  try {\n    console.log(await repeater.next()); // { value: 0, done: true }\n    console.log(await repeater.next()); // { value: 1, done: true }\n    console.log(await repeater.next()); // { value: 2, done: true }\n    console.log(await repeater.return()); // This line throws an error.\n  } catch (err) {\n    console.log(err); // Error: Stop in the name of love 😘\n  } finally {\n    console.log(await repeater.next()); // { done: true }\n    console.log(await repeater.next()); // { done: true }\n  }\n})();\n')),Object(n.b)("p",null,"When ",Object(n.b)("inlineCode",{parentName:"p"},"stop")," is called with an error, values which were previously pushed can continue to be pulled. After all previously pushed values are exhausted, the final call to ",Object(n.b)("inlineCode",{parentName:"p"},"next")," rejects with the error. If the repeater is prematurely finished using ",Object(n.b)("inlineCode",{parentName:"p"},"Repeater.prototype.return"),", the repeater drops any remaining values and rejects the final iteration with the error."),Object(n.b)("p",null,"As seen in the example above, repeaters error only once before entering a finished state where all calls to ",Object(n.b)("inlineCode",{parentName:"p"},"next")," resolve to ",Object(n.b)("inlineCode",{parentName:"p"},"{ done: true }"),". This mirrors the finishing behavior of async generator objects. Only the first call to ",Object(n.b)("inlineCode",{parentName:"p"},"stop")," has any effect on the repeater, and any errors passed to ",Object(n.b)("inlineCode",{parentName:"p"},"stop")," in subsequent calls are dropped."),Object(n.b)("h3",{id:"2-a-promise-passed-to-the-push-function-rejects"},"2. A promise passed to the ",Object(n.b)("inlineCode",{parentName:"h3"},"push")," function rejects"),Object(n.b)("pre",null,Object(n.b)("code",a({parentName:"pre"},{className:"language-js"}),'const repeater = new Repeater(async (push, stop) => {\n  await push("a");\n  await push("b");\n  await push("c");\n  await push(new Promise((_, reject) => {\n    setTimeout(() => reject(new Error("A rejection passed to push ⏰")), 100);\n  }));\n  // these values are dropped\n  await push("e");\n  await push("f");\n  // this error is ignored\n  stop(new Error("Stop in the name of love 😘"));\n});\n\n(async function() {\n  try {\n    for await (const letter of repeater) {\n      console.log(letter); // "a", "b", "c"\n    }\n  } catch (err) {\n    console.log(err); // Error: A rejection passed to push ⏰\n  } finally {\n    console.log(await repeater.next()); // { done: true }\n  }\n})();\n')),Object(n.b)("p",null,"Repeaters unwrap promises passed to ",Object(n.b)("inlineCode",{parentName:"p"},"push")," before sending them along to consumers. If a promise passed to ",Object(n.b)("inlineCode",{parentName:"p"},"push")," rejects, the repeater finishes and any further values which were pushed before the promise rejected are dropped, regardless of when those values settled. If the rejection settles ",Object(n.b)("em",{parentName:"p"},"before")," the repeater stops, the final iteration rejects with the pushed rejection. However, if it settles ",Object(n.b)("em",{parentName:"p"},"after")," the repeater has stopped, the rejection is dropped. This behavior is useful when creating ",Object(n.b)("a",a({parentName:"p"},{href:"/docs/inverted-repeaters"}),"inverted repeaters"),"."),Object(n.b)("h3",{id:"3-the-executor-throws-an-error"},"3. The executor throws an error"),Object(n.b)("p",null,"Repeaters catch both synchronous and asynchronous errors thrown by the executor."),Object(n.b)("pre",null,Object(n.b)("code",a({parentName:"pre"},{className:"language-js"}),'const repeater = new Repeater((push, stop) => {\n  push("a");\n  push("b");\n  push("c");\n  // this error is dropped\n  stop(new Error("My error"));\n  // this error takes priority\n  throw new Error("This executor is busted ☠️");\n});\n\n(async function() {\n  try {\n    for await (const letter of repeater) {\n      console.log(letter); // "a", "b", "c"\n    }\n  } catch (err) {\n    console.log(err); // Error: This executor is busted ☠️\n  } finally {\n    console.log(await repeater.next()); // { done: true }\n  }\n})();\n')),Object(n.b)("p",null,"When an error occurs in the executor, the repeater is stopped and the final iteration rejects with the error. Because errors thrown by the executor are usually indicative of programmer error, they take precedence over all other errors passed to the repeater.  "),Object(n.b)("h3",{id:"4-calling-the-throw-method"},"4. Calling the ",Object(n.b)("inlineCode",{parentName:"h3"},"throw")," method"),Object(n.b)("p",null,"The async iterator interface defines an optional ",Object(n.b)("inlineCode",{parentName:"p"},"throw")," method which allows consumers to throw errors into the iterator. With async generators, the ",Object(n.b)("inlineCode",{parentName:"p"},"throw")," method resumes the generator and throws the error at the point of the suspended ",Object(n.b)("inlineCode",{parentName:"p"},"yield")," operator. Generators can recover from these errors by wrapping ",Object(n.b)("inlineCode",{parentName:"p"},"yield")," operations in a ",Object(n.b)("inlineCode",{parentName:"p"},"try")," block."),Object(n.b)("p",null,"Repeaters simulate this behavior by causing the promise returned from the previous ",Object(n.b)("inlineCode",{parentName:"p"},"push")," call to reject."),Object(n.b)("pre",null,Object(n.b)("code",a({parentName:"pre"},{className:"language-js"}),'const repeater = Repeater(async (push) => {\n  for (let i = 0; i < 10; i++) {\n    try {\n      await push(i);\n    } catch (err) {\n      console.log(err);\n      console.log("Hello I caught your error 👀");\n    }\n  }\n});\n\n(async function() {\n  console.log(await repeater.next()); // { value: 1, done: false };\n  console.log(await repeater.throw(new Error("Hello? 📞"))); \n  // Error: Hello? 📞\n  // Hello I caught your error 👀\n  // { value: 2, done: false }\n  console.log(await repeater.next()); // { value: 3, done: false };\n  console.log(await repeater.next()); // { value: 4, done: false };\n})();\n')),Object(n.b)("p",null,"The promise returned from ",Object(n.b)("inlineCode",{parentName:"p"},"push")," has special behavior where if it is “floating” (i.e. it is not awaited and its ",Object(n.b)("inlineCode",{parentName:"p"},"then/catch")," methods are not called) the ",Object(n.b)("inlineCode",{parentName:"p"},"throw")," method rethrows the error passed in. This makes it safe to ignore the promise returned from ",Object(n.b)("inlineCode",{parentName:"p"},"push"),". However, if you await or otherwise use the ",Object(n.b)("inlineCode",{parentName:"p"},"push")," promise, it becomes your responsibility to handle and propagate errors passed to ",Object(n.b)("inlineCode",{parentName:"p"},"throw"),"."),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Note: The ",Object(n.b)("inlineCode",{parentName:"em"},"throw")," method will also immediately rethrow its error if the repeater has not been started, the repeater has stopped, or the repeater has a non-empty buffer, because in each of these cases, there is no corresponding ",Object(n.b)("inlineCode",{parentName:"em"},"push")," call which can reject with the error.")))}c.isMDXComponent=!0},64:function(e,r,t){"use strict";t.d(r,"a",(function(){return s})),t.d(r,"b",(function(){return h}));var n=t(0),a=t.n(n),o=a.a.createContext({}),i=function(e){var r=a.a.useContext(o),t=r;return e&&(t="function"==typeof e?e(r):Object.assign({},r,e)),t},s=function(e){var r=i(e.components);return a.a.createElement(o.Provider,{value:r},e.children)};var p="mdxType",l={inlineCode:"code",wrapper:function(e){var r=e.children;return a.a.createElement(a.a.Fragment,{},r)}},c=Object(n.forwardRef)((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,p=function(e,r){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&-1===r.indexOf(n)&&(t[n]=e[n]);return t}(e,["components","mdxType","originalType","parentName"]),c=i(t),h=n,u=c[s+"."+h]||c[h]||l[h]||o;return t?a.a.createElement(u,Object.assign({},{ref:r},p,{components:t})):a.a.createElement(u,Object.assign({},{ref:r},p))}));function h(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=t.length,i=new Array(o);i[0]=c;var s={};for(var l in r)hasOwnProperty.call(r,l)&&(s[l]=r[l]);s.originalType=e,s[p]="string"==typeof e?e:n,i[1]=s;for(var h=2;h<o;h++)i[h]=t[h];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,t)}c.displayName="MDXCreateElement"}}]);