
$(document).ready(function () {
    //Initialize Table
    tableQuanLySanpham = $('#tableQuanLySanpham').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="masanpham" data="${data}">${renderData}</span>`;
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
                    return `<span class="linkanh" data="${data}">${renderData}</span>`;
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
                    let sanpham = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaSanpham' 
masanpham="${sanpham.masanpham}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteSanphamRowInTable($(this));">
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
//Get sanphams
function getSanphams() {
    return new Promise(function (resolve, reject) {
        $.get('/api/sanpham', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in sanphams
function refreshTableData() {
    tableQuanLySanpham.clear();
    for (let sanpham of sanphams) {
        tableQuanLySanpham.row.add([
            sanpham.masanpham, sanpham.ten, sanpham.linkanh, sanpham.loai, sanpham.gia, sanpham
        ]);
    }
    tableQuanLySanpham.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemSanpham();
    refreshDataInModelSuaSanpham();

    sanphams = await getSanphams();
    refreshTableData();
}    
