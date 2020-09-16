
$(document).ready(function () {
    //Initialize Table
    tableQuanLyThanhToanHoaDon = $('#tableQuanLyThanhToanHoaDon').DataTable({
        columnDefs: [
            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idThanhToanHoaDon" data="${data}">${renderData}</span>`;
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
                    let renderData = thanhtoanhoadonsTypes[typeIndex] ? thanhtoanhoadonsTypes[typeIndex] : data;
                    return `<span class="loai" data="${data}">${renderData}</span>`;
                },
            },
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let thanhtoanhoadon = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaThanhToanHoaDon' idThanhToanHoaDon="${thanhtoanhoadon.idThanhToanHoaDon}">
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteThanhToanHoaDonRowInTable($(this));">
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
//Get data of thanhtoanhoadonTypes
function getThanhToanHoaDonTypes() {
    return new Promise(function (resolve, reject) {
        $.post('/api/tai-khoan/types', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Get thanhtoanhoadons
function getThanhToanHoaDons() {
    return new Promise(function (resolve, reject) {
        $.get('/api/tai-khoan', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in thanhtoanhoadons
function refreshTableData() {
    tableQuanLyThanhToanHoaDon.clear();
    for (let thanhtoanhoadon of thanhtoanhoadons) {
        tableQuanLyThanhToanHoaDon.row.add([thanhtoanhoadon.idThanhToanHoaDon, thanhtoanhoadon.username, thanhtoanhoadon.password, thanhtoanhoadon.loai, thanhtoanhoadon]);
    }
    tableQuanLyThanhToanHoaDon.draw();
}

//Refresh all data in page
async function refreshPageData() {
    thanhtoanhoadonsTypes = await getThanhToanHoaDonTypes();
    refreshDataInModelThemThanhToanHoaDon();
    refreshDataInModelSuaThanhToanHoaDon();

    thanhtoanhoadons = await getThanhToanHoaDons();
    refreshTableData();
}    
