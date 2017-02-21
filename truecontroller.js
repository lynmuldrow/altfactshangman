$(document).ready(function () {
// We start here by defining variables we need for game behavior. 
	var questionBank=new Array;
	var wordArray=new Array;
	var previousGuesses=new Array;
 	var currentWord;
	var currentClue;
	var wrongAnswerCount;
	
 
 //Let's add our question bank- an array of words and clues.  
questionBank=	[["hanging","A form of capital punishment."],["racism","The belief that all members of each race possess characteristics or abilities specific to that race."],["hangman","An executioner who hangs condemned people."],["brutality","Savage physical violence; great cruelty."],["trigger","To cause (an event or situation) to happen or exist."],["privilege","A special right, advantage, or immunity granted or available only to a particular person or group of people."]];

		  
		
// Here we call up the title screen, then display the game! Let's get it started. :) 
		titleScreen();

 

// Don't forget to define the function that handles the title screen, adding some HTML to display on the screen, including a button.
function titleScreen(){
			
	$('#gameWrapper').append('<div id="gameTitle">#TRUEFACTS Hangman</div><div id="startButton" class="button">Start Execution</div>');		
	$('#startButton').on("click",function (){gameScreen()});
			
}
	
// For the fancy button extension *sparklyyyyy*
// function titleScreen(){
			
	// $('#gameWrapper').append('<div id="gameTitle">Alternative Facts Hangman</div><div id="fancyButton" class="button">Start Execution</div>');		
	// $('#fancyButton').on("click",function (){gameScreen()});
			
// }
	

// Onto the game screen- we're deleting the title screen stuff and adding all of the elements of our game screen, including the hung girl, tiles, and guess bank.
function gameScreen(){
	$('#gameWrapper').empty();
	$('#gameWrapper').append('<div id="pixHolder"><img id="hangman" src="images/girl.png"></div>');
	$('#gameWrapper').append('<div id="wordHolder"></div>');
	$('#gameWrapper').append('<div id="clueHolder"></div>');
	$('#gameWrapper').append('<div id="guesses">Previous guesses:</div>');
	$('#gameWrapper').append('<div id="feedback"></div>');
	$('#gameWrapper').append('<form><input type="text" id="dummy" ></form>');


// Next, let's call a random word, and build tiles based on the length of letters. Stick the wrong letters in an array (that we'll show as previous guesses) We'll offer a clue, 
	getWord();
	var numberOfTiles=currentWord.length;
	wrongAnswerCount=0;
	previousGuesses=[];
			 
	for(i=0;i<numberOfTiles;i++){
		$('#wordHolder').append('<div class="tile" id=t'+i+'></div>');
	}
			
	$('#clueHolder').append("HINT: "+currentClue);
 
	$(document).on("keyup",handleKeyUp);
	$(document).on("click",function(){$('#dummy').focus();});
	$('#dummy').focus();
}
			
// We have to write the function that defines how we get a random word and clue- using math.random .
function getWord(){
	var rnd=Math.floor(Math.random()*questionBank.length);
	currentWord=questionBank[rnd][0];
	currentClue=questionBank[rnd][1];
	questionBank.splice(rnd,1); 
	wordArray=currentWord.split("");			
}
			
// And the function that handles the listener. It takes the guesses  and pushes them into the word array/tiles if true. If not, they go in the previous guesses array.
function handleKeyUp(event) {
	if(event.keyCode>64 && event.keyCode<91){
		var found=false;
		var previouslyEntered=false;
		var input=String.fromCharCode(event.keyCode).toLowerCase();
				
		for(i=0;i<previousGuesses.length;i++){if(input==previousGuesses[i]){previouslyEntered=true;}}
				
		if(!previouslyEntered){
			previousGuesses.push(input);
				
			for(i=0;i<wordArray.length;i++){
				
				if(input==wordArray[i]){found=true;$('#t'+i).append(input);}	
				
			}
				
			if(found){checkAnswer();}
			else{wrongAnswer(input);}
		}
	}
}
	
// Same here- if the answer matches the current word...but this time they'll get a defeat message.
function checkAnswer(){
	var currentAnswer="";	
	for(i=0;i<currentWord.length;i++){
		currentAnswer+=($('#t'+i).text());
	}		
	if(currentAnswer==currentWord){
		defeatMessage();
	};
}


// This time, the player gets it wrong after just 3 guesses.  
function wrongAnswer(a){
	wrongAnswerCount++;
	var pos=(wrongAnswerCount*-75) +"px"
	$('#guesses').append("  "+a);
	$('#hangman').css("left",pos);
	if(wrongAnswerCount==3){
		defeatMessage();}
}
		
		
// And the defeat message stings. Code is poetry. Code is power. Code is art. 
function defeatMessage(){
	$(document).off("keyup", handleKeyUp);
	$('#feedback').append("It doesn't matter if you got the right answer- in this society, this child is assumed guilty, as was Trayvon Martin and Tamir Rice. She'll be executed anyway. <br>( The correct answer was "+ currentWord +". "+")<div id='replay' class='button'>Kill Again?</div>");
	$('#replay').on("click",function (){
		if(questionBank.length>0){
			gameScreen()}
		else{finalPage()}
	});
}

function finalPage(){
	$('#gameWrapper').empty();
	$('#gameWrapper').append('<div id="finalMessage">You have finished all the words in the game- take a moment to reflect on this game and how you felt while playing.</div>');
}
	
	});// Our game has finished loading- don't forget these closing brackets! 