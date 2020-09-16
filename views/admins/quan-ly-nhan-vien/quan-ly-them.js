
    // Model thêm nhân viên
    #modelThemNhanVien.modal.fade(tabindex='-1', role='dialog', aria-labelledby='Model aria-labelledby', aria-hidden='true')
        .modal-dialog.modal-dialog-centered(role='document')
            form.modal-content
                .modal-header
                    h5.modal-title Thêm nhân viên 
                    button.close(type='button', data-dismiss='modal', aria-label='Close')
                        span(aria-hidden='true') &times;
                .modal-body
                    .alerts
                        // Các alert của phần này

                .form-group
                    label.small.mb-1(for='idnhanvien') Id nhân viên  
                    input#idnhanvien(type='int', class='form-control py-4 idnhanvien' , required='true', placeholder='Nhập Id nhân viên')

                .form-group
                    label.small.mb-1(for='ten') Tên  
                    input#ten(type='string', class='form-control py-4 ten' , placeholder='Nhập Tên')
                .form-group
                    label.small.mb-1(for='sdt') Số điện thoại  
                    input#sdt(type='string', class='form-control py-4 sdt' , placeholder='Nhập Số điện thoại')
                .form-group
                    label.small.mb-1(for='loai') Loại  
                    input#loai(type='int', class='form-control py-4 loai' , placeholder='Nhập Loại')
                .form-group
                    label.small.mb-1(for='idtaikhoan') Id tài khoản  
                    input#idtaikhoan(type='int', class='form-control py-4 idtaikhoan' , placeholder='Nhập Id tài khoản')
                .form-group
                    label.small.mb-1(for='ngaysinh') Ngày sinh  
                    input#ngaysinh(type='date', class='form-control py-4 ngaysinh' , placeholder='Nhập Ngày sinh')
                .form-group
                    label.small.mb-1(for='linkanh') Link ảnh  
                    input#linkanh(type='text', class='form-control py-4 linkanh' , placeholder='Nhập Link ảnh')
                .form-group
                    label.small.mb-1(for='email') Email  
                    input#email(type='text', class='form-control py-4 email' , placeholder='Nhập Email')
                .modal-footer
                    input.confirm.btn.btn-outline-secondary.rounded-0(type='button', value='Thêm Nhân viên')
                    input.btn.btn-outline-dark.rounded-0(type='reset', value='Cài lại')
