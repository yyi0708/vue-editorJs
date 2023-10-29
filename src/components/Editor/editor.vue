<template>
    <div ref="vueEditor"></div>
</template>

<script setup>
import { ref, defineProps, toRefs, onMounted, defineEmits, defineExpose } from 'vue-demi'
import EditorJS from '@editorjs/editorjs';

const props = defineProps({
    placeholder: {
        type: String,
        default: 'Start your creative journey！'
    },
    config: {
      type: Object,
      require: true,
      default: () => ({})
    },
    data: {
      type: Object,
      default: () => ({})
    },
    initEditorMethod: {
      type: Function,
      default: () => ({})
    }
})

const emit = defineEmits(['change', 'ready'])

const { config, data, initEditorMethod } = toRefs(props)
const vueEditor = ref(null)
const editor = ref(null)

onMounted(() => {
    editor.value = new EditorJS({
        holder: vueEditor.value,
        ...config.value,
        data: data.value,
        onChange: (api, event) => {
            emit('change', api, event)
        }
    })

    editor.value.isReady
    .then(() => {
        /** Do anything you need after editor initialization */
        emit('ready')
        initEditorMethod.value(editor.value)
    })
    .catch((reason) => {
        console.log(`Editor.js initialization failed because of ${reason}`)
    });
})

// save opt to get data.
function getOutData() {
    if (!editor.value) return null

    return editor.value.save()
}

// expose save data of method
defineExpose({
    getOutData
})

</script>

<style lang="css" scoped>

</style>