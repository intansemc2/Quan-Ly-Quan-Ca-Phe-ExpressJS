
$(document).ready(function () {
    //Initialize Table
    tableQuanLyKhachHang = $('#tableQuanLyKhachHang').DataTable({
        columnDefs: [
            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idKhachHang" data="${data}">${renderData}</span>`;
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
                    let renderData = khachhangsTypes[typeIndex] ? khachhangsTypes[typeIndex] : data;
                    return `<span class="loai" data="${data}">${renderData}</span>`;
                },
            },
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let khachhang = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaKhachHang' idKhachHang="${khachhang.idKhachHang}">
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteKhachHangRowInTable($(this));">
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
//Get data of khachhangTypes
function getKhachHangTypes() {
    return new Promise(function (resolve, reject) {
        $.post('/api/tai-khoan/types', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Get khachhangs
function getKhachHangs() {
    return new Promise(function (resolve, reject) {
        $.get('/api/tai-khoan', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in khachhangs
function refreshTableData() {
    tableQuanLyKhachHang.clear();
    for (let khachhang of khachhangs) {
        tableQuanLyKhachHang.row.add([khachhang.idKhachHang, khachhang.username, khachhang.password, khachhang.loai, khachhang]);
    }
    tableQuanLyKhachHang.draw();
}

//Refresh all data in page
async function refreshPageData() {
    khachhangsTypes = await getKhachHangTypes();
    refreshDataInModelThemKhachHang();
    refreshDataInModelSuaKhachHang();

    khachhangs = await getKhachHangs();
    refreshTableData();
}    
