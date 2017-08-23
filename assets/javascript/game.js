$(document).ready(function() {

	// Reset button, created in setResetButton() function
	var btnReset;
	// Info about all game characters
	var characters = [
		{
			'name': 'Obi-Wan Kenobi',
			'healthPoints': 120,
			'attackPoints': 8,
			'counterAttackPoints': 8
		},
		{
			'name': 'Luke Skywalker',
			'healthPoints': 100,
			'attackPoints': 5,
			'counterAttackPoints': 5
		},
		{
			'name': 'Darth Sidious',
			'healthPoints': 150,
			'attackPoints': 20,
			'counterAttackPoints': 20
		},
		{
			'name': 'Darth Maul',
			'healthPoints': 180,
			'attackPoints': 25,
			'counterAttackPoints': 25
		}
	];
	var enemyChosen = false;
	// Index in characters array of the current enemy
	var enemyIndex;
	var gameOver = false;
	// Character icon showing name, image, and health points
	var icon;
	// Number of enemies that have been defeated
	var numDefeated = 0;
	// Number of characters in the game
	var numCharacters = 4;
	var playerChosen = false;
	// Index in characters array of the user's character
	var playerIndex;
	
	updateHealthPoints();

	// Character icon click handler
	$(".character-icon").on("click", function() {
		$("footer").empty();
		// If player hasn't been chosen, then character clicked becomes the player
		if (!playerChosen)
		{
			playerChosen = true;
			playerIndex = $(this).attr("index");
			icon = $(this).detach();
			// Move chosen character to 'Your Character' div
			$(".your-character").append(icon);
			// For all other remaining characters, change styling and move to 'Enemies Available'
			$(".character-icon").each(function( index ) 
			{
  				if (($(this).attr("index")) !== playerIndex)
  				{
  					icon = $(this).detach();
  					icon.css({'background-color': 'red', 'border-color': 'black'});
  					$(".enemies-available").append(icon);
  				}
			});
		}
		// If player has been chosen and enemy has not been chosen, then character clicked becomes the defender
		else if (!enemyChosen)
		{
			enemyIndex = $(this).attr("index");
			// Verify that user did not choose same character for both player and enemy
			if (enemyIndex !== playerIndex)
			{
				// Change styling and move to 'Defender'
				enemyChosen = true;
				icon = $(this).detach();
				icon.css({'background-color': 'black', 'border-color': '#0FAD1C', 'color': '#FEFFF7'});
				$(".defender").append(icon);
			}
		}
	});

	// Attack button click handler
	$("#btn-attack").on("click", function() {
		// Attack button should only function when it's not Game Over
		if (!gameOver)
		{
			// If player and enemy are both chosen, then player attacks and enemy counter attacks
			if (playerChosen && enemyChosen)
			{
				// Reduce the defender's health points by the number of player's attack points
				characters[enemyIndex].healthPoints -= characters[playerIndex].attackPoints;
				// Reduce the player's health points by the number of the defender's counter attack points
				characters[playerIndex].healthPoints -= characters[enemyIndex].counterAttackPoints;
				// Display the new health point values
				updateHealthPoints();
				$("footer").empty();
				$("footer").append("<p>You attacked " + characters[enemyIndex].name + " for " + characters[playerIndex].attackPoints + " damage.</p>");
				$("footer").append("<p>" + characters[enemyIndex].name + " attacked you back for " + characters[enemyIndex].counterAttackPoints + " damage.</p>");
				// The player's attack points are increased by the original number of attack points after each attack
				characters[playerIndex].attackPoints += characters[playerIndex].counterAttackPoints;
				// Check remaining health points to see if either player has been defeated
				checkBattleResults();
			}
			else
			{
				$("footer").empty();
				$("footer").append("No enemy here");
			}
		}
	});

	// Check how many health points the player and enemy have to determine if either have been defeated
	function checkBattleResults()
	{
		if (characters[playerIndex].healthPoints <= 0)
		{
			gameOver = true;
			$("footer").empty();
			$("footer").append("<p>You've been defeated...GAME OVER!!!</p>");
			setResetButton();
		}
		else if (characters[enemyIndex].healthPoints <= 0)
		{
			numDefeated++;
			$("footer").empty();
			if (numDefeated < numCharacters - 1)
			{
				$("footer").append("<p>You have defeated " + characters[enemyIndex].name + ", you can choose to fight another enemy.</p>");
				enemyChosen = false;
			}
			else
			{
				gameOver = true;
				$("footer").append("<p>You won!!!! GAME OVER!!!</p>");	
				setResetButton();
			}
			icon.remove();
		}
	}

	// Create reset button and place on page
	function setResetButton() 
	{
		btnReset = $("<button id='btn-reset'>Reset</button>");
	    $("footer").append(btnReset);
	    btnReset.on("click", function() {
	    	location.reload();
	    });
	}

	// Update the value displayed on each character icon to reflect the character's current number of health points
	function updateHealthPoints()
	{
		$(".health-points").each(function( index ) {
			$(this).text(characters[$(this).attr("index")].healthPoints);
		});
	}
});
