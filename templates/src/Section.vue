<template>
    <div class="q-pa-md">
        <OpacityBlock style="width: 60%; margin-left: 20%; margin-right: auto">
            <template slot="content">
                <q-parallax>
                    <template v-slot:media>
                        <img :src="'/' + name + '/' + detail['cover']">
                    </template>

                    <template v-slot:content="scope">
                        <div class="absolute column items-center content" :style="{
                            opacity: 0.45 + (1 - scope.percentScrolled) * 0.55,
                            top: (scope.percentScrolled * 60) + '%',
                            left: 0,
                            right: 0}">

                            <p class="text-h6">{{name}}</p>
                            <p>{{detail["full-intro"]}}</p>
                            <q-chip v-for="tag in detail['tags']" :key="tag" color="orange-12" icon="bookmark">
                                {{tag}}
                            </q-chip>

                        </div>
                    </template>
                </q-parallax>
            </template>
        </OpacityBlock>

        <br/>

        <OpacityBlock style="width: 60%; margin-left: 20%; margin-right: auto">
            <template slot="content">
                <q-card class="content">
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
                    </q-card-section>

                    <q-card-actions align="right">
                        <q-pagination color="light-blue-2" v-model="current_page" :max="page_number" :direction-links="true">
                        </q-pagination>
                    </q-card-actions>

                </q-card>
            </template>
        </OpacityBlock>
    </div>
</template>

<script>
    import OpacityBlock from "./components/OpacityBlock";
    export default {
        name: "Section",
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
    .content {
        background: rgba(0, 0, 0, 0.75);
    }
</style>