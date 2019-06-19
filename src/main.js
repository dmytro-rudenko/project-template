import 'normalize.css';
import './scss/main.scss';

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import App from './App.vue';

new Vue({
    mounted() {

    },
    render: h => h(App)
}).$mount('#layout');