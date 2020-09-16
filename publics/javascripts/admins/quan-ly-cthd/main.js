
$(document).ready(function () {
    //Initialize Table
    tableQuanLyCthd = $('#tableQuanLyCthd').DataTable({
        columnDefs: [
            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idCthd" data="${data}">${renderData}</span>`;
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
                    let renderData = cthdsTypes[typeIndex] ? cthdsTypes[typeIndex] : data;
                    return `<span class="loai" data="${data}">${renderData}</span>`;
                },
            },
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let cthd = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaCthd' idCthd="${cthd.idCthd}">
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteCthdRowInTable($(this));">
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
//Get data of cthdTypes
function getCthdTypes() {
    return new Promise(function (resolve, reject) {
        $.post('/api/tai-khoan/types', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Get cthds
function getCthds() {
    return new Promise(function (resolve, reject) {
        $.get('/api/tai-khoan', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in cthds
function refreshTableData() {
    tableQuanLyCthd.clear();
    for (let cthd of cthds) {
        tableQuanLyCthd.row.add([cthd.idCthd, cthd.username, cthd.password, cthd.loai, cthd]);
    }
    tableQuanLyCthd.draw();
}

//Refresh all data in page
async function refreshPageData() {
    cthdsTypes = await getCthdTypes();
    refreshDataInModelThemCthd();
    refreshDataInModelSuaCthd();

    cthds = await getCthds();
    refreshTableData();
}    
