$(document).ready(function () {
    //Initialize Table
    tableQuanLyTaiKhoan = $('#tableQuanLyTaiKhoan').DataTable({
        columnDefs: [
            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idTaiKhoan" data="${data}">${renderData}</span>`;
                },
            },
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="username" data="${data}">${renderData}</span>`;
                },
            },
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="password" data="${data}">${renderData}</span>`;
                },
            },
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let typeIndex = data;
                    let renderData = taikhoansTypes[typeIndex] ? taikhoansTypes[typeIndex] : data;
                    return `<span class="loai" data="${data}">${renderData}</span>`;
                },
            },
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let taikhoan = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaTaiKhoan' idTaiKhoan="${taikhoan.idTaiKhoan}">
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteTaikhoanRowInTable($(this));">
    <i class="fas fa-trash"></i>
</button>
`;
                    return `${renderData}`;
                },
            },
        ],
    });

    //Initialize Button Events
    $('#refreshAll').click(function () {
        refreshPageData();
        swal({ text: 'Làm mới thành công ', icon: 'success'});
    });

    //Events

    //Initialize final
    refreshPageData();
});

//Functions
//Get data of taikhoanTypes
function getTaikhoanTypes() {
    return new Promise(function (resolve, reject) {
        $.post('/api/tai-khoan/types', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Get taikhoans
function getTaikhoans() {
    return new Promise(function (resolve, reject) {
        $.get('/api/tai-khoan', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in taikhoans
function refreshTableData() {
    tableQuanLyTaiKhoan.clear();
    for (let taikhoan of taikhoans) {
        tableQuanLyTaiKhoan.row.add([taikhoan.idTaiKhoan, taikhoan.username, taikhoan.password, taikhoan.loai, taikhoan]);
    }
    tableQuanLyTaiKhoan.draw();
}

//Refresh all data in page
async function refreshPageData() {
    taikhoansTypes = await getTaikhoanTypes();
    refreshDataInModelThemTaiKhoan();
    refreshDataInModelSuaTaiKhoan();

    taikhoans = await getTaikhoans();
    refreshTableData();
}
