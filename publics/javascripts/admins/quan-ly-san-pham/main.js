
$(document).ready(function () {
    //Initialize Table
    tableQuanLySanPham = $('#tableQuanLySanPham').DataTable({
        columnDefs: [
            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idSanPham" data="${data}">${renderData}</span>`;
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
                    let renderData = sanphamsTypes[typeIndex] ? sanphamsTypes[typeIndex] : data;
                    return `<span class="loai" data="${data}">${renderData}</span>`;
                },
            },
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let sanpham = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaSanPham' idSanPham="${sanpham.idSanPham}">
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteSanPhamRowInTable($(this));">
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
//Get data of sanphamTypes
function getSanPhamTypes() {
    return new Promise(function (resolve, reject) {
        $.post('/api/tai-khoan/types', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Get sanphams
function getSanPhams() {
    return new Promise(function (resolve, reject) {
        $.get('/api/tai-khoan', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in sanphams
function refreshTableData() {
    tableQuanLySanPham.clear();
    for (let sanpham of sanphams) {
        tableQuanLySanPham.row.add([sanpham.idSanPham, sanpham.username, sanpham.password, sanpham.loai, sanpham]);
    }
    tableQuanLySanPham.draw();
}

//Refresh all data in page
async function refreshPageData() {
    sanphamsTypes = await getSanPhamTypes();
    refreshDataInModelThemSanPham();
    refreshDataInModelSuaSanPham();

    sanphams = await getSanPhams();
    refreshTableData();
}    
