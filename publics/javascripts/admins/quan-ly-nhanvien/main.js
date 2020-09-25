
$(document).ready(function () {
    //Initialize Table
    tableQuanLyNhanvien = $('#tableQuanLyNhanvien').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="manhanvien" data="${data}">${renderData}</span>`;
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
                    return `<span class="diachi" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 6,
                render: function (data, type, row, meta) {
                    let nhanvien = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaNhanvien' 
manhanvien="${nhanvien.manhanvien}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteNhanvienRowInTable($(this));">
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
//Get nhanviens
function getNhanviens() {
    return new Promise(function (resolve, reject) {
        $.get('/api/nhanvien', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in nhanviens
function refreshTableData() {
    tableQuanLyNhanvien.clear();
    for (let nhanvien of nhanviens) {
        tableQuanLyNhanvien.row.add([
            nhanvien.manhanvien, nhanvien.mataikhoan, nhanvien.ten, nhanvien.ngaysinh, nhanvien.sodienthoai, nhanvien.diachi, nhanvien
        ]);
    }
    tableQuanLyNhanvien.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemNhanvien();
    refreshDataInModelSuaNhanvien();

    nhanviens = await getNhanviens();
    refreshTableData();
}    
