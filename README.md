# Reproduction steps

```bash
pnpm install
pnpm build
```

Now the output of `./dist/index.js` should be [similar to this](https://playground.react.dev/#N4Igzg9grgTgxgUxALhASwHYBcEwGYCGiABALICeAQlFlhBgAowQAOYxwAOhscVuSwQB+ZMQDkLGGgC2BGOTHcAvt24IAHiwgwsxPFAxwsaemSo06GABTA+AhMSWiK1WvSaswASg7deMBCxYHgAeACMLUzgAGwIwMAA5AmkEAF5OEGlyAFoItwwMgD4s4jzLUX5BDkqEJRCAejL6QuVuECUgA):

```js
import { c as _c } from 'react/compiler-runtime'
import { jsxs } from 'react/jsx-runtime'

//#region src/MyButton.tsx
function MyButton(t0) {
  const $ = _c(2)
  const { type } = t0
  let t1
  if ($[0] !== type) {
    t1 = /* @__PURE__ */ jsxs('button', {
      className: 'my-button',
      children: ['my button: type ', type],
    })
    $[0] = type
    $[1] = t1
  } else {
    t1 = $[1]
  }
  return t1
}

//#endregion
export { MyButton }
```

But instead it's erroneously outputting this:

```js
import { c } from 'react-compiler-runtime'
import { jsxs } from 'react/jsx-runtime'

//#region ../../../../@react-refresh
/*! Copyright (c) Meta Platforms, Inc. and affiliates. **/
/**
 * This is simplified pure-js version of https://github.com/facebook/react/blob/main/packages/react-refresh/src/ReactFreshRuntime.js
 * without IE11 compatibility and verbose isDev checks.
 * Some utils are appended at the bottom for HMR integration.
 */
const REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref')
const REACT_MEMO_TYPE = Symbol.for('react.memo')
let allFamiliesByID = /* @__PURE__ */ new Map()
let allFamiliesByType = /* @__PURE__ */ new WeakMap()
let allSignaturesByType = /* @__PURE__ */ new WeakMap()
const updatedFamiliesByType = /* @__PURE__ */ new WeakMap()
let pendingUpdates = []
const helpersByRendererID = /* @__PURE__ */ new Map()
const helpersByRoot = /* @__PURE__ */ new Map()
const mountedRoots = /* @__PURE__ */ new Set()
const failedRoots = /* @__PURE__ */ new Set()
let rootElements = /* @__PURE__ */ new WeakMap()
let isPerformingRefresh = false
function computeFullKey(signature) {
  if (signature.fullKey !== null) return signature.fullKey
  let fullKey = signature.ownKey
  let hooks$1
  try {
    hooks$1 = signature.getCustomHooks()
  } catch (err) {
    signature.forceReset = true
    signature.fullKey = fullKey
    return fullKey
  }
  for (let i = 0; i < hooks$1.length; i++) {
    const hook = hooks$1[i]
    if (typeof hook !== 'function') {
      signature.forceReset = true
      signature.fullKey = fullKey
      return fullKey
    }
    const nestedHookSignature = allSignaturesByType.get(hook)
    if (nestedHookSignature === void 0) continue
    const nestedHookKey = computeFullKey(nestedHookSignature)
    if (nestedHookSignature.forceReset) signature.forceReset = true
    fullKey += '\n---\n' + nestedHookKey
  }
  signature.fullKey = fullKey
  return fullKey
}
function haveEqualSignatures(prevType, nextType) {
  const prevSignature = allSignaturesByType.get(prevType)
  const nextSignature = allSignaturesByType.get(nextType)
  if (prevSignature === void 0 && nextSignature === void 0) return true
  if (prevSignature === void 0 || nextSignature === void 0) return false
  if (computeFullKey(prevSignature) !== computeFullKey(nextSignature))
    return false
  if (nextSignature.forceReset) return false
  return true
}
function isReactClass(type) {
  return type.prototype && type.prototype.isReactComponent
}
function canPreserveStateBetween(prevType, nextType) {
  if (isReactClass(prevType) || isReactClass(nextType)) return false
  if (haveEqualSignatures(prevType, nextType)) return true
  return false
}
function resolveFamily(type) {
  return updatedFamiliesByType.get(type)
}
function getProperty(object, property) {
  try {
    return object[property]
  } catch (err) {
    return void 0
  }
}
function performReactRefresh() {
  if (pendingUpdates.length === 0) return null
  if (isPerformingRefresh) return null
  isPerformingRefresh = true
  try {
    const staleFamilies = /* @__PURE__ */ new Set()
    const updatedFamilies = /* @__PURE__ */ new Set()
    const updates = pendingUpdates
    pendingUpdates = []
    updates.forEach(([family, nextType]) => {
      const prevType = family.current
      updatedFamiliesByType.set(prevType, family)
      updatedFamiliesByType.set(nextType, family)
      family.current = nextType
      if (canPreserveStateBetween(prevType, nextType))
        updatedFamilies.add(family)
      else staleFamilies.add(family)
    })
    const update = {
      updatedFamilies,
      staleFamilies,
    }
    helpersByRendererID.forEach((helpers) => {
      helpers.setRefreshHandler(resolveFamily)
    })
    let didError = false
    let firstError = null
    const failedRootsSnapshot = new Set(failedRoots)
    const mountedRootsSnapshot = new Set(mountedRoots)
    const helpersByRootSnapshot = new Map(helpersByRoot)
    failedRootsSnapshot.forEach((root) => {
      const helpers = helpersByRootSnapshot.get(root)
      if (helpers === void 0)
        throw new Error(
          'Could not find helpers for a root. This is a bug in React Refresh.',
        )
      if (!failedRoots.has(root)) {
      }
      if (rootElements === null) return
      if (!rootElements.has(root)) return
      const element = rootElements.get(root)
      try {
        helpers.scheduleRoot(root, element)
      } catch (err) {
        if (!didError) {
          didError = true
          firstError = err
        }
      }
    })
    mountedRootsSnapshot.forEach((root) => {
      const helpers = helpersByRootSnapshot.get(root)
      if (helpers === void 0)
        throw new Error(
          'Could not find helpers for a root. This is a bug in React Refresh.',
        )
      if (!mountedRoots.has(root)) {
      }
      try {
        helpers.scheduleRefresh(root, update)
      } catch (err) {
        if (!didError) {
          didError = true
          firstError = err
        }
      }
    })
    if (didError) throw firstError
    return update
  } finally {
    isPerformingRefresh = false
  }
}
function register(type, id) {
  if (type === null) return
  if (typeof type !== 'function' && typeof type !== 'object') return
  if (allFamiliesByType.has(type)) return
  let family = allFamiliesByID.get(id)
  if (family === void 0) {
    family = { current: type }
    allFamiliesByID.set(id, family)
  } else pendingUpdates.push([family, type])
  allFamiliesByType.set(type, family)
  if (typeof type === 'object' && type !== null)
    switch (getProperty(type, '$$typeof')) {
      case REACT_FORWARD_REF_TYPE:
        register(type.render, id + '$render')
        break
      case REACT_MEMO_TYPE:
        register(type.type, id + '$type')
        break
    }
}
function setSignature(type, key, forceReset, getCustomHooks) {
  if (!allSignaturesByType.has(type))
    allSignaturesByType.set(type, {
      forceReset,
      ownKey: key,
      fullKey: null,
      getCustomHooks: getCustomHooks || (() => []),
    })
  if (typeof type === 'object' && type !== null)
    switch (getProperty(type, '$$typeof')) {
      case REACT_FORWARD_REF_TYPE:
        setSignature(type.render, key, forceReset, getCustomHooks)
        break
      case REACT_MEMO_TYPE:
        setSignature(type.type, key, forceReset, getCustomHooks)
        break
    }
}
function collectCustomHooksForSignature(type) {
  const signature = allSignaturesByType.get(type)
  if (signature !== void 0) computeFullKey(signature)
}
function createSignatureFunctionForTransform() {
  let savedType
  let hasCustomHooks
  let didCollectHooks = false
  return function (type, key, forceReset, getCustomHooks) {
    if (typeof key === 'string') {
      if (!savedType) {
        savedType = type
        hasCustomHooks = typeof getCustomHooks === 'function'
      }
      if (
        type != null &&
        (typeof type === 'function' || typeof type === 'object')
      )
        setSignature(type, key, forceReset, getCustomHooks)
      return type
    } else if (!didCollectHooks && hasCustomHooks) {
      didCollectHooks = true
      collectCustomHooksForSignature(savedType)
    }
  }
}
function isLikelyComponentType(type) {
  switch (typeof type) {
    case 'function': {
      if (type.prototype != null) {
        if (type.prototype.isReactComponent) return true
        const ownNames = Object.getOwnPropertyNames(type.prototype)
        if (ownNames.length > 1 || ownNames[0] !== 'constructor') return false
        if (type.prototype.__proto__ !== Object.prototype) return false
      }
      const name = type.name || type.displayName
      return typeof name === 'string' && /^[A-Z]/.test(name)
    }
    case 'object': {
      if (type != null)
        switch (getProperty(type, '$$typeof')) {
          case REACT_FORWARD_REF_TYPE:
          case REACT_MEMO_TYPE:
            return true
          default:
            return false
        }
      return false
    }
    default:
      return false
  }
}
/**
 * Plugin utils
 */
function getRefreshReg(filename) {
  return (type, id) => register(type, filename + ' ' + id)
}
function registerExportsForReactRefresh(filename, moduleExports) {
  for (const key in moduleExports) {
    if (key === '__esModule') continue
    const exportValue = moduleExports[key]
    if (isLikelyComponentType(exportValue))
      register(exportValue, filename + ' export ' + key)
  }
}
function debounce(fn, delay) {
  let handle
  return () => {
    clearTimeout(handle)
    handle = setTimeout(fn, delay)
  }
}
const hooks = []
window.__registerBeforePerformReactRefresh = (cb) => {
  hooks.push(cb)
}
const enqueueUpdate = debounce(async () => {
  if (hooks.length) await Promise.all(hooks.map((cb) => cb()))
  performReactRefresh()
}, 16)
function validateRefreshBoundaryAndEnqueueUpdate(id, prevExports, nextExports) {
  const ignoredExports = window.__getReactRefreshIgnoredExports?.({ id }) ?? []
  if (
    predicateOnExport(
      ignoredExports,
      prevExports,
      (key) => key in nextExports,
    ) !== true
  )
    return 'Could not Fast Refresh (export removed)'
  if (
    predicateOnExport(
      ignoredExports,
      nextExports,
      (key) => key in prevExports,
    ) !== true
  )
    return 'Could not Fast Refresh (new export)'
  let hasExports = false
  const allExportsAreComponentsOrUnchanged = predicateOnExport(
    ignoredExports,
    nextExports,
    (key, value) => {
      hasExports = true
      if (isLikelyComponentType(value)) return true
      return prevExports[key] === nextExports[key]
    },
  )
  if (hasExports && allExportsAreComponentsOrUnchanged === true) enqueueUpdate()
  else
    return `Could not Fast Refresh ("${allExportsAreComponentsOrUnchanged}" export is incompatible). Learn more at https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports`
}
function predicateOnExport(ignoredExports, moduleExports, predicate) {
  for (const key in moduleExports) {
    if (key === '__esModule') continue
    if (ignoredExports.includes(key)) continue
    const desc = Object.getOwnPropertyDescriptor(moduleExports, key)
    if (desc && desc.get) return key
    if (!predicate(key, moduleExports[key])) return key
  }
  return true
}
const __hmr_import = (module) =>
  import(
    /* @vite-ignore */
    module
  )

//#endregion
//#region src/MyButton.tsx
const inWebWorker =
  typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope
let prevRefreshReg
let prevRefreshSig
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$)
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong.",
    )
  prevRefreshReg = window.$RefreshReg$
  prevRefreshSig = window.$RefreshSig$
  window.$RefreshReg$ = getRefreshReg('/src/MyButton.tsx')
  window.$RefreshSig$ = createSignatureFunctionForTransform
}
function MyButton(t0) {
  const $ = c(2)
  const { type } = t0
  let t1
  if ($[0] !== type) {
    t1 = /* @__PURE__ */ jsxs('button', {
      className: 'my-button',
      children: ['my button: type ', type],
    })
    $[0] = type
    $[1] = t1
  } else t1 = $[1]
  return t1
}
_c2 = MyButton
var _c2
$RefreshReg$(_c2, 'MyButton')
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg
  window.$RefreshSig$ = prevRefreshSig
}
if (import.meta.hot && !inWebWorker)
  __hmr_import(import.meta.url).then((currentExports) => {
    registerExportsForReactRefresh('/src/MyButton.tsx', currentExports)
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return
      const invalidateMessage = validateRefreshBoundaryAndEnqueueUpdate(
        '/src/MyButton.tsx',
        currentExports,
        nextExports,
      )
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage)
    })
  })

//#endregion
export { MyButton }
//# sourceMappingURL=index.js.map
```

Note that `pnpm test` and `pnpm playground` both work correctly.
For example `pnpm test` will dump to `.vite-node/dump` and a file containing `_src_MyButton_tsx` demonstrates correct output.
Running `pnpm playground` also demonstrates the correct output when inspecting `MyButton` and seeing its `Memo✨` label:
<img width="739" alt="Image" src="https://github.com/user-attachments/assets/22142972-f145-43f7-a27d-e294289f9559" />
