const fs = require('fs');
const path = require('path');

const tableData = require('./tableData');
const ccfs = require('./createCodeFunctions');

let datas = tableData.tableData;

let contents = '';

//Create controller
contents += `
#layoutSidenav_nav
    nav#sidenavAccordion.sb-sidenav.accordion.sb-sidenav-dark
        // Menu của sidebar
        .sb-sidenav-menu
            .nav
                .sb-sidenav-menu-heading Nội dung chính 
                a.nav-link(class=sidebarActiveTongquat, href='/admin/tong-quat')
                    .sb-nav-link-icon
                        i.fas.fa-tachometer-alt
                    | Tổng quát 
${
    datas.map(data => {
        //Pre-process
        let tablenameRemoved = ccfs.removeNCharLowercase(data.classname);

        return `
                a.nav-link(class=sidebarActiveQuanly${tablenameRemoved}, href='/admin/quan-li-${tablenameRemoved}')
                    .sb-nav-link-icon
                        i.fas.fa-user
                    | Quản lý ${data.speak.toLowerCase()}
`;
    }).join('\n') 
}
        // Thông tin người dùng đăng nhập
        .sb-sidenav-footer
            .small Bạn đã đăng nhập bằng tài khoản 
            span#loginInfo(maTaiKhoan=taiKhoan.maTaiKhoan, tenDangNhap=taiKhoan.tenDangNhap) #{taiKhoan.tenDangNhap}
`;

ccfs.writeStringSync(`${__dirname}/results/views/admins`, `_item_sidebar.pug`, contents);
