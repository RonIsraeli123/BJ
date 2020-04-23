function moreMoney()
{
    var more =parseInt(document.getElementById("SumLoan").value);
    moneyPlayersHave+=more;
    document.getElementById("Money").innerHTML=moneyPlayersHave;
}