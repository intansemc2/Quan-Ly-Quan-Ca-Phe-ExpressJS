
$(document).ready(function () {
    //Initialize Table
    tableQuanLykhachHang = $('#tableQuanLykhachHang').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="maKhachHang" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="maTaiKhoan" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="ten" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="ngaySinh" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="soDienThoai" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 5,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="ghiChu" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 6,
                render: function (data, type, row, meta) {
                    let khachHang = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuakhachHang' 
maKhachHang="${khachHang.maKhachHang}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deletekhachHangRowInTable($(this));">
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
function getkhachHangs() {
    return new Promise(function (resolve, reject) {
        $.get('/api/khachHang', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in khachHangs
function refreshTableData() {
    tableQuanLykhachHang.clear();
    for (let khachHang of khachHangs) {
        tableQuanLykhachHang.row.add([
            khachHang.maKhachHang, khachHang.maTaiKhoan, khachHang.ten, khachHang.ngaySinh, khachHang.soDienThoai, khachHang.ghiChu, khachHang
        ]);
    }
    tableQuanLykhachHang.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemkhachHang();
    refreshDataInModelSuakhachHang();

    khachHangs = await getkhachHangs();
    refreshTableData();
}    
