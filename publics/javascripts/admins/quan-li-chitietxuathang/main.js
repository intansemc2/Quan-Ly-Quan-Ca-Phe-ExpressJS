
$(document).ready(function () {
    //Initialize Table
    tableQuanLychitietxuathang = $('#tableQuanLychitietxuathang').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="maxuathang" data="${data}">${renderData}</span>`;
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
                    let chitietxuathang = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuachitietxuathang' 
maxuathang="${chitietxuathang.maxuathang}" masanpham="${chitietxuathang.masanpham}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deletechitietxuathangRowInTable($(this));">
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
//Get chitietxuathangs
function getchitietxuathangs() {
    return new Promise(function (resolve, reject) {
        $.get('/api/chitietxuathang', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in chitietxuathangs
function refreshTableData() {
    tableQuanLychitietxuathang.clear();
    for (let chitietxuathang of chitietxuathangs) {
        tableQuanLychitietxuathang.row.add([
            chitietxuathang.maxuathang, chitietxuathang.masanpham, chitietxuathang.soluong, chitietxuathang.dongia, chitietxuathang
        ]);
    }
    tableQuanLychitietxuathang.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemchitietxuathang();
    refreshDataInModelSuachitietxuathang();

    chitietxuathangs = await getchitietxuathangs();
    refreshTableData();
}    
