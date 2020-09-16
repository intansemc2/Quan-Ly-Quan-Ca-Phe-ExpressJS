
// Model sửa chi tiết khuyến mãi
#modelSuaCtkm.modal.fade(tabindex='-1', role='dialog', aria-labelledby='ModelSuaCtkm aria-labelledby', aria-hidden='true')
    .modal-dialog.modal-dialog-centered(role='document')
        form.modal-content
            .modal-header
                h5.modal-title Sửa chi tiết khuyến mãi 
                button.close(type='button', data-dismiss='modal', aria-label='Close')
                    span(aria-hidden='true') &times;
            .modal-body                
                .alerts
                    // Các alert của phần này
                input.idCtkm(type='hidden')

                .form-group
                    label.small.mb-1(for='idkhuyenmai') Id khuyến mãi  
                    input#idkhuyenmai(type='int', class='form-control py-4 idkhuyenmai' , required='true', placeholder='Nhập Id khuyến mãi')
                .form-group
                    label.small.mb-1(for='idsanpham') Id sản phẩm  
                    input#idsanpham(type='int', class='form-control py-4 idsanpham' , required='true', placeholder='Nhập Id sản phẩm')

                .form-group
                    label.small.mb-1(for='soluong') Số lượng  
                    input#soluong(type='int', class='form-control py-4 soluong' , placeholder='Nhập Số lượng')
                .form-group
                    label.small.mb-1(for='dongia') Đơn giá  
                    input#dongia(type='int', class='form-control py-4 dongia' , placeholder='Nhập Đơn giá')
                .form-group
                    label.small.mb-1(for='diemtichluy') Điểm tích lũy  
                    input#diemtichluy(type='int', class='form-control py-4 diemtichluy' , placeholder='Nhập Điểm tích lũy')
            .modal-footer
                input.confirm.btn.btn-outline-secondary.rounded-0(type='button', value='Sửa Chi tiết khuyến mãi')
                input.btn.btn-outline-dark.rounded-0(type='reset', value='Cài lại')
