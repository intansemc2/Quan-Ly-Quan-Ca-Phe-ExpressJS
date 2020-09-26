
$(document).ready(function () {
    //Initialize Table
    tableQuanLynhapHang = $('#tableQuanLynhapHang').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="maNhapHang" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="maNguonSanPham" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="ngayGioNhap" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="maNhanVien" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="ghiChu" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 5,
                render: function (data, type, row, meta) {
                    let nhapHang = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuanhapHang' 
maNhapHang="${nhapHang.maNhapHang}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deletenhapHangRowInTable($(this));">
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
//Get nhapHangs
function getnhapHangs() {
    return new Promise(function (resolve, reject) {
        $.get('/api/nhapHang', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in nhapHangs
function refreshTableData() {
    tableQuanLynhapHang.clear();
    for (let nhapHang of nhapHangs) {
        tableQuanLynhapHang.row.add([
            nhapHang.maNhapHang, nhapHang.maNguonSanPham, nhapHang.ngayGioNhap, nhapHang.maNhanVien, nhapHang.ghiChu, nhapHang
        ]);
    }
    tableQuanLynhapHang.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemnhapHang();
    refreshDataInModelSuanhapHang();

    nhapHangs = await getnhapHangs();
    refreshTableData();
}    
