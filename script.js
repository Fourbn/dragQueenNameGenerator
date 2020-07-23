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

//helper function
dragApp.randomNumber = (array) => {
   const index = Math.floor(Math.random() * array.length);
   //this return allows the randomNumber() to push out a result when using this function within a variable
   return array[index]
}

// event listener on the submit button that stores the users initials
dragApp.eventListeners = () => {
   $('form').on('submit', function(e){
      e.preventDefault();
      
      //store users initials into two variables by taking the entered string, reducing it to one character, and ensuring the character is lower case
      const firstInitial = $('#firstName').val().charAt(0).toLowerCase();
      const lastInitial = $('#lastName').val().charAt(0).toLowerCase();

      //pass results through an error catch to ensure user entered inputs properly
      dragApp.errorCatch(firstInitial, lastInitial);
   })
}

// user inputs their first and last name into two separate inputs and then submits the form
// ERROR FIXING: ensure that both inputs have at least one letter in them before submitting
dragApp.errorCatch = (userFirst, userLast) => {
   const errorMessage = `<h2> Gurrrrl, unless your name is X Æ A-12, you're guna need to use regular letters. Sorry Elon!</h2>`

   //the display function only goes through if the initials of both inputs matches one of the keys in the object, otherwise it spits out the error message
   if (dragApp.firstNames[userFirst] && dragApp.lastNames[userLast]) {
      // based on users initials, generate a complete drag name
      dragApp.pullDragName(userFirst, userLast)
   } else {
      $('.results').html(errorMessage)
   }
}

//function to pull one drag name based on first initial from the available options
dragApp.pullDragName = (userFirst, userLast) => {

   // using the array of potential drag names (matched to the users intials), find a random index within that array and save to the variable
   const dragFirst = dragApp.randomNumber(dragApp.firstNames[userFirst])
   const dragLast = dragApp.randomNumber(dragApp.lastNames[userLast])

   // display the results of the random drag name 
   dragApp.displayResults(dragFirst, dragLast);
}

//display the drag name in a string to the user
dragApp.displayResults = (firstD, lastD) => {
   const displayHTML = `
   <h2>Ladies and Gentleman please welcome to the stage:</h2>
   <h2>${firstD} ${lastD}</h2>
   `
   $('.results').html(displayHTML);
}



dragApp.init = () => {
   dragApp.eventListeners();
}

$(function(){
   dragApp.init();

})