const fs = require('fs');
const path = require('path');

const tableData = require('./tableData');
const ccfs = require('./createCodeFunctions');

let datas = tableData.tableData;

let contents = '';

//Create controller
contents += `/*** 
File: _item_sidebar.js 
***/
`;
contents += `
#layoutSidenav_nav
    nav#sidenavAccordion.sb-sidenav.accordion.sb-sidenav-dark
        // Menu của sidebar
        .sb-sidenav-menu.d-flex.flex-column.justtify-content-between
            .nav
                .sb-sidenav-menu-heading Nội dung chính 
                a.nav-link(class=sidebarActiveTongquat, href='/admin/tong-quat')
                    .sb-nav-link-icon
                        i.fas.fa-tachometer-alt
                    | Tổng quát 
${
    datas.map(data => {
        //Pre-process
        let tablenameFile = ccfs.convertNameToJSClass(data.classname).toLowerCase();
        let tablenameClass = ccfs.convertNameToJSClass(data.classname);
        let tablenameObject = ccfs.convertNameToSqlProperty(data.classname);

        let tableNotKeysProperties = data.properties.filter((item) => !data.keys.find((key) => key === item.name));
        let tableKeysProperties = data.properties.filter((item) => data.keys.find((key) => key === item.name));

        return `
        a.nav-link(class=sidebarActiveQuanly${tablenameFile}, href='/admin/quan-ly-${tablenameFile}')
        .sb-nav-link-icon
            i.fas.fa-user
        | Quản lý ${data.speak.toLowerCase()}
`;
    }).join('\n') 
}
        // Thông tin người dùng đăng nhập
        .sb-sidenav-footer
                .small Bạn đã đăng nhập bằng tài khoản 
                span#loginInfo(idTaiKhoan=taikhoan.idTaiKhoan, username=taikhoan.username) #{taikhoan.username}
`;

ccfs.writeStringSync(`${__dirname}/results/views/admins`, `_item_sidebar.pug`, contents);
