
//Get a row in table
function getRowInTable(ban) {
    return $('#tableQuanLyban').find(`.maBan[data="${ban.maBan}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(ban) {
    tableQuanLyban.row.add([
        ban.maBan, ban.ten, ban
    ]).draw();

    //Change in bans
    bans.push({ 
        maBan: ban.maBan, ten: ban.ten
    });
}

//Edit row in table
function editRowInTable(ban) {
    let oldbanRow = getRowInTable(ban);
    tableQuanLyban.row(oldbanRow).data([
        ban.maBan, ban.ten, ban
    ]).draw();

    //Change in bans
    let banReference = bans.find(
        (item) => item.maBan == ban.maBan
    );
    
    banReference.maBan = ban.maBan;
    banReference.ten = ban.ten;
    
}

//Delete row in table
function deleteRowInTable(ban) {
    let oldbanRow = getRowInTable(ban);
    tableQuanLyban.row(oldbanRow).remove().draw();

    //Change in bans
    bans = bans.filter(
        (item) => item.maBan != ban.maBan
    );
}
    
