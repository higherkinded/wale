Wale
========
_Simple asynchronous-by-default VirtualDOM library._

Wale is a VirtualDOM library using asynchronous rendering flow. It renders
the element tree asynchronously but worry not: it manifests itself correctly,
ensuring that the children are ordered correctly and the properties (attributes,
handlers, styles, etc.) are not asynchronously overriding themselves.

## Design principles

The design of Wale is driven by a simple set of key principles and rules:
- **Be asynchronous by default and allow first-class asynchronousity**. User
  should be allowed to write `async function` and process all the necessary
  asynchronous actions inside it.
- **Provide zero support for internal state**. User should feel that internal
  component state is not a correct approach to state management in heavier
  projects.
- **Use function type for user-defined components**. Behavior and data are
  separate entities and shouldn't be unified.
- **Target JSX**. Why would you want to use something else when JSX provides the
  best composition for components that ever existed?
  
## Install it!

It's simple, as with any NPM package out there. Wale's namespace is at
`@wale.ts`, and you can find the current package under `@wale.ts/vdom`.

Just so you can copy-paste,

[npm]
```bash
$ npm i @wale.ts/vdom
```

[yarn]
```bash
$ yarn add @wale.ts/vdom
```

## "Why would I want to use it?"

One of the reasons is that you get to control the asynchronous part of
your application. You can live perfectly fine without any asynchronous
middleware inbetween your state and your representation. You can block
your rendering until, say, you have a resource necessary to render it
correctly, and you'll still do great because the only part that's gets
blocked is the `await`ing component and its children.

## _See also_

Be sure to check out 
[Wale/Stunsail](https://github.com/higherkinded/wale-stunsail)
for state management.
