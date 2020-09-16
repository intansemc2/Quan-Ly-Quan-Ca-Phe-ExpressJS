
// Model sửa sản phẩm
#modelSuaSanPham.modal.fade(tabindex='-1', role='dialog', aria-labelledby='ModelSuaSanPham aria-labelledby', aria-hidden='true')
    .modal-dialog.modal-dialog-centered(role='document')
        form.modal-content
            .modal-header
                h5.modal-title Sửa sản phẩm 
                button.close(type='button', data-dismiss='modal', aria-label='Close')
                    span(aria-hidden='true') &times;
            .modal-body                
                .alerts
                    // Các alert của phần này
                input.idSanPham(type='hidden')

                .form-group
                    label.small.mb-1(for='idsanpham') Id sản phẩm  
                    input#idsanpham(type='int', class='form-control py-4 idsanpham' , required='true', placeholder='Nhập Id sản phẩm')

                .form-group
                    label.small.mb-1(for='idloaisanpham') Id loại sản phẩm  
                    input#idloaisanpham(type='int', class='form-control py-4 idloaisanpham' , placeholder='Nhập Id loại sản phẩm')
                .form-group
                    label.small.mb-1(for='ten') Tên  
                    input#ten(type='string', class='form-control py-4 ten' , placeholder='Nhập Tên')
                .form-group
                    label.small.mb-1(for='gia') Giá  
                    input#gia(type='int', class='form-control py-4 gia' , placeholder='Nhập Giá')
                .form-group
                    label.small.mb-1(for='diemtichluy') Điểm tích lũy  
                    input#diemtichluy(type='int', class='form-control py-4 diemtichluy' , placeholder='Nhập Điểm tích lũy')
                .form-group
                    label.small.mb-1(for='ghichu') Ghi chú  
                    input#ghichu(type='string', class='form-control py-4 ghichu' , placeholder='Nhập Ghi chú')
                .form-group
                    label.small.mb-1(for='linkanh') Link ảnh  
                    input#linkanh(type='string', class='form-control py-4 linkanh' , placeholder='Nhập Link ảnh')
            .modal-footer
                input.confirm.btn.btn-outline-secondary.rounded-0(type='button', value='Sửa Sản phẩm')
                input.btn.btn-outline-dark.rounded-0(type='reset', value='Cài lại')
