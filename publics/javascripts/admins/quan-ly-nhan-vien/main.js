
$(document).ready(function () {
    //Initialize Table
    tableQuanLyNhanVien = $('#tableQuanLyNhanVien').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idNhanVien" data="${data}">${renderData}</span>`;
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
                    return `<span class="loai" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idTaiKhoan" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 5,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="ngaySinh" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 6,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="linkAnh" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 7,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="email" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 8,
                render: function (data, type, row, meta) {
                    let nhanVien = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaNhanVien' 
idNhanVien="${nhanVien.idNhanVien}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteNhanVienRowInTable($(this));">
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
function getNhanViens() {
    return new Promise(function (resolve, reject) {
        $.get('/api/nhan-vien', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in nhanViens
function refreshTableData() {
    tableQuanLyNhanVien.clear();
    for (let nhanVien of nhanViens) {
        tableQuanLyNhanVien.row.add([
            nhanVien.idNhanVien, nhanVien.ten, nhanVien.sdt, nhanVien.loai, nhanVien.idTaiKhoan, nhanVien.ngaySinh, nhanVien.linkAnh, nhanVien.email, nhanVien
        ]);
    }
    tableQuanLyNhanVien.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemNhanVien();
    refreshDataInModelSuaNhanVien();

    nhanViens = await getNhanViens();
    refreshTableData();
}    
