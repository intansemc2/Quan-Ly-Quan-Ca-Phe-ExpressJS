const fs = require('fs');

//Convert string

//Return: abcdef -> Abcdef
module.exports.capitalize = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
};

// //Return: abcdEf -> AbcdEf
// module.exports.capitalizeFirst = (input) => {
//     return input.charAt(0).toUpperCase() + input.slice(1);
// };

// //Return: ABCDEF -> aBCDEF
// module.exports.lowercaseFirst = (input) => {
//     return input.charAt(0).toLowerCase() + input.slice(1);
// };

// //Return: ABCdef -> abcdef
// module.exports.convertTableNameToSqlProperty = (name) => {
//     return name.toLowerCase();
// };

// //Return: ABCdef -> ABCDEF
// module.exports.convertNameToSqlProperty = (name) => {
//     return name.toUpperCase();
// };

// //Return: ABC_DEF -> AbcDef
// module.exports.convertNameToJSClass = (name) => {
//     return module.exports.capitalizeFirst(
//         name
//         .toLowerCase()
//         .split(/[^a-zA-Z0-9]/)
//         .map((item) => (module.exports.capitalizeFirst(item)))
//         .join('')
//     );
// };

// //Return: ABC_DEF -> abcDef
// module.exports.convertNameToJSProperty = (name) => {
//     return module.exports.lowercaseFirst(
//         name
//             .toLowerCase()
//             .split(/[^a-zA-Z0-9]/)
//             .map((item) => module.exports.capitalizeFirst(item))
//             .join('')
//     );
// };

// //Return: ABC_DEF -> abcdef
// module.exports.convertNameToJSId = (name) => {
//     // return name        
//     //     .split(/[^a-zA-Z0-9]/)
//     //     .join('')
//     //     .toLowerCase();
//     return module.exports.camelCase(name);
// };

// //Return: ABC_DEF -> abc-def
// module.exports.convertNameToJSApiId = (name) => {
//     return name        
//         .split(/[^a-zA-Z0-9]/)
//         .join('-')
//         .toLowerCase();
// };

// //Return: ABC_DEF -> abc-def
// module.exports.convertTableNameToFolderName = (tableName) => {
//     return tableName.replace(/_/g, '-').toLowerCase();
// };

// //Return: ABC_DEF -> abcDef
// module.exports.camelCase = (name) => {
//     return module.exports.lowercaseFirst(name       
//         .split(/[^a-zA-Z0-9]/)
//         .map(item => module.exports.capitalize(item))
//         .join('')
//     );
// };

// 
module.exports.removeNCharLowercase = function(inputString) {
    return inputString.replace(/[^a-zA-Z0-9]/g, '');
}

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
