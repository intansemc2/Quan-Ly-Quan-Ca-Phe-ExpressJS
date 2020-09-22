
//Get a row in table
function getRowInTable(khuyenMai) {
    return $('#tableQuanLyKhuyenMai').find(`.idKhuyenMai[data="${khuyenMai.idKhuyenMai}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(khuyenMai) {
    tableQuanLyKhuyenMai.row.add([
        khuyenMai.idKhuyenMai, khuyenMai.ten, khuyenMai.thoiGianDienRa, khuyenMai.thoiGianKetThuc, khuyenMai
    ]).draw();

    //Change in khuyenMais
    khuyenMais.push({ 
        idKhuyenMai: khuyenMai.idKhuyenMai, ten: khuyenMai.ten, thoiGianDienRa: khuyenMai.thoiGianDienRa, thoiGianKetThuc: khuyenMai.thoiGianKetThuc
    });
}

//Edit row in table
function editRowInTable(khuyenMai) {
    let oldKhuyenMaiRow = getRowInTable(khuyenMai);
    tableQuanLyKhuyenMai.row(oldKhuyenMaiRow).data([
        khuyenMai.idKhuyenMai, khuyenMai.ten, khuyenMai.thoiGianDienRa, khuyenMai.thoiGianKetThuc, khuyenMai
    ]).draw();

    //Change in khuyenMais
    let khuyenMaiReference = khuyenMais.find(
        (item) => item.idKhuyenMai == khuyenMai.idKhuyenMai
    );
    
    khuyenMaiReference.idKhuyenMai = khuyenMai.idKhuyenMai;
    khuyenMaiReference.ten = khuyenMai.ten;
    khuyenMaiReference.thoiGianDienRa = khuyenMai.thoiGianDienRa;
    khuyenMaiReference.thoiGianKetThuc = khuyenMai.thoiGianKetThuc;
    
}

//Delete row in table
function deleteRowInTable(khuyenMai) {
    let oldKhuyenMaiRow = getRowInTable(khuyenMai);
    tableQuanLyKhuyenMai.row(oldKhuyenMaiRow).remove().draw();

    //Change in khuyenMais
    khuyenMais = khuyenMais.filter(
        (item) => item.idKhuyenMai != khuyenMai.idKhuyenMai
    );
}
    
