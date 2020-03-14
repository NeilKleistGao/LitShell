<template>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-9">
                <OpacityBlock>
                    <template slot="content">
                        <q-card class="bg-indigo-11">
                            <q-card-section>
                                <q-spinner-pie v-if="!article_done" color="amber-3" size="5em"></q-spinner-pie>
                                <div id="content" v-if="article_done" v-html="content"></div>
                            </q-card-section>

                            <q-card-actions align="right">
                                <q-btn push color="teal-1" text-color="teal" icon="img:/wechat.png" label="share!">
                                    <q-popup-proxy @show="generate()" :offset="[10, 10]">
                                        <q-banner class="bg-purple-3 text-white">
                                            <div id="qrcode" style="margin-bottom: 0.5rem"></div>
                                            <span>扫描二维码并进行分享</span>
                                        </q-banner>
                                    </q-popup-proxy>
                                </q-btn>
                            </q-card-actions>
                        </q-card>
                    </template>
                </OpacityBlock>
            </div>

            <div class="col-1"></div>

            <div class="col-2">
                <OpacityBlock>
                    <template slot="content">
                        <q-card class="bg-indigo-11">
                            <q-card-section>
                                <q-breadcrumbs class="text-amber text-weight-bold">
                                    <q-breadcrumbs-el :label="name" :to="'/articles/' + name" icon="widgets" />
                                    <q-breadcrumbs-el :label="id" icon="navigation" />
                                </q-breadcrumbs>
                            </q-card-section>

                            <q-card-section>
                                <q-spinner-pie v-if="!catalog_done" color="amber-3" size="3em"></q-spinner-pie>
                                <q-tree v-if="catalog_done" :nodes="catalog" node-key="label" default-expand-all>
                                    <template v-slot:default-header="prop">
                                        <span class="text-white">
                                            {{prop.node.label}}
                                        </span>
                                    </template>
                                </q-tree>
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
    import axios from "axios";
    import marked from 'marked';
    import hljs from "highlight.js";
    import 'highlight.js/styles/night-owl.css';


    export default {
        name: "Article",
        components: {OpacityBlock},
        data() {
            return {
                name: this.$route.params.name,
                id: this.$route.params.id,
                content: "",
                article_done: false,
                catalog_done: false,
                catalog: {}
            };
        },
        created() {
            axios.get("/" + this.name + "/" + this.id + ".md").then((response) => {
                marked.setOptions({
                        renderer: new marked.Renderer(),
                        tables: true,
                        highlight: function(code) {
                            return hljs.highlightAuto(code).value;
                        }
                    }
                );
                this.content = marked(response.data).replace("<pre>", "<pre class=\"hljs\">");
                window.console.log(this.content);
                this.article_done = true;

                this.$nextTick(function () {
                    if(this.$mathjax.isMathjaxConfig){
                        this.$mathjax.initMathjaxConfig();
                    }
                    this.$mathjax.MathQueue("content");
                })
            });

            axios.get("/" + this.name + "/" + this.id + ".json").then((response) => {
                this.catalog = response.data["catalog"];
                this.catalog_done = true;
            });
        },
        methods: {
            generate() {
                this.$QRCodeShow(window.location.href);
            }
        }
    }
</script>

<style scoped>

</style>