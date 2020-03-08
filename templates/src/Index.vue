<template>
    <div class="q-pa-md">
        <OpacityBlock style="width: 65%">
            <template slot="content">
                <q-card flat bordered class="bg-indigo-3">
                    <q-card-section horizontal>
                        <h5 style="padding-right: 1.5rem">关于本站</h5>
                        <p>{{intro}}</p>
                    </q-card-section>
                </q-card>
            </template>
        </OpacityBlock>

        <br/>
        <OpacityBlock style="width: 65%">
            <template slot="content">
                <q-card flat bordered class="bg-indigo-3">
                    <q-card-section>
                        <h5>最近发布</h5>
                        <q-list bordered separator>
                            <q-item v-for="item in recent_list" :key="item['title']" clickable v-ripple :to="'/article/' + item['name'] + '/' + item['id']">
                                <q-item-section class="text-white">{{item["title"]}}</q-item-section>
                            </q-item>
                        </q-list>
                    </q-card-section>
                </q-card>
            </template>
        </OpacityBlock>
    </div>
</template>

<script>
    import OpacityBlock from "./components/OpacityBlock";

    export default {
        name: "Index",
        components: {OpacityBlock},
        data() {
            let config_data = require("./assets/config.json");
            let recent = require("./assets/recent");
            return {
                intro: config_data["intro"],
                recent_list: recent["articles"]
            };
        }
    }
</script>

<style scoped>

</style>