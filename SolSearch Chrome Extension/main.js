//Detect wether the current website is Safe. If not, check if the website is Solana related. If it is Solana related and not in the safe list, warn the user. 

//Get saved settings from Chrome storage
//Initialize global variables
var warningCBox;
var retypingCBox;
var debugCBox;

function updateSettings() {
  chrome.storage.sync.get({
    //Set default results
    warningCBox: true,
    retypingCBox: true,
    debugCBox: false,
  }, function(items) {
    window.warningCBox = items.warningCBox;
    window.retypingCBox = items.retypingCBox;
    window.debugCBox = items.debugCBox;
  });
}
updateSettings();


//Set the var url to current url
const url = window.location.href;

//This is the filter for the websites. This should be updated, and automated in the future so links can be added easily. 
const regex = /\/\/(www.)?solend.fi\/|\/\/(www.)?jup.ag\/|\/\/(www.)?orca.so\//gm;

//Use the filter
const found = url.match(regex);


//Detection Algorithm
//Detect if a website is Solana related
//Only runs if url is not matched
function detectSolana() {
  //Scrape all the websites text and make it lowercase.
  var content = document.body.textContent || document.body.innerText;
  var contentLowerCase = content.toLowerCase()
  //Terms
  var hasSolana = contentLowerCase.indexOf("solana")!==-1;
  var hasSol = contentLowerCase.indexOf(" sol ")!==-1;
  var hasConnectWallet = contentLowerCase.indexOf("connect wallet")!==-1;
  var hasLaunchApp = contentLowerCase.indexOf("launch app")!==-1;
  //Apply Weights to Terms
  //Needs to be calculated
  var totalScore = hasSolana + hasSol + hasConnectWallet + hasLaunchApp
  //Debuging
  if (debugCBox) {
    alert("Total score: " + totalScore + "\nSolana: " + hasSolana + "\nSol: " + hasSol + "\nConnect Wallet: " + hasConnectWallet + "\nLaunch App: " + hasLaunchApp)
  }
  //If score is above n, alert user that this is a potentially unsafe solana website. 
  if (totalScore >= 2) {
    warning();
  } 
}


//Warning function, runs on websites that are solana related but unknown
//Only runs if warningCBox is checked
function warning() {
  if (retypingCBox) {
    //These are just placeholders for now
    alert("Retyping placeholder")
  }
  else {
    //Another placeholder
    alert("Normal warning placeholder")
  }
}


//SafePopup Function
//Runs on all urls that are matched
function safePopup () {
  //Create our safe popup
  var div = document.createElement("div");
  //This HTML is inserted at the top of the body. 
  div.innerHTML =
    '<div class="popupSafe" id="popupSafe-1">\n' +
      '<div class="overlay"></div>\n' +
      '<div class="content">\n' +
        '<p>This website is secure. Click this link to learn more.</p>\n' +
      '</div>\n' + 
    '</div>\n'
  document.body.prepend(div);
  //Fade out after a few seconds
  //Needs to be coded, and css needs an overhaul
}


//Main logic of the program
//Delay 2 seconds to ensure that the website is fully loaded before searching through it
setTimeout(function(){
  //If the website is not matched by the regex filter
  if (found === null) {
    if (warningCBox) {
      detectSolana();  
    }
  } 
  //If the website is matched by the regex filter. 
  else {
    safePopup();
  }
}, 2000);