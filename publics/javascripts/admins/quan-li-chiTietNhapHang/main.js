
$(document).ready(function () {
    //Initialize Table
    tableQuanLychiTietNhapHang = $('#tableQuanLychiTietNhapHang').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="maNhapHang" data="${data}">${renderData}</span>`;
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
                    let chiTietNhapHang = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuachiTietNhapHang' 
maNhapHang="${chiTietNhapHang.maNhapHang}" maSanPham="${chiTietNhapHang.maSanPham}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deletechiTietNhapHangRowInTable($(this));">
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
//Get chiTietNhapHangs
function getchiTietNhapHangs() {
    return new Promise(function (resolve, reject) {
        $.get('/api/chiTietNhapHang', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in chiTietNhapHangs
function refreshTableData() {
    tableQuanLychiTietNhapHang.clear();
    for (let chiTietNhapHang of chiTietNhapHangs) {
        tableQuanLychiTietNhapHang.row.add([
            chiTietNhapHang.maNhapHang, chiTietNhapHang.maSanPham, chiTietNhapHang.soLuong, chiTietNhapHang.donGia, chiTietNhapHang
        ]);
    }
    tableQuanLychiTietNhapHang.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemchiTietNhapHang();
    refreshDataInModelSuachiTietNhapHang();

    chiTietNhapHangs = await getchiTietNhapHangs();
    refreshTableData();
}    
