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

    ccfs.writeStringSync(`${__dirname}/results/views/admins`, `${forderName}.js`, contents);

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

    ccfs.writeStringSync(`${__dirname}/results/views/admins/${forderName}`, `quan-li-sua.js`, contents);

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

    ccfs.writeStringSync(`${__dirname}/results/views/admins/${forderName}`, `quan-ly-them.js`, contents);

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

`;

    ccfs.writeStringSync(`${__dirname}/results/publics/javascripts/admins/${forderName}`, `sua.js`, contents);

    //Create table-functions.js
    contents = '';
    contents += `

`;

    ccfs.writeStringSync(`${__dirname}/results/publics/javascripts/admins/${forderName}`, `table-functions.js`, contents);

    //Create them.js
    contents = '';
    contents += `

`;

    ccfs.writeStringSync(`${__dirname}/results/publics/javascripts/admins/${forderName}`, `them.js`, contents);

    //Create variables.js
    contents = '';
    contents += `

`;

    ccfs.writeStringSync(`${__dirname}/results/publics/javascripts/admins/${forderName}`, `variables.js`, contents);

    //Create xoa.js
    contents = '';
    contents += `

`;

    ccfs.writeStringSync(`${__dirname}/results/publics/javascripts/admins/${forderName}`, `xoa.js`, contents);
}
