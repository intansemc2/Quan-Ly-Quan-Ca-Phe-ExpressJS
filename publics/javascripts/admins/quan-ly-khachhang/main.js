
$(document).ready(function () {
    //Initialize Table
    tableQuanLyKhachhang = $('#tableQuanLyKhachhang').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="makhachhang" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="mataikhoan" data="${data}">${renderData}</span>`;
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
                    return `<span class="ngaysinh" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="sodienthoai" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 5,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="ghichu" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 6,
                render: function (data, type, row, meta) {
                    let khachhang = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaKhachhang' 
makhachhang="${khachhang.makhachhang}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteKhachhangRowInTable($(this));">
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
//Get khachhangs
function getKhachhangs() {
    return new Promise(function (resolve, reject) {
        $.get('/api/khachhang', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in khachhangs
function refreshTableData() {
    tableQuanLyKhachhang.clear();
    for (let khachhang of khachhangs) {
        tableQuanLyKhachhang.row.add([
            khachhang.makhachhang, khachhang.mataikhoan, khachhang.ten, khachhang.ngaysinh, khachhang.sodienthoai, khachhang.ghichu, khachhang
        ]);
    }
    tableQuanLyKhachhang.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemKhachhang();
    refreshDataInModelSuaKhachhang();

    khachhangs = await getKhachhangs();
    refreshTableData();
}    