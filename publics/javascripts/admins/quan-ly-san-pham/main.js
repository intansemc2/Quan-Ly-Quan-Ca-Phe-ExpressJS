
$(document).ready(function () {
    //Initialize Table
    tableQuanLySanPham = $('#tableQuanLySanPham').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idSanPham" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idLoaiSanPham" data="${data}">${renderData}</span>`;
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
                    return `<span class="gia" data="${data}">${renderData}</span>`;
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
                    return `<span class="ghiChu" data="${data}">${renderData}</span>`;
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
                    let sanPham = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaSanPham' 
idSanPham="${sanPham.idSanPham}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteSanPhamRowInTable($(this));">
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
//Get sanPhams
function getSanPhams() {
    return new Promise(function (resolve, reject) {
        $.get('/api/san-pham', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in sanPhams
function refreshTableData() {
    tableQuanLySanPham.clear();
    for (let sanPham of sanPhams) {
        tableQuanLySanPham.row.add([
            sanPham.idSanPham, sanPham.idLoaiSanPham, sanPham.ten, sanPham.gia, sanPham.diemTichLuy, sanPham.ghiChu, sanPham.linkAnh, sanPham
        ]);
    }
    tableQuanLySanPham.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemSanPham();
    refreshDataInModelSuaSanPham();

    sanPhams = await getSanPhams();
    refreshTableData();
}    
