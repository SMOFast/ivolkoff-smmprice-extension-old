import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import 'jquery';
import 'bootstrap';
import Vue from 'vue';

import App from './component/App.vue';

Vue.config.devtools = true;

new Vue({
    el: '#app',
    render: (h) => h(App)
});

/**
 * Полезные ссылки
 *
 * https://lodash.com/
 * https://ru.vuejs.org/v2/guide/components.html#Использование-v-on-с-пользовательскими-событиями
 * https://habrahabr.ru/post/217515/
 * https://regex101.com/
 */