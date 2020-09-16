
$(document).ready(function () {
    //Initialize Table
    tableQuanLyDatBan = $('#tableQuanLyDatBan').DataTable({
        columnDefs: [
            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idDatBan" data="${data}">${renderData}</span>`;
                },
            },
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="username" data="${data}">${renderData}</span>`;
                },
            },
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="password" data="${data}">${renderData}</span>`;
                },
            },
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let typeIndex = data;
                    let renderData = datbansTypes[typeIndex] ? datbansTypes[typeIndex] : data;
                    return `<span class="loai" data="${data}">${renderData}</span>`;
                },
            },
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let datban = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaDatBan' idDatBan="${datban.idDatBan}">
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
        swal({ text: 'Làm mới thành công ', icon: 'success'});
    });

    //Events

    //Initialize final
    refreshPageData();
});

//Functions
//Get data of datbanTypes
function getDatBanTypes() {
    return new Promise(function (resolve, reject) {
        $.post('/api/tai-khoan/types', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Get datbans
function getDatBans() {
    return new Promise(function (resolve, reject) {
        $.get('/api/tai-khoan', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in datbans
function refreshTableData() {
    tableQuanLyDatBan.clear();
    for (let datban of datbans) {
        tableQuanLyDatBan.row.add([datban.idDatBan, datban.username, datban.password, datban.loai, datban]);
    }
    tableQuanLyDatBan.draw();
}

//Refresh all data in page
async function refreshPageData() {
    datbansTypes = await getDatBanTypes();
    refreshDataInModelThemDatBan();
    refreshDataInModelSuaDatBan();

    datbans = await getDatBans();
    refreshTableData();
}    
