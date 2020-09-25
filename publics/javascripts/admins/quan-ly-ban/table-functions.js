
//Get a row in table
function getRowInTable(ban) {
    return $('#tableQuanLyBan').find(`.maban[data="${ban.maban}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(ban) {
    tableQuanLyBan.row.add([
        ban.maban, ban.ten, ban
    ]).draw();

    //Change in bans
    bans.push({ 
        maban: ban.maban, ten: ban.ten
    });
}

//Edit row in table
function editRowInTable(ban) {
    let oldBanRow = getRowInTable(ban);
    tableQuanLyBan.row(oldBanRow).data([
        ban.maban, ban.ten, ban
    ]).draw();

    //Change in bans
    let banReference = bans.find(
        (item) => item.maban == ban.maban
    );
    
    banReference.maban = ban.maban;
    banReference.ten = ban.ten;
    
}

//Delete row in table
function deleteRowInTable(ban) {
    let oldBanRow = getRowInTable(ban);
    tableQuanLyBan.row(oldBanRow).remove().draw();

    //Change in bans
    bans = bans.filter(
        (item) => item.maban != ban.maban
    );
}
    
