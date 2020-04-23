let sumPlayerNum=0;
let sumBotNum=0;
const LostSound = new Audio('sounds/aww.mp3');
const WinSound = new Audio('sounds/cash.mp3');
const HitSound = new Audio('sounds/swish.m4a');
document.cookie=200;
document.getElementById("Money").innerHTML= document.cookie; 
let bitMoneyNum;
let sumProfit=parseInt(document.getElementById("profit").textContent);

function timer(ms) 
{
    return new Promise(res => setTimeout(res, ms));
}

async  function Stand()
{
    
    document.getElementById("hit").disabled =true;   
    document.getElementById("stand").disabled =true;   


    while(sumPlayerNum>=sumBotNum)
    {    
        addCardBot();
        await timer(1000);
    }
    if(sumBotNum>21)
    {
        playerWon();
    }
    else
    {
        playerLost();
    }

}


function dealF()
{

     bitMoneyNum=parseInt(document.getElementById("inputMoney").value);
    if(bitMoneyNum>0 && bitMoneyNum<=document.cookie)
    {
        document.getElementById("Deal").disabled =true;   
        document.getElementById("hit").disabled =false;   
        document.getElementById("stand").disabled =false;   
    }
    else
    {
        if(bitMoneyNum>document.cookie)
        {
                alert("You can't bet on less than what you have...");
                if (window.confirm('you want to loan some money?')) 
                {
                    window.open('loanMoney.html'); 
                }
        }
        else
        {            
            alert("You can't bet on less than 0 or 0...");           
        }
    }
    

}

function addCardBot()
{   
    HitSound.play();
    var num=TakeCard(sumBotNum);
    sumBotNum+=num;
    document.getElementById("sumBot").innerHTML= "Dealer Sum -" +sumBotNum;
    var newImage =changeToImag(num,"botCards");

}

function addCardPlayer()
{
    HitSound.play();
    var num=TakeCard(sumPlayerNum);
    sumPlayerNum+=num;
    chackStatus(sumPlayerNum);
    document.getElementById("sumPlayer").innerHTML= "Your Sum -" +sumPlayerNum;
    changeToImag(num,"playerCards");
}

function TakeCard(sunAll)
{
    var num=Math.floor(Math.random() * 10) + 1;//between 1 to 10
    if(num==1)
    {
        num=11;
    }
    if(sunAll+11>21 && num==11 )
    {
        num= 1;
    }
    return num;
}

let cardImage =new Image(100, 100);

function changeToImag(numberCard,idToAdd)
{       
        switch (numberCard)
        {
           case 1:
               cardImage.src = "img/A.png";
             break;
           case 2:
               cardImage.src = "img/2.png";
             break;
           case 3:
               cardImage.src = "img/3.png";
             break;       
           case 4:
               cardImage.src = "img/4.png";
             break;
           case 5:
               cardImage.src = "img/5.png";
             break;
           case 6:
               cardImage.src = "img/6.png";
               break;
           case 7:
               cardImage.src = "img/7.png";
               break;
           case 8:
               cardImage.src = "img/8.png";
               break;
           case 9:
               cardImage.src = "img/9.png";  
               break;       
            case 10:
                var num=Math.floor(Math.random() * 4) + 1;//between 1 to 4   
                switch (num)
                {
                   case 1:
                       cardImage.src = "img/10.png";
                     break;
                   case 2:
                       cardImage.src = "img/J.png";
                     break;
                   case 3:
                       cardImage.src = "img/Q.png";
                     break;       
                   case 4:
                       cardImage.src = "img/K.png";
                     break;         
                }
            break;          
           case 11:
               cardImage.src = "img/A.png";
               break;        
       }
    
   
    document.getElementById(idToAdd).appendChild(cardImage);

}

function chackStatus(sumNumber)
{   
    
    if(sumNumber>21)
    {       
        playerLost();
    }

    if(sumNumber==21)
    {
        playerWon();        
    }

}

function resetF()
{              
    document.getElementById("inputMoney").value= "";
    sumBotNum=0;
    document.getElementById("botCards").innerHTML= "";
    document.getElementById("sumBot").innerHTML= "Your Sum -";
    sumPlayerNum=0;
    document.getElementById("playerCards").innerHTML= "";
    document.getElementById("sumPlayer").innerHTML= "Your Sum -";
    document.getElementById("stand").disabled =true;   
    document.getElementById("Deal").disabled =false;   
    document.getElementById("hit").disabled =true;   
}


function playerWon()
{
    WinSound.play();
    document.getElementById("letsP").innerHTML= "Your Won!";   
    var textNum=document.getElementById("wins").textContent; 
    var changeText=parseInt(textNum);
    changeText+=1;
    document.getElementById("wins").innerHTML=changeText.toString(); 
    document.getElementById("hit").disabled =true; 
    document.getElementById("stand").disabled =true;    
    if(sumPlayerNum==21)
    {
        alert("WOW Big Winning!!, To play again click the Reset button");
    }
    else{
        alert("You Won, To play again click the Reset button");
    }
    var sumM=parseInt(document.cookie);
    bitMoneyNum =parseInt(bitMoneyNum);
    sumM += bitMoneyNum;
    document.getElementById("Money").innerHTML = sumM.toString(); 
    document.cookie=sumM;
    sumProfit+=bitMoneyNum;
    document.getElementById("profit").innerHTML = sumProfit;
    document.getElementById("profit").style.backgroundColor = "green";

}


function playerLost()
{
    LostSound.play();
    document.getElementById("letsP").innerHTML= "Your Lost!"; 
    var textNum=document.getElementById("losts").textContent; 
    var changeText=parseInt(textNum);
    changeText+=1;
    document.getElementById("losts").innerHTML=changeText.toString(); 
    document.getElementById("hit").disabled =true;  
    document.getElementById("stand").disabled =true;  
    if(sumBotNum==21)
    {
        alert("WOW You are a LOSER!! play again click the Reset button");

    }
    else{
        alert("You Lost, To play again click the Reset button");
    }   

    document.cookie-=bitMoneyNum;
    document.getElementById("Money").innerHTML= document.cookie; 

    sumProfit-=bitMoneyNum;
    document.getElementById("profit").innerHTML = sumProfit;
    document.getElementById("profit").style.backgroundColor = "red";

}
