// Function to generate the column divisions
function generateCol (colCount) {
    // Defining the metric
    let fractionString = '1fr'
    // Appending the metric string
    for (let i = 0; i < colCount - 1; i++) {
        fractionString += ' 1fr'
    }
    // Retruning the Column Division
    return fractionString
}

// Function to generate the row division
function generateRow (rowcount) {
    // Defeining the metric
    let fractionString = '300px'
    // Appending the metric string
    for (let i = 0; i < rowcount - 1; i++) {
        fractionString += ' 300px'
    }
    // Returning the Row Division
    return fractionString
}

// Function to update the layout of the board
function updateResize (length) {
    // Getting the object of the notes-available element where the notes will be displayed
    let boardObject = document.querySelector('.notes-available')
    if (length > 0) {
        // If any elements are present define the col count based on the browser width
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
        // Getting the row count by dividing the total length by the col count
        let rowCount = length / colCount
        // If the quotient value is a integer, then the same number is returned
        // If the quotient value is a float, then the value is floored and incremented
        rowCount = ( rowCount === Math.floor(rowCount) ) ? rowCount : Math.floor(rowCount) + 1
        // Setting the grid-template-column property
        boardObject.style.gridTemplateColumns = generateCol(colCount)
        // Setting the grid-template-row property
        boardObject.style.gridTemplateRows = generateRow(rowCount)
    }
}

// Exporting ht Update Resize function
export default updateResize