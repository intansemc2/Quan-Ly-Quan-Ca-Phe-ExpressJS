
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
                        h1.mt-4 Quản lý đặt bàn
    
                        //Start Breadcrumb
                        include ../items/_item_breadscrumb
                        ///End readcrumb
                        
                        //Start Main Content
                        .card
                            .card-header
                                i.fas.fa-toolbox.mr-1
                                | Các thao tác chung
                            .card-body
                                button.btn.btn-outline-secondary.rounded-0(type='button', data-toggle='modal', data-target='#modelThemDatBan') Thêm mới  
                                span.mx-1
                                button#deleteAll.btn.btn-outline-dark.rounded-0 Xóa tất cả 
                                span.mx-1
                                button#refreshAll.btn.btn-outline-dark.rounded-0 Làm mới 
    
                        // Model thêm đặt bàn
                        include quan-ly-dat-ban/quan-ly-them
    
                        // Model sửa đặt bàn
                        include quan-ly-dat-ban/quan-ly-sua
    
                        //Start Table
                        .card.my-4
                            .card-header
                                i.fas.fa-table.mr-1
                                | Bảng quản lý đặt bàn 
                            .card-body
                                #tableQuanLyDatBanContainer.table-responsive
                                    table#tableQuanLyDatBan.table.table-bordered.table-striped.table-hover(width='100%', cellspacing='0')
                                        thead
                                            tr
                                                th Id khách hàng 
                                                th Id bàn
                                                th Thời gian lập
                                                th Thời gian nhận
                                                th Ghi chú
                                        tfoot
                                            tr
                                                th Id khách hàng 
                                                th Id bàn
                                                th Thời gian lập
                                                th Thời gian nhận
                                                th Ghi chú 
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
    
        script(type="text/javascript", src="/javascripts/admins/quan-ly-dat-ban/variables.js")
        script(type="text/javascript", src="/javascripts/admins/quan-ly-dat-ban/table-functions.js")
        script(type="text/javascript", src="/javascripts/admins/quan-ly-dat-ban/them.js")
        script(type="text/javascript", src="/javascripts/admins/quan-ly-dat-ban/sua.js")
        script(type="text/javascript", src="/javascripts/admins/quan-ly-dat-ban/xoa.js")
        script(type="text/javascript", src="/javascripts/admins/quan-ly-dat-ban/main.js")
    
