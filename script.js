//start game
function start() {
    //redirect to gameplay page
    window.location.href = "gameplay.html";
}

//reset game
function reset() {
    let reset = confirm("Do you want to reset your choices? You will be taken back to the starter page. This action cannot be undone.");
    if(reset) {
        //redirect to opening index page
        window.location.href = "index.html";
    }
}

//eventArr holds all the different events the player experiences
let eventArr = [
        {time: "The very beginning<br>~4.5 billion years ago", timeDescription: "Welcome to the beginning of the world. This is the earth as far back as we know it.", crisis: false, planetIMG: "planet0.png"},
    {time: "Is that... LIFE?<br>~3.7 billion years ago", timeDescription: "Life has evolved into existence! Soon the earth will grow to harbor many different animals and plants. For now, we see the first signs of life with microbes.", crisis: false, planetIMG: "planet1.png"},
    {time: "The dinosaur times<br>~230 million years ago", timeDescription: "Wow! Dinosaurs now exist in the world! The earth is thriving with many different species of animals and plants.", crisis: true, crisisNum: 0, planetIMG: "planet2.png"},
    {time: "The first Bye bye<br>~65 million years ago", timeDescription: "", crisis: false, planetIMG: "planet3.png"},
    {time: "One step for humankind<br>~5-7 million years ago", timeDescription: "The first ancestors of humans have appeared! They are slowly learning to walk on their legs.", crisis: true, crisisNum: 1, planetIMG: "planet4.png"},
    {time: "First thought<br>12-9th century BC", timeDescription: "Humanity survives through the harsh times and establishes the first schools of thought, available for all scholars such as Aristotle and Euclid.", crisis: false, planetIMG: "planet5.png"},
    {time: "The birth of civilization<br>4000-3500 BC", timeDescription: "This time period is considered to be the beginning of civilization. In Mesopotamia, the writing and recording history is said to have begun.", crisis: true, crisisNum: 2, planetIMG: "planet6.png"},
    {time: "A thinker's paradise<br>1543-1687", timeDescription: "", crisis: false, planetIMG: "planet70.png"},
    {time: "Victory on multiple fronts<br>1765-1804", timeDescription: "It seems that the previous scientific revolution inspired a whole series of critical thinking and revolutions. Here begins the freedom revolutions.", crisis: false, planetIMG: "planet8.png"},
    {time: "Power of the brain<br>1765-1840", timeDescription: "With rising revolutions, comes improving technology. In the industrial revolution, steam engines bring new ways for humanity to live.", crisis: true, crisisNum: 3, planetIMG: "planet9.png"},
    {time: "A great war<br>1914-1918", timeDescription: "With political tension, comes political fights. Many fight for what they thought to be the first and last great war of their time.", crisis: false, planetIMG: "planet10.png"},
    {time: "A not-so-Spanish Spanish Flu<br>1918", timeDescription: "From the ruins of war rises the horrific implications of a new epidemic: the Spanish Flu (which didn't actually originate in Spain)", crisis: true, crisisNum: 4, planetIMG: "planet11.png"},
    {time: "Another war?<br>1939-1945", timeDescription: "Rising tensions between nations have led to a war! Now, a crisis looms over all, the threat of death if wrongfully allied is a harsh reality.", crisis: true, crisisNum: 5, planetIMG: "planet12.png"},
    {time: "The movements of change<br>1960-2000", timeDescription: "Finally, things have started to die down, and humanity is back to fighting for proper rights for everyone! It seems we are now back on the right path.", crisis: false, planetIMG: "planet13.png"},
    {time: "Seriously, another one?<br>2019-2022", timeDescription: "With the world going so pleasantly since the past few chaotic decades, of course another pandemic rolls along.", crisis: true, crisisNum: 6, planetIMG: "planet14.png"},
    {time: "The present times<br>2023-2050", timeDescription: "Welcome back. The world is on fire. The ever increasing technology seems to have backfired, causing massive smoke and heat to be released to the atmosphere.", crisis: true, crisisNum: 7, planetIMG: "planet15.png"},
];

