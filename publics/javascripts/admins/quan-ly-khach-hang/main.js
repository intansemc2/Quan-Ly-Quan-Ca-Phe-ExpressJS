
$(document).ready(function () {
    //Initialize Table
    tableQuanLyKhachHang = $('#tableQuanLyKhachHang').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idKhachHang" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="ten" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="sdt" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idTaiKhoan" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="diemTichLuy" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 5,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="email" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 6,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="google" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 7,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="facebook" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 8,
                render: function (data, type, row, meta) {
                    let khachHang = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaKhachHang' 
idKhachHang="${khachHang.idKhachHang}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteKhachHangRowInTable($(this));">
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
//Get khachHangs
function getKhachHangs() {
    return new Promise(function (resolve, reject) {
        $.get('/api/khach-hang', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in khachHangs
function refreshTableData() {
    tableQuanLyKhachHang.clear();
    for (let khachHang of khachHangs) {
        tableQuanLyKhachHang.row.add([
            khachHang.idKhachHang, khachHang.ten, khachHang.sdt, khachHang.idTaiKhoan, khachHang.diemTichLuy, khachHang.email, khachHang.google, khachHang.facebook, khachHang
        ]);
    }
    tableQuanLyKhachHang.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemKhachHang();
    refreshDataInModelSuaKhachHang();

    khachHangs = await getKhachHangs();
    refreshTableData();
}    
