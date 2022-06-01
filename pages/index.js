import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

// document.getElementById("name-prompt").style.display = "none";

const LIST_OF_AREAS = [
  "Software Engineering",
  "Data Science",
  "Machine Learning",
  "Web Development",
  "Accounting",
  "Marketing",
  "Finance",
  "Business Development",
];
const DEFAULT_PROFILE_PATH = "/defaultProfile.png";
const DEFAULT_PROFILE_WIDTH = "100px";
const GIF_PATH = "/congrats.gif";
const GIF_WIDTH = "500px";
const GIF_HEIGHT = "600px";
var personDetails = {};

function handleNextSubmit() {
  // document.getElementById("title-prompt").style.display = "none"
  // document.getElementById("name-prompt").style.display = "block";
  document.getElementById("title-prompt").innerText =
    "Let's start with your name.";
  setTimeout(showNameInput, 1000);
}

function showNameInput() {
  console.log("ran");
  document.getElementById("name-form").className = "";
}
// TODO: factor this out into second order function
function handleNameSubmit(e) {
  e.preventDefault();
  personDetails["name"] = document.getElementById("name-input").value;
  showNameOutput(document.getElementById("name-input").value);
  document.getElementById("next-button").style.display = "none";
  setTimeout(showPositionPrompt, 2000);
  document.getElementById("name-input").value = "";
  document.getElementById("name-form").style.display = "none";
}

function handlePositionSubmit(e) {
  e.preventDefault();
  personDetails["position"] = document.getElementById("position-input").value;
  document.getElementById("position-form").style.display = "none";
  setTimeout(showAreaOfExpertisePrompt, 1000);
  document.getElementById("position-input").value = "";
}

function handleAreaOfExpertiseSubmit(e) {
  e.preventDefault();
  const arrayOfExpertise = [];
  for (const area of LIST_OF_AREAS) {
    console.log("id to search", area)
    if (document.getElementById(`expert-${area}`).checked) {
      arrayOfExpertise.push(area)
    }
  }
  personDetails["areasOfExpertise"] = arrayOfExpertise
  document.getElementById("area-form").style.display = "none";
  setTimeout(showHelpPrompt, 1000);
  // document.getElementById("position-input").value = "";
}

function handleHelpSubmit(e) {
  e.preventDefault();
  const arrayOfExpertise = [];
  for (const area of LIST_OF_AREAS) {
    if (document.getElementById(`help-${area}`).checked) {
      arrayOfExpertise.push(area)
    }
  }
  personDetails["areasOfExpertise"] = arrayOfExpertise
  personDetails["areasOfHelp"] = arrayOfExpertise
  document.getElementById("help-form").style.display = "none";
  setTimeout(showBioPrompt, 1000);
  // document.getElementById("position-input").value = "";
}

function handleBioSubmit(e) {
  e.preventDefault();
  personDetails['bio'] = document.getElementById("bio-input").value
  document.getElementById("bio-form").style.display = "none";
  // document.getElementById("bio-form").classList.add("displayNone");
  document.getElementById(
    "title-prompt"
  ).innerText = `Congrats ${personDetails.name}! You have officially joined the Tapply comunity!`;
  console.log(personDetails)
  document.getElementById("gif-div").style.display = "block";
}

function showBioPrompt() {
  const defaultBio = createDefaultBio(
    personDetails.name,
    personDetails.position,
    personDetails.areasOfExpertise,
    personDetails.areasOfHelp
  );
  document.getElementById("title-prompt").innerText = "Tell us about yourself.";
  document.getElementById("bio-form").className = "";
  document.getElementById("bio-input").value = defaultBio;
  document.getElementById("profile-img").src = DEFAULT_PROFILE_PATH;
}

function createDefaultBio(name, position, areasOfExpertise, areasOfHelp) {
  const strSentenceExpertise = createStrSentence(areasOfExpertise);
  console.log(strSentenceExpertise)
  const strSentenceHelp = createStrSentence(areasOfHelp);
  return `Hi, I'm ${name}, a ${position}. I have expertise in ${strSentenceExpertise}, and I'm looking for help in ${strSentenceHelp}.`;
}

