
$(document).ready(function () {
    //Initialize Table
    tableQuanLyLoaiSanPham = $('#tableQuanLyLoaiSanPham').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idLoaiSanPham" data="${data}">${renderData}</span>`;
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
                    return `<span class="linkAnh" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="ghiChu" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let loaiSanPham = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaLoaiSanPham' 
idLoaiSanPham="${loaiSanPham.idLoaiSanPham}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteLoaiSanPhamRowInTable($(this));">
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
//Get loaiSanPhams
function getLoaiSanPhams() {
    return new Promise(function (resolve, reject) {
        $.get('/api/loai-san-pham', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in loaiSanPhams
function refreshTableData() {
    tableQuanLyLoaiSanPham.clear();
    for (let loaiSanPham of loaiSanPhams) {
        tableQuanLyLoaiSanPham.row.add([
            loaiSanPham.idLoaiSanPham, loaiSanPham.ten, loaiSanPham.linkAnh, loaiSanPham.ghiChu, loaiSanPham
        ]);
    }
    tableQuanLyLoaiSanPham.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemLoaiSanPham();
    refreshDataInModelSuaLoaiSanPham();

    loaiSanPhams = await getLoaiSanPhams();
    refreshTableData();
}    
