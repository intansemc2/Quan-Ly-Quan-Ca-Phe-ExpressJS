
    // Model thêm tài khoản
    #modelThemTaiKhoan.modal.fade(tabindex='-1', role='dialog', aria-labelledby='Model aria-labelledby', aria-hidden='true')
        .modal-dialog.modal-dialog-centered(role='document')
            form.modal-content
                .modal-header
                    h5.modal-title Thêm tài khoản 
                    button.close(type='button', data-dismiss='modal', aria-label='Close')
                        span(aria-hidden='true') &times;
                .modal-body
                    .alerts
                        // Các alert của phần này

                .form-group
                    label.small.mb-1(for='idtaikhoan') Id tài khoản  
                    input#idtaikhoan(type='int', class='form-control py-4 idtaikhoan' , required='true', placeholder='Nhập Id tài khoản')

                .form-group
                    label.small.mb-1(for='username') Tên đăng nhập  
                    input#username(type='string', class='form-control py-4 username' , placeholder='Nhập Tên đăng nhập')
                .form-group
                    label.small.mb-1(for='password') Mật khẩu  
                    input#password(type='string', class='form-control py-4 password' , placeholder='Nhập Mật khẩu')
                .form-group
                    label.small.mb-1(for='loai') Loại  
                    input#loai(type='int', class='form-control py-4 loai' , placeholder='Nhập Loại')
                .modal-footer
                    input.confirm.btn.btn-outline-secondary.rounded-0(type='button', value='Thêm Tài khoản')
                    input.btn.btn-outline-dark.rounded-0(type='reset', value='Cài lại')
