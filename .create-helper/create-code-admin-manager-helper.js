const fs = require('fs');
const path = require('path');

const tableData = require('./tableData');
const ccfs = require('./createCodeFunctions');

let datas = tableData.tableData;

for (let i = 0; i < datas.length; i += 1) {
    let contents = '';
    let data = datas[i];

    //Pre-process
    let tablenameFile = ccfs.convertNameToJSClass(data.classname).toLowerCase();
    let tablenameClass = ccfs.convertNameToJSClass(data.classname);
    let tablenameObject = ccfs.convertNameToSqlProperty(data.classname);

    let tableNotKeysProperties = data.properties.filter((item) => !data.keys.find((key) => key === item.name));
    let tableKeysProperties = data.properties.filter((item) => data.keys.find((key) => key === item.name));

    let forderName = ccfs.convertTableNameToFolderName(`quan_ly_${data.classname}`);

    //Views
    //Create content
    contents = '';
    contents += `
extends ../layouts/_layout_main_bootstrap

block custom_stylesheets
    //Stylesheet library files
    link(type="text/css", rel="stylesheet", href="/liblaries/datatable/datatables.min.css")

    //Custom Stylesheets
    link(type="text/css", rel="stylesheet", href="/stylesheets/admins/admin-main.css")    

block content
    //Start Navbar 
    include _item_navbar
    ///End Navbar

    //Content
    #layoutSidenav
        //Sidebar
        include _item_sidebar
        
        //Start Content
        #layoutSidenav_content
            main
                .container-fluid
                    //Title
                    h1.mt-4 Quản lý ${data.speak}

                    //Start Breadcrumb
                    include ../items/_item_breadscrumb
                    ///End readcrumb
                    
                    //Start Main Content
                    .card
                        .card-header
                            i.fas.fa-toolbox.mr-1
                            | Các thao tác chung
                        .card-body
                            button.btn.btn-outline-secondary.rounded-0(type='button', data-toggle='modal', data-target='#modelThem${tablenameClass}') Thêm mới  
                            span.mx-1
                            button#deleteAll.btn.btn-outline-dark.rounded-0 Xóa tất cả 
                            span.mx-1
                            button#refreshAll.btn.btn-outline-dark.rounded-0 Làm mới 

                    // Model thêm ${data.speak}
                    include ${forderName}/quan-ly-them

                    // Model sửa ${data.speak}
                    include ${forderName}/quan-ly-sua

                    //Start Table
                    .card.my-4
                        .card-header
                            i.fas.fa-table.mr-1
                            | Bảng quản lý ${data.speak} 
                        .card-body
                            #tableQuanLy${tablenameClass}Container.table-responsive
                                table#tableQuanLy${tablenameClass}.table.table-bordered.table-striped.table-hover(width='100%', cellspacing='0')
                                    thead
                                        tr
${data.properties.map((item) => `                                                th ${ccfs.capitalizeFirst(item.speak)}`).join('\n')}
                                    tfoot
                                        tr
${data.properties.map((item) => `                                                th ${ccfs.capitalizeFirst(item.speak)}`).join('\n')} 
                                    tbody
                                        //Table Content
                        ///End Table
                    ///End Main Content
                    
            //Start Footer                
            include ../items/_item_footer
            ///End Footer
        ///End Content

block custom_javascripts
    //Javascript library files
    script(type="text/javascript", src="/liblaries/datatable/datatables.min.js")
    script(type="text/javascript", src="/liblaries/sweetalert/sweetalert.min.js")

    //Javascript items
    script(type="text/javascript", src="/javascripts/custom-alert.js")
    script(type="text/javascript", src="/javascripts/custom-toggle-button.js")

    //Custom Javascript
    script(type="text/javascript", src="/javascripts/admins/admin-main.js")   

    script(type="text/javascript", src="/javascripts/admins/${forderName}/variables.js")
    script(type="text/javascript", src="/javascripts/admins/${forderName}/table-functions.js")
    script(type="text/javascript", src="/javascripts/admins/${forderName}/them.js")
    script(type="text/javascript", src="/javascripts/admins/${forderName}/sua.js")
    script(type="text/javascript", src="/javascripts/admins/${forderName}/xoa.js")
    script(type="text/javascript", src="/javascripts/admins/${forderName}/main.js")

`;

    ccfs.writeStringSync(`${__dirname}/results/views/admins`, `${forderName}.pug`, contents);

    //Create edit
    contents = '';
    contents += `
// Model sửa ${data.speak}
#modelSua${tablenameClass}.modal.fade(tabindex='-1', role='dialog', aria-labelledby='ModelSua${tablenameClass} aria-labelledby', aria-hidden='true')
    .modal-dialog.modal-dialog-centered(role='document')
        form.modal-content
            .modal-header
                h5.modal-title Sửa ${data.speak} 
                button.close(type='button', data-dismiss='modal', aria-label='Close')
                    span(aria-hidden='true') &times;
            .modal-body                
                .alerts
                    // Các alert của phần này
                input.id${tablenameClass}(type='hidden')
${tableKeysProperties.map(item => ccfs.createFormInputElement(
    ccfs.convertNameToJSId(item.name),
    ccfs.capitalizeFirst(item.speak),
    item.type.toLowerCase(),
    [ccfs.convertNameToJSId(item.name).toLowerCase()],
    [`required='true'`, `placeholder='Nhập ${ccfs.capitalizeFirst(item.speak)}'`],
    4*4
)).join('')}
${tableNotKeysProperties.map(item => ccfs.createFormInputElement(
    ccfs.convertNameToJSId(item.name),
    ccfs.capitalizeFirst(item.speak),
    item.type.toLowerCase(),
    [ccfs.convertNameToJSId(item.name).toLowerCase()],
    [`placeholder='Nhập ${ccfs.capitalizeFirst(item.speak)}'`],
    4*4
)).join('')}
            .modal-footer
                input.confirm.btn.btn-outline-secondary.rounded-0(type='button', value='Sửa ${ccfs.capitalizeFirst(data.speak)}')
                input.btn.btn-outline-dark.rounded-0(type='reset', value='Cài lại')
`;

    ccfs.writeStringSync(`${__dirname}/results/views/admins/${forderName}`, `quan-ly-sua.pug`, contents);

    //Create add
    contents = '';
    contents += `
// Model thêm ${data.speak}
#modelThem${tablenameClass}.modal.fade(tabindex='-1', role='dialog', aria-labelledby='Model aria-labelledby', aria-hidden='true')
    .modal-dialog.modal-dialog-centered(role='document')
        form.modal-content
            .modal-header
                h5.modal-title Thêm ${data.speak} 
                button.close(type='button', data-dismiss='modal', aria-label='Close')
                    span(aria-hidden='true') &times;
            .modal-body
                .alerts
                    // Các alert của phần này
${tableKeysProperties.map(item => ccfs.createFormInputElement(
ccfs.convertNameToJSId(item.name),
ccfs.capitalizeFirst(item.speak),
item.type.toLowerCase(),
[ccfs.convertNameToJSId(item.name).toLowerCase()],
[`required='true'`, `placeholder='Nhập ${ccfs.capitalizeFirst(item.speak)}'`],
4*4
)).join('')}
${tableNotKeysProperties.map(item => ccfs.createFormInputElement(
ccfs.convertNameToJSId(item.name),
ccfs.capitalizeFirst(item.speak),
item.type.toLowerCase(),
[ccfs.convertNameToJSId(item.name).toLowerCase()],
[`placeholder='Nhập ${ccfs.capitalizeFirst(item.speak)}'`],
4*4
)).join('')}
            .modal-footer
                input.confirm.btn.btn-outline-secondary.rounded-0(type='button', value='Thêm ${ccfs.capitalizeFirst(data.speak)}')
                input.btn.btn-outline-dark.rounded-0(type='reset', value='Cài lại')
`;

    ccfs.writeStringSync(`${__dirname}/results/views/admins/${forderName}`, `quan-ly-them.pug`, contents);

    //Javascript
    //Create main.js
    contents = '';
    contents += `
\$(document).ready(function () {
    //Initialize Table
    tableQuanLy${tablenameClass} = \$('#tableQuanLy${tablenameClass}').DataTable({
        columnDefs: [
            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return \`<span class="id${tablenameClass}" data="\${data}">\${renderData}</span>\`;
                },
            },
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return \`<span class="username" data="\${data}">\${renderData}</span>\`;
                },
            },
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return \`<span class="password" data="\${data}">\${renderData}</span>\`;
                },
            },
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let typeIndex = data;
                    let renderData = ${ccfs.convertNameToJSId(data.classname)}sTypes[typeIndex] ? ${ccfs.convertNameToJSId(data.classname)}sTypes[typeIndex] : data;
                    return \`<span class="loai" data="\${data}">\${renderData}</span>\`;
                },
            },
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let ${ccfs.convertNameToJSId(data.classname)} = data;
                    let renderData = \`
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSua${tablenameClass}' id${tablenameClass}="\${${ccfs.convertNameToJSId(data.classname)}.id${tablenameClass}}">
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="delete${tablenameClass}RowInTable(\$(this));">
    <i class="fas fa-trash"></i>
</button>
\`;
                    return \`\${renderData}\`;
                },
            },
        ],
    });

    //Initialize Button Events
    \$('#refreshAll').click(function () {
        refreshPageData();
        swal({ text: 'Làm mới thành công ', icon: 'success'});
    });

    //Events

    //Initialize final
    refreshPageData();
});

//Functions
//Get data of ${ccfs.convertNameToJSId(data.classname)}Types
function get${tablenameClass}Types() {
    return new Promise(function (resolve, reject) {
        \$.post('/api/tai-khoan/types', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Get ${ccfs.convertNameToJSId(data.classname)}s
function get${tablenameClass}s() {
    return new Promise(function (resolve, reject) {
        \$.get('/api/tai-khoan', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in ${ccfs.convertNameToJSId(data.classname)}s
function refreshTableData() {
    tableQuanLy${tablenameClass}.clear();
    for (let ${ccfs.convertNameToJSId(data.classname)} of ${ccfs.convertNameToJSId(data.classname)}s) {
        tableQuanLy${tablenameClass}.row.add([${ccfs.convertNameToJSId(data.classname)}.id${tablenameClass}, ${ccfs.convertNameToJSId(data.classname)}.username, ${ccfs.convertNameToJSId(data.classname)}.password, ${ccfs.convertNameToJSId(data.classname)}.loai, ${ccfs.convertNameToJSId(data.classname)}]);
    }
    tableQuanLy${tablenameClass}.draw();
}

//Refresh all data in page
async function refreshPageData() {
    ${ccfs.convertNameToJSId(data.classname)}sTypes = await get${tablenameClass}Types();
    refreshDataInModelThem${tablenameClass}();
    refreshDataInModelSua${tablenameClass}();

    ${ccfs.convertNameToJSId(data.classname)}s = await get${tablenameClass}s();
    refreshTableData();
}    
`;

    ccfs.writeStringSync(`${__dirname}/results/publics/javascripts/admins/${forderName}`, `main.js`, contents);

    //Create sua.js
    contents = '';
    contents += `
\$(document).ready(function () {
    //Initialize Button Events
    //Sua${tablenameClass} Confirm
    \$('#modelSua${tablenameClass} .confirm').click(async function () {
        let id${tablenameClass} = \$(this).parents('form').find('.id${tablenameClass}').val();
        let username = \$(this).parents('form').find('.username').val();
        let password = \$(this).parents('form').find('.password').val();
        let re_password = \$(this).parents('form').find('.re_password').val();
        let loai = \$(this).parents('form').find('.loai').val();
        let ${ccfs.convertNameToJSId(data.classname)} = { id${tablenameClass}: id${tablenameClass}, username: username, password: password, re_password: re_password, loai: loai };

        let errors = sua${tablenameClass}Validator(${ccfs.convertNameToJSId(data.classname)});

        if (errors.length > 0) {
            refreshSua${tablenameClass}Alert(errors);
            return;
        }

        await sua${tablenameClass}AJAX(${ccfs.convertNameToJSId(data.classname)});
    });

    //Events
    //Set ${ccfs.convertNameToJSId(data.classname)} current value When model showup
    \$('#modelSua${tablenameClass}').on('show.bs.modal', function (event) {
        let sua${tablenameClass}Triggered = \$(event.relatedTarget);

        let id${tablenameClass} = sua${tablenameClass}Triggered.attr('id${tablenameClass}');
        let ${ccfs.convertNameToJSId(data.classname)} = ${ccfs.convertNameToJSId(data.classname)}s.find((item) => item.id${tablenameClass} == id${tablenameClass});

        \$('#modelSua${tablenameClass}').find('.id${tablenameClass}').val(${ccfs.convertNameToJSId(data.classname)}.id${tablenameClass});
        \$('#modelSua${tablenameClass}').find('.username').val(${ccfs.convertNameToJSId(data.classname)}.username);
        \$('#modelSua${tablenameClass}').find('.password').val(${ccfs.convertNameToJSId(data.classname)}.password);
        \$('#modelSua${tablenameClass}').find('.re_password').val(${ccfs.convertNameToJSId(data.classname)}.password);
        \$('#modelSua${tablenameClass}').find('.loai').val(${ccfs.convertNameToJSId(data.classname)}.loai);

        refreshSua${tablenameClass}Alert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model Sua${tablenameClass} with data in ${ccfs.convertNameToJSId(data.classname)}sTypes
function refreshDataInModelSua${tablenameClass}() {
    let loai = \$('#modelSua${tablenameClass} .loai');
    let loaiHtml = '';

    ${ccfs.convertNameToJSId(data.classname)}sTypes.forEach((element, index) => (loaiHtml += \`<option value="\${index}">\${element}</option>\`));

    loai.html(loaiHtml);
}

//Refresh sua ${ccfs.convertNameToJSId(data.classname)} Alert
function refreshSua${tablenameClass}Alert(alerts, type = 'danger') {
    let sua${tablenameClass}Alerts = \$('#modelSua${tablenameClass} .alerts');
    let sua${tablenameClass}AlertsHtml = '';
    for (let alert of alerts) {
        sua${tablenameClass}AlertsHtml += createAlerts(type, alert);
    }
    sua${tablenameClass}Alerts.html(sua${tablenameClass}AlertsHtml);
}

//Add new ${ccfs.convertNameToJSId(data.classname)}
function sua${tablenameClass}AJAX(${ccfs.convertNameToJSId(data.classname)}) {
    return new Promise(function (resolve, reject) {
        \$.ajax({ method: 'PATCH', url: '/api/tai-khoan', data: ${ccfs.convertNameToJSId(data.classname)} })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSua${tablenameClass}Alert(errors);
                    return;
                }

                if (result) {
                    refreshSua${tablenameClass}Alert(['Sửa thành công ' + result], 'success');

                    editRowInTable(${ccfs.convertNameToJSId(data.classname)});

                    \$("#modelSua${tablenameClass}").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success'});
                } else {
                    refreshSua${tablenameClass}Alert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = \`Mã lỗi \${error.code}, Tên lỗi \${error.message}, Nội dung lỗi \${error.detail}\`;
                    refreshSua${tablenameClass}Alert([errorString], 'danger');
                } else {
                    refreshSua${tablenameClass}Alert([data.responseText], 'danger');
                }
            });
    });
}

//Sua ${tablenameClass} validator
function sua${tablenameClass}Validator(${ccfs.convertNameToJSId(data.classname)}) {
    let errors = [];

    if (!${ccfs.convertNameToJSId(data.classname)}) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!${ccfs.convertNameToJSId(data.classname)}.id${tablenameClass}) {
        errors.push('Không thể xác định Id tài khoản ');
    }

    if (!${ccfs.convertNameToJSId(data.classname)}.username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!${ccfs.convertNameToJSId(data.classname)}.password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!${ccfs.convertNameToJSId(data.classname)}.re_password) {
        errors.push('Nhập lại Mật khẩu không được để trống ');
    }

    if (${ccfs.convertNameToJSId(data.classname)}.password != ${ccfs.convertNameToJSId(data.classname)}.re_password) {
        errors.push('Mật khẩu khác Nhập lại Mật khẩu');
    }

    if (!${ccfs.convertNameToJSId(data.classname)}.loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    return errors;
}    
`;

    ccfs.writeStringSync(`${__dirname}/results/publics/javascripts/admins/${forderName}`, `sua.js`, contents);

    //Create table-functions.js
    contents = '';
    contents += `
//Get a row in table
function getRowInTable(${ccfs.convertNameToJSId(data.classname)}) {
    return \$('#tableQuanLy${tablenameClass}').find(\`.id${tablenameClass}[data="\${${ccfs.convertNameToJSId(data.classname)}.id${tablenameClass}}"]\`).parents('tr');
}

//Add new row to table
function addNewRowToTable(${ccfs.convertNameToJSId(data.classname)}) {
    tableQuanLy${tablenameClass}.row.add([${ccfs.convertNameToJSId(data.classname)}.id${tablenameClass}, ${ccfs.convertNameToJSId(data.classname)}.username, ${ccfs.convertNameToJSId(data.classname)}.password, ${ccfs.convertNameToJSId(data.classname)}.loai, ${ccfs.convertNameToJSId(data.classname)}]).draw();

    //Change in ${ccfs.convertNameToJSId(data.classname)}s
    ${ccfs.convertNameToJSId(data.classname)}s.push({ id${tablenameClass}: ${ccfs.convertNameToJSId(data.classname)}.id${tablenameClass}, username: ${ccfs.convertNameToJSId(data.classname)}.username, password: ${ccfs.convertNameToJSId(data.classname)}.password, loai: ${ccfs.convertNameToJSId(data.classname)}.loai });
}

//Edit row in table
function editRowInTable(${ccfs.convertNameToJSId(data.classname)}) {
    let old${tablenameClass}Row = getRowInTable(${ccfs.convertNameToJSId(data.classname)});
    tableQuanLy${tablenameClass}.row(old${tablenameClass}Row).data([${ccfs.convertNameToJSId(data.classname)}.id${tablenameClass}, ${ccfs.convertNameToJSId(data.classname)}.username, ${ccfs.convertNameToJSId(data.classname)}.password, ${ccfs.convertNameToJSId(data.classname)}.loai, ${ccfs.convertNameToJSId(data.classname)}]).draw();

    //Change in ${ccfs.convertNameToJSId(data.classname)}s
    let ${ccfs.convertNameToJSId(data.classname)}Reference = ${ccfs.convertNameToJSId(data.classname)}s.find((item) => item.id${tablenameClass} == ${ccfs.convertNameToJSId(data.classname)}.id${tablenameClass});
    ${ccfs.convertNameToJSId(data.classname)}Reference.username = ${ccfs.convertNameToJSId(data.classname)}.username;
    ${ccfs.convertNameToJSId(data.classname)}Reference.password = ${ccfs.convertNameToJSId(data.classname)}.password;
    ${ccfs.convertNameToJSId(data.classname)}Reference.loai = ${ccfs.convertNameToJSId(data.classname)}.loai;
}

//Delete row in table
function deleteRowInTable(${ccfs.convertNameToJSId(data.classname)}) {
    let old${tablenameClass}Row = getRowInTable(${ccfs.convertNameToJSId(data.classname)});
    tableQuanLy${tablenameClass}.row(old${tablenameClass}Row).remove().draw();

    //Change in ${ccfs.convertNameToJSId(data.classname)}s
    ${ccfs.convertNameToJSId(data.classname)}s = ${ccfs.convertNameToJSId(data.classname)}s.filter((item) => item.id${tablenameClass} != ${ccfs.convertNameToJSId(data.classname)}.id${tablenameClass});
}
    
`;

    ccfs.writeStringSync(`${__dirname}/results/publics/javascripts/admins/${forderName}`, `table-functions.js`, contents);

    //Create them.js
    contents = '';
    contents += `
\$(document).ready(function () {
    //Initialize Button Events
    //Them${tablenameClass} Confirm
    \$('#modelThem${tablenameClass} .confirm').click(async function () {
        let username = \$(this).parents('form').find('.username').val();
        let password = \$(this).parents('form').find('.password').val();
        let re_password = \$(this).parents('form').find('.re_password').val();
        let loai = \$(this).parents('form').find('.loai').val();
        let ${ccfs.convertNameToJSId(data.classname)} = { username: username, password: password, re_password: re_password, loai: loai };

        let errors = them${tablenameClass}Validator(${ccfs.convertNameToJSId(data.classname)});

        if (errors.length > 0) {
            refreshThem${tablenameClass}Alert(errors);
            return;
        }

        await them${tablenameClass}AJAX(${ccfs.convertNameToJSId(data.classname)});
    });

    //Events
    //Set ${ccfs.convertNameToJSId(data.classname)} current value When model showup
    \$('#modelThem${tablenameClass}').on('show.bs.modal', function (event) {
        refreshThem${tablenameClass}Alert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model Them${tablenameClass} with data in ${ccfs.convertNameToJSId(data.classname)}sTypes
function refreshDataInModelThem${tablenameClass}() {
    let loai = \$('#modelThem${tablenameClass} .loai');
    let loaiHtml = '';

    ${ccfs.convertNameToJSId(data.classname)}sTypes.forEach((element, index) => (loaiHtml += \`<option value="\${index}">\${element}</option>\`));

    loai.html(loaiHtml);
}

//Refresh them ${ccfs.convertNameToJSId(data.classname)} Alert
function refreshThem${tablenameClass}Alert(alerts, type = 'danger') {
    let them${tablenameClass}Alerts = \$('#modelThem${tablenameClass} .alerts');
    let them${tablenameClass}AlertsHtml = '';
    for (let alert of alerts) {
        them${tablenameClass}AlertsHtml += createAlerts(type, alert);
    }
    them${tablenameClass}Alerts.html(them${tablenameClass}AlertsHtml);
}

//Add new ${ccfs.convertNameToJSId(data.classname)}
function them${tablenameClass}AJAX(${ccfs.convertNameToJSId(data.classname)}) {
    return new Promise(function (resolve, reject) {
        \$.ajax({ method: 'POST', url: '/api/tai-khoan', data: ${ccfs.convertNameToJSId(data.classname)} })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThem${tablenameClass}Alert(errors);
                    return;
                }

                if (result) {
                    refreshThem${tablenameClass}Alert(['Thêm thành công ' + result], 'success');

                    ${ccfs.convertNameToJSId(data.classname)}.id${tablenameClass} = result;
                    addNewRowToTable(${ccfs.convertNameToJSId(data.classname)});

                    \$('#modelThem${tablenameClass}').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' });
                } else {
                    refreshThem${tablenameClass}Alert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = \`Mã lỗi \${error.code}, Tên lỗi \${error.message}, Nội dung lỗi \${error.detail}\`;
                    refreshThem${tablenameClass}Alert([errorString], 'danger');
                } else {
                    refreshThem${tablenameClass}Alert([data.responseText], 'danger');
                }
            });
    });
}

//Them ${tablenameClass} validator
function them${tablenameClass}Validator(${ccfs.convertNameToJSId(data.classname)}) {
    let errors = [];

    if (!${ccfs.convertNameToJSId(data.classname)}) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!${ccfs.convertNameToJSId(data.classname)}.username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!${ccfs.convertNameToJSId(data.classname)}.password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!${ccfs.convertNameToJSId(data.classname)}.re_password) {
        errors.push('Nhập lại Mật khẩu không được để trống ');
    }

    if (${ccfs.convertNameToJSId(data.classname)}.password != ${ccfs.convertNameToJSId(data.classname)}.re_password) {
        errors.push('Mật khẩu khác Nhập lại Mật khẩu');
    }

    if (!${ccfs.convertNameToJSId(data.classname)}.loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    return errors;
}
    
`;

    ccfs.writeStringSync(`${__dirname}/results/publics/javascripts/admins/${forderName}`, `them.js`, contents);

    //Create variables.js
    contents = '';
    contents += `
//Variables
let ${ccfs.convertNameToJSId(data.classname)}sTypes = [];
let ${ccfs.convertNameToJSId(data.classname)}s = [];
let tableQuanLy${tablenameClass} = {};
    
`;

    ccfs.writeStringSync(`${__dirname}/results/publics/javascripts/admins/${forderName}`, `variables.js`, contents);

    //Create xoa.js
    contents = '';
    contents += `
\$(document).ready(function () {
    //Initialize Event click
    \$("#deleteAll").click(function(){
        swal({
            title: \`Bạn có chắc chắn muón xóa tài khoản tất cả không?\`,
            text: \`Không thể khôi phục dữ liệu sau khi xóa. Qúa trình sẽ xóa luôn các thông tin liên quan trong Cơ sở dữ liệu.\`,
            icon: 'warning',
            buttons: {
                confirm: { text: 'Đồng ý', value: true, visible: true, closeModal: true },
                cancel: { text: 'Không', value: false, visible: true, closeModal: true },
            },
        }).then(function (theChoosenOne) {
            if (theChoosenOne) {
                deleteAllAJAX(theChoosenOne);
            } else {
                swal('Đã hủy thao tác! Dữ liệu vẫn an toàn!');
            }
        });
    });
});

//Functions
function delete${tablenameClass}RowInTable(buttonDelete) {
    let tableRow = \$(buttonDelete).parents('tr');
    let id${tablenameClass} = \$(tableRow).find('.id${tablenameClass}').attr('data');
    let ${ccfs.convertNameToJSId(data.classname)} = ${ccfs.convertNameToJSId(data.classname)}s.find((item) => item.id${tablenameClass} == id${tablenameClass});

    swal({
        title: \`Bạn có chắc chắn muón xóa tài khoản có tên đăng nhập là "\${${ccfs.convertNameToJSId(data.classname)}.username}" không?\`,
        text: \`Không thể khôi phục dữ liệu sau khi xóa. Qúa trình sẽ xóa luôn các thông tin liên quan trong Cơ sở dữ liệu.\`,
        icon: 'warning',
        buttons: {
            confirm: { text: 'Đồng ý', value: ${ccfs.convertNameToJSId(data.classname)}, visible: true, closeModal: true },
            cancel: { text: 'Không', value: false, visible: true, closeModal: true },
        },
    }).then(function (theChoosenOne) {
        if (theChoosenOne) {
            delete${tablenameClass}AJAX(theChoosenOne);
        } else {
            swal('Đã hủy thao tác! Dữ liệu vẫn an toàn!');
        }
    });
}

//Delete ${ccfs.convertNameToJSId(data.classname)}
function delete${tablenameClass}AJAX(${ccfs.convertNameToJSId(data.classname)}) {
    \$.ajax({ method: 'DELETE', url: '/api/tai-khoan', data: { id${tablenameClass}: ${ccfs.convertNameToJSId(data.classname)}.id${tablenameClass} } })
        .done(function (data, status, xhr) {
            if (data && data > 0) {
                swal('Đã xóa thành công !', { icon: 'success' });

                let tableRow = \$('#tableQuanLy${tablenameClass}').find(\`.id${tablenameClass}[data="\${${ccfs.convertNameToJSId(data.classname)}.id${tablenameClass}}"]\`).parents('tr');
                tableQuanLy${tablenameClass}.row(tableRow).remove().draw();
            } else {
                swal('Đã xóa không thành công !', { icon: 'error' });
            }
        })
        .fail(function (data, status, xhr) {
            let errorString = 'Lỗi, ';
            if (data.error && data.error.code && data.error.message && data.error.detail) {
                errorString += \`mã lỗi \${data.error.code}, tên lỗi \${data.error.message}, nội dung \${data.error.detail} \`;
            } else {
                errorString += \`\${data}\`;
            }

            swal(errorString, { icon: 'error' });
        });
}

//Delete ${ccfs.convertNameToJSId(data.classname)}
function deleteAllAJAX() {
    \$.ajax({ method: 'DELETE', url: '/api/tai-khoan', data: {} })
        .done(function (data, status, xhr) {
            if (data && data > 0) {
                swal(\`Đã xóa thành công \${data} tài khoản !\`, { icon: 'success' });

                tableQuanLy${tablenameClass}.clear().draw();
            } else {
                swal('Đã xóa không thành công !', { icon: 'error' });
            }
        })
        .fail(function (data, status, xhr) {
            let errorString = 'Lỗi, ';
            if (data.error && data.error.code && data.error.message && data.error.detail) {
                errorString += \`mã lỗi \${data.error.code}, tên lỗi \${data.error.message}, nội dung \${data.error.detail} \`;
            } else {
                errorString += \`\${data}\`;
            }

            swal(errorString, { icon: 'error' });
        });
}
`;

    ccfs.writeStringSync(`${__dirname}/results/publics/javascripts/admins/${forderName}`, `xoa.js`, contents);
}
