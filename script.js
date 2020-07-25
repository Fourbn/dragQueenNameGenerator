// Drag Persona Generator App
const dragApp = {}

// create two arrays, 1 for drag first names + 1 for drag last names 
//    (1 for each letter of the alphabet)
dragApp.firstNames = {
   a: ['amber'],
   b: ['barbie'],
   c: ['cherry'],
   d: ['diamond'],
   e: ['edna'],
   f: ['foxy'],
   g: ['goodie'],
   h: ['harmony', 'hilda'],
   i: ['ida'],
   j: ['jasmine'],
   k: ['kandi'],
   l: ['lady'],
   m: ['mistress'],
   n: ['naomi'],
   o: ['ornatia'],
   p: ['portia'],
   q: ['queen'],
   r: ['rosalind'],
   s: ['sapphire'],
   t: ['tiffany'],
   u: ['unique'],
   v: ['venus'],
   w: ['wynona'],
   x: ['xena'],
   y: ['yvie'],
   z: ['zenisha']
}

dragApp.lastNames = {
   a: ['aphrodyte'],
   b: ['boop', 'bellhop'],
   c: ['chardonney'],
   d: ['danger'],
   e: ['essex'],
   f: ['ferocious'],
   g: ['gumdrops'],
   h: ['hart'],
   i: ['illy'],
   j: ['jeans'],
   k: ['kane'],
   l: ['luxury'],
   m: ['mystery'],
   n: ['nasty'],
   o: ['opalence'],
   p: ['paris'],
   q: ['quinn'],
   r: ['redd'],
   s: ['sublime'],
   t: ['trash'],
   u: ['umbridge'],
   v: ['vanity'],
   w: ['winter'],
   x: ['xenobia'],
   y: ['yaya'],
   z: ['zara']
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
]

//helper function
dragApp.randomIndex = (array) => {
   const index = Math.floor(Math.random() * array.length);
   //this return allows the randomIndex() to push out a result when using this function within a variable
   return array[index]
}

// event listener on the submit button that stores the users initials
dragApp.firstInitial = {}
dragApp.lastInitial = {}
dragApp.eventListeners = () => {
   $('form').on('submit', function(e){
      e.preventDefault();
      
      //store users initials into two variables by taking the entered string, reducing it to one character, and ensuring the character is lower case
      dragApp.firstInitial = $('#firstName').val().charAt(0).toLowerCase();
      dragApp.lastInitial = $('#lastName').val().charAt(0).toLowerCase();

      //pass results through an error catch to ensure user entered inputs properly
      dragApp.errorCatch(dragApp.firstInitial, dragApp.lastInitial);
   })

   $('.results').on('click', '#randomize', function(e){
      e.preventDefault();
      dragApp.pullDragName(dragApp.firstInitial, dragApp.lastInitial)
   })
}

// user inputs their first and last name into two separate inputs and then submits the form
// ERROR FIXING: ensure that both inputs have at least one letter in them before submitting
dragApp.errorCatch = (userFirst, userLast) => {
   const errorMessage = `
   <div class="displayBox">
      <p class="errorMessage"> You think you're clever don't you!</p>
      <p>Even if your name is <span class="elon">X Æ A-12,</span> stick to <span class="warning">the alphabet.</span></h2>
   </div>
   `

   //the display function only goes through if the initials of both inputs matches one of the keys in the object, otherwise it spits out the error message
   if (dragApp.firstNames[userFirst] && dragApp.lastNames[userLast]) {
      // based on users initials, generate a complete drag name
      dragApp.pullDragName(userFirst, userLast, dragApp.house)
   } else {
      $('.results').html(errorMessage)
   }
}

//function to pull one drag name based on first initial from the available options
dragApp.pullDragName = (userFirst, userLast) => {
   // using the array of potential drag names (matched to the users intials), find a random index within that array and save to the variable
   const dragFirst = dragApp.randomIndex(dragApp.firstNames[userFirst])
   const dragLast = dragApp.randomIndex(dragApp.lastNames[userLast])
   const dragHouse = dragApp.pullDragHouse()
   
   // display the results of the random drag name 
   dragApp.displayResults(dragFirst, dragLast, dragHouse);
}

// write a separate drag house randomizer function
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


//display the drag name in a string to the user
dragApp.displayResults = (firstD, lastD, house) => {
   const displayHTML = `
   <div class="displayBox">
      <p>Ladies and gentleman please welcome to the stage:</p>
      <h2>${firstD} ${lastD}</h2>
      <p>from the legendary <span class="dragHouse">House of ${house}!</span></p>
      <form action="" class="resultsForm" name="resultsForm">
         <button class="submitButton" id="randomize">New Name!</button>
         <button class="submitButton" id="refresh">Refresh</button>
      </form>
   </div>
   `
   $('.results').html(displayHTML);
   $('.results').addClass('resultsSlide')
}



dragApp.init = () => {
   dragApp.eventListeners();
}

$(function(){
   dragApp.init();

})