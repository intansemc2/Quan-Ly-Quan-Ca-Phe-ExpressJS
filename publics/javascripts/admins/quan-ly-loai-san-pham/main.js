
$(document).ready(function () {
    //Initialize Table
    tableQuanLyLoaiSanPham = $('#tableQuanLyLoaiSanPham').DataTable({
        columnDefs: [
            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idLoaiSanPham" data="${data}">${renderData}</span>`;
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
                    let renderData = loaisanphamsTypes[typeIndex] ? loaisanphamsTypes[typeIndex] : data;
                    return `<span class="loai" data="${data}">${renderData}</span>`;
                },
            },
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let loaisanpham = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaLoaiSanPham' idLoaiSanPham="${loaisanpham.idLoaiSanPham}">
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteLoaiSanPhamRowInTable($(this));">
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
//Get data of loaisanphamTypes
function getLoaiSanPhamTypes() {
    return new Promise(function (resolve, reject) {
        $.post('/api/tai-khoan/types', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Get loaisanphams
function getLoaiSanPhams() {
    return new Promise(function (resolve, reject) {
        $.get('/api/tai-khoan', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in loaisanphams
function refreshTableData() {
    tableQuanLyLoaiSanPham.clear();
    for (let loaisanpham of loaisanphams) {
        tableQuanLyLoaiSanPham.row.add([loaisanpham.idLoaiSanPham, loaisanpham.username, loaisanpham.password, loaisanpham.loai, loaisanpham]);
    }
    tableQuanLyLoaiSanPham.draw();
}

//Refresh all data in page
async function refreshPageData() {
    loaisanphamsTypes = await getLoaiSanPhamTypes();
    refreshDataInModelThemLoaiSanPham();
    refreshDataInModelSuaLoaiSanPham();

    loaisanphams = await getLoaiSanPhams();
    refreshTableData();
}    
