
$(document).ready(function () {
    //Initialize Table
    tableQuanLyKhuyenMai = $('#tableQuanLyKhuyenMai').DataTable({
        columnDefs: [
            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idKhuyenMai" data="${data}">${renderData}</span>`;
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
                    let renderData = khuyenmaisTypes[typeIndex] ? khuyenmaisTypes[typeIndex] : data;
                    return `<span class="loai" data="${data}">${renderData}</span>`;
                },
            },
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let khuyenmai = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaKhuyenMai' idKhuyenMai="${khuyenmai.idKhuyenMai}">
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteKhuyenMaiRowInTable($(this));">
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
//Get data of khuyenmaiTypes
function getKhuyenMaiTypes() {
    return new Promise(function (resolve, reject) {
        $.post('/api/tai-khoan/types', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Get khuyenmais
function getKhuyenMais() {
    return new Promise(function (resolve, reject) {
        $.get('/api/tai-khoan', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in khuyenmais
function refreshTableData() {
    tableQuanLyKhuyenMai.clear();
    for (let khuyenmai of khuyenmais) {
        tableQuanLyKhuyenMai.row.add([khuyenmai.idKhuyenMai, khuyenmai.username, khuyenmai.password, khuyenmai.loai, khuyenmai]);
    }
    tableQuanLyKhuyenMai.draw();
}

//Refresh all data in page
async function refreshPageData() {
    khuyenmaisTypes = await getKhuyenMaiTypes();
    refreshDataInModelThemKhuyenMai();
    refreshDataInModelSuaKhuyenMai();

    khuyenmais = await getKhuyenMais();
    refreshTableData();
}    
