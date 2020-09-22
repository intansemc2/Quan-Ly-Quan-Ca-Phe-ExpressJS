
$(document).ready(function () {
    //Initialize Table
    tableQuanLyCtkm = $('#tableQuanLyCtkm').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idKhuyenMai" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idSanPham" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="soLuong" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="donGia" data="${data}">${renderData}</span>`;
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
                    let ctkm = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaCtkm' 
idKhuyenMai="${ctkm.idKhuyenMai}" idSanPham="${ctkm.idSanPham}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteCtkmRowInTable($(this));">
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
//Get ctkms
function getCtkms() {
    return new Promise(function (resolve, reject) {
        $.get('/api/ctkm', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in ctkms
function refreshTableData() {
    tableQuanLyCtkm.clear();
    for (let ctkm of ctkms) {
        tableQuanLyCtkm.row.add([
            ctkm.idKhuyenMai, ctkm.idSanPham, ctkm.soLuong, ctkm.donGia, ctkm.diemTichLuy, ctkm
        ]);
    }
    tableQuanLyCtkm.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemCtkm();
    refreshDataInModelSuaCtkm();

    ctkms = await getCtkms();
    refreshTableData();
}    
