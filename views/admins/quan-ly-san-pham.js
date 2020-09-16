
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
                        h1.mt-4 Quản lý sản phẩm
    
                        //Start Breadcrumb
                        include ../items/_item_breadscrumb
                        ///End readcrumb
                        
                        //Start Main Content
                        .card
                            .card-header
                                i.fas.fa-toolbox.mr-1
                                | Các thao tác chung
                            .card-body
                                button.btn.btn-outline-secondary.rounded-0(type='button', data-toggle='modal', data-target='#modelThemSanPham') Thêm mới  
                                span.mx-1
                                button#deleteAll.btn.btn-outline-dark.rounded-0 Xóa tất cả 
                                span.mx-1
                                button#refreshAll.btn.btn-outline-dark.rounded-0 Làm mới 
    
                        // Model thêm sản phẩm
                        include quan-ly-san-pham/quan-ly-them
    
                        // Model sửa sản phẩm
                        include quan-ly-san-pham/quan-ly-sua
    
                        //Start Table
                        .card.my-4
                            .card-header
                                i.fas.fa-table.mr-1
                                | Bảng quản lý sản phẩm 
                            .card-body
                                #tableQuanLySanPhamContainer.table-responsive
                                    table#tableQuanLySanPham.table.table-bordered.table-striped.table-hover(width='100%', cellspacing='0')
                                        thead
                                            tr
                                                th Id sản phẩm
                                                th Id loại sản phẩm
                                                th Tên
                                                th Giá
                                                th Điểm tích lũy
                                                th Ghi chú
                                                th Link ảnh
                                        tfoot
                                            tr
                                                th Id sản phẩm
                                                th Id loại sản phẩm
                                                th Tên
                                                th Giá
                                                th Điểm tích lũy
                                                th Ghi chú
                                                th Link ảnh 
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
    
        script(type="text/javascript", src="/javascripts/admins/quan-ly-san-pham/variables.js")
        script(type="text/javascript", src="/javascripts/admins/quan-ly-san-pham/table-functions.js")
        script(type="text/javascript", src="/javascripts/admins/quan-ly-san-pham/them.js")
        script(type="text/javascript", src="/javascripts/admins/quan-ly-san-pham/sua.js")
        script(type="text/javascript", src="/javascripts/admins/quan-ly-san-pham/xoa.js")
        script(type="text/javascript", src="/javascripts/admins/quan-ly-san-pham/main.js")
    
