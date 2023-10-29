<template>
  <div class="wrap">
    <div class="opt-area">
      <button @click="clickFn">getEditorData</button>
    </div>

    <vue-editor ref="editor" :config="config" @change="changeFn" :initialized="initializedFn"></vue-editor>
  </div>
  
</template>

<script setup>
import { ref } from 'vue-demi'
import Header from '@editorjs/header'
import LinkTool from '@editorjs/link'
import RawTool from '@editorjs/raw'
import SimpleImage from '@editorjs/simple-image'
import CheckList from '@editorjs/checklist'
import List from '@editorjs/list'
import Embed from '@editorjs/embed'
import Quote from '@editorjs/quote'
import Table from '@editorjs/table'
import CodeTool from '@editorjs/code'
import TextVariantTune from '@editorjs/text-variant-tune';

import VueEditor from './components/Editor';

const editor = ref(null)
const config = ref({
  placeholder: 'Start your creative journey！',
  logLevel: 'ERROR',
  tools: {
    header: {
      class: Header,
      shortcut: 'CMD+SHIFT+H',
      toolbox: true,
    },
    linkTool: {
      class: LinkTool,
      toolbox: true,
    },
    raw: RawTool,
    image: {
      class: SimpleImage,
    },
    checkList: {
      class: CheckList,
      inlineToolbar: true
    },
    list: {
      class: List
    },
    embed: {
      class: Embed,
      inlineToolbar: true,
      config: {
        services: {
          youtube: true,
          coub: true
        }
      }
    },
    quote: Quote,
    table: {
      class: Table,
      inlineToolbar: true,
      config: {
        rows: 2,
        cols: 3,
      },
    },
    code: CodeTool,
    textVariant: TextVariantTune
  },
  tunes: ['textVariant']
})


function changeFn(api, event) {
  console.log(api, event, 'event')
}

async function clickFn() {
  const data = await editor.value.getOutData()
  console.log(data, 'data')
}

function initializedFn(editor) {
  console.log(editor, 'editor')
}


</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;

  text-align: center;
}
.opt-area {
  margin-bottom: 30px;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
