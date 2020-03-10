import Vue from "vue";
import VueRouter from "vue-router";

import Index from "./Index";
import Tags from "./Tags";
import Column from "./Column";
import Article from "./Article";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "index",
        component: Index
    },
    {
        path: "/tags",
        name: "tags",
        component: Tags
    },
    {
        path: "/articles/:name",
        name: "column",
        component: Column
    },
    {
        path: "/articles/:name/:id",
        name: "article",
        component: Article
    }
];

let router = new VueRouter({routes});

export default router;