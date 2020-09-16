
    // Model thêm loại sản phẩm
    #modelThemLoaiSanPham.modal.fade(tabindex='-1', role='dialog', aria-labelledby='Model aria-labelledby', aria-hidden='true')
        .modal-dialog.modal-dialog-centered(role='document')
            form.modal-content
                .modal-header
                    h5.modal-title Thêm loại sản phẩm 
                    button.close(type='button', data-dismiss='modal', aria-label='Close')
                        span(aria-hidden='true') &times;
                .modal-body
                    .alerts
                        // Các alert của phần này

                .form-group
                    label.small.mb-1(for='idloaisanpham') Id loại sản phẩm  
                    input#idloaisanpham(type='int', class='form-control py-4 idloaisanpham' , required='true', placeholder='Nhập Id loại sản phẩm')

                .form-group
                    label.small.mb-1(for='ten') Tên  
                    input#ten(type='string', class='form-control py-4 ten' , placeholder='Nhập Tên')
                .form-group
                    label.small.mb-1(for='linkanh') Link ảnh  
                    input#linkanh(type='string', class='form-control py-4 linkanh' , placeholder='Nhập Link ảnh')
                .form-group
                    label.small.mb-1(for='ghichu') Ghi chú  
                    input#ghichu(type='string', class='form-control py-4 ghichu' , placeholder='Nhập Ghi chú')
                .modal-footer
                    input.confirm.btn.btn-outline-secondary.rounded-0(type='button', value='Thêm Loại sản phẩm')
                    input.btn.btn-outline-dark.rounded-0(type='reset', value='Cài lại')
