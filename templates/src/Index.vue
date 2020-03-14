<template>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-8">
                <OpacityBlock>
                    <template slot="content">
                        <q-card flat bordered class="bg-indigo-3">
                            <q-card-section horizontal>
                                <h5 style="margin-left: 1rem; margin-right: 1rem">关于本站</h5>
                                <p>{{intro}}</p>
                            </q-card-section>
                        </q-card>
                    </template>
                </OpacityBlock>

                <br/>
                <OpacityBlock>
                    <template slot="content">
                        <q-card flat bordered class="bg-indigo-3">
                            <q-card-section>
                                <h5>最近发布</h5>
                                <q-list bordered separator>
                                    <q-item v-for="item in recent_list" :key="item['title']" clickable v-ripple :to="'/articles/' + item['name'] + '/' + item['id']">
                                        <q-item-section class="text-white">{{item["title"]}}</q-item-section>
                                    </q-item>
                                </q-list>
                            </q-card-section>
                        </q-card>
                    </template>
                </OpacityBlock>
            </div>

            <div class="col-1"></div>

            <div class="col-3">
                <OpacityBlock>
                    <template slot="content">
                        <q-card flat bordered class="bg-indigo-3">
                            <q-card-section>
                                <h5>友情链接</h5>
                                <q-list bordered separator>
                                    <q-item v-for="item in friends_list" :key="item['name']" clickable v-ripple :to="item['link']">
                                        <q-item-section class="text-white">{{item["name"]}}</q-item-section>
                                    </q-item>
                                </q-list>
                            </q-card-section>
                        </q-card>
                    </template>
                </OpacityBlock>
            </div>
        </div>
    </div>
</template>

<script>
    import OpacityBlock from "./components/OpacityBlock";

    export default {
        name: "Index",
        components: {OpacityBlock},
        data() {
            let config_data = require("./assets/config.json");
            let recent = require("./assets/recent.json");
            return {
                intro: config_data["intro"],
                recent_list: recent["articles"],
                friends_list: config_data["friends"]
            };
        }
    }
</script>

<style scoped>

</style>