//currentLocation specifies the specific time that the user is at (updates based on the moveTime function)
let currentLocation = 0;

//crisis array holds all the information for each crisis option
let crisis = [
    {crisis0: "Warn dinosaurs", crisis1: "Don't warn dinosaurs", nextEvent: 3, currentCrisis: "An asteroid is going to hit the planet 165 million years from now. Warn the dinosaurs?", ending: 0,
        multipleOutcomes: true,
        outcome0: "The dinosaurs are extinct! Looks like the dinosaurs did not understand your speech patterns. The earth is now cooling once more from the collision with the asteroid.",
        outcome1: "The dinosaurs are extinct! The earth is now cooling once more from the collision with the asteroid."},
    {crisis0: "Give fire", crisis1: "Don't give fire", nextEvent: 5, currentCrisis: "The nights are cold and winter is approaching. Give the humans fire?", ending: 1,
        endingChoice: "crisis1", multipleOutcomes: false},
    {crisis0: "Stop Caesar", crisis1: "Let Caesar be", nextEvent: 7, currentCrisis: "In a couple thousand years, a man called Julius Caesar will arrive and “accidentally” destroy the famed Library of Alexandria.", ending: 0,
        multipleOutcomes: true,
        outcome0: "Julius Caesar had an early death, and the Library of Alexandria was saved! Now, the world enters the scientific revolution, compiling knowledge from the past.",
        outcome1: "The Library of Alexandria is destroyed, and Julius Caesar was  betrayed by his court. However, a new period of thinking begins with the scientific revolution!"},
    {crisis0: "Join the military", crisis1: "Stay far away", nextEvent: 11, currentCrisis: "A looming doom approaches -- as technology improves, many get politically greedy. A new kind of war is about to begin.", ending: 3,
        endingChoice: "crisis0", multipleOutcomes: false},
    {crisis0: "The flu isn't too bad", crisis1: "What?! Hide, it's the flu!", nextEvent: 12, currentCrisis: "The ever spreading virus doesn't seem to stop! People are collapsing left and right, is it really okay to be outside?", ending: 2,
        endingChoice: "crisis0", multipleOutcomes: false},
    {crisis0: "Sabotage weapons", crisis1: "More weapons for everyone!", nextEvent: 13, currentCrisis: "The rising fights bring about new innovations and technology. There are now powerful weapons in the hands of the military.", ending: 4,
        endingChoice: "crisis1", multipleOutcomes: false},
    {crisis0: "It's not a big deal", crisis1: "Everyone stay home", nextEvent: 15, currentCrisis: "Another pandemic?? The last one didn't turn out so well, with so many deaths. This won't be a similar case... right?", ending: 2,
        endingChoice: "crisis0", multipleOutcomes: false},
    {crisis0: "Push for less pollution", crisis1: "Let it burn!", currentCrisis: "The predicted dates for the end of the world is arriving, with this new form of climate change posing a great danger for your future. You will fulfill your purpose for coming here, right?", ending: 5,
        endingChoice: "crisis1", multipleOutcomes: false},
];

//updates with the choices the user has made
let choices = [];

//choicesNum describes which point at crisis (arr) this choice occurs
let crisisNum = -1;

let redirectEnding = false;
//takes the inputted choice and outputs the outcome
function crisisOption(num) {
    //updates crisisChoice with chosen option
    let choice = "crisis"+num;
    document.getElementById("crisisChoice").innerHTML = crisis[crisisNum][choice];
    choices[crisisNum] = crisis[crisisNum][choice];

    //sets redirectEnding true if the crisis page does lead to an ending and the choice leads to the end
    redirectEnding = (crisis[crisisNum].ending != 0 && choice == crisis[crisisNum].endingChoice);

    //re-enable move forward button
    document.getElementById("forward").disabled = false;

    //update next event description if there are different descriptions based on choices made
    if(crisis[crisisNum].multipleOutcomes == true) {
        let outcome = "outcome"+num;
        let nextLocation = crisis[crisisNum].nextEvent;
        eventArr[nextLocation].timeDescription = crisis[crisisNum][outcome];
    }

    //update choice image for Caesar
    if(currentLocation == 6) {
        let newIMG = "planet7"+num+".png";
        eventArr[7].planetIMG = newIMG;
    }
}

