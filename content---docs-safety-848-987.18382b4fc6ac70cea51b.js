(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{52:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",function(){return s}),t.d(n,"rightToc",function(){return o}),t.d(n,"default",function(){return p});t(0);var a=t(56);function r(){return(r=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e}).apply(this,arguments)}function i(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s={id:"safety",title:"How are Channels “Safe”?"},o=[{value:"Channels execute lazily",id:"channels-execute-lazily",children:[]},{value:"Channels respond to backpressure",id:"channels-respond-to-backpressure",children:[{value:"1. Waiting for pushes to resolve",id:"1-waiting-for-pushes-to-resolve",children:[]},{value:"2. Throwing errors",id:"2-throwing-errors",children:[]},{value:"3. Buffering and dropping values",id:"3-buffering-and-dropping-values",children:[]}]}],l={rightToc:o},c="wrapper";function p(e){var n=e.components,t=i(e,["components"]);return Object(a.b)(c,r({},l,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Most async iterator libraries currently available are prone to causing memory leaks through normal usage. Channels use the following design principles to prevent leaks:"),Object(a.b)("h2",null,Object(a.b)("a",r({parentName:"h2"},{"aria-hidden":!0,className:"anchor",id:"channels-execute-lazily"})),Object(a.b)("a",r({parentName:"h2"},{"aria-hidden":!0,className:"hash-link",href:"#channels-execute-lazily"}),"#"),"Channels execute lazily"),Object(a.b)("p",null,"There are several existing async iterator libraries which provide tightly-coupled wrappers around event emitters, streams, or other callback-based APIs. Almost all of them make the critical mistake of registering callbacks eagerly, i.e. when the iterator is created. Consider the following naive async iterator returning function:"),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-js"}),'function listen(target, name) {\n  const events = [];\n  const nexts = [];\n  function listener(ev) {\n    const next = nexts.shift();\n    if (next == null) {\n      events.push(ev);\n    } else {\n      next({ value: ev, done: false });\n    }\n  };\n  console.log("adding listener!");\n  target.addEventListener(name, listener);\n  return {\n    next() {\n      const ev = events.shift();\n      if (ev == null) {\n        return new Promise((next) => nexts.push(next));\n      }\n      return Promise.resolve({ value: ev, done: false });\n    },\n    return() {\n      nexts.forEach((next) => next({ done: true }));\n      console.log("removing listener!");\n      target.removeEventListener(name, listener);\n      return Promise.resolve({ done: true });\n    },\n    [Symbol.asyncIterator]() {\n      return this;\n    },\n  };\n}\n')),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"listen")," function returns an async iterator of events and cleans up after itself when ",Object(a.b)("inlineCode",{parentName:"p"},"return")," is called. However, there is no guarantee that ",Object(a.b)("inlineCode",{parentName:"p"},"return")," will be called in normal usage, causing a memory leak in the form of unremoved event listeners. Consider the following usage of ",Object(a.b)("inlineCode",{parentName:"p"},"listen")," with an async generator:"),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-js"}),'async function* positions(clicks) {\n  for await (const c of clicks) {\n    yield {\n      x: c.clientX,\n      y: c.clientY,\n    };\n  }\n}\n\n(async function() {\n  const clicks = listen(window, "click"); // adding listener!\n  const pos = positions(clicks);\n  // never mind we’re not interested in the positions of clicks.\n  pos.return(); // 💭💭💭 clicks.return is never called.\n})();\n')),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"positions")," async generator takes an async iterator of click events and yields x/y coordinates. However, in the example, the ",Object(a.b)("inlineCode",{parentName:"p"},"pos.return")," method is called immediately so that the ",Object(a.b)("inlineCode",{parentName:"p"},"for await…of")," loop inside the ",Object(a.b)("inlineCode",{parentName:"p"},"positions")," generator never starts. Consequently, ",Object(a.b)("inlineCode",{parentName:"p"},"clicks.return")," is never called and the event listener registered inside ",Object(a.b)("inlineCode",{parentName:"p"},"listen")," is never cleaned up. To make the code safe, we would have to make sure that either every ",Object(a.b)("inlineCode",{parentName:"p"},"positions")," generator is iterated at least once, or that every ",Object(a.b)("inlineCode",{parentName:"p"},"listen")," iterator is manually returned. This logic is difficult to enforce and indicative of a leaky abstraction in that we have to treat ",Object(a.b)("inlineCode",{parentName:"p"},"listen"),"-based async iterators differently than async generator objects, the latter of which can be safely created and ignored."),Object(a.b)("p",null,"Channels solve this problem by executing lazily. In other words, the executor passed to the ",Object(a.b)("inlineCode",{parentName:"p"},"Channel")," constructor does not run until the first time ",Object(a.b)("inlineCode",{parentName:"p"},"next")," is called. Here’s the same ",Object(a.b)("inlineCode",{parentName:"p"},"listen")," function written with channels:"),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-js"}),'function listen(target, name) {\n  return new Channel(async (push, _, stop) => {\n    const listener = (ev) => push(ev);\n    console.log("adding listener!");\n    target.addEventListener(name, listener);\n    await stop;\n    console.log("removing listener!");\n    target.removeEventListener(name, listener);\n  });\n}\n')),Object(a.b)("p",null,"If we swap in the channel-based ",Object(a.b)("inlineCode",{parentName:"p"},"listen")," function for the one above, neither ",Object(a.b)("inlineCode",{parentName:"p"},"target.addEventListener")," nor ",Object(a.b)("inlineCode",{parentName:"p"},"target.removeEventListener")," are called, and the ",Object(a.b)("inlineCode",{parentName:"p"},"clicks")," channel can be safely garbage collected."),Object(a.b)("p",null,"Because channels execute lazily, the contract for safely consuming channels is simple: ",Object(a.b)("strong",{parentName:"p"},"if you call ",Object(a.b)("inlineCode",{parentName:"strong"},"next"),", you must call ",Object(a.b)("inlineCode",{parentName:"strong"},"return")),". This happens automatically when using ",Object(a.b)("inlineCode",{parentName:"p"},"for await…of")," loops and is easy to enforce when calling ",Object(a.b)("inlineCode",{parentName:"p"},"next")," manually using control-flow syntax like ",Object(a.b)("inlineCode",{parentName:"p"},"try/finally"),"."),Object(a.b)("h2",null,Object(a.b)("a",r({parentName:"h2"},{"aria-hidden":!0,className:"anchor",id:"channels-respond-to-backpressure"})),Object(a.b)("a",r({parentName:"h2"},{"aria-hidden":!0,className:"hash-link",href:"#channels-respond-to-backpressure"}),"#"),"Channels respond to backpressure"),Object(a.b)("p",null,"The naive ",Object(a.b)("inlineCode",{parentName:"p"},"listen")," function has an additional, potentially more insidious problem, which is that it pushes events onto an unbounded array. For instance, one can imagine creating an async iterator which listens for scroll events, where the rate at which events are created outpaces the rate at which iterator iterates, perhaps because of a bottleneck or hanging promise. In this situation, the ",Object(a.b)("inlineCode",{parentName:"p"},"events")," array created by the naive ",Object(a.b)("inlineCode",{parentName:"p"},"listen")," function would continue to grow as the user scrolled, eventually causing application performance to degrade. This is often referred to as the “fast producer, slow consumer” problem and while it might not seem like a big issue for short-lived browser sessions, it is crucial to deal with when writing long-running server processes with Node.js."),Object(a.b)("p",null,"Inspired by Clojure’s ",Object(a.b)("inlineCode",{parentName:"p"},"core.async")," library, channels provide three solutions for dealing with slow consumers:"),Object(a.b)("h3",null,Object(a.b)("a",r({parentName:"h3"},{"aria-hidden":!0,className:"anchor",id:"1-waiting-for-pushes-to-resolve"})),Object(a.b)("a",r({parentName:"h3"},{"aria-hidden":!0,className:"hash-link",href:"#1-waiting-for-pushes-to-resolve"}),"#"),"1. Waiting for pushes to resolve"),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"push")," function passed to the executor returns a promise which resolves when ",Object(a.b)("inlineCode",{parentName:"p"},"next")," is called, so that you can write code as follows:"),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-js"}),"const numbers = new Channel(async (push, stop) => {\n  for (let i = 0; i <= 100; i++) {\n    await push(i);\n  }\n  stop();\n});\n\n(async function() {\n  console.log(await numbers.next()); // { value: 0, done: false }\n  let result = [];\n  for await (number of numbers) {\n    result.push(number);\n  }\n  console.log(result); // [1, 2, 3, ..., 99, 100]\n})();\n")),Object(a.b)("p",null,"By awaiting ",Object(a.b)("inlineCode",{parentName:"p"},"push"),", code in the executor can wait for values to be pulled and the channel becomes a simple synchronization mechanism between producers and consumers."),Object(a.b)("h3",null,Object(a.b)("a",r({parentName:"h3"},{"aria-hidden":!0,className:"anchor",id:"2-throwing-errors"})),Object(a.b)("a",r({parentName:"h3"},{"aria-hidden":!0,className:"hash-link",href:"#2-throwing-errors"}),"#"),"2. Throwing errors"),Object(a.b)("p",null,"When using callback-based APIs, it is often inconvenient to await ",Object(a.b)("inlineCode",{parentName:"p"},"push")," calls because the callbacks run frequently and synchronously. Therefore, channels allow you to call ",Object(a.b)("inlineCode",{parentName:"p"},"push")," in a fire-and-forget manner with the caveat that ",Object(a.b)("inlineCode",{parentName:"p"},"push")," will begin throwing synchronous errors when there are too many pending pushes."),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-js"}),'const ys = new Channel(async (push, stop) => {\n  const listener = () => push(window.scrollY); // ⚠️ Might throw an error!\n  window.addEventListener("scroll", listener);\n  await stop;\n  window.removeEventListener("scroll", listener);\n});\n\nys.next();\n')),Object(a.b)("p",null,"This behavior is desirable because it allows developers to quickly surface bottlenecks and deadlocks when and where they happen, rather than when the process runs out of memory."),Object(a.b)("h3",null,Object(a.b)("a",r({parentName:"h3"},{"aria-hidden":!0,className:"anchor",id:"3-buffering-and-dropping-values"})),Object(a.b)("a",r({parentName:"h3"},{"aria-hidden":!0,className:"hash-link",href:"#3-buffering-and-dropping-values"}),"#"),"3. Buffering and dropping values"),Object(a.b)("p",null,"If you neither wish to await ",Object(a.b)("inlineCode",{parentName:"p"},"push")," calls nor want to deal with errors, one last option is to have the channel store values in a buffer and drop them when the buffer reaches capacity. The ",Object(a.b)("inlineCode",{parentName:"p"},"Channel")," constructor optionally takes a ",Object(a.b)("inlineCode",{parentName:"p"},"ChannelBuffer")," instance as its second argument. For example, by passing in a ",Object(a.b)("inlineCode",{parentName:"p"},"SlidingBuffer")," instance, we can make it so that the channel only retains the twenty latest scroll positions."),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-js"}),'import { Channel, SlidingBuffer } from "@channel/channel";\n\nconst ys = new Channel(async (push, stop) => {\n  const listener = () => push(window.scrollY); // 🙂 will never throw\n  window.addEventListener("scroll", listener);\n  await stop;\n  window.removeEventListener("scroll", listener);\n}, new SlidingBuffer(20));\n\nys.next();\n')),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"@channel/channel")," package exports three ",Object(a.b)("inlineCode",{parentName:"p"},"ChannelBuffer")," classes: ",Object(a.b)("inlineCode",{parentName:"p"},"FixedBuffer"),", ",Object(a.b)("inlineCode",{parentName:"p"},"DroppingBuffer")," and ",Object(a.b)("inlineCode",{parentName:"p"},"SlidingBuffer"),". ",Object(a.b)("inlineCode",{parentName:"p"},"FixedBuffer")," allows channels to push a set number of values without waiting, but preserves the waiting/error throwing behavior described above when the buffer is full. Alternatively, ",Object(a.b)("inlineCode",{parentName:"p"},"DroppingBuffer")," will drop the ",Object(a.b)("em",{parentName:"p"},"latest")," values when the buffer is full and ",Object(a.b)("inlineCode",{parentName:"p"},"SlidingBuffer")," will drop the ",Object(a.b)("em",{parentName:"p"},"earliest")," values. Because ",Object(a.b)("inlineCode",{parentName:"p"},"DroppingBuffer")," and ",Object(a.b)("inlineCode",{parentName:"p"},"SlidingBuffer")," instances never fill up, pushes to channels with these buffers never throw. You can define custom buffer classes to give channels more complex buffering behaviors."))}p.isMDXComponent=!0}}]);