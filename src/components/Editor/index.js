import { defineComponent, onBeforeUnmount, onMounted, ref, toRefs, h } from 'vue-demi'
import EditorJS from '@editorjs/editorjs';

const defaultHolderId = 'editorjs'

const Editor = defineComponent({
    name: 'vue-editor',
    props: {
        holder: {
            type: String,
            default: () => defaultHolderId
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
    },
    setup(props, { emit, expose }) {
        const { holder, config, data, initEditorMethod } = toRefs(props)
        const editor = ref(null)

        onMounted(() => {
            initEditorJs()
        })

        onBeforeUnmount(() => {
            editor.value = null
        })

        function initEditorJs () {
            editor.value = new EditorJS({
                holder: holder.value || defaultHolderId,
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
        }

        // save opt to get data.
        function getOutData() {
            if (!editor.value) return null

            return editor.value.save()
        }

        expose({
            getOutData
        })

        return () => h('div', { id: holder.value })
    }
})

const install = (app, options) => {
    app.component(Editor.name || 'vue-editor', Editor)
}


export default Editor

export const VueEditor = {
    install
}