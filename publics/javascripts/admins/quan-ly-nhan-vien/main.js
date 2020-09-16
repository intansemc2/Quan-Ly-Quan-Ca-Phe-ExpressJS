
$(document).ready(function () {
    //Initialize Table
    tableQuanLyNhanVien = $('#tableQuanLyNhanVien').DataTable({
        columnDefs: [
            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idNhanVien" data="${data}">${renderData}</span>`;
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
                    let renderData = nhanviensTypes[typeIndex] ? nhanviensTypes[typeIndex] : data;
                    return `<span class="loai" data="${data}">${renderData}</span>`;
                },
            },
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let nhanvien = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaNhanVien' idNhanVien="${nhanvien.idNhanVien}">
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteNhanVienRowInTable($(this));">
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
//Get data of nhanvienTypes
function getNhanVienTypes() {
    return new Promise(function (resolve, reject) {
        $.post('/api/tai-khoan/types', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Get nhanviens
function getNhanViens() {
    return new Promise(function (resolve, reject) {
        $.get('/api/tai-khoan', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in nhanviens
function refreshTableData() {
    tableQuanLyNhanVien.clear();
    for (let nhanvien of nhanviens) {
        tableQuanLyNhanVien.row.add([nhanvien.idNhanVien, nhanvien.username, nhanvien.password, nhanvien.loai, nhanvien]);
    }
    tableQuanLyNhanVien.draw();
}

//Refresh all data in page
async function refreshPageData() {
    nhanviensTypes = await getNhanVienTypes();
    refreshDataInModelThemNhanVien();
    refreshDataInModelSuaNhanVien();

    nhanviens = await getNhanViens();
    refreshTableData();
}    
