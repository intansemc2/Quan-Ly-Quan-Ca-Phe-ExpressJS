
    // Model thêm bàn
    #modelThemBan.modal.fade(tabindex='-1', role='dialog', aria-labelledby='Model aria-labelledby', aria-hidden='true')
        .modal-dialog.modal-dialog-centered(role='document')
            form.modal-content
                .modal-header
                    h5.modal-title Thêm bàn 
                    button.close(type='button', data-dismiss='modal', aria-label='Close')
                        span(aria-hidden='true') &times;
                .modal-body
                    .alerts
                        // Các alert của phần này

                .form-group
                    label.small.mb-1(for='idban') Id bàn  
                    input#idban(type='int', class='form-control py-4 idban' , required='true', placeholder='Nhập Id bàn')

                .form-group
                    label.small.mb-1(for='ten') Tên bàn  
                    input#ten(type='string', class='form-control py-4 ten' , placeholder='Nhập Tên bàn')
                .form-group
                    label.small.mb-1(for='ghichu') Loại bàn  
                    input#ghichu(type='int', class='form-control py-4 ghichu' , placeholder='Nhập Loại bàn')
                .modal-footer
                    input.confirm.btn.btn-outline-secondary.rounded-0(type='button', value='Thêm Bàn')
                    input.btn.btn-outline-dark.rounded-0(type='reset', value='Cài lại')
