# bep-ui

基于element-plus组件库，二开的schema-form，schema-table

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm -w dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm -w build
```

### Compile and Minify Libraries for Production

```sh
pnpm -w build-only:bep-build
pnpm -w build-only:gadgets
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm -w test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm -w lint
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).
