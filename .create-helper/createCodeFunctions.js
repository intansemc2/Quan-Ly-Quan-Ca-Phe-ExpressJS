const fs = require('fs');

//Convert string
module.exports.capitalize = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
};
module.exports.capitalizeFirst = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
};
module.exports.lowercaseFirst = (input) => {
    return input.charAt(0).toLowerCase() + input.slice(1);
};
module.exports.convertTableNameToSqlProperty = (name) => {
    return name.toLowerCase();
};
module.exports.convertNameToSqlProperty = (name) => {
    return name.toUpperCase();
};
module.exports.convertNameToJSClass = (name) => {
    return name
        .toLowerCase()
        .split('_')
        .map((item) => (module.exports.capitalizeFirst(item)))
        .join('');
};
module.exports.convertNameToJSProperty = (name) => {
    return module.exports.lowercaseFirst(
        name
            .toLowerCase()
            .split('_')
            .map((item) => module.exports.capitalizeFirst(item))
            .join('')
    );
};
module.exports.convertNameToJSId = (name) => {
    return name        
        .split('_')
        .join('')
        .toLowerCase();
};
module.exports.convertTableNameToFolderName = (tableName) => {
    return tableName.replace(/_/g, '-').toLowerCase();
};

//Create form
module.exports.createFormInputElement = (id, label, type, otherClasses, otherAttributes, firstEachLine) => {
    let extraClass = otherClasses ? `${otherClasses.join(' ')}` : '';
    let extraAttribute = otherAttributes ? `, ${otherAttributes.join(', ')}` : '';
    let extraSpaces = Array(firstEachLine).fill(' ').join('');
    return `
${extraSpaces}.form-group
${extraSpaces}    label.small.mb-1(for='${id}') ${label}  
${extraSpaces}    input#${id}(type='${type}', class='form-control py-4 ${extraClass}' ${extraAttribute})`;
}

//Write to file
module.exports.writeStringSync = (path, filename, content) => {
    //Check dir exists
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {recursive: true});
    }
    //Write code to file
    fs.writeFileSync(`${path}/${filename}`, content, { encoding: 'utf8' });
};
