
$(document).ready(function () {
    //Initialize Table
    tableQuanLynhanVien = $('#tableQuanLynhanVien').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="maNhanVien" data="${data}">${renderData}</span>`;
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
                    return `<span class="diaChi" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 6,
                render: function (data, type, row, meta) {
                    let nhanVien = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuanhanVien' 
maNhanVien="${nhanVien.maNhanVien}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deletenhanVienRowInTable($(this));">
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
//Get nhanViens
function getnhanViens() {
    return new Promise(function (resolve, reject) {
        $.get('/api/nhanVien', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in nhanViens
function refreshTableData() {
    tableQuanLynhanVien.clear();
    for (let nhanVien of nhanViens) {
        tableQuanLynhanVien.row.add([
            nhanVien.maNhanVien, nhanVien.maTaiKhoan, nhanVien.ten, nhanVien.ngaySinh, nhanVien.soDienThoai, nhanVien.diaChi, nhanVien
        ]);
    }
    tableQuanLynhanVien.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemnhanVien();
    refreshDataInModelSuanhanVien();

    nhanViens = await getnhanViens();
    refreshTableData();
}    
