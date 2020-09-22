
$(document).ready(function () {
    //Initialize Table
    tableQuanLyKhuyenMai = $('#tableQuanLyKhuyenMai').DataTable({
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
                    return `<span class="ten" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="thoiGianDienRa" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="thoiGianKetThuc" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let khuyenMai = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaKhuyenMai' 
idKhuyenMai="${khuyenMai.idKhuyenMai}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteKhuyenMaiRowInTable($(this));">
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
//Get khuyenMais
function getKhuyenMais() {
    return new Promise(function (resolve, reject) {
        $.get('/api/khuyen-mai', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in khuyenMais
function refreshTableData() {
    tableQuanLyKhuyenMai.clear();
    for (let khuyenMai of khuyenMais) {
        tableQuanLyKhuyenMai.row.add([
            khuyenMai.idKhuyenMai, khuyenMai.ten, khuyenMai.thoiGianDienRa, khuyenMai.thoiGianKetThuc, khuyenMai
        ]);
    }
    tableQuanLyKhuyenMai.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemKhuyenMai();
    refreshDataInModelSuaKhuyenMai();

    khuyenMais = await getKhuyenMais();
    refreshTableData();
}    
