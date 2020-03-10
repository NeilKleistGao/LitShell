<template>
    <div class="q-pa-md">
        <OpacityBlock>
            <template slot="content">
                <q-card class="bg-indigo-4" align="center">
                    <q-card-section class="">
                        <q-img style="width: 600px; height: 450px; margin-top: 0.5rem; margin-bottom: 0.5rem" basic :src="'/' + name + '/' + detail['cover']">
                            <div class="absolute-bottom">
                                <p class="text-h6">{{name}}</p>
                            </div>
                        </q-img>
                    </q-card-section>

                    <q-card-section style="margin-top: 0.5rem; margin-bottom: 0.5rem">
                        <p>{{detail["full-intro"]}}</p>
                        <q-chip v-for="tag in detail['tags']" :key="tag" color="orange-12" icon="bookmark">
                            {{tag}}
                        </q-chip>
                    </q-card-section>

                    <q-separator></q-separator>

                    <q-card-section>
                        <q-list>
                            <q-item v-for="index in 10" :key="index" clickable v-ripple :to="link_list[index - 1]">
                                <div v-if="(current_page - 1) * 10 + index <= page_number">
                                    <q-item-section avatar>
                                        <q-icon name="send"></q-icon>
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>{{detail.list[(current_page - 1) * 10 + index - 1].title}}</q-item-label>
                                        <q-item-label caption lines="1">作者：{{detail.list[(current_page - 1) * 10 + index - 1].author}}</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-item-label caption>发布日期：{{detail.list[(current_page - 1) * 10 + index - 1].time}}</q-item-label>
                                    </q-item-section>
                                </div>
                            </q-item>
                        </q-list>

                        <br/>
                        <q-pagination color="orange-12" v-model="current_page" :max="page_number" :direction-links="true">
                        </q-pagination>
                    </q-card-section>

                </q-card>
            </template>
        </OpacityBlock>
    </div>
</template>

<script>
    import OpacityBlock from "./components/OpacityBlock";
    export default {
        name: "Column",
        components: {OpacityBlock},
        data() {
            let temp = require("./assets/" + this.$route.params.name + ".json");
            return {
                name: this.$route.params.name,
                detail: temp,
                page_number: Math.ceil(temp["list"].length / 10),
                current_page: 1,
                link_list: ["", "", "", "", "", "", "", "", "", ""]
            };
        },
        watch: {
            current_page(next) {
                this.resetLink(next);
            }
        },
        methods: {
            resetLink(next) {
                for (let i = 0; i < 10; i++) {
                    let real = (next - 1) * 10 + i;
                    if (real < this.page_number) {
                        this.link_list[i] = "/articles/" + this.name + "/" + this.detail.list[i].name;
                    }
                    else {
                        this.link_list[i] = "";
                    }
                }

                this.$forceUpdate();
            }
        },
        created() {
            this.resetLink(this.current_page);
        }
    }
</script>

<style scoped>

</style>