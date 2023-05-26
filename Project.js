//1. Deposit the money
//2.Determine then number of line to bet on
//3. Collect a bet amount
//4.Spin the slot machine
//5. Check if the user won
//6.give the user their winnings
//7. Play again

const prompt = require("prompt-sync")();
const ROWS=3;
const COL=3;
const SYMBOLS_COUNT ={
    A: 2,
    B: 3,
    C: 6,
    D: 8,
}
const SYMBOLS_VALUES ={
    A: 5,
    B: 4,
    C: 3,
    D: 2,
}

const deposit =()=> {
    while(true){
    const depositAmount =prompt("Enter deposit amount:");
    const depositAmountNumber=parseFloat(depositAmount);
    if(isNaN(depositAmountNumber) || depositAmountNumber<=0){
        console.log("Invalid deposit amount, try again");
    }  
    else{
        return depositAmountNumber;
    }
    }
};

const getNumberofLines =()=> {
    while(true){
    const Lines =prompt("Enter Number of lines to bet on(1-3):");
    const NumberofLines=parseFloat(Lines);
    if(isNaN(NumberofLines) || NumberofLines<=0 || NumberofLines>3){
        console.log("Invalid Number of lines, try again");
    }  
    else{
        return NumberofLines;
    }
    }
};

const getBet =(balance, Lines)=> {
    while(true){
    const bet =prompt("Enter the bet per line:");
    const NumberBet=parseFloat(bet);
    if(isNaN(NumberBet) || NumberBet<=0 || NumberBet> balance/ Lines){
        console.log("Invalid bet, try again");
    }  
    else{
        return NumberBet;
    }
    }
};

const spin=()=>{
const symbols= [];
for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
    for(let i=0; i<count; i++){
        symbols.push(symbol);
    }
}
const reels =[];
for(let i=0; i<COL ; i++){
    reels.push([]);
    const reelSymbols =[...symbols];
    for(let j=0; j<ROWS; j++){
        const randomIndex =Math.floor(Math.random() * reelSymbols.length);
        const selectedSymbol = reelSymbols[randomIndex];
        reels[i].push(selectedSymbol);
        reelSymbols.splice(randomIndex,1);
    }
}
return reels;
};

const transpose =(reels) => {
    const rows=[];
    for(let i=0; i<ROWS; i++){
        rows.push([]);
        for(let j=0; j< COL; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}
const printRows =(rows) =>{
    for(const row of rows){
        let rowString ="";
        for(const[i, symbol] of row.entries()){
            rowString +=symbol
            if(i !=row.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
}

const getWinnigs = (rows,bet,Lines) => {
    let winnings=0;
    for(let row=0; row < Lines ; row++){
        const symbols = rows[row];
        let allSame = true;
        for(const symbol of symbols){
            if(symbol!= symbols[0]){
                allSame =false;
                break;
            }
        }
        if(allSame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]]
        }
    }
    return winnings;
}

const game =() => {
let balance= deposit();
while(true) {
    console.log("You have a balace of $" +balance)
    const NumberofLines =getNumberofLines();
    const bet=getBet(balance, NumberofLines);
    const reels=spin();
    const rows= transpose(reels);
    printRows(rows);
    const winnings=getWinnigs(rows, bet, NumberofLines);
    console.log("You won, $" + winnings.toString());

    if(balance <= 0){
        console.log("You ran out of money!");
        break;
    }
    const playAgain = prompt("Do you want to play again (y/n)? ")
    if(playAgain !="y") break;
    
}
}
game();
