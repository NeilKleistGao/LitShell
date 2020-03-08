<template>
    <div class="block">
        <slot name="content"></slot>
    </div>
</template>

<script>
    export default {
        name: "OpacityBlock"
    }
</script>

<style scoped>
    .block {
        opacity: 0.75;

    }
    .block:hover {
        opacity: 1;
    }
</style>