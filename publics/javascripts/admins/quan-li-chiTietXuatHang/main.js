
$(document).ready(function () {
    //Initialize Table
    tableQuanLychiTietXuatHang = $('#tableQuanLychiTietXuatHang').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="maXuatHang" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="maSanPham" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="soLuong" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="donGia" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let chiTietXuatHang = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuachiTietXuatHang' 
maXuatHang="${chiTietXuatHang.maXuatHang}" maSanPham="${chiTietXuatHang.maSanPham}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deletechiTietXuatHangRowInTable($(this));">
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
        swal({ text: 'Làm mới thành công ', icon: 'success', timer: 1000});
    });

    //Events

    //Initialize final
    refreshPageData();
});

//Functions
//Get chiTietXuatHangs
function getchiTietXuatHangs() {
    return new Promise(function (resolve, reject) {
        $.get('/api/chiTietXuatHang', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in chiTietXuatHangs
function refreshTableData() {
    tableQuanLychiTietXuatHang.clear();
    for (let chiTietXuatHang of chiTietXuatHangs) {
        tableQuanLychiTietXuatHang.row.add([
            chiTietXuatHang.maXuatHang, chiTietXuatHang.maSanPham, chiTietXuatHang.soLuong, chiTietXuatHang.donGia, chiTietXuatHang
        ]);
    }
    tableQuanLychiTietXuatHang.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemchiTietXuatHang();
    refreshDataInModelSuachiTietXuatHang();

    chiTietXuatHangs = await getchiTietXuatHangs();
    refreshTableData();
}    