//moves the user forward or backwards in time
//+1 num is forward; -1 is backward
function moveTime(num) {
    currentLocation += num;

    if(currentLocation < 16) {
        //if time is moved forward and the choice has an ending,
        if(redirectEnding && num == 1) {
            endings(crisis[crisisNum].ending);
        }

        //get rid of the previously made choice if the user goes back and the currentLocation has a crisis
        if(num == -1 && eventArr[currentLocation].crisis == true) {
            choices.pop();
        }

        //if moves backward, forward button should be re-enabled
        if(num == -1) {
            document.getElementById("forward").disabled = false;
        }

        //resets crisisChoice
        document.getElementById("crisisChoice").innerHTML = "";

        updateHTML();
    } else {
        endings(6);
    }
}

//update the html descriptions
function updateHTML() {
    let currentEvent = eventArr[currentLocation];

    //update individual sections based on changed eventArr
    document.getElementById("time").innerHTML = currentEvent.time;
    document.getElementById("timeDescription").innerHTML = currentEvent.timeDescription;

    //update planetIMG
    document.getElementById("planetIMG").src = "images/"+eventArr[currentLocation].planetIMG;

    //display hiddenCrisis if there is a crisis occurring
    if(currentEvent.crisis) {
        //sets the new crisis array index
        crisisNum = eventArr[currentLocation].crisisNum;

        showCrisis();
    } else {
        hideCrisis();

        //update currentCrisis description
        document.getElementById("currentCrisis").innerHTML = "There is no crisis as of now. Move forward in time to proceed.";
    }

    //update history of choices the user has made
    showChoices("history");
}

//show hiddenCrisis
function showCrisis() {
    //show the buttons
    document.getElementById("crisisIMGdiv").style.display = "block";
    document.getElementById("crisisBtn").style.display = "block";

    //updates the crisis option buttons
    document.getElementById("crisis0").innerHTML = crisis[crisisNum].crisis0;
    document.getElementById("crisis1").innerHTML = crisis[crisisNum].crisis1;

    //updates crisis description
    document.getElementById("currentCrisis").innerHTML = crisis[crisisNum].currentCrisis;

    //disables move forward button
    document.getElementById("forward").disabled = true;
}

//hide hiddenCrisis
function hideCrisis() {
    document.getElementById("crisisIMGdiv").style.display = "none";
    document.getElementById("crisisBtn").style.display = "none";
}

//displays the current choices made
//id is the id of the ul that the choices will be added to
function showChoices(id) {
    //resets initial <ul> with id="id"
    document.getElementById(id).innerHTML = "";

    //loops through the choices and adds it to the <ul> with id="id"
    for(let i=0; i<choices.length; i++) {
        document.getElementById(id).innerHTML += "<li>"+choices[i]+"</li>";
    }
}

//takes the user to the ending they got
//num is the number which describes the user's ending (starts from 1; 0 means there is no ending)
/* endings in order (to keep track of num):
* ending1 = famine
* ending2 = disease
* ending3 = you died!
* ending4 = war
* ending5 = climate change
* ending6 (true ending) = everyone lives
* */
function endings(num) {
    if(num!=0) {
        //hides gameplay page
        document.getElementById("gameplay").style.display = "none";

        //shows ending page
        let endingNum = "ending"+num;
        document.getElementById(endingNum).style.display = "block";

        //displays user's choices on <ul> of the ending page
        let choiceID = "end"+num;
        showChoices(choiceID);
    }
}