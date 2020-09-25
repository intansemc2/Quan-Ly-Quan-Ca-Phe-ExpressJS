
$(document).ready(function () {
    //Initialize Table
    tableQuanLyNguonsanpham = $('#tableQuanLyNguonsanpham').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="manguonsanpham" data="${data}">${renderData}</span>`;
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
                    return `<span class="sodienthoai" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="diachi" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let nguonsanpham = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaNguonsanpham' 
manguonsanpham="${nguonsanpham.manguonsanpham}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteNguonsanphamRowInTable($(this));">
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
//Get nguonsanphams
function getNguonsanphams() {
    return new Promise(function (resolve, reject) {
        $.get('/api/nguonsanpham', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in nguonsanphams
function refreshTableData() {
    tableQuanLyNguonsanpham.clear();
    for (let nguonsanpham of nguonsanphams) {
        tableQuanLyNguonsanpham.row.add([
            nguonsanpham.manguonsanpham, nguonsanpham.ten, nguonsanpham.sodienthoai, nguonsanpham.diachi, nguonsanpham
        ]);
    }
    tableQuanLyNguonsanpham.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemNguonsanpham();
    refreshDataInModelSuaNguonsanpham();

    nguonsanphams = await getNguonsanphams();
    refreshTableData();
}    
