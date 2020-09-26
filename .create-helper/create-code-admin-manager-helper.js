const fs = require('fs');
const path = require('path');

const tableData = require('./tableData');
const ccfs = require('./createCodeFunctions');

let datas = tableData.tableData;

for (let i = 0; i < datas.length; i += 1) {
    let contents = '';
    let data = datas[i];

    //Pre-process
    let tablenameRemoved = ccfs.removeNCharLowercase(data.classname);

    let tableNotKeysProperties = data.properties.filter((item) => !data.keys.find((key) => key === item.name));
    let tableKeysProperties = data.properties.filter((item) => data.keys.find((key) => key === item.name));

    let forderName = `quan-li-${tablenameRemoved}`;

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
                            button.btn.btn-outline-secondary.rounded-0(type='button', data-toggle='modal', data-target='#modelThem${tablenameRemoved}') Thêm mới  
                            span.mx-1
                            button#deleteAll.btn.btn-outline-dark.rounded-0 Xóa tất cả 
                            span.mx-1
                            button#refreshAll.btn.btn-outline-dark.rounded-0 Làm mới 

                    // Model thêm ${data.speak}
                    include ${forderName}/quan-li-them

                    // Model sửa ${data.speak}
                    include ${forderName}/quan-li-sua

                    //Start Table
                    .card.my-4
                        .card-header
                            i.fas.fa-table.mr-1
                            | Bảng quản lý ${data.speak} 
                        .card-body
                            #tableQuanLy${tablenameRemoved}Container.table-responsive
                                table#tableQuanLy${tablenameRemoved}.table.table-bordered.table-striped.table-hover(width='100%', cellspacing='0')
                                    thead
                                        tr
${data.properties.map((item) => `                                            th ${item.speak}`).join('\n')}
                                            th Thao tác 
                                    tfoot
                                        tr
${data.properties.map((item) => `                                            th ${item.speak}`).join('\n')} 
                                            th Thao tác 
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
#modelSua${tablenameRemoved}.modal.fade(tabindex='-1', role='dialog', aria-labelledby='ModelSua${tablenameRemoved} aria-labelledby', aria-hidden='true')
    .modal-dialog.modal-dialog-centered(role='document')
        form.modal-content
            .modal-header
                h5.modal-title Sửa ${data.speak} 
                button.close(type='button', data-dismiss='modal', aria-label='Close')
                    span(aria-hidden='true') &times;
            .modal-body                
                .alerts
                    // Các alert của phần này
                input.id${tablenameRemoved}(type='hidden')
${tableKeysProperties.map((item) => ccfs.createFormInputElement(ccfs.removeNCharLowercase(item.name).toLowerCase(), item.speak, item.type.toLowerCase(), [ccfs.removeNCharLowercase(item.name).toLowerCase()], [`required`, `placeholder='Nhập ${item.speak}'`], 4 * 4)).join('')}
${tableNotKeysProperties.map((item) => ccfs.createFormInputElement(ccfs.removeNCharLowercase(item.name).toLowerCase(), item.speak, item.type.toLowerCase(), [ccfs.removeNCharLowercase(item.name).toLowerCase()], [`placeholder='Nhập ${item.speak}'`, item.isNull ? `` : `required`], 4 * 4)).join('')}
            .modal-footer
                input.confirm.btn.btn-outline-secondary.rounded-0(type='button', value='Sửa ${ccfs.removeNCharLowercase(data.speak)}')
                input.btn.btn-outline-dark.rounded-0(type='reset', value='Cài lại')
`;

    ccfs.writeStringSync(`${__dirname}/results/views/admins/${forderName}`, `quan-li-sua.pug`, contents);

    //Create add
    contents = '';
    contents += `
// Model thêm ${data.speak}
#modelThem${tablenameRemoved}.modal.fade(tabindex='-1', role='dialog', aria-labelledby='Model aria-labelledby', aria-hidden='true')
    .modal-dialog.modal-dialog-centered(role='document')
        form.modal-content
            .modal-header
                h5.modal-title Thêm ${data.speak} 
                button.close(type='button', data-dismiss='modal', aria-label='Close')
                    span(aria-hidden='true') &times;
            .modal-body
                .alerts
                    // Các alert của phần này
${tableKeysProperties.length > 1 ? tableKeysProperties.map((item) => ccfs.createFormInputElement(ccfs.removeNCharLowercase(item.name).toLowerCase(), item.speak, item.type.toLowerCase(), [ccfs.removeNCharLowercase(item.name).toLowerCase()], [`required='true'`, `placeholder='Nhập ${item.speak}'`], 4 * 4)).join('') : ``}

${tableNotKeysProperties.map((item) => ccfs.createFormInputElement(ccfs.removeNCharLowercase(item.name).toLowerCase(), item.speak, item.type.toLowerCase(), [ccfs.removeNCharLowercase(item.name).toLowerCase()], [`placeholder='Nhập ${item.speak}'`, item.isNull ? `` : `required`], 4 * 4)).join('')}
            .modal-footer
                input.confirm.btn.btn-outline-secondary.rounded-0(type='button', value='Thêm ${ccfs.removeNCharLowercase(data.speak)}')
                input.btn.btn-outline-dark.rounded-0(type='reset', value='Cài lại')
`;

    ccfs.writeStringSync(`${__dirname}/results/views/admins/${forderName}`, `quan-li-them.pug`, contents);

    //Javascript
    //Create main.js
    contents = '';
    contents += `
\$(document).ready(function () {
    //Initialize Table
    tableQuanLy${tablenameRemoved} = \$('#tableQuanLy${tablenameRemoved}').DataTable({
        columnDefs: [
${data.properties
    .map(
        (item, index) => `
            {
                targets: ${index},
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return \`<span class="${ccfs.removeNCharLowercase(item.name).toLowerCase()}" data="\${data}">\${renderData}</span>\`;
                }
            },
    `
    )
    .join('')}
            {
                targets: ${data.properties.length},
                render: function (data, type, row, meta) {
                    let ${ccfs.removeNCharLowercase(data.classname)} = data;
                    let renderData = \`
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSua${tablenameRemoved}' 
${tableKeysProperties.map((item) => `${ccfs.removeNCharLowercase(item.name)}="\${${ccfs.removeNCharLowercase(data.classname)}.${ccfs.removeNCharLowercase(item.name)}}"`).join(' ')}
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="delete${tablenameRemoved}RowInTable(\$(this));">
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
        swal({ text: 'Làm mới thành công ', icon: 'success', timer: 1000});
    });

    //Events

    //Initialize final
    refreshPageData();
});

//Functions
//Get ${ccfs.removeNCharLowercase(data.classname)}s
function get${tablenameRemoved}s() {
    return new Promise(function (resolve, reject) {
        \$.get('/api/${ccfs.removeNCharLowercase(data.classname)}', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in ${ccfs.removeNCharLowercase(data.classname)}s
function refreshTableData() {
    tableQuanLy${tablenameRemoved}.clear();
    for (let ${ccfs.removeNCharLowercase(data.classname)} of ${ccfs.removeNCharLowercase(data.classname)}s) {
        tableQuanLy${tablenameRemoved}.row.add([
            ${data.properties.map((item) => `${ccfs.removeNCharLowercase(data.classname)}.${ccfs.removeNCharLowercase(item.name)}`).join(', ')}, ${ccfs.removeNCharLowercase(data.classname)}
        ]);
    }
    tableQuanLy${tablenameRemoved}.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThem${tablenameRemoved}();
    refreshDataInModelSua${tablenameRemoved}();

    ${ccfs.removeNCharLowercase(data.classname)}s = await get${tablenameRemoved}s();
    refreshTableData();
}    
`;

    ccfs.writeStringSync(`${__dirname}/results/publics/javascripts/admins/${forderName}`, `main.js`, contents);

    //Create sua.js
    contents = '';
    contents += `
\$(document).ready(function () {
    //Initialize Button Events
    //Sua${tablenameRemoved} Confirm
    \$('#modelSua${tablenameRemoved} .confirm').click(async function () {
${data.properties
    .map(
        (item) => `
        let ${ccfs.removeNCharLowercase(item.name)} = \$(this).parents('form').find('.${ccfs.removeNCharLowercase(item.name)}').val();
    `
    )
    .join('')}
        let ${ccfs.removeNCharLowercase(data.classname)} = { ${data.properties.map((item) => `${ccfs.removeNCharLowercase(item.name)} : ${ccfs.removeNCharLowercase(item.name)}`).join(', ')} };

        let errors = sua${tablenameRemoved}Validator(${ccfs.removeNCharLowercase(data.classname)});

        if (errors.length > 0) {
            refreshSua${tablenameRemoved}Alert(errors);
            return;
        }

        await sua${tablenameRemoved}AJAX(${ccfs.removeNCharLowercase(data.classname)});
    });

    //Events
    //Set ${ccfs.removeNCharLowercase(data.classname)} current value When model showup
    \$('#modelSua${tablenameRemoved}').on('show.bs.modal', function (event) {
        let sua${tablenameRemoved}Triggered = \$(event.relatedTarget);
${tableKeysProperties
    .map(
        (item) => `
        let ${ccfs.removeNCharLowercase(item.name)} = sua${tablenameRemoved}Triggered.attr('${ccfs.removeNCharLowercase(item.name)}');
    `
    )
    .join('')}

        let ${ccfs.removeNCharLowercase(data.classname)} = ${ccfs.removeNCharLowercase(data.classname)}s.find(
            (item) => ${tableKeysProperties.map((item) => `item.${ccfs.removeNCharLowercase(item.name)} == ${ccfs.removeNCharLowercase(item.name)}`).join(' && ')}
        );

${tableKeysProperties
    .map(
        (item) => `
        \$('#modelSua${tablenameRemoved}').find('.${ccfs.removeNCharLowercase(item.name)}').val(${ccfs.removeNCharLowercase(item.name)});
    `
    )
    .join('')}

${tableNotKeysProperties
    .map(
        (item) => `
        \$('#modelSua${tablenameRemoved}').find('.${ccfs.removeNCharLowercase(item.name)}').val(${ccfs.removeNCharLowercase(data.classname)}.${ccfs.removeNCharLowercase(item.name)});
    `
    )
    .join('')}

        refreshSua${tablenameRemoved}Alert([], "");
    });
});

//Functions
//Refresh data in model Sua${tablenameRemoved} with data in ${ccfs.removeNCharLowercase(data.classname)}sTypes
function refreshDataInModelSua${tablenameRemoved}() {
}

//Refresh sua ${ccfs.removeNCharLowercase(data.classname)} Alert
function refreshSua${tablenameRemoved}Alert(alerts, type = 'danger') {
    let sua${tablenameRemoved}Alerts = \$('#modelSua${tablenameRemoved} .alerts');
    let sua${tablenameRemoved}AlertsHtml = '';
    for (let alert of alerts) {
        sua${tablenameRemoved}AlertsHtml += createAlerts(type, alert);
    }
    sua${tablenameRemoved}Alerts.html(sua${tablenameRemoved}AlertsHtml);
}

//Add new ${ccfs.removeNCharLowercase(data.classname)}
function sua${tablenameRemoved}AJAX(${ccfs.removeNCharLowercase(data.classname)}) {
    return new Promise(function (resolve, reject) {
        \$.ajax({ method: 'PATCH', url: '/api/${ccfs.removeNCharLowercase(data.classname)}', data: ${ccfs.removeNCharLowercase(data.classname)} })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSua${tablenameRemoved}Alert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshSua${tablenameRemoved}Alert(['Sửa thành công ' + result], 'success');

                    editRowInTable(${ccfs.removeNCharLowercase(data.classname)});

                    \$("#modelSua${tablenameRemoved}").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSua${tablenameRemoved}Alert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = \`Mã lỗi \${error.code}, Tên lỗi \${error.message}, Nội dung lỗi \${error.detail}\`;
                    refreshSua${tablenameRemoved}Alert([errorString], 'danger');
                } else {
                    refreshSua${tablenameRemoved}Alert([data.responseText], 'danger');
                }
            });
    });
}

//Sua ${tablenameRemoved} validator
function sua${tablenameRemoved}Validator(${ccfs.removeNCharLowercase(data.classname)}) {
    let errors = [];

    if (!${ccfs.removeNCharLowercase(data.classname)}) {
        errors.push('${ccfs.removeNCharLowercase(data.speak)} không tồn tại ');
    }

${data.properties
    .map((item) =>
        item.isNull
            ? ``
            : `
    if (!${ccfs.removeNCharLowercase(data.classname)}.${ccfs.removeNCharLowercase(item.name)}) {
        errors.push('Không thể xác định ${item.speak.toLowerCase()} ');
    }
    `
    )
    .join('')}

    return errors;
}    
`;

    ccfs.writeStringSync(`${__dirname}/results/publics/javascripts/admins/${forderName}`, `sua.js`, contents);

    //Create table-functions.js
    contents = '';
    contents += `
//Get a row in table
function getRowInTable(${ccfs.removeNCharLowercase(data.classname)}) {
    return \$('#tableQuanLy${tablenameRemoved}')${tableKeysProperties.map((item) => `.find(\`.${ccfs.removeNCharLowercase(item.name)}[data="\${${ccfs.removeNCharLowercase(data.classname)}.${ccfs.removeNCharLowercase(item.name)}}"]\`).parents('tr')`).join('')};
}

//Add new row to table
function addNewRowToTable(${ccfs.removeNCharLowercase(data.classname)}) {
    tableQuanLy${tablenameRemoved}.row.add([
        ${data.properties.map((item) => `${ccfs.removeNCharLowercase(data.classname)}.${ccfs.removeNCharLowercase(item.name)}`).join(', ')}, ${ccfs.removeNCharLowercase(data.classname)}
    ]).draw();

    //Change in ${ccfs.removeNCharLowercase(data.classname)}s
    ${ccfs.removeNCharLowercase(data.classname)}s.push({ 
        ${data.properties.map((item) => `${ccfs.removeNCharLowercase(item.name)}: ${ccfs.removeNCharLowercase(data.classname)}.${ccfs.removeNCharLowercase(item.name)}`).join(', ')}
    });
}

//Edit row in table
function editRowInTable(${ccfs.removeNCharLowercase(data.classname)}) {
    let old${tablenameRemoved}Row = getRowInTable(${ccfs.removeNCharLowercase(data.classname)});
    tableQuanLy${tablenameRemoved}.row(old${tablenameRemoved}Row).data([
        ${data.properties.map((item) => `${ccfs.removeNCharLowercase(data.classname)}.${ccfs.removeNCharLowercase(item.name)}`).join(', ')}, ${ccfs.removeNCharLowercase(data.classname)}
    ]).draw();

    //Change in ${ccfs.removeNCharLowercase(data.classname)}s
    let ${ccfs.removeNCharLowercase(data.classname)}Reference = ${ccfs.removeNCharLowercase(data.classname)}s.find(
        (item) => ${tableKeysProperties.map((item) => `item.${ccfs.removeNCharLowercase(item.name)} == ${ccfs.removeNCharLowercase(data.classname)}.${ccfs.removeNCharLowercase(item.name)}`).join(' && ')}
    );
    
    ${data.properties
        .map(
            (item) => `${ccfs.removeNCharLowercase(data.classname)}Reference.${ccfs.removeNCharLowercase(item.name)} = ${ccfs.removeNCharLowercase(data.classname)}.${ccfs.removeNCharLowercase(item.name)};
    `
        )
        .join('')}
}

//Delete row in table
function deleteRowInTable(${ccfs.removeNCharLowercase(data.classname)}) {
    let old${tablenameRemoved}Row = getRowInTable(${ccfs.removeNCharLowercase(data.classname)});
    tableQuanLy${tablenameRemoved}.row(old${tablenameRemoved}Row).remove().draw();

    //Change in ${ccfs.removeNCharLowercase(data.classname)}s
    ${ccfs.removeNCharLowercase(data.classname)}s = ${ccfs.removeNCharLowercase(data.classname)}s.filter(
        (item) => ${tableKeysProperties.map((item) => `item.${ccfs.removeNCharLowercase(item.name)} != ${ccfs.removeNCharLowercase(data.classname)}.${ccfs.removeNCharLowercase(item.name)}`).join(' && ')}
    );
}
    
`;

    ccfs.writeStringSync(`${__dirname}/results/publics/javascripts/admins/${forderName}`, `table-functions.js`, contents);

    //Create them.js
    contents = '';
    contents += `
\$(document).ready(function () {
    //Initialize Button Events
    //Them${tablenameRemoved} Confirm
    \$('#modelThem${tablenameRemoved} .confirm').click(async function () {
${data.properties
    .map(
        (item) => `
        let ${ccfs.removeNCharLowercase(item.name)} = \$(this).parents('form').find('.${ccfs.removeNCharLowercase(item.name)}').val();
    `
    )
    .join('')}
        let ${ccfs.removeNCharLowercase(data.classname)} = { ${data.properties.map((item) => `${ccfs.removeNCharLowercase(item.name)} : ${ccfs.removeNCharLowercase(item.name)}`).join(', ')} };

        let errors = them${tablenameRemoved}Validator(${ccfs.removeNCharLowercase(data.classname)});

        if (errors.length > 0) {
            refreshThem${tablenameRemoved}Alert(errors);
            return;
        }

        await them${tablenameRemoved}AJAX(${ccfs.removeNCharLowercase(data.classname)});
    });

    //Events
    //Set ${ccfs.removeNCharLowercase(data.classname)} current value When model showup
    \$('#modelThem${tablenameRemoved}').on('show.bs.modal', function (event) {
        refreshThem${tablenameRemoved}Alert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model Them${tablenameRemoved} with data in ${ccfs.removeNCharLowercase(data.classname)}sTypes
function refreshDataInModelThem${tablenameRemoved}() {
}

//Refresh them ${ccfs.removeNCharLowercase(data.classname)} Alert
function refreshThem${tablenameRemoved}Alert(alerts, type = 'danger') {
    let them${tablenameRemoved}Alerts = \$('#modelThem${tablenameRemoved} .alerts');
    let them${tablenameRemoved}AlertsHtml = '';
    for (let alert of alerts) {
        them${tablenameRemoved}AlertsHtml += createAlerts(type, alert);
    }
    them${tablenameRemoved}Alerts.html(them${tablenameRemoved}AlertsHtml);
}

//Add new ${ccfs.removeNCharLowercase(data.classname)}
function them${tablenameRemoved}AJAX(${ccfs.removeNCharLowercase(data.classname)}) {
    return new Promise(function (resolve, reject) {
        \$.ajax({ method: 'POST', url: '/api/${ccfs.removeNCharLowercase(data.classname)}', data: ${ccfs.removeNCharLowercase(data.classname)} })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThem${tablenameRemoved}Alert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshThem${tablenameRemoved}Alert(['Thêm thành công ' + result], 'success');

                    ${tableKeysProperties.length == 1 ? `${ccfs.removeNCharLowercase(data.classname)}.${ccfs.removeNCharLowercase(tableKeysProperties[0].name)} = result.insertId;` : ``}                    
                    addNewRowToTable(${ccfs.removeNCharLowercase(data.classname)});

                    \$('#modelThem${tablenameRemoved}').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThem${tablenameRemoved}Alert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = \`Mã lỗi \${error.code}, Tên lỗi \${error.message}, Nội dung lỗi \${error.detail}\`;
                    refreshThem${tablenameRemoved}Alert([errorString], 'danger');
                } else {
                    refreshThem${tablenameRemoved}Alert([data.responseText], 'danger');
                }
            });
    });
}

//Them ${tablenameRemoved} validator
function them${tablenameRemoved}Validator(${ccfs.removeNCharLowercase(data.classname)}) {
    let errors = [];

    if (!${ccfs.removeNCharLowercase(data.classname)}) {
        errors.push('${ccfs.removeNCharLowercase(data.speak)} không tồn tại ');
    }

${
    tableKeysProperties.length > 1
        ? tableKeysProperties
              .map(
                  (item) => `
        if (!${ccfs.removeNCharLowercase(data.classname)}.${ccfs.removeNCharLowercase(item.name)}) {
            errors.push('Không thể xác định ${item.speak.toLowerCase()} ');
        }
        `
              )
              .join('')
        : ``
}

${tableNotKeysProperties
    .map((item) =>
        item.isNull
            ? ``
            : `
        if (!${ccfs.removeNCharLowercase(data.classname)}.${ccfs.removeNCharLowercase(item.name)}) {
            errors.push('Không thể xác định ${item.speak.toLowerCase()} ');
        }
        `
    )
    .join('')}

    return errors;
}
    
`;

    ccfs.writeStringSync(`${__dirname}/results/publics/javascripts/admins/${forderName}`, `them.js`, contents);

    //Create variables.js
    contents = '';
    contents += `
//Variables
let ${ccfs.removeNCharLowercase(data.classname)}s = [];
let tableQuanLy${tablenameRemoved} = {};
    
`;

    ccfs.writeStringSync(`${__dirname}/results/publics/javascripts/admins/${forderName}`, `variables.js`, contents);

    //Create xoa.js
    contents = '';
    contents += `
\$(document).ready(function () {
    //Initialize Event click
    \$("#deleteAll").click(function(){
        swal({
            title: \`Bạn có chắc chắn muón muốn xóa tất cả ${data.speak} không?\`,
            text: \`Không thể khôi phục dữ liệu sau khi xóa. Qúa trình sẽ xóa luôn các thông tin liên quan trong Cơ sở dữ liệu.\`,
            icon: 'warning',
            buttons: {
                confirm: { text: 'Đồng ý', value: true, visible: true, closeModal: true },
                cancel: { text: 'Không', value: false, visible: true, closeModal: true },
            }
        }).then(function (theChoosenOne) {
            if (theChoosenOne) {
                deleteAllAJAX(theChoosenOne);
            } else {
                swal('Đã hủy thao tác! Dữ liệu vẫn an toàn!', {timer: 1000});
            }
        });
    });
});

//Functions
function delete${tablenameRemoved}RowInTable(buttonDelete) {
    let tableRow = \$(buttonDelete).parents('tr');
${tableKeysProperties
    .map(
        (item) => `
    let ${ccfs.removeNCharLowercase(item.name)} = \$(tableRow).find('.${ccfs.removeNCharLowercase(item.name)}').attr('data');`
    )
    .join('')}

    let ${ccfs.removeNCharLowercase(data.classname)} = ${ccfs.removeNCharLowercase(data.classname)}s.find(
        (item) => ${tableKeysProperties.map((item) => `item.${ccfs.removeNCharLowercase(item.name)} == ${ccfs.removeNCharLowercase(item.name)}`).join(' && ')}
    );

    swal({
        title: \`Bạn có chắc chắn muón xóa ${data.speak} có ${tableKeysProperties.map((item) => `${item.speak} là "\${${ccfs.removeNCharLowercase(data.classname)}.${ccfs.removeNCharLowercase(item.name)}}"`).join(', ')} không?\`,
        text: \`Không thể khôi phục dữ liệu sau khi xóa. Qúa trình sẽ xóa luôn các thông tin liên quan trong Cơ sở dữ liệu.\`,
        icon: 'warning',
        buttons: {
            confirm: { text: 'Đồng ý', value: ${ccfs.removeNCharLowercase(data.classname)}, visible: true, closeModal: true },
            cancel: { text: 'Không', value: false, visible: true, closeModal: true },
        }
    }).then(function (theChoosenOne) {
        if (theChoosenOne) {
            delete${tablenameRemoved}AJAX(theChoosenOne);
        } else {
            swal('Đã hủy thao tác! Dữ liệu vẫn an toàn!', {timer: 1000});
        }
    });
}

//Delete ${ccfs.removeNCharLowercase(data.classname)}
function delete${tablenameRemoved}AJAX(${ccfs.removeNCharLowercase(data.classname)}) {
    \$.ajax({ method: 'DELETE', url: '/api/${ccfs.removeNCharLowercase(data.classname)}', data: { ${tableKeysProperties.map((item) => `${ccfs.removeNCharLowercase(item.name)} : ${ccfs.removeNCharLowercase(data.classname)}.${ccfs.removeNCharLowercase(item.name)}`).join(', ')} } })
        .done(function (data, status, xhr) {
            if (data && data.affectedRows > 0) {
                swal('Đã xóa thành công !', { icon: 'success' , timer: 1000});

                let tableRow = getRowInTable(${ccfs.removeNCharLowercase(data.classname)});
                tableQuanLy${tablenameRemoved}.row(tableRow).remove().draw();
            } else {
                swal('Đã xóa không thành công !', { icon: 'error' , timer: 1000});
            }
        })
        .fail(function (data, status, xhr) {
            let errorString = 'Lỗi, ';
            if (data.error && data.error.code && data.error.message && data.error.detail) {
                errorString += \`mã lỗi \${data.error.code}, tên lỗi \${data.error.message}, nội dung \${data.error.detail} \`;
            } else {
                errorString += \`\${data}\`;
            }

            swal(errorString, { icon: 'error' , timer: 1000});
        });
}

//Delete ${ccfs.removeNCharLowercase(data.classname)}
function deleteAllAJAX() {
    \$.ajax({ method: 'DELETE', url: '/api/${ccfs.removeNCharLowercase(data.classname)}', data: {} })
        .done(function (data, status, xhr) {
            if (data && data.affectedRows > 0) {
                swal(\`Đã xóa thành công \${data.affectedRows} tài khoản !\`, { icon: 'success' , timer: 1000});

                tableQuanLy${tablenameRemoved}.clear().draw();
            } else {
                swal('Đã xóa không thành công !', { icon: 'error' , timer: 1000});
            }
        })
        .fail(function (data, status, xhr) {
            let errorString = 'Lỗi, ';
            if (data.error && data.error.code && data.error.message && data.error.detail) {
                errorString += \`mã lỗi \${data.error.code}, tên lỗi \${data.error.message}, nội dung \${data.error.detail} \`;
            } else {
                errorString += \`\${data}\`;
            }

            swal(errorString, { icon: 'error' , timer: 1000});
        });
}
`;

    ccfs.writeStringSync(`${__dirname}/results/publics/javascripts/admins/${forderName}`, `xoa.js`, contents);
}
