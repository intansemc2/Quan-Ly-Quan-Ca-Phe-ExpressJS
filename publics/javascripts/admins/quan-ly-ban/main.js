
$(document).ready(function () {
    //Initialize Table
    tableQuanLyBan = $('#tableQuanLyBan').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idBan" data="${data}">${renderData}</span>`;
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
                    return `<span class="ghiChu" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let ban = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaBan' 
idBan="${ban.idBan}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteBanRowInTable($(this));">
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
        swal({ text: 'Làm mới thành công ', icon: 'success'});
    });

    //Events

    //Initialize final
    refreshPageData();
});

//Functions
//Get bans
function getBans() {
    return new Promise(function (resolve, reject) {
        $.get('/api/ban', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in bans
function refreshTableData() {
    tableQuanLyBan.clear();
    for (let ban of bans) {
        tableQuanLyBan.row.add([
            ban.idBan, ban.ten, ban.ghiChu, ban
        ]);
    }
    tableQuanLyBan.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemBan();
    refreshDataInModelSuaBan();

    bans = await getBans();
    refreshTableData();
}    
