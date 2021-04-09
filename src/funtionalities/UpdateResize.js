function generateCol (colCount) {
    let fractionString = '1fr'
    for (let i = 0; i < colCount - 1; i++) {
        fractionString += ' 1fr'
    }
    return fractionString
}

function generateRow (rowcount) {
    let fractionString = '300px'
    for (let i = 0; i < rowcount - 1; i++) {
        fractionString += ' 300px'
    }
    return fractionString
}

function updateResize (length) {
    let boardObject = document.querySelector('.notes-available')
    let rowCount = length
    if (length > 0) {
        let colCount
        if (window.innerWidth > 1800) {
            colCount = 4
        } else if (window.innerWidth > 1350) {
            colCount = 3
        } else if (window.innerWidth > 900) {
            colCount = 2
        } else {
            colCount = 1
        }
        rowCount = rowCount / colCount
        rowCount = ( rowCount === Math.floor(rowCount) ) ? rowCount : Math.floor(rowCount) + 1
        boardObject.style.gridTemplateColumns = generateCol(colCount)
        boardObject.style.gridTemplateRows = generateRow(rowCount)
    }
}

export default updateResize