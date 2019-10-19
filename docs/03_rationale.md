---
id: rationale
title: Rationale
---

While [async iterators](https://github.com/tc39/proposal-async-iteration) are available in most modern javascript runtimes, they have yet to achieve widespread usage due to various perceived [flaws](https://github.com/apollographql/graphql-subscriptions/issues/116) and [pitfalls](https://github.com/tc39/proposal-async-iteration/issues/126). What’s needed is something like the `Promise` constructor, which helped promises succeed by providing a common pattern for converting callback-based APIs into promises. The `Repeater` constructor makes it easy to turn *any* callback-based source of data into an async iterator, and prevents common async iterator mistakes [by design](safety). The constructor pattern is easy to memorize and adaptable for almost every async iterator use case.

## Why not async generators?

Repeaters are meant to be used alongside async generators rather than replace them. The problem with using async generators exclusively is that they rely on the `yield`, `return` and `throw` statements to produce values, which are unavailable in child closures. 

```js
async function* messages(url) {
  const socket = new WebSocket(url);
  socket.onmessage = (ev) => {
     // can’t make the outer generator yield from here.
  };
}
```

The solution using async generators is often some ad-hoc `while (true)` loop which awaits a newly constructed promise which adds and removes event handlers for each iteration. The resulting code is often prone to race-conditions, dropped messages and memory leaks unless done with an expert understanding of both promises and generators. Repeaters behave identically to async generators, except they provide the `yield`, `return` and `throw` statements as the functions `push` and `stop`. These functions give imperative control over repeaters in child closures, making repeaters ideal for use with callback-based APIs.

Once you have converted callback-based APIs to repeater-returning functions, repeaters can be used seamlessly with async generators to write easy-to-understand async code.

## Why not observables?

Observables are often thought of as competing with async iterators and therefore repeaters, and it’s true that most repeater code can be rewritten with observables. Here, for instance, is the [Konami example from the quickstart](quickstart#listening-for-the-konami-code), rewritten using `rxjs`:

```js
import { Observable } from "rxjs";
import { takeWhile } from "rxjs/operators";
const keys = new Observable(subscriber => {
  const listener = ev => {
    if (ev.key === "Escape") {
      subscriber.complete();
    } else {
      subscriber.next(ev.key);
    }
  };
  window.addEventListener("keyup", listener);
  return () => window.removeEventListener("keyup", listener);
});

const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

let i = 0;
let subscription = keys
  .pipe(
    takeWhile(key => {
      if (key === konami[i]) {
        i++;
      } else {
        i = 0;
      }
      if (i >= konami.length) {
        console.log("KONAMI!!!");
        return false;
      }
      return true;
    }),
  )
  .subscribe();
```

While you can often create an equivalent observable for any repeater, there are several differences that make repeaters much nicer to use.

Firstly, repeaters support `async`/`await` and `for await…of` syntax, so we don’t need a library of “operators” like `takeWhile` to consume repeaters. To someone unfamiliar with `rxjs`, it might not be immediately obvious in the example what `takeWhile` does, whereas the same programmer would probably recognize what a `break` statement does in a `for await…of` loop. Using `for await…of` loops means we get to leverage what we already know about synchronous loops and control-flow statements to write cleaner, more intuitive code. Rather than using the `map` operator, we can assign a variable, rather than using the `filter` operator, we can use `if`/`else` statements, and rather than using the `reduce` operator, we can reassign or mutate a variable in the outer scope. I suspect that if observables ever [decided to support the async iterator protocol](https://github.com/ReactiveX/rxjs/issues/4002), the market for higher-order observable functions would collapse overnight.

Secondly, despite the claims observable advocates make about how observables are “monadic” or that they are the “mathematical dual” of synchronous iterables, observables are ultimately callback-based APIs. The above example hides this detail by calling the `subscribe` method without arguments, but if we wanted to compose this observable with other code, we would have to call other observable methods, which take callbacks. Being a callback-based API makes using observables with `async`/`await` and promises awkward; in fact, observables suffer from the same issue of “callback hell” which promises were designed to solve. Observable libraries are aware of this and provide “higher-order observable operators,” which work on observables of observables, but these solutions are seldom used and virtually incomprehensible to human beings, who are unaccustomed to thinking in extradimensional spaces.
