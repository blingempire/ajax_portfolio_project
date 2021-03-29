// Variable declaration

let myPokemon;
let pokeNum = 1;

// Callback function that generates a random number

const getRandomNum = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + 1
}



// Callback function that retreives a Pokemon specified by number value

const getPokemon = (num) => {
	console.log("Query Pokemon!")
	if (num > 200 || num < 0 || num % 1 != 0){
		
		num = 1;

	}
	fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
	.then(res => {
		return res.json()
	})
	.then(data => {myPokemon = data
		$('#myPokemon').html(`
  <div class="card" style="width: 9rem;">
  <img class="card-img-top" src="${myPokemon.sprites.other.dream_world.front_default}"" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${myPokemon.name}</h5>
    <button class="btn-danger" id="deleteThisOne">DELETE</button>
  </div>
</div>

			`)})
			.catch(err => console.log(err))

}



// Function that gets Pokemon using callback function

$(document).on('submit', '#lookupPokemon', function (event) {
	event.preventDefault()
	console.log("Find button click!")
	let num = $('#pokeToFind').val()
	console.log("Number entered is", num)
	getPokemon(num)
})



// Function to DELETE a Pokemon

$(document).on('click', '#deleteThisOne', function () {
	console.log("Delete my Pokemon!")
	$('#myPokemon').html("")
})



// Callback function that retrieves the next Pokemon

const getNextPokemon = () => {
	if(pokeNum > 150){
		pokeNum = 1
	}
	fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`)
	.then(res => {
		return res.json()
	})
	.then(data => {myPokemon = data
	$('#showRandomPokes').append(`
		
<div id="${pokeNum}" class="card anotherPokemon" style="width: 10rem;">
  <img class="card-img-top" src="${myPokemon.sprites.other.dream_world.front_default}"" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${myPokemon.name}</h5>
    <button class="btn-warning">RETURN Pokemon</button>
  </div>
</div>
		`), pokeNum++})
		.catch(err => console.log(err))
	}



// Callback to retrieve next Pokemon

$(document).on('click', '#randomPokes', function (event) {
	getNextPokemon()
})



// Function to reveal all hidden Pokemon

$(document).on('click', '#returnPokes', function () {
	$(".anotherPokemon").show()
})



// Function that HIDEs a given Pokemon

$(document).on('click', '.anotherPokemon', function() {
	let x = getRandomNum(1, 3)
	if(x == 1){
		$(this).closest('div').hide()
	}
	if(x == 2){
		$(this).closest('div').fadeOut()
	}
	if(x == 3){
		$(this).closest('div').slideUp()
	}
})