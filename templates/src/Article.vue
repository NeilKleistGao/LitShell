<template>
    <div class="q-pa-md">
        <OpacityBlock>
            <template slot="content">
                <q-card class="bg-indigo-11">
                    <q-card-section>
                        <q-spinner-pie v-if="!done" color="amber-3" size="5em"></q-spinner-pie>
                        <div v-if="done" v-html="content"></div>
                    </q-card-section>
                </q-card>
            </template>
        </OpacityBlock>
    </div>
</template>

<script>
    import OpacityBlock from "./components/OpacityBlock";
    import axios from "axios";
    export default {
        name: "Article",
        components: {OpacityBlock},
        data() {
            return {
                content: "",
                done: false
            };
        },
        created() {
            let path = "/" + this.$route.params.name + "/" + this.$route.params.id + ".html";
            axios.get(path).then((response) => {
               this.content = response.data;
               this.done = true;
            });
        }
    }
</script>

<style scoped>

</style>