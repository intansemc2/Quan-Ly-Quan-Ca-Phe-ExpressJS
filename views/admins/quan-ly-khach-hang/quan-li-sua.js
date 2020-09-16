
// Model sửa khách hàng
#modelSuaKhachHang.modal.fade(tabindex='-1', role='dialog', aria-labelledby='ModelSuaKhachHang aria-labelledby', aria-hidden='true')
    .modal-dialog.modal-dialog-centered(role='document')
        form.modal-content
            .modal-header
                h5.modal-title Sửa khách hàng 
                button.close(type='button', data-dismiss='modal', aria-label='Close')
                    span(aria-hidden='true') &times;
            .modal-body                
                .alerts
                    // Các alert của phần này
                input.idKhachHang(type='hidden')

                .form-group
                    label.small.mb-1(for='idkhachhang') Id khách hàng  
                    input#idkhachhang(type='int', class='form-control py-4 idkhachhang' , required='true', placeholder='Nhập Id khách hàng')

                .form-group
                    label.small.mb-1(for='ten') Tên  
                    input#ten(type='string', class='form-control py-4 ten' , placeholder='Nhập Tên')
                .form-group
                    label.small.mb-1(for='sdt') Số điện thoại  
                    input#sdt(type='string', class='form-control py-4 sdt' , placeholder='Nhập Số điện thoại')
                .form-group
                    label.small.mb-1(for='idtaikhoan') Id tài khoản  
                    input#idtaikhoan(type='int', class='form-control py-4 idtaikhoan' , placeholder='Nhập Id tài khoản')
                .form-group
                    label.small.mb-1(for='diemtichluy') Điểm tích lũy  
                    input#diemtichluy(type='int', class='form-control py-4 diemtichluy' , placeholder='Nhập Điểm tích lũy')
                .form-group
                    label.small.mb-1(for='email') Email  
                    input#email(type='text', class='form-control py-4 email' , placeholder='Nhập Email')
                .form-group
                    label.small.mb-1(for='google') Google  
                    input#google(type='text', class='form-control py-4 google' , placeholder='Nhập Google')
                .form-group
                    label.small.mb-1(for='facebook') Facebook  
                    input#facebook(type='text', class='form-control py-4 facebook' , placeholder='Nhập Facebook')
            .modal-footer
                input.confirm.btn.btn-outline-secondary.rounded-0(type='button', value='Sửa Khách hàng')
                input.btn.btn-outline-dark.rounded-0(type='reset', value='Cài lại')
