
$(document).ready(function () {
    //Initialize Table
    tableQuanLyHoaDon = $('#tableQuanLyHoaDon').DataTable({
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
                    return `<span class="idKhachHang" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idBan" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idNhanVien" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="thoiGianLap" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 5,
                render: function (data, type, row, meta) {
                    let hoaDon = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaHoaDon' 
idHoaDon="${hoaDon.idHoaDon}"
>
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
        swal({ text: 'Làm mới thành công ', icon: 'success', timer: 1000});
    });

    //Events

    //Initialize final
    refreshPageData();
});

//Functions
//Get hoaDons
function getHoaDons() {
    return new Promise(function (resolve, reject) {
        $.get('/api/hoa-don', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in hoaDons
function refreshTableData() {
    tableQuanLyHoaDon.clear();
    for (let hoaDon of hoaDons) {
        tableQuanLyHoaDon.row.add([
            hoaDon.idHoaDon, hoaDon.idKhachHang, hoaDon.idBan, hoaDon.idNhanVien, hoaDon.thoiGianLap, hoaDon
        ]);
    }
    tableQuanLyHoaDon.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemHoaDon();
    refreshDataInModelSuaHoaDon();

    hoaDons = await getHoaDons();
    refreshTableData();
}    
