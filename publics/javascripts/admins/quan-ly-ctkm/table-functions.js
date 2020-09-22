
//Get a row in table
function getRowInTable(ctkm) {
    return $('#tableQuanLyCtkm').find(`.idKhuyenMai[data="${ctkm.idKhuyenMai}"]`).parents('tr').find(`.idSanPham[data="${ctkm.idSanPham}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(ctkm) {
    tableQuanLyCtkm.row.add([
        ctkm.idKhuyenMai, ctkm.idSanPham, ctkm.soLuong, ctkm.donGia, ctkm.diemTichLuy, ctkm
    ]).draw();

    //Change in ctkms
    ctkms.push({ 
        idKhuyenMai: ctkm.idKhuyenMai, idSanPham: ctkm.idSanPham, soLuong: ctkm.soLuong, donGia: ctkm.donGia, diemTichLuy: ctkm.diemTichLuy
    });
}

//Edit row in table
function editRowInTable(ctkm) {
    let oldCtkmRow = getRowInTable(ctkm);
    tableQuanLyCtkm.row(oldCtkmRow).data([
        ctkm.idKhuyenMai, ctkm.idSanPham, ctkm.soLuong, ctkm.donGia, ctkm.diemTichLuy, ctkm
    ]).draw();

    //Change in ctkms
    let ctkmReference = ctkms.find(
        (item) => item.idKhuyenMai == ctkm.idKhuyenMai && item.idSanPham == ctkm.idSanPham
    );
    
    ctkmReference.idKhuyenMai = ctkm.idKhuyenMai;
    ctkmReference.idSanPham = ctkm.idSanPham;
    ctkmReference.soLuong = ctkm.soLuong;
    ctkmReference.donGia = ctkm.donGia;
    ctkmReference.diemTichLuy = ctkm.diemTichLuy;
    
}

//Delete row in table
function deleteRowInTable(ctkm) {
    let oldCtkmRow = getRowInTable(ctkm);
    tableQuanLyCtkm.row(oldCtkmRow).remove().draw();

    //Change in ctkms
    ctkms = ctkms.filter(
        (item) => item.idKhuyenMai != ctkm.idKhuyenMai && item.idSanPham != ctkm.idSanPham
    );
}
    
