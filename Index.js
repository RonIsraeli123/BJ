let sumPlayerNum=0;
let sumBotNum=0;
let LostSound;
let WinSound;

let moneyPlayersHave; 
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

function addCardBot()
{   
    var num=TakeCard(sumBotNum);
    sumBotNum+=num;
    document.getElementById("sumBot").innerHTML= "Your Sum -" +sumBotNum;
    document.getElementById("botCards").innerHTML+= num.toString() +"    ";
}

function dealF()
{

    moneyPlayersHave=parseInt(document.getElementById("Money").textContent); 
     bitMoneyNum=parseInt(document.getElementById("inputMoney").value);
    if(bitMoneyNum<100 && bitMoneyNum>0)
    {
        document.getElementById("Deal").disabled =true;   
        document.getElementById("hit").disabled =false;   
        document.getElementById("stand").disabled =false;   
    }
    else
    {
        if(bitMoneyNum>moneyPlayersHave)
        {
                alert("You can't bet on less than what you have...");
        }
        else
        {
            if(bitMoneyNum>100)
            {
                alert("You can't bet on more than 100...");
            }
            
            if(bitMoneyNum<0)
            {
                alert("You can't bet on less than 0...");
            }
        }
    }
    

}

function addCardPlayer()
{
  
    var num=TakeCard(sumPlayerNum);
    sumPlayerNum+=num;
    chackStatus(sumPlayerNum);
    document.getElementById("sumPlayer").innerHTML= "Your Sum -" +sumPlayerNum;
    document.getElementById("playerCards").innerHTML+= num.toString() +"    ";    
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
   // WinSound = new sound("bounce.mp3");
   // WinSound.play();
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
    moneyPlayersHave+= bitMoneyNum;
    document.getElementById("Money").innerHTML= moneyPlayersHave; 

    sumProfit+=bitMoneyNum;
    document.getElementById("profit").innerHTML = sumProfit;
    document.getElementById("profit").style.backgroundColor = "green";

}


function playerLost(){
    //LostSound = new sound("bounce.mp3");
    document.getElementById("letsP").innerHTML= "Your Lost!"; 
   // LostSound.play();
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

    moneyPlayersHave-=bitMoneyNum;
    document.getElementById("Money").innerHTML= moneyPlayersHave; 

    sumProfit-=bitMoneyNum;
    document.getElementById("profit").innerHTML = sumProfit;
    document.getElementById("profit").style.backgroundColor = "red";

}
