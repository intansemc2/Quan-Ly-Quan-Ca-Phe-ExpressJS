
$(document).ready(function () {
    //Initialize Table
    tableQuanLyHoaDon = $('#tableQuanLyHoaDon').DataTable({
        columnDefs: [
            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idHoaDon" data="${data}">${renderData}</span>`;
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
                    let renderData = hoadonsTypes[typeIndex] ? hoadonsTypes[typeIndex] : data;
                    return `<span class="loai" data="${data}">${renderData}</span>`;
                },
            },
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let hoadon = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaHoaDon' idHoaDon="${hoadon.idHoaDon}">
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteHoaDonRowInTable($(this));">
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
//Get data of hoadonTypes
function getHoaDonTypes() {
    return new Promise(function (resolve, reject) {
        $.post('/api/tai-khoan/types', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Get hoadons
function getHoaDons() {
    return new Promise(function (resolve, reject) {
        $.get('/api/tai-khoan', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in hoadons
function refreshTableData() {
    tableQuanLyHoaDon.clear();
    for (let hoadon of hoadons) {
        tableQuanLyHoaDon.row.add([hoadon.idHoaDon, hoadon.username, hoadon.password, hoadon.loai, hoadon]);
    }
    tableQuanLyHoaDon.draw();
}

//Refresh all data in page
async function refreshPageData() {
    hoadonsTypes = await getHoaDonTypes();
    refreshDataInModelThemHoaDon();
    refreshDataInModelSuaHoaDon();

    hoadons = await getHoaDons();
    refreshTableData();
}    
