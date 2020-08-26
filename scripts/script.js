import dragData from './data.js'

// Drag Persona Generator App
const dragApp = {}

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
   if (dragData.firstNames[userFirst] && dragData.lastNames[userLast]) {
      dragApp.pullDragName(userFirst, userLast, dragData.house)
   } else {
      $('.results').html(errorMessage)
      $('.results').addClass('resultsSlide')
      dragApp.delayFormHide();
   }
}

// function to pull one drag name based on first initial from the available options
dragApp.pullDragName = (userFirst, userLast) => {
   // using the array of potential drag names (matched to the users intials), find a random index within that array and save to the variable
   const dragFirst = dragApp.randomIndex(dragData.firstNames[userFirst])
   const dragLast = dragApp.randomIndex(dragData.lastNames[userLast])
   const dragHouse = dragApp.pullDragHouse()
   
   // display the results of the random drag name 
   dragApp.displayResults(dragFirst, dragLast, dragHouse);
}

// pulls a random drag house and stores it
dragApp.selectedHouse = []
dragApp.pullDragHouse = () => {
   // checks to see if a random house has already been stored. if not: store a random house. if one is already stored, use the stored house name instead
   if (dragApp.selectedHouse.length === 0) {
      dragApp.selectedHouse.push(dragApp.randomIndex(dragData.house))
      return dragApp.selectedHouse;
   } else {
      return dragApp.selectedHouse;
   }
}

// display the drag name in a string to the user

// NOTE: New Name button not as clear as I thought it would. Random Name or Better Name.
// NOTE: Go back button should be on the left side, expect it to be there
dragApp.displayResults = (firstD, lastD, house) => {
   const displayHTML = `
   <div class="displayBox">
      <p>Ladies and genders please welcome to the stage:</p>
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