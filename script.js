/* STEP 1:
Create Prompts to gather user preferences e.g. password length, character types like uppercase,
lowercase, numbers, and special characters.

STEP 2:
Validation - Ensure the input is valid e.g. length between 8-128 characters, at least one 
character type selected  */


// Step 1: Ask for password length 
function getPasswordCriteria() {
  // Step 1: Ask for password length
  var length = parseInt(prompt("Enter the desired password length (between 8 and 128 characters):")); //parseInt - converts the input (a string) into a numbers

  // Validate length of password
  while (isNaN(length) || length < 8 || length > 128) {
    alert("Invalid input. Password length must be a number between 8 and 128.");
    //this mean if user input is not a number or less than 8 characters or over 128 characters then alert
    length = parseInt(prompt("Enter the desired password length (between 8 and 128 characters):")); // this line reinstates the prompt again if user input fails
  }

  // Step 2: Ask for character types
  var includeLowercase = confirm("Do you want to include lowercase letters?"); //confirm: Displays a Yes/No dialog. It returns true if the user clicks "OK" and false otherwise.
  var includeUppercase = confirm("Do you want to include uppercase letters?");
  var includeNumbers = confirm("Do you want to include numbers?");
  var includeSpecial = confirm("Do you want to include special characters?");

  // Validate at least one character type is selected 
  while (!includeLowercase && !includeUppercase && !includeNumbers && !includeSpecial) {
    alert("You must include at least one character type.");
    includeLowercase = confirm("Do you want to include lowercase letters?");
    includeUppercase = confirm("Do you want to include uppercase letters?");
    includeNumbers = confirm("Do you want to include numbers?");
    includeSpecial = confirm("Do you want to include special characters?");
  }
  // Return criteria as an object
  return {
    length,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSpecial
  };
}

/* STEP 3: 
Generate Password - use the criteria to build a password randomly using arrays and iteration */
function generatePassword() {
  const criteria = getPasswordCriteria(); // Calls your prompts
   // Character sets to choose from
   const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
   const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   const numberChars = "0123456789";
   const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

let possibleChars = ""; // (possibleChars) builds a string by checking which character types the user selected

if (criteria.includeLowercase){
  possibleChars += lowercaseChars;
}
if (criteria.includeUppercase) {
  possibleChars += uppercaseChars;
}
if (criteria.includeNumbers) {
  possibleChars += numberChars;
}
if (criteria.includeSpecial) {
  possibleChars += specialChars;
}

 var password = "";
 for (var i=0; i< criteria.length; i++) {
  var randomIndex = Math.floor(Math.random() * possibleChars.length);
  password += possibleChars[randomIndex];
 }

 return password;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword(); // ← This calls your main function
  var passwordText = document.querySelector("#password"); // Finds the text box
  passwordText.value = password; // Puts the password in the box
}

// Add event listener to generate button
var generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", writePassword);

/* STEP 4: 
Display Password - Output the generated password to the input box on the webpage. */



/* GIVEN I need a new, secure password
WHEN I click the button to generate a password
THEN I am presented with a series of prompts for password criteria
WHEN prompted for password criteria
THEN I select which criteria to include in the password
WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters
WHEN asked for character types to include in the password
THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected
WHEN all prompts are answered
THEN a password is generated that matches the selected criteria
WHEN the password is generated
THEN the password is either displayed in an alert or written to the page */