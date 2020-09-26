
$(document).ready(function () {
    //Initialize Table
    tableQuanLyxuatHang = $('#tableQuanLyxuatHang').DataTable({
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
                    return `<span class="ngayGioXuat" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="maNhanVien" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="maKhachHang" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="maBan" data="${data}">${renderData}</span>`;
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
                    let xuatHang = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaxuatHang' 
maXuatHang="${xuatHang.maXuatHang}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deletexuatHangRowInTable($(this));">
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
//Get xuatHangs
function getxuatHangs() {
    return new Promise(function (resolve, reject) {
        $.get('/api/xuatHang', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in xuatHangs
function refreshTableData() {
    tableQuanLyxuatHang.clear();
    for (let xuatHang of xuatHangs) {
        tableQuanLyxuatHang.row.add([
            xuatHang.maXuatHang, xuatHang.ngayGioXuat, xuatHang.maNhanVien, xuatHang.maKhachHang, xuatHang.maBan, xuatHang.ghiChu, xuatHang
        ]);
    }
    tableQuanLyxuatHang.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemxuatHang();
    refreshDataInModelSuaxuatHang();

    xuatHangs = await getxuatHangs();
    refreshTableData();
}    
