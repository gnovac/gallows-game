window.addEventListener("DOMContentLoaded", function () {
    start();
});

//losowanie hasła
var passwordsTable = new Array(10);
passwordsTable[0] = "Red Hot Chili Peppers";
passwordsTable[1] = "Radiohead";
passwordsTable[2] = "November Rain";
passwordsTable[3] = "Queen";
passwordsTable[4] = "Enjoy the silence";
passwordsTable[5] = "Autobiografia";
passwordsTable[6] = "Linkin Park";
passwordsTable[7] = "Nothing Else Matter";
passwordsTable[8] = "Rage Against the Machine";
passwordsTable[9] = "The Smashing Pumpkins";

function drawn()
{
var drawn_number = Math.round(Math.random() * passwordsTable.length);
drawnPasswords = passwordsTable[drawn_number];
}

drawn();

var password = drawnPasswords;

password = password.toUpperCase();

var passwordLength = password.length;
var HowMuchMiss = 0;
var yes = new Audio("wav/yes.wav");
var no = new Audio("wav/no.wav");

hiddenPassword = "";

for (i = 0; i < passwordLength; i++) {
    if (password.charAt(i) == " ") {
        hiddenPassword = hiddenPassword + " ";
    } else {
        hiddenPassword = hiddenPassword + "-";
    }
}

function writePassword() {
    document.getElementById("board").innerHTML = hiddenPassword;
}


var letters = new Array(35);

letters[0] = "A";
letters[1] = "Ą";
letters[2] = "B";
letters[3] = "C";
letters[4] = "Ć";
letters[5] = "D";
letters[6] = "E";
letters[7] = "Ę";
letters[8] = "F";
letters[9] = "G";
letters[10] = "H";
letters[11] = "I";
letters[12] = "J";
letters[13] = "K";
letters[14] = "L";
letters[15] = "Ł";
letters[16] = "M";
letters[17] = "N";
letters[18] = "Ń";
letters[19] = "O";
letters[20] = "Ó";
letters[21] = "P";
letters[22] = "Q";
letters[23] = "R";
letters[24] = "S";
letters[25] = "Ś";
letters[26] = "T";
letters[27] = "U";
letters[28] = "V";
letters[29] = "W";
letters[30] = "X";
letters[31] = "Y";
letters[32] = "Z";
letters[33] = "Ż";
letters[34] = "Ź";

function start() {
    var innerDiv = "";

    for (i = 0; i <= 34; i++) {
        var element = "let" + i;
        innerDiv = innerDiv + '<div class = "letters" onclick="check(' + i + ')" id = "' + element + '">' + letters[i] + '</div>';
    }

    document.getElementById("alphabet").innerHTML = innerDiv;

    writePassword();
}


String.prototype.setChar = function (place, char) {
    if (place > this.length - 1) return this.toString();
    else return this.substr(0, place) + char + this.substr(place + 1);
}


function check(nb) {

    var match = false;

    for (i = 0; i < passwordLength; i++) {

        if (password.charAt(i) == letters[nb]) {
            hiddenPassword = hiddenPassword.setChar(i, letters[nb]);
            match = true;
        }
    }

    if (match == true) {
        yes.play();
        var element = "let" + nb;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default"

        writePassword();
    } else {
        no.play();
        var element = "let" + nb;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default"
        document.getElementById(element).setAttribute("onclick", ";");

        //miss
        HowMuchMiss++;
        var image = "img/s" + HowMuchMiss + ".jpg";
        document.getElementById("gallows").innerHTML = '<img src="' + image + '" alt="" />';
    }

    //win
    if (password == hiddenPassword) {
        document.getElementById("alphabet").innerHTML = "Tak jest! Podano prawidłowe hasło: <br />" + password + '<br /> <br /><span class ="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
    }

    //lose
    if (HowMuchMiss >= 9) {
        document.getElementById("alphabet").innerHTML = "Przegrana! Podano prawidłowe hasło: <br />" + password + '<br /> <br /><span class ="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
    }
}
