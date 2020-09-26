
$(document).ready(function () {
    //Initialize Table
    tableQuanLychitietnhaphang = $('#tableQuanLychitietnhaphang').DataTable({
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
                    return `<span class="masanpham" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="soluong" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="dongia" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let chitietnhaphang = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuachitietnhaphang' 
manhaphang="${chitietnhaphang.manhaphang}" masanpham="${chitietnhaphang.masanpham}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deletechitietnhaphangRowInTable($(this));">
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
//Get chitietnhaphangs
function getchitietnhaphangs() {
    return new Promise(function (resolve, reject) {
        $.get('/api/chitietnhaphang', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in chitietnhaphangs
function refreshTableData() {
    tableQuanLychitietnhaphang.clear();
    for (let chitietnhaphang of chitietnhaphangs) {
        tableQuanLychitietnhaphang.row.add([
            chitietnhaphang.manhaphang, chitietnhaphang.masanpham, chitietnhaphang.soluong, chitietnhaphang.dongia, chitietnhaphang
        ]);
    }
    tableQuanLychitietnhaphang.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemchitietnhaphang();
    refreshDataInModelSuachitietnhaphang();

    chitietnhaphangs = await getchitietnhaphangs();
    refreshTableData();
}    