function createStrSentence(areasOfExpertise) {
  var stringListOfExpertise = "";
  for (let i = 0; i < areasOfExpertise.length; i++) {
    if (i < areasOfExpertise.length - 1) {
      stringListOfExpertise += `${areasOfExpertise[i]}, `;
    }
    // size of list is 2, so no comma
    else if (i == 1) {
      stringListOfExpertise = stringListOfExpertise.slice(0, -2)
      stringListOfExpertise += ` and ${areasOfExpertise[i]}`
    }
    else {
      stringListOfExpertise += `and ${areasOfExpertise[i]}`;
    }
  }
  return stringListOfExpertise
}

function showAreaOfExpertisePrompt() {
  document.getElementById("title-prompt").innerText =
    "Which areas do you have expertise in?";
  document.getElementById("area-form").className = "";
}

function showHelpPrompt() {
  document.getElementById("title-prompt").innerText =
    "Which areas do you need help in?";
  document.getElementById("area-form").style.display = "none";
  document.getElementById("help-form").className = "";
}

// TODO: factor this out into second order function
function showPositionPrompt() {
  document.getElementById("title-prompt").innerText = "What is your position?";
  document.getElementById("position-form").className = "";
}

function showNameOutput(nameString) {
  const outputTxt = `Nice to meet you ${nameString}!`;
  document.getElementById("title-prompt").innerText = outputTxt;
}
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tapply Setup</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    {/* TODO: autofocus all inputs */}
      <main className={styles.main}>
        <h1 id="title-prompt" className={styles.title}>
          Hi, Welcome to Tapply!
        </h1>
        <h1 id="name-prompt" className={styles.title && styles.displayNone}>
          Let's start with your name.
        </h1>
        {/* Name form */}
        <form
          id="name-form"
          onSubmit={handleNameSubmit}
          className={styles.displayNone}
        >
          <input type="text" placeholder="Sophia Smith" id="name-input" />
          <button id="submit-button">Submit</button>
        </form>
        {/* Position form */}
        <form
          id="position-form"
          onSubmit={handlePositionSubmit}
          className={styles.displayNone}
        >
          <input
            type="text"
            placeholder="Software Engineer at Google"
            id="position-input"
          />
          <button id="submit-button">Submit</button>
        </form>
        {/* Area of expertise form */}
        <form
          id="area-form"
          onSubmit={handleAreaOfExpertiseSubmit}
          className={styles.displayNone}
        >
          {LIST_OF_AREAS.map((area) => (
            <>
              <input type="checkbox" id={`expert-${area}`} />
              <label htmlFor={area}>{area}</label>
              <br />
            </>
          ))}
          <button id="submit-button">Submit</button>
        </form>
        {/* Help form */}
        <form
          id="help-form"
          onSubmit={handleHelpSubmit}
          className={styles.displayNone}
        >
          {LIST_OF_AREAS.map((area) => (
            <>
              <input type="checkbox" id={`help-${area}`} />
              <label htmlFor={area}>{area}</label>
              <br />
            </>
          ))}
          <button id="submit-button">Submit</button>
        </form>
        {/* Bio form */}
        <form
          id="bio-form"
          onSubmit={handleBioSubmit}
          className={styles.displayNone}
        >
          <Image
            id="profile-img"
            src={DEFAULT_PROFILE_PATH}
            width={DEFAULT_PROFILE_WIDTH}
            height={DEFAULT_PROFILE_WIDTH}
            alt="default profile image"
          ></Image>
          <input type="text" id="bio-input" />
          <button id="submit-button">Submit</button>
        </form>
        <button
          id="next-button"
          className={styles.button}
          onClick={handleNextSubmit}
        >
          Next
        </button>
        <div id="gif-div" className={styles.displayNone}>
          <Image
            id="gif-img"
            alt="panda dancing"
            src={GIF_PATH}
            width={GIF_WIDTH}
            height="400px"
          ></Image>
        </div>
      </main>

      <footer className={styles.footer}>
       
            <Image src="/tapply-logo.svg" alt="Tapply Logo" width={150} height={64} />
      </footer>
    </div>
  );
}
