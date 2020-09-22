
$(document).ready(function () {
    //Initialize Table
    tableQuanLyDatBan = $('#tableQuanLyDatBan').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idKhachHang" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idBan" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="thoiGianLap" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="thoiGianNhan" data="${data}">${renderData}</span>`;
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
                    let datBan = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaDatBan' 
idKhachHang="${datBan.idKhachHang}" idBan="${datBan.idBan}" thoiGianLap="${datBan.thoiGianLap}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteDatBanRowInTable($(this));">
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
//Get datBans
function getDatBans() {
    return new Promise(function (resolve, reject) {
        $.get('/api/dat-ban', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in datBans
function refreshTableData() {
    tableQuanLyDatBan.clear();
    for (let datBan of datBans) {
        tableQuanLyDatBan.row.add([
            datBan.idKhachHang, datBan.idBan, datBan.thoiGianLap, datBan.thoiGianNhan, datBan.ghiChu, datBan
        ]);
    }
    tableQuanLyDatBan.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemDatBan();
    refreshDataInModelSuaDatBan();

    datBans = await getDatBans();
    refreshTableData();
}    
