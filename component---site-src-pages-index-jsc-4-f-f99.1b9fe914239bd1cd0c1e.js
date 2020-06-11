(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{42:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return h}));var r=a(0),n=a.n(r),l=a(65),c=a.n(l),s=a(67),o=a.n(s),i=a(66),m=a(69);function u(){var e=c()().siteConfig,t=void 0===e?{}:e;return n.a.createElement("header",{className:"hero"},n.a.createElement("div",{className:"container margin-vert--lg"},n.a.createElement("h1",{className:"hero__title"},t.title),n.a.createElement("p",{className:"hero__subtitle"},t.tagline),n.a.createElement(i.a,{to:o()("docs/quickstart"),className:"button button--primary button--outline button--lg"},"Get Started"),n.a.createElement("div",{className:"button button--link"},n.a.createElement("iframe",{src:"https://ghbtns.com/github-btn.html?user=repeaterjs&repo=repeater&type=star&count=true&size=large",frameBorder:"0",scrolling:"0",width:"160px",height:"30px"}))))}function d(e){var t=e.title,a=e.children,r=e.color,l=void 0===r?"primary":r;return n.a.createElement("div",{className:"col"},n.a.createElement("h2",{className:"text--center text--"+l,style:{color:l}},t),n.a.createElement("p",{className:"text--justify"},a))}function p(){return n.a.createElement("main",{className:"container"},n.a.createElement("div",{className:"row margin-vert--xl"},n.a.createElement(d,{title:"Convenient"},"The ",n.a.createElement("code",null,"Repeater")," class provides a memorable promise-based API for creating async iterators. You can reuse the same constructor to convert event targets, websockets or any other callback-based data source into a format which can be read using ",n.a.createElement("code",null,"async/await")," ","and ",n.a.createElement("code",null,"for await…of")," syntax."),n.a.createElement(d,{title:"Safe",color:"#BA00AC"},"Repeaters prevent common mistakes people make when rolling async iterators by hand. By executing lazily, dealing with backpressure, and propagating errors in a predictable manner, repeaters ensure that event handlers are cleaned up and that bottlenecks and deadlocks are discovered quickly."),n.a.createElement(d,{title:"Powerful",color:"#00B100"},"You can use repeaters to implement architectural patterns like cancelable timers, semaphores, and generic pubsub classes. The Repeater class also defines static methods like"," ",n.a.createElement("code",null,"Repeater.race")," and ",n.a.createElement("code",null,"Repeater.merge")," which allow you to use async iterators for reactive programming purposes.")))}function h(){return n.a.createElement(m.a,null,n.a.createElement(u,null),n.a.createElement(p,null))}}}]);