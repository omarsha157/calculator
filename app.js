const numberBtns = document.querySelectorAll('[data-numbers]')
const currOut = document.querySelector('[data-curr-out]')
const allClearBtn = document.querySelector('[data-all-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const operationBtns = document.querySelectorAll('[data-operators]')
const equalsBtn = document.querySelector('[data-equals]')
const prevOut = document.querySelector('[data-prev-out]')

let currValue = ''
let prevValue = ''
let operation = ''

function clear() {
    currValue = ''
    prevValue = ''
    operation = ''
}

function deleteValue() {
    //* removes last digit
    currValue = currValue.slice(0,-1)
}

function appendNumber(num) {
    //* to avoid precision errors limit strings to 15 decimal places 
    if(currValue.length >= 15) return
    //* . is also a number below code prevents from inputting multiple periods
    if(num === '.' && currValue.includes('.')) return
    currValue += num
}

function chooseOperation(op) {
    //* to avoid proceeding without current value 
    if(currValue == '') return
    //* to chain operations without pressing equals button
    if (prevValue !== '') {
        compute()
    }
    operation = op
    prevValue = currValue
    currValue = ''
}

function compute() {
    let calculation
    let prev = parseFloat(prevValue)
    let curr = parseFloat(currValue)

    //* if values are empty this prevents it
    //* parseFloat of '' will return NaN
    if(isNaN(prev) || isNaN(curr)) return

    switch (operation) {
        case '+':
            calculation = prev + curr
            break
        case '-':
            calculation = prev - curr
            break
        case '*':
            calculation = prev * curr
            break
        case '/':
            calculation = prev / curr
            break
        default:
            return
    }
    currValue = calculation
    prevValue = ''
    operation = ''
}

function formatNumber(num) {
    let strNum = num.toString()
    let intVal = parseFloat(strNum.split('.')[0])
    let decVal = strNum.split('.')[1]
    let formattedOut
    //* parseFloat of '' is NaN
    if(isNaN(intVal)) {
        formattedOut = ''
    } else {
        //* formats digits based on language eg:10000 =>10'000
        //* max..FractionDigits will prevent from having any decimals
        formattedOut = intVal.toLocaleString('en-in', {maximumFractionDigits:0})
    }
    //* if decimal does not exist
    //* if decimal does not exit decVal will return undefined so
    //* decVal == '' will not work must use === undefined or == null 
    if(decVal == null) {
        return formattedOut
    } else {
        return `${formattedOut}.${decVal}`
    }
}

function updateDisplay() {
    currOut.innerText = formatNumber(currValue)

    //* if operation show previous value with operation symbol
    if(operation!= null) {
        prevOut.innerText = `${formatNumber(prevValue)} ${operation}`
    } else {
        prevOut.innerText = ''
    }
    
}

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        appendNumber(btn.innerText)
        updateDisplay()
    })
})

allClearBtn.addEventListener('click', () => {
    clear()
    updateDisplay()
})

deleteBtn.addEventListener('click', () => {
    deleteValue()
    updateDisplay()
})

operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        chooseOperation(btn.innerText)
        updateDisplay()
    })
})

equalsBtn.addEventListener('click', () => {
    compute()
    updateDisplay()
})