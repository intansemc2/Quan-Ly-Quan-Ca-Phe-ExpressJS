
$(document).ready(function () {
    //Initialize Table
    tableQuanLynhaphang = $('#tableQuanLynhaphang').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="manhaphang" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="manguonsanpham" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="ngaygionhap" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="manhanvien" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="ghichu" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 5,
                render: function (data, type, row, meta) {
                    let nhaphang = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuanhaphang' 
manhaphang="${nhaphang.manhaphang}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deletenhaphangRowInTable($(this));">
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
//Get nhaphangs
function getnhaphangs() {
    return new Promise(function (resolve, reject) {
        $.get('/api/nhaphang', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in nhaphangs
function refreshTableData() {
    tableQuanLynhaphang.clear();
    for (let nhaphang of nhaphangs) {
        tableQuanLynhaphang.row.add([
            nhaphang.manhaphang, nhaphang.manguonsanpham, nhaphang.ngaygionhap, nhaphang.manhanvien, nhaphang.ghichu, nhaphang
        ]);
    }
    tableQuanLynhaphang.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemnhaphang();
    refreshDataInModelSuanhaphang();

    nhaphangs = await getnhaphangs();
    refreshTableData();
}    
