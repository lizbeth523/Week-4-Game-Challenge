$(document).ready(function() {

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
	// var characterIcons = [];
	var counterAttackPoints;
	var enemyChosen = false;
	var enemyIndex;
	var numDefeated = 0;
	var numCharacters = 4;
	var playerAttackPoints;
	var playerChosen = false;
	var playerIndex;
	var icon;

	updateHealthPoints();

	// Character icon click handler
	$(".character-icon").on("click", function() {
		$("footer").empty();
		if (!playerChosen)
		{
			playerChosen = true;
			playerIndex = $(this).attr("index");
			icon = $(this).detach();
			// characterIcons.push(icon);
			$(".your-character").append(icon);
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
		else if (!enemyChosen)
		{
			enemyIndex = $(this).attr("index");
			if (enemyIndex !== playerIndex)
			{
				enemyChosen = true;
				icon = $(this).detach();
				// characterIcons.push(icon);
				icon.css({'background-color': 'black', 'border-color': '#0fad1c', 'color': '#FEFFF7'});
				$(".defender").append(icon);
			}
		}
	});

	// Button click handler
	$("button").on("click", function() {
		$("footer").empty();
		if (this.id === 'btn-attack')
		{
			if (playerChosen && enemyChosen)
			{
				playerAttackPoints = characters[playerIndex].attackPoints;
				counterAttackPoints = characters[enemyIndex].counterAttackPoints;
				characters[enemyIndex].healthPoints -= playerAttackPoints;
				characters[playerIndex].healthPoints -= counterAttackPoints;
				updateHealthPoints();
				$("footer").append("<p>You attacked " + characters[enemyIndex].name + " for " + playerAttackPoints + " damage.</p>");
				$("footer").append("<p>" + characters[enemyIndex].name + " attacked you back for " + counterAttackPoints + " damage.</p>");
				characters[playerIndex].attackPoints += characters[playerIndex].counterAttackPoints;
				checkBattleResults();
			}
			else
			{
				$("footer").append("No enemy here");
			}
		}
	});

	// Check how many health points the player and enemy have to determine if either have been defeated
	function checkBattleResults()
	{
		if (characters[playerIndex].healthPoints <= 0)
		{
			$("footer").empty();
			$("footer").append("You've been defeated...GAME OVER!!!");
		}
		else if (characters[enemyIndex].healthPoints <= 0)
		{
			numDefeated++;
			$("footer").empty();
			if (numDefeated < numCharacters - 1)
			{
				$("footer").append("You have defeated " + characters[enemyIndex].name + ", you can choose to fight another enemy.");
				enemyChosen = false;
			}
			else
			{
				$("footer").append("You won!!!! GAME OVER!!!");	
			}
			icon.remove();
		}
	}

	// Update the value displayed on each character icon to reflect the character's current number of health points
	function updateHealthPoints()
	{
		$(".health-points").each(function( index ) {
			$(this).text(characters[$(this).attr("index")].healthPoints);
		});
	}
});