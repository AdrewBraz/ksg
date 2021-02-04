const vmpCodes = ['200409', '200510', '200518', '200519', '200520', '200524', '200522', '200523', '200524', '200525', '200530'];

export default (data) => data.reduce((acc, item) => {
    vmpCodes.includes(item.COD) ? acc.vmpList.push(item) : acc.ksgList.push(item)
    return acc;
}, {vmpList: [], ksgList: []}) 