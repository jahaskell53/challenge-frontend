import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import cx from 'classnames';
// TODO: factor out functions to be used in other files
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
const GIF_HEIGHT = "400px";
const TRANSITION_TIME = 1000;
var personDetails = {};
  
function handleNameSubmit(e) {
  e.preventDefault();
  personDetails["name"] = document.getElementById("name-input").value;
  showNameOutput(document.getElementById("name-input").value);
  setTimeout(showPositionPrompt, TRANSITION_TIME + TRANSITION_TIME);
  document.getElementById("name-form").style.display = "none";
}

function handlePositionSubmit(e) {
  e.preventDefault();
  personDetails["position"] = document.getElementById("position-input").value;
  setDisplayNone("position-form");
  setTimeout(showAreaOfExpertisePrompt, TRANSITION_TIME);
}

function handleAreaOfExpertiseSubmit(e) {
  e.preventDefault();
  const arrayOfExpertise = [];
  for (const area of LIST_OF_AREAS) {
    console.log("id to search", area);
    if (document.getElementById(`expert-${area}`).checked) {
      arrayOfExpertise.push(area);
    }
  }
  personDetails["areasOfExpertise"] = arrayOfExpertise;
  setDisplayNone("area-form");
  setTimeout(showHelpPrompt, TRANSITION_TIME);
}

function handleHelpSubmit(e) {
  e.preventDefault();
  const arrayOfExpertise = [];
  for (const area of LIST_OF_AREAS) {
    if (document.getElementById(`help-${area}`).checked) {
      arrayOfExpertise.push(area);
    }
  }
  personDetails["areasOfExpertise"] = arrayOfExpertise;
  personDetails["areasOfHelp"] = arrayOfExpertise;
  setDisplayNone("help-form");
  setTimeout(showBioPrompt, TRANSITION_TIME);
}

function handleBioSubmit(e) {
  e.preventDefault();
  personDetails["bio"] = document.getElementById("bio-input").value;
  setDisplayNone("bio-form");
  setTimeout(() => {
    changeTitleText(
      `Congrats ${personDetails.name}! You have officially joined the Tapply comunity!`
    );
    console.log(personDetails);
    document.getElementById("gif-div").style.display = "block";
  }, TRANSITION_TIME);
}

function showBioPrompt() {
  const defaultBio = createDefaultBio(
    personDetails.name,
    personDetails.position,
    personDetails.areasOfExpertise,
    personDetails.areasOfHelp
  );
  transitionToNextStep("Tell us about yourself.", "bio-form");
  document.getElementById("bio-input").style.width = "300px";
  document.getElementById("bio-input").style.height = "200px";
  document.getElementById("bio-input").value = defaultBio;
  document.getElementById("profile-img").src = DEFAULT_PROFILE_PATH;
}

function createDefaultBio(name, position, areasOfExpertise, areasOfHelp) {
  const strSentenceExpertise = createStrSentence(areasOfExpertise);
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
      stringListOfExpertise = stringListOfExpertise.slice(0, -2);
      stringListOfExpertise += ` and ${areasOfExpertise[i]}`;
    } else {
      stringListOfExpertise += `and ${areasOfExpertise[i]}`;
    }
  }
  return stringListOfExpertise;
}

function showAreaOfExpertisePrompt() {
  transitionToNextStep("Which areas do you have expertise in?", "area-form");
}

function showHelpPrompt() {
  transitionToNextStep("Which areas would you like help in?", "help-form");
  setDisplayNone("area-form");
}

function showPositionPrompt() {
  transitionToNextStep("What is your position?", "position-form");
  setTimeout(() => document.getElementById("position-input").focus(), TRANSITION_TIME);
}

function showNameInput() {
  makeElementVisibleByRemovingDisplayNoneClass("name-form");
  document.getElementById("name-input").focus();
  document.getElementById("name-input").style.width = "400px"
}

function transitionToNextStep(titleTxt, nextElementId) {
  changeTitleText(titleTxt);
  setTimeout(
    () => makeElementVisibleByRemovingDisplayNoneClass(nextElementId),
    TRANSITION_TIME
  );
}

function makeElementVisibleByRemovingDisplayNoneClass(elementId) {
  document.getElementById(elementId).classList.remove(styles.displayNone);
}

function setDisplayNone(elementId) {
  document.getElementById(elementId).style.display = "none";
}

function changeTitleText(titleTxt) {
  document.getElementById("title-prompt").innerText = titleTxt;
}

function showNameOutput(nameString) {
  const outputTxt = `Nice to meet you ${nameString}!`;
  document.getElementById("title-prompt").innerText = outputTxt;
}
export default function Home() {
  useEffect(() => {
    setTimeout(() => {
      changeTitleText("Let's start with your name.");
    setTimeout(showNameInput, TRANSITION_TIME);
  }, TRANSITION_TIME);
  })
  return (
    <div className={styles.container}>
      <Head>
        <title>Tapply Setup</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 id="title-prompt" className={styles.title}>
          Hi, Welcome to Tapply!
        </h1>
        {/* Name form */}
        <form
          id="name-form"
          onSubmit={handleNameSubmit}
          className={styles.displayNone}
          
        >
        <div className={styles.flexBox}>
          <input type="text" placeholder="Sophia Smith" id="name-input" className={styles.title && styles.textInput} />
          <button className={styles.button} id="submit-button">Submit</button>
          </div>
        </form>
        {/* Position form */}
        <form
          id="position-form"
          onSubmit={handlePositionSubmit}
          className={styles.displayNone}
        >
        <div className={styles.flexBox}>
          <input
            type="text"
            placeholder="Software Engineer at Google"
            id="position-input"
            style={{fontSize: "50px"}}
            size="25"
            className={styles.title && styles.textInput}
          />
          <button id="submit-button" className={styles.button}>Submit</button>
          </div>
        </form>
        {/* Area of expertise form */}
        <form
          id="area-form"
          onSubmit={handleAreaOfExpertiseSubmit}
          className={styles.displayNone}
        >
          {LIST_OF_AREAS.map((area) => (
            <>
              <input type="checkbox" id={`expert-${area}`} className={styles.checkBox}  />
              <label htmlFor={area} className={styles.inputBox}>{area}</label>
              <br />
            </>
          ))}
          <button id="submit-button" className={cx(styles.button, styles.alignRight)}>Submit</button>
        </form>
        {/* Help form */}
        <form
          id="help-form"
          onSubmit={handleHelpSubmit}
          className={styles.displayNone}
        >
          {LIST_OF_AREAS.map((area) => (
            <>
              <input type="checkbox" id={`help-${area}`} className={styles.checkBox} />
              <label htmlFor={area} className={styles.inputBox}>{area}</label>
              <br />
            </>
          ))}
          <button id="submit-button" className={cx(styles.button, styles.alignRight)}>Submit</button>
        </form>
        {/* Bio form */}
        {/*Make this bigger */}
        <form
          id="bio-form"
          onSubmit={handleBioSubmit}
          className={styles.displayNone}
        >
        <div id="bio-div" className={styles.bioDiv}>
          <Image
            id="profile-img"
            src={DEFAULT_PROFILE_PATH}
            width={DEFAULT_PROFILE_WIDTH}
            height={DEFAULT_PROFILE_WIDTH}
            alt="default profile image"
          ></Image>
          <textarea type="text" id="bio-input" className={cx(styles.title, styles.textArea)} />
          <button id="submit-button" className={cx(styles.button, styles.bioSubmit)}>Submit</button>
          </div>
        </form>
        <div id="gif-div" className={styles.displayNone}>
          <Image
            id="gif-img"
            alt="panda dancing"
            src={GIF_PATH}
            width={GIF_WIDTH}
            height={GIF_HEIGHT}
          ></Image>
        </div>
      </main>

      <footer className={styles.footer}>
        <Image
          src="/tapply-logo.svg"
          alt="Tapply Logo"
          width={150}
          height={64}
        />
      </footer>
    </div>
  );
}
