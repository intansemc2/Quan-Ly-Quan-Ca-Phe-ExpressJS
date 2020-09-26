
$(document).ready(function () {
    //Initialize Table
    tableQuanLytaiKhoan = $('#tableQuanLytaiKhoan').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="maTaiKhoan" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="tenDangNhap" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="matKhau" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="loai" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let taiKhoan = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuataiKhoan' 
maTaiKhoan="${taiKhoan.maTaiKhoan}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deletetaiKhoanRowInTable($(this));">
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
//Get taiKhoans
function gettaiKhoans() {
    return new Promise(function (resolve, reject) {
        $.get('/api/taiKhoan', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in taiKhoans
function refreshTableData() {
    tableQuanLytaiKhoan.clear();
    for (let taiKhoan of taiKhoans) {
        tableQuanLytaiKhoan.row.add([
            taiKhoan.maTaiKhoan, taiKhoan.tenDangNhap, taiKhoan.matKhau, taiKhoan.loai, taiKhoan
        ]);
    }
    tableQuanLytaiKhoan.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemtaiKhoan();
    refreshDataInModelSuataiKhoan();

    taiKhoans = await gettaiKhoans();
    refreshTableData();
}    
