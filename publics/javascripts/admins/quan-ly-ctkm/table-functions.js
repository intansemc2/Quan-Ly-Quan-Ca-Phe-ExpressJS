
//Get a row in table
function getRowInTable(ctkm) {
    return $('#tableQuanLyCtkm').find(`.idCtkm[data="${ctkm.idCtkm}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(ctkm) {
    tableQuanLyCtkm.row.add([ctkm.idCtkm, ctkm.username, ctkm.password, ctkm.loai, ctkm]).draw();

    //Change in ctkms
    ctkms.push({ idCtkm: ctkm.idCtkm, username: ctkm.username, password: ctkm.password, loai: ctkm.loai });
}

//Edit row in table
function editRowInTable(ctkm) {
    let oldCtkmRow = getRowInTable(ctkm);
    tableQuanLyCtkm.row(oldCtkmRow).data([ctkm.idCtkm, ctkm.username, ctkm.password, ctkm.loai, ctkm]).draw();

    //Change in ctkms
    let ctkmReference = ctkms.find((item) => item.idCtkm == ctkm.idCtkm);
    ctkmReference.username = ctkm.username;
    ctkmReference.password = ctkm.password;
    ctkmReference.loai = ctkm.loai;
}

//Delete row in table
function deleteRowInTable(ctkm) {
    let oldCtkmRow = getRowInTable(ctkm);
    tableQuanLyCtkm.row(oldCtkmRow).remove().draw();

    //Change in ctkms
    ctkms = ctkms.filter((item) => item.idCtkm != ctkm.idCtkm);
}
    
