$(document).ready(function(){
    //Variables
    let taikhoansTypes = [];

    //Initialize Table
    $("#tableQuanLyTaiKhoan").DataTable({
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="id_tai_khoan" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 1,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="username" data="${data}">${renderData}</span>`;
                }
            }, {
                "targets": 2,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="password" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 3,
                "render": function (data, type, row, meta) {
                    let typeIndex = data;
                    let renderData = (taikhoansTypes[typeIndex]) ? taikhoansTypes[typeIndex] : data;
                    return `<span class="type" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 4,
                "render": function (data, type, row, meta) {
                    let taikhoan = data;
                    let renderData = `
<button type="button" class="btn btn-outline-info rounded-0 m-1 opacity-50 custom-toggle-button"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-dark rounded-0 m-1"><i class="fas fa-trash"></i></button>`;
                    return `${renderData}`;
                }
            }
        ]
    });

    //Initialize Button Events

    //Events
});