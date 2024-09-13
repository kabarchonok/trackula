<script setup>
    import { onMounted, ref } from 'vue';

    import Assistant from './.vitepress/theme/components/Assistant.vue';
    import ExampleForm from './.vitepress/theme/components/ExampleForm.vue';

    import _trackula from 'trackula';
    let trackula;
    const trackulaInput = ref('initial');

    onMounted(() => {
        trackula = _trackula({ root: document.getElementById('example-form'), subscribe: onChange });

        trackula.init()
    });

    function onChange(inputType) {
        trackulaInput.value = inputType
    }
</script>

<Assistant :inputType="trackulaInput" />

<PreviewBlock>
    <ExampleForm id="example-form" />
</PreviewBlock>
