
// Model sửa thanh toán hóa đơn
#modelSuaThanhToanHoaDon.modal.fade(tabindex='-1', role='dialog', aria-labelledby='ModelSuaThanhToanHoaDon aria-labelledby', aria-hidden='true')
    .modal-dialog.modal-dialog-centered(role='document')
        form.modal-content
            .modal-header
                h5.modal-title Sửa thanh toán hóa đơn 
                button.close(type='button', data-dismiss='modal', aria-label='Close')
                    span(aria-hidden='true') &times;
            .modal-body                
                .alerts
                    // Các alert của phần này
                input.idThanhToanHoaDon(type='hidden')

                .form-group
                    label.small.mb-1(for='idhoadon') Id hóa đơn  
                    input#idhoadon(type='int', class='form-control py-4 idhoadon' , required='true', placeholder='Nhập Id hóa đơn')
                .form-group
                    label.small.mb-1(for='idtaikhoanthanhtoan') Id tài khoản thanh toán  
                    input#idtaikhoanthanhtoan(type='int', class='form-control py-4 idtaikhoanthanhtoan' , required='true', placeholder='Nhập Id tài khoản thanh toán')
                .form-group
                    label.small.mb-1(for='thoigianthanhtoan') Thời gian thanh toán  
                    input#thoigianthanhtoan(type='datetime', class='form-control py-4 thoigianthanhtoan' , required='true', placeholder='Nhập Thời gian thanh toán')

                .form-group
                    label.small.mb-1(for='phantramtichluy') Phần trăm tích lũy  
                    input#phantramtichluy(type='float', class='form-control py-4 phantramtichluy' , placeholder='Nhập Phần trăm tích lũy')
                .form-group
                    label.small.mb-1(for='soluongdiemdoi') Số lượng điểm đổi  
                    input#soluongdiemdoi(type='int', class='form-control py-4 soluongdiemdoi' , placeholder='Nhập Số lượng điểm đổi')
                .form-group
                    label.small.mb-1(for='tygiadiemdoi') Tỷ giá quy đổi  
                    input#tygiadiemdoi(type='float', class='form-control py-4 tygiadiemdoi' , placeholder='Nhập Tỷ giá quy đổi')
            .modal-footer
                input.confirm.btn.btn-outline-secondary.rounded-0(type='button', value='Sửa Thanh toán hóa đơn')
                input.btn.btn-outline-dark.rounded-0(type='reset', value='Cài lại')
