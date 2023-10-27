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
    initialized: {
      type: Function,
      default: () => ({})
    }
})

const emit = defineEmits(['change', 'ready'])

const { config, data, initialized } = toRefs(props)
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
        initialized.value(editor.value)
    })
    .catch((reason) => {
        console.log(`Editor.js initialization failed because of ${reason}`)
    });
})

function getOutData() {
    if (!editor.value) return null

    return editor.value.save()
}

defineExpose({
    getOutData
})

</script>

<style lang="css" scoped>

</style>