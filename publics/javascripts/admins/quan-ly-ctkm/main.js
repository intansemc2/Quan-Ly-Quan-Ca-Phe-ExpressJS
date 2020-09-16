
$(document).ready(function () {
    //Initialize Table
    tableQuanLyCtkm = $('#tableQuanLyCtkm').DataTable({
        columnDefs: [
            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idCtkm" data="${data}">${renderData}</span>`;
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
                    let renderData = ctkmsTypes[typeIndex] ? ctkmsTypes[typeIndex] : data;
                    return `<span class="loai" data="${data}">${renderData}</span>`;
                },
            },
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let ctkm = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaCtkm' idCtkm="${ctkm.idCtkm}">
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteCtkmRowInTable($(this));">
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
//Get data of ctkmTypes
function getCtkmTypes() {
    return new Promise(function (resolve, reject) {
        $.post('/api/tai-khoan/types', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Get ctkms
function getCtkms() {
    return new Promise(function (resolve, reject) {
        $.get('/api/tai-khoan', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in ctkms
function refreshTableData() {
    tableQuanLyCtkm.clear();
    for (let ctkm of ctkms) {
        tableQuanLyCtkm.row.add([ctkm.idCtkm, ctkm.username, ctkm.password, ctkm.loai, ctkm]);
    }
    tableQuanLyCtkm.draw();
}

//Refresh all data in page
async function refreshPageData() {
    ctkmsTypes = await getCtkmTypes();
    refreshDataInModelThemCtkm();
    refreshDataInModelSuaCtkm();

    ctkms = await getCtkms();
    refreshTableData();
}    
