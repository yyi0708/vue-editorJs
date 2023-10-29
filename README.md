
# vue3-editor-js

vue3-editor-js is editorjs wrapper component. At the same time, through vue-demi support for vue2 and vue3, Don't worry about the vue environment.

Please review this first. 
* https://editorjs.io/
* https://github.com/vueuse/vue-demi

## Installation

```bash
# NPM
npm i vue3-editor-js --save

# or Yarn
yarn add vue3-editor-js

# or Pnpm
pnpm add vue3-editor-js
```

## Usage

```js
// in pages...
import Editor from 'vue3-editor-js'


// in main.js...
import { VueEditor } from './components/Editor'
const app = createApp(App)
app.use(VueEditor)
app.mount('#app')

```

```Vue
<vue-editor ref="editor" :config="config" @change="changeFn" :initEditorMethod="initializedFn"></vue-editor>

```

## Storybook show

Follow-up will also be updated....