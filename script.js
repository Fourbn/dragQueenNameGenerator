// Drag Persona Generator App
const dragApp = {}

// create two objects, 1 for drag first names + 1 for drag last names 
dragApp.firstNames = {
   a: ['amber', 'anita', 'alicia', 'arizona'],
   b: ['barbie', 'betty', 'baby', 'bon bon', 'brittney'],
   c: ['cherry', 'celine', 'cher', 'carol', 'crystal'],
   d: ['diamond', 'danny', 'destiny', 'deborah'],
   e: ['edna', 'elton', 'elsa', 'egot'],
   f: ['foxy', 'fetta', 'fishy', 'fortuna', 'finessa'],
   g: ['goodie', 'gilda', 'gretta', 'gia'],
   h: ['harmony', 'hilda', 'hippy', 'humphrey', 'harley'],
   i: ['ida', 'ivana', 'ivanka', 'iridescent'],
   j: ['jasmine', 'jill', 'jam', 'jay', 'juicy'],
   k: ['kandi', 'katy', 'kimmy', 'kimchi', 'kristi', 'krusti', 'karen'],
   l: ['lady', 'lil', 'lula', 'lusty'],
   m: ['mistress', 'miss', 'mariah', 'melon','manny'],
   n: ['naomi', 'nelly', 'nora', 'nina', 'neNe', 'nip'],
   o: ['ornatia', 'olive', 'okra', 'olivia'],
   p: ['portia', 'pearl', 'pissy', 'penny', 'pepper'],
   q: ['queen', 'queer', 'quest', 'quincy'],
   r: ['rosalind', 'radisha', 'raspy', 'risky'],
   s: ['sapphire', 'spamela', 'sessy', 'sissy'],
   t: ['tiffany', 'tina', 'tequila', 'TiTi'],
   u: ['unique', 'uma', 'uppety', 'uta'],
   v: ['venus', 'vladamir', 'veronica', 'vicky'],
   w: ['wynona', 'wisty', 'wiggles', 'whorrid'],
   x: ['xena', 'xtra', 'xtasy', 'XXX'],
   y: ['yvie', 'yummy', 'yaYa', 'yessa'],
   z: ['zenheya', 'zoey', 'ZeZe', 'zoom']
}

dragApp.lastNames = {
   a: ['aphrodyte', 'arrogance', 'arden', 'anderson'],
   b: ['boop', 'bellhop', 'bottom', 'belle', 'berry', 'barabasol'],
   c: ['chardonney', 'cutery', 'crews', 'chanel', 'child'],
   d: ['danger', 'dijon', 'dairy', 'degenerate', 'de PooPoo', 'destiny'],
   e: ['essex', 'elliot', 'extra', 'earl jones', 'ecma'],
   f: ['ferocious', 'fierce', 'fig newton john', 'flora', 'fauna', 'frocker'],
   g: ['gumdrops', 'gomez', 'grande', 'garbo', 'gingham'],
   h: ['hart', 'hug\'n\'Kiss', 'hathaway', 'hyak', 'herpes', 'houston', 'heathers'],
   i: ['illy', 'imp', 'init', 'indigo'],
   j: ['jeans', 'jovi', 'jones', 'justice', 'juice'],
   k: ['kane', 'kang', 'krabs', 'kardashian'],
   l: ['luxury', 'lawless', 'louboutin', 'lumber'],
   m: ['mystery', 'morose', 'muumuu', 'marbles', 'marriott hotel', 'mcNugget'],
   n: ['nasty', 'noise', 'nipple', 'norene'],
   o: ['opalence', 'ovah', 'original', 'opposite', 'ore'],
   p: ['paris', 'pop', 'pistachio', 'pisser', 'pump', 'pickle', 'peas'],
   q: ['quinn', 'quick', 'question mark', 'query'],
   r: ['redd', 'ryan', 'radler', 'roast beef', 'rasputin', 'RESTylane'],
   s: ['sublime', 'steak', 's\'moore', 'saucy', 'simpson', 'seductive', 'snack'],
   t: ['trash', 'tuck', 'taquito', 'turnip', 'turnblatt', 'turner', 'tushy', 'tornado', 'top'],
   u: ['umbridge', 'untouchable', 'upset', 'uwU'],
   v: ['vanity', 'virgin', 'viper', 'vivacious', 'vibes'],
   w: ['winter', 'williams', 'werk', 'west', 'whiskers', 'wild', 'wispy'],
   x: ['xenobia', 'x change', 'x', 'xylophone', 'xtravaganza', 'XOXO'],
   y: ['yaya', 'yeastwood', 'yummy', 'yogurt', 'yikes'],
   z: ['zara', 'zest', 'zucker', '\'zine', 'zuckerberg']
}

dragApp.house = [
   'Snack',
   'The Drag Queen',
   'Davenport',
   'Velour',
   'Dolezal',
   'Edwards',
   'O\'Hara',
   'Haunt',
   'Filth',
   'Xtravaganza',
   'Astrology',
   'LaBeija'
]

// helper functions
dragApp.randomIndex = (array) => {
   const index = Math.floor(Math.random() * array.length);
   // this return allows the randomIndex() to push out a result when using this function within a variable
   return array[index]
}
   // hide the user form inputs but delay it a slight bit to make it look less janky
dragApp.delayFormHide = () => {
   setTimeout(function(){
      $('.userInputs').addClass('collapse')
   }, 200)
}

// event listener on the submit button that stores the users initials
dragApp.firstInitial = {}
dragApp.lastInitial = {}
dragApp.eventListeners = () => {
   $('form').on('submit', function(e){
      e.preventDefault();
      
      // store users initials into two variables by taking the entered string, reducing it to one character, and ensuring the character is lower case
      dragApp.firstInitial = $('#firstName').val().charAt(0).toLowerCase();
      dragApp.lastInitial = $('#lastName').val().charAt(0).toLowerCase();

      // pass results through an error catch to ensure user entered inputs properly
      dragApp.errorCatch(dragApp.firstInitial, dragApp.lastInitial);
   })

   $('.results').on('click', '#randomize', function(e){
      e.preventDefault();
      dragApp.pullDragName(dragApp.firstInitial, dragApp.lastInitial);
   })

   $('.results').on('click', '#refresh', function(e){
      e.preventDefault();
      // clears dragHouse for new selection
      dragApp.selectedHouse = []
      $('.results').removeClass('resultsSlide');
      $('.userInputs').removeClass('collapse')
   })
}

// user inputs their first and last name into two separate inputs and then submits the form
// ERROR FIXING: ensure that both inputs have at least one letter in them before submitting
dragApp.errorCatch = (userFirst, userLast) => {
   const errorMessage = `
   <div class="displayBox">
      <p class="errorMessage"> You think you're clever don't you!</p>
      <p>Even if your name is <span class="elon">X Æ A-12,</span> stick to <span class="warning" title="Please only use letters when typing in your name.">the alphabet.</span></h2>
      <form action="" class="resultsForm" name="resultsForm">
         <button class="submitButton" id="refresh" aria-label="Go back to main screen. Please remove any numbers or characters from your name">Do Better</button>
      </form>
   </div>
   `
   // the display function only goes through if the initials of both inputs matches one of the keys in their respective objects, otherwise it spits out the error message
   if (dragApp.firstNames[userFirst] && dragApp.lastNames[userLast]) {
      dragApp.pullDragName(userFirst, userLast, dragApp.house)
   } else {
      $('.results').html(errorMessage)
      $('.results').addClass('resultsSlide')
      dragApp.delayFormHide();
   }
}

// function to pull one drag name based on first initial from the available options
dragApp.pullDragName = (userFirst, userLast) => {
   // using the array of potential drag names (matched to the users intials), find a random index within that array and save to the variable
   const dragFirst = dragApp.randomIndex(dragApp.firstNames[userFirst])
   const dragLast = dragApp.randomIndex(dragApp.lastNames[userLast])
   const dragHouse = dragApp.pullDragHouse()
   
   // display the results of the random drag name 
   dragApp.displayResults(dragFirst, dragLast, dragHouse);
}

// pulls a random drag house and stores it
dragApp.selectedHouse = []
dragApp.pullDragHouse = () => {
   // checks to see if a random house has already been stored. if not: store a random house. if one is already stored, use the stored house name instead
   if (dragApp.selectedHouse.length === 0) {
      dragApp.selectedHouse.push(dragApp.randomIndex(dragApp.house))
      return dragApp.selectedHouse;
   } else {
      return dragApp.selectedHouse;
   }
}

// display the drag name in a string to the user
dragApp.displayResults = (firstD, lastD, house) => {
   const displayHTML = `
   <div class="displayBox">
      <p>Ladies and gentleman please welcome to the stage:</p>
      <h2>${firstD} ${lastD}</h2>
      <p>from the legendary <span class="dragHouse">House of ${house}!</span></p>
      <form action="" class="resultsForm wrapper" name="resultsForm">
         <button class="submitButton randomize" id="randomize">New Name</button>
         <button class="submitButton" id="refresh">Go Back</button>
      </form>
   </div>
   `
   $('.results').html(displayHTML);
   $('.results').addClass('resultsSlide')
   dragApp.delayFormHide();
}


dragApp.init = () => {
   dragApp.eventListeners();
}

$(function(){
   dragApp.init();

})