let boxes = document.querySelectorAll('#box');
let rstBtn = document.querySelector('#rstbtn');

let turnO = true;
let winpattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if(turnO){
            box.innerHTML = 'O';
            box.style.color = 'black';
            turnO = false;
        } else {
            box.innerHTML = 'X';
            box.style.color = 'black';
            turnO = true;
        }
        box.disabled = true;
        chackWinner();
    })
});

const chackWinner = () => {
    for(let pattern of winpattern){
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                alert(`${pos1Val} is the winner`);
                boxes.forEach(box => box.disabled = true);
            }else{
                let draw = true;
                boxes.forEach(box => {
                    if(box.innerHTML === ""){
                        draw = false;
                    }
                });
                if(draw){
                    alert('Game is Draw');
                    continue;
                }
            }
        } 
    }
}

rstBtn.addEventListener('click', () => {
    boxes.forEach(box => {
        box.innerHTML = "";
        box.disabled = false;
    });
    turnO = true;
});