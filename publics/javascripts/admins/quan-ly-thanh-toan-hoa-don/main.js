
$(document).ready(function () {
    //Initialize Table
    tableQuanLyThanhToanHoaDon = $('#tableQuanLyThanhToanHoaDon').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idHoaDon" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idTaiKhoanThanhToan" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="thoiGianThanhToan" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="phanTramTichLuy" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="soLuongDiemDoi" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 5,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="tyGiaDiemDoi" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 6,
                render: function (data, type, row, meta) {
                    let thanhToanHoaDon = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaThanhToanHoaDon' 
idHoaDon="${thanhToanHoaDon.idHoaDon}" idTaiKhoanThanhToan="${thanhToanHoaDon.idTaiKhoanThanhToan}" thoiGianThanhToan="${thanhToanHoaDon.thoiGianThanhToan}"
>
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
        swal({ text: 'Làm mới thành công ', icon: 'success', timer: 1000});
    });

    //Events

    //Initialize final
    refreshPageData();
});

//Functions
//Get thanhToanHoaDons
function getThanhToanHoaDons() {
    return new Promise(function (resolve, reject) {
        $.get('/api/thanh-toan-hoa-don', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in thanhToanHoaDons
function refreshTableData() {
    tableQuanLyThanhToanHoaDon.clear();
    for (let thanhToanHoaDon of thanhToanHoaDons) {
        tableQuanLyThanhToanHoaDon.row.add([
            thanhToanHoaDon.idHoaDon, thanhToanHoaDon.idTaiKhoanThanhToan, thanhToanHoaDon.thoiGianThanhToan, thanhToanHoaDon.phanTramTichLuy, thanhToanHoaDon.soLuongDiemDoi, thanhToanHoaDon.tyGiaDiemDoi, thanhToanHoaDon
        ]);
    }
    tableQuanLyThanhToanHoaDon.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemThanhToanHoaDon();
    refreshDataInModelSuaThanhToanHoaDon();

    thanhToanHoaDons = await getThanhToanHoaDons();
    refreshTableData();
}    
