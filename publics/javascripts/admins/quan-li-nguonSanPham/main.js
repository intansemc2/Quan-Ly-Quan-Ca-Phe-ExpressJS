
$(document).ready(function () {
    //Initialize Table
    tableQuanLynguonSanPham = $('#tableQuanLynguonSanPham').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="maNguonSanPham" data="${data}">${renderData}</span>`;
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
                    return `<span class="soDienThoai" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="diaChi" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let nguonSanPham = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuanguonSanPham' 
maNguonSanPham="${nguonSanPham.maNguonSanPham}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deletenguonSanPhamRowInTable($(this));">
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
//Get nguonSanPhams
function getnguonSanPhams() {
    return new Promise(function (resolve, reject) {
        $.get('/api/nguonSanPham', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in nguonSanPhams
function refreshTableData() {
    tableQuanLynguonSanPham.clear();
    for (let nguonSanPham of nguonSanPhams) {
        tableQuanLynguonSanPham.row.add([
            nguonSanPham.maNguonSanPham, nguonSanPham.ten, nguonSanPham.soDienThoai, nguonSanPham.diaChi, nguonSanPham
        ]);
    }
    tableQuanLynguonSanPham.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemnguonSanPham();
    refreshDataInModelSuanguonSanPham();

    nguonSanPhams = await getnguonSanPhams();
    refreshTableData();
}    
