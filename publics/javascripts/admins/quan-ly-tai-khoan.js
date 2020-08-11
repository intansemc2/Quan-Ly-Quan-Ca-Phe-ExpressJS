$(document).ready(function(){
    //Initialize Table
    tableQuanLyTaiKhoan = $("#tableQuanLyTaiKhoan").DataTable({
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="id_tai_khoan" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 1,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="username" data="${data}">${renderData}</span>`;
                }
            }, {
                "targets": 2,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="password" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 3,
                "render": function (data, type, row, meta) {
                    let typeIndex = data;
                    let renderData = (taikhoansTypes[typeIndex]) ? taikhoansTypes[typeIndex] : data;
                    return `<span class="type" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 4,
                "render": function (data, type, row, meta) {
                    let taikhoan = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaTaiKhoan'>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1">
    <i class="fas fa-trash"></i>
</button>
`;
                    return `${renderData}`;
                }
            }
        ]
    });

    //Initialize Button Events

    //Events

    //Initialize final
    refreshPageData();
});

//Variables
let taikhoansTypes = [];
let taikhoans = [];
let tableQuanLyTaiKhoan = {};

//Functions
//Get data of taikhoanTypes
function getTaikhoanTypes() {
    return new Promise(function(resolve, reject){
        $.post('/admin/getTaikhoanTypes', {}, function(data, status, xhr){
            resolve(data);
        });
    });
}

//Get taikhoans 
function getTaikhoans() {
    return new Promise(function(resolve, reject){
        $.get('/api/tai-khoan', {}, function(data, status, xhr){
            resolve(data);
        });
    });
}

//Refresh data in table with data in taikhoans
function refreshTableData() {
    tableQuanLyTaiKhoan.clear();
    for (let taikhoan of taikhoans) {
        tableQuanLyTaiKhoan.row.add([taikhoan.idTaiKhoan, taikhoan.username, taikhoan.password, taikhoan.loai, taikhoan]);
    }
    tableQuanLyTaiKhoan.draw();
}

//Refresh data in model ThemTaiKhoan with data in taikhoansTypes
function refreshDataInModelThemTaiKhoan() {
    let loai = $('#modelThemTaiKhoan .loai');
    let loaiHtml = '';

    taikhoansTypes.forEach((element, index) => loaiHtml += `<option value="${index}">${element}</option>`);

    loai.html(loaiHtml);
}

//Refresh data in model SuaTaiKhoan with data in taikhoansTypes
function refreshDataInModelSuaTaiKhoan() {
    let loai = $('#modelSuaTaiKhoan .loai');
    let loaiHtml = '';

    taikhoansTypes.forEach((element, index) => loaiHtml += `<option value="${index}">${element}</option>`);

    loai.html(loaiHtml);
}

//Refresh all data in page
async function refreshPageData() {
    taikhoansTypes = await getTaikhoanTypes();
    refreshDataInModelThemTaiKhoan();
    refreshDataInModelSuaTaiKhoan();

    taikhoans = await getTaikhoans();
    refreshTableData();
}
