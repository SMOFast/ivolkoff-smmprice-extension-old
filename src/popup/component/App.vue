<template>
    <div v-if="aut == 'AUTH_LOAD'">
        <div class="text-center"><svg width='120px' height='120px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(0 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(30 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.08333333333333333s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(60 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.16666666666666666s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(90 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.25s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(120 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.3333333333333333s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(150 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.4166666666666667s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(180 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(210 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5833333333333334s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(240 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.6666666666666666s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(270 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.75s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(300 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.8333333333333334s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(330 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.9166666666666666s' repeatCount='indefinite'/></rect></svg></div>
    </div>
    <div v-else-if="aut == 'AUTH_SUCCESS'">
        <DataTable :invoiceTable="invoiceTable"></DataTable>
        <div class="text-center sublink">
            <a href="https://smmprice.ru/?do=main" class="btn-success btn-sm" target="_blank">Личный кабинет</a>
            <a href="https://smmprice.ru/?do=billing" class="btn-success btn-sm" target="_blank">Баланс</a>
            <a href="https://smmprice.ru/?do=faq" class="btn-success btn-sm" target="_blank">FAQ</a>
            <a href="https://smmprice.ru/?do=ticket" class="btn-success btn-sm" target="_blank">Служба поддержка</a>
        </div>
    </div>
    <div v-else-if="aut == 'AUTH_FAIL'">
        <div class="text-center" style="padding-top: 49px;">
            <div class="col-xs-6 col-xs-offset-3">
                <a class="btn-success signin-button" v-bind:href="BASE_DOMAIN" target="_blank">Авторизоваться</a>
            </div>
        </div>
    </div>
    <div v-else>
        Не понятно
    </div>
</template>

<script type="text/babel">
    import 'bootstrap';
    import './../../asset/css/my.css';
    import './../../asset/css/style.css';

    import DataTable from './DataTable.vue'

    import {BASE_DOMAIN, AUTH_LOAD, AUTH_SUCCESS, AUTH_FAIL} from './../constant.js';

    console.info('BASE_DOMAIN = ', BASE_DOMAIN);

    export default {
        data() {
            setTimeout(() => {
                this.checkAuth();
            }, 1000);
            return {
                BASE_DOMAIN: BASE_DOMAIN,
                aut: AUTH_LOAD,
                invoiceTable: '',
                dtHandle: null
            };
        },
        methods: {
            checkAuth: function () {
                $.ajax({
                    url: BASE_DOMAIN + '?do=main',
                    dataType: 'html',
                    type: 'get'
                }).done((data) => {
                    //console.info('checkAuth.done | data = ', data);
                    var s = data.indexOf('ajax.php?do=signin');
                    console.info('checkAuth.done | s = ', s);
                    if (s == -1) {
                        this.aut = AUTH_SUCCESS;
                        this.drawOrder(data);
                    } else {
                        this.aut = AUTH_FAIL;
                    }
                }).fail((jqXHR, textStatus, errorThrown) => {
                    console.info('checkAuth.fail | jqXHR = ', jqXHR);
                    console.info('checkAuth.fail | textStatus = ', textStatus);
                    this.aut = AUTH_FAIL;
                });
            },
            drawOrder: function (data) {
                data = $(data);

                var invoiceTable = this.invoiceTableReDraw(data.find("#main_table tbody")).html();
                console.info('drawOrder | invoiceTable = ', invoiceTable);
                this.invoiceTable = invoiceTable;
                console.info('drawOrder | this.invoiceTable = ', invoiceTable);
            },
            invoiceTableReDraw: function (invoiceTable) {
                invoiceTable.find('tr').each(function () {
                    $(this).find('td:nth-child(2)').remove();
                    $(this).find('td:nth-child(4)').remove();
                });
                invoiceTable.find('a').each(function () {
                    var t = $(this).text();
                    $(this).replaceWith(t);
                });
                invoiceTable.find('[onclick]').attr('onclick', '');
                invoiceTable.find('[title]').attr('title', '');

                console.info('invoiceTable = ', invoiceTable);
                return invoiceTable;
            }
        },
        components: {
            DataTable
        },
    }
</script>