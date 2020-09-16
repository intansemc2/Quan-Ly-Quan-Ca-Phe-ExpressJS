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
#modelSuaTaiKhoan.modal.fade(tabindex='-1', role='dialog', aria-labelledby='ModelSuaTaiKhoan aria-labelledby', aria-hidden='true')
    .modal-dialog.modal-dialog-centered(role='document')
        form.modal-content
            .modal-header
                h5.modal-title Sửa ${data.speak} 
                button.close(type='button', data-dismiss='modal', aria-label='Close')
                    span(aria-hidden='true') &times;
            .modal-body                
                .alerts
                    // Các alert của phần này
                input.idTaiKhoan(type='hidden')
                .form-group
                    label.small.mb-1(for='suaTaiKhoanUsername') Tên đăng nhập  
                    input#suaTaiKhoanUsername.form-control.py-4.username(type='text', placeholder='Nhập tên đăng nhập của bạn')
                .form-group
                    label.small.mb-1(for='suaTaiKhoanPassword') Mật khẩu 
                    input#suaTaiKhoanPassword.form-control.py-4.password(type='password', placeholder='Nhập mật khẩu của bạn')
                .form-group
                    label.small.mb-1(for='suaTaiKhoanConfirmPassword') Nhập lại mật khẩu 
                    input#suaTaiKhoanConfirmPassword.form-control.py-4.re_password(type='password', placeholder='Nhập lại mật khẩu của bạn')
                .form-group
                    label.small.mb-1(for='suaTaiKhoanLoaiTaiKhoan') Loại ${data.speak} 
                    select#suaTaiKhoanLoaiTaiKhoan.form-control.loai
            .modal-footer
                input.confirm.btn.btn-outline-secondary.rounded-0(type='button', value='Sửa Tài khoản')
                input.btn.btn-outline-dark.rounded-0(type='reset', value='Cài lại')
`;

    ccfs.writeStringSync(`${__dirname}/results/views/admins`, `${forderName}.js`, contents);

    //Create Add
    contents = '';
    contents += `

    `;

    ccfs.writeStringSync(`${__dirname}/results/views/admins`, `${forderName}.js`, contents);

}
