
//Get a row in table
function getRowInTable(khuyenmai) {
    return $('#tableQuanLyKhuyenMai').find(`.idKhuyenMai[data="${khuyenmai.idKhuyenMai}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(khuyenmai) {
    tableQuanLyKhuyenMai.row.add([khuyenmai.idKhuyenMai, khuyenmai.username, khuyenmai.password, khuyenmai.loai, khuyenmai]).draw();

    //Change in khuyenmais
    khuyenmais.push({ idKhuyenMai: khuyenmai.idKhuyenMai, username: khuyenmai.username, password: khuyenmai.password, loai: khuyenmai.loai });
}

//Edit row in table
function editRowInTable(khuyenmai) {
    let oldKhuyenMaiRow = getRowInTable(khuyenmai);
    tableQuanLyKhuyenMai.row(oldKhuyenMaiRow).data([khuyenmai.idKhuyenMai, khuyenmai.username, khuyenmai.password, khuyenmai.loai, khuyenmai]).draw();

    //Change in khuyenmais
    let khuyenmaiReference = khuyenmais.find((item) => item.idKhuyenMai == khuyenmai.idKhuyenMai);
    khuyenmaiReference.username = khuyenmai.username;
    khuyenmaiReference.password = khuyenmai.password;
    khuyenmaiReference.loai = khuyenmai.loai;
}

//Delete row in table
function deleteRowInTable(khuyenmai) {
    let oldKhuyenMaiRow = getRowInTable(khuyenmai);
    tableQuanLyKhuyenMai.row(oldKhuyenMaiRow).remove().draw();

    //Change in khuyenmais
    khuyenmais = khuyenmais.filter((item) => item.idKhuyenMai != khuyenmai.idKhuyenMai);
}
    
