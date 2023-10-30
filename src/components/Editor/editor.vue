<template>
    <div :id="holder"></div>
</template>

<script setup>
import { ref, defineProps, toRefs, onMounted, defineEmits, defineExpose } from 'vue-demi'
import EditorJS from '@editorjs/editorjs';

const holderId = 'editorjs'
const props = defineProps({
    holder: {
      type: String,
      default: () => holderId
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

const { holder, config, data, initEditorMethod } = toRefs(props)
const editor = ref(null)

onMounted(() => {
    editor.value = new EditorJS({
        holder: holder.value || holderId,
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