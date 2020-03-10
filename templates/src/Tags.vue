<template>
    <div class="q-pa-md">
        <OpacityBlock>
            <template slot="content">
                <q-bar dark class="bg-deep-purple-3 text-white">
                    <div class="col text-center text-weight-bold">专栏列表</div>
                </q-bar>
            </template>
        </OpacityBlock>

        <div class="row q-gutter-md q-pa-md">
            <OpacityBlock v-for="column in columns" :key="column['name']">
                <template slot="content">
                    <q-card>
                        <q-img style="width: 300px; height: 200px" basic :src="'/' + column['name'] + '/' + column['cover']">
                            <div class="absolute-bottom">
                                <div class="text-h6">{{column["title"]}}</div>
                                <div class="text-subtitle2">最后更新于：{{column["time"]}}</div>
                            </div>
                        </q-img>
                        <q-card-section>{{column["intro"]}}</q-card-section>
                        <q-card-actions align="right">
                            <q-btn :to="'/articles/' + column['name']" flat>前往专栏</q-btn>
                        </q-card-actions>
                    </q-card>
                </template>
            </OpacityBlock>
        </div>
    </div>
</template>

<script>
    import OpacityBlock from "./components/OpacityBlock";
    export default {
        name: "Tags",
        components: {OpacityBlock},
        data() {
            let catalog = require("./assets/catalog.json");
            return {
                columns: catalog["columns"]
            };
        }
    }
</script>

<style scoped>

</style>