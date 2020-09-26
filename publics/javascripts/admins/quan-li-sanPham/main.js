
$(document).ready(function () {
    //Initialize Table
    tableQuanLysanPham = $('#tableQuanLysanPham').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="maSanPham" data="${data}">${renderData}</span>`;
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
                    return `<span class="loai" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="gia" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 5,
                render: function (data, type, row, meta) {
                    let sanPham = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuasanPham' 
maSanPham="${sanPham.maSanPham}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deletesanPhamRowInTable($(this));">
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
function getsanPhams() {
    return new Promise(function (resolve, reject) {
        $.get('/api/sanPham', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in sanPhams
function refreshTableData() {
    tableQuanLysanPham.clear();
    for (let sanPham of sanPhams) {
        tableQuanLysanPham.row.add([
            sanPham.maSanPham, sanPham.ten, sanPham.linkAnh, sanPham.loai, sanPham.gia, sanPham
        ]);
    }
    tableQuanLysanPham.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemsanPham();
    refreshDataInModelSuasanPham();

    sanPhams = await getsanPhams();
    refreshTableData();
}    
