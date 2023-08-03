<template>
    <table id="main_table" class="table table-striped table-bordered" cellspacing="0">
        <thead>
        <tr>
            <th>ID</th>
            <th>Ссылка</th>
            <th>Количество</th>
            <th>Статус</th>
        </tr>
        </thead>
        <tbody v-html="invoiceTable"></tbody>
    </table>

</template>

<script type="text/babel">

    import 'datatables.net';

    export default {
        props: ['invoiceTable'],
        data() {
            return {
                dtHandle: null
            }
        },
        watch: {},
        mounted() {
            let vm = this;
            console.info('mounted | DataTable | ', this.$el, ' |', $(this.$el).html());
            vm.dtHandle = $(this.$el).dataTable({
                "order": [[0, "desc"]],
                "language": {
                    "sProcessing":   "Подождите...",
                    "sLengthMenu":   "Показать _MENU_ записей",
                    "sZeroRecords":  "Записи отсутствуют.",
                    "sInfo":         "Записи с _START_ до _END_ из _TOTAL_ записей",
                    "sInfoEmpty":    "Записи с 0 до 0 из 0 записей",
                    "sInfoFiltered": "(отфильтровано из _MAX_ записей)",
                    "sInfoPostFix":  "",
                    "sSearch":       "Поиск:",
                    "sUrl":          "",
                    "oPaginate": {
                        "sFirst": "Первая",
                        "sPrevious": "Предыдущая",
                        "sNext": "Следующая",
                        "sLast": "Последняя"
                    },
                    "oAria": {
                        "sSortAscending":  ": активировать для сортировки столбца по возрастанию",
                        "sSortDescending": ": активировать для сортировки столбцов по убыванию"
                    }
                },
                searching: true,
                paging: true,
                info: false
            });
        }
    }
</script>