
$(document).ready(function () {
    //Initialize Table
    tableQuanLyCthd = $('#tableQuanLyCthd').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idHoaDon" data="${data}">${renderData}</span>`;
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
                    let cthd = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaCthd' 
idHoaDon="${cthd.idHoaDon}" idSanPham="${cthd.idSanPham}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteCthdRowInTable($(this));">
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
//Get cthds
function getCthds() {
    return new Promise(function (resolve, reject) {
        $.get('/api/cthd', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in cthds
function refreshTableData() {
    tableQuanLyCthd.clear();
    for (let cthd of cthds) {
        tableQuanLyCthd.row.add([
            cthd.idHoaDon, cthd.idSanPham, cthd.soLuong, cthd.donGia, cthd.diemTichLuy, cthd
        ]);
    }
    tableQuanLyCthd.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemCthd();
    refreshDataInModelSuaCthd();

    cthds = await getCthds();
    refreshTableData();
}    
