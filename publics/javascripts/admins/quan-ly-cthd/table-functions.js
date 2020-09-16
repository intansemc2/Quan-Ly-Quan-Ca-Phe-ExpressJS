
//Get a row in table
function getRowInTable(cthd) {
    return $('#tableQuanLyCthd').find(`.idCthd[data="${cthd.idCthd}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(cthd) {
    tableQuanLyCthd.row.add([cthd.idCthd, cthd.username, cthd.password, cthd.loai, cthd]).draw();

    //Change in cthds
    cthds.push({ idCthd: cthd.idCthd, username: cthd.username, password: cthd.password, loai: cthd.loai });
}

//Edit row in table
function editRowInTable(cthd) {
    let oldCthdRow = getRowInTable(cthd);
    tableQuanLyCthd.row(oldCthdRow).data([cthd.idCthd, cthd.username, cthd.password, cthd.loai, cthd]).draw();

    //Change in cthds
    let cthdReference = cthds.find((item) => item.idCthd == cthd.idCthd);
    cthdReference.username = cthd.username;
    cthdReference.password = cthd.password;
    cthdReference.loai = cthd.loai;
}

//Delete row in table
function deleteRowInTable(cthd) {
    let oldCthdRow = getRowInTable(cthd);
    tableQuanLyCthd.row(oldCthdRow).remove().draw();

    //Change in cthds
    cthds = cthds.filter((item) => item.idCthd != cthd.idCthd);
}
    
