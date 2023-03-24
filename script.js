const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#goBackBtn");

const infoTab = document.getElementById("infoTab");
const planTab = document.getElementById("planTab");
const addOnTab = document.getElementById("addOnTab");
const finishingTab = document.getElementById("finishingTab");
const thankYouTab = document.getElementById("thankYouTab");

const firstCircle = document.getElementById("firstCircle");
const secondCircle = document.getElementById("secondCircle");
const thirdCircle = document.getElementById("thirdCircle");
const fourthCircle = document.getElementById("fourthCircle");

const nameInput = document.getElementById("name");
const nameInvalid = document.getElementById("nameError");
const emailInput = document.getElementById("email");
const emailInvalid = document.getElementById("emailError");
const phoneInput = document.getElementById("phoneNumber");
const phoneInvalid = document.getElementById("phoneError");

const billingInput = document.getElementById("billingOption");
const arcadePrice = document.querySelector(".arcadePrice");
const advancedPrice = document.querySelector(".advancedPrice");
const proPrice = document.querySelector(".proPrice");
const arcadeOffer = document.getElementById("arcadeOffer");
const advancedOffer = document.getElementById("advancedOffer");
const proOffer = document.getElementById("proOffer");
/** plans radio buttons*/
const plans = document.querySelectorAll('input[name="plan"]');
let selectedPlan;
let subType;
let totalPrice;
let addOnTotal;
let planPrice;

/**summary items */

const planTitle = document.getElementById("planSelectedTitle");
const finalTotal = document.getElementById("finalPlanPrice");

const summaryAddons = document.querySelector(".summaryAddons");

const totalText = document.getElementById("totalText");
const finalPrice = document.getElementById("finalTotalPrice");

const addOnInputs = document.querySelectorAll(".addOnInput");
const onlineServicePrice = document.getElementById("onlineServicePrice");
const largerStoragePrice = document.getElementById("largerStoragePrice");
const customizeProfilePrice = document.getElementById("customizeProfilePrice");

let pageList = [];
pageList.push(infoTab);
pageList.push(planTab);
pageList.push(addOnTab);
pageList.push(finishingTab);
pageList.push(thankYouTab);

let circleList = [];
circleList.push(firstCircle);
circleList.push(secondCircle);
circleList.push(thirdCircle);
circleList.push(fourthCircle);

let currIndex = 0;

function nextTab() {
  if (currIndex >= pageList.length || currIndex < 0) {
    console.log("cannot access next page");
    return;
  }
  const currPage = pageList[currIndex];
  const nextPage = pageList[currIndex + 1];
  const currCircle = circleList[currIndex];
  let nextCircle;
  if (currIndex < 3) {
    nextCircle = circleList[currIndex + 1];
  } else {
    nextCircle = currCircle;
  }
  currPage.classList.add("hidden");
  currCircle.classList.remove("active");
  nextPage.classList.remove("hidden");
  nextCircle.classList.add("active");

  if (currIndex === 0) {
    prevBtn.classList.remove("invisible");
  }

  currIndex++;
}

function prevTab() {
  if (currIndex >= pageList.length || currIndex < 0) {
    console.log("cannot access next page");
    return;
  }

  if (currIndex === 3) {
    removeAllChildNodes(summaryAddons);
  }

  const currPage = pageList[currIndex];
  const prevPage = pageList[currIndex - 1];
  const currCircle = circleList[currIndex];
  let prevCircle;
  if (currIndex > 0) {
    prevCircle = circleList[currIndex - 1];
  } else {
    prevCircle = currCircle;
  }
  currPage.classList.add("hidden");
  currCircle.classList.remove("active");
  prevPage.classList.remove("hidden");
  prevCircle.classList.add("active");

  if (currIndex === 1) {
    prevBtn.classList.add("invisible");
  }

  currIndex--;
}

function formValidation() {
  if (currIndex === 0) {
    if (!nameInput.checkValidity()) {
      nameInput.classList.add("inputInvalid");
      nameInvalid.classList.remove("hidden");
    } else {
      nameInput.classList.remove("inputInvalid");
      nameInvalid.classList.add("hidden");
    }
    if (!emailInput.checkValidity()) {
      emailInput.classList.add("inputInvalid");
      emailInvalid.classList.remove("hidden");
    } else {
      emailInput.classList.remove("inputInvalid");
      emailInvalid.classList.add("hidden");
    }
    if (!phoneInput.checkValidity()) {
      phoneInput.classList.add("inputInvalid");
      phoneInvalid.classList.remove("hidden");
      return;
    } else {
      phoneInput.classList.remove("inputInvalid");
      phoneInvalid.classList.add("hidden");
    }

    if (
      nameInput.checkValidity() &&
      emailInput.checkValidity() &&
      phoneInput.checkValidity()
    ) {
      return nextTab();
    } else {
      return;
    }
  }

  if (currIndex === 1) {
    for (const plan of plans) {
      if (plan.checked) {
        selectedPlan = plan.value;
        break;
      }
    }

    if (!billingInput.checked) {
      subType = "monthly";
      onlineServicePrice.textContent = "+$1/mo";
      largerStoragePrice.textContent = "+$2/mo";
      customizeProfilePrice.textContent = "+$2/mo";
      if (selectedPlan === "arcade") {
        planPrice = "$9/mo";
        totalPrice = 9;
      } else if (selectedPlan === "advanced") {
        planPrice = "$12/mo";
        totalPrice = 12;
      } else if (selectedPlan === "pro") {
        planPrice = "$15/mo";
        totalPrice = 15;
      }
    } else {
      subType = "yearly";
      onlineServicePrice.textContent = "+$10/yr";
      largerStoragePrice.textContent = "+$20/yr";
      customizeProfilePrice.textContent = "+$20/yr";
      if (selectedPlan === "arcade") {
        planPrice = "$90/yr";
        totalPrice = 90;
      } else if (selectedPlan === "advanced") {
        planPrice = "$120/yr";
        totalPrice = 120;
      } else if (selectedPlan === "pro") {
        planPrice = "$150/yr";
        totalPrice = 150;
      }
    }
    return nextTab();
  }

  if (currIndex === 2) {
    addOnTotal = 0;
    for (addOn of addOnInputs) {
      const addOnDiv = document.createElement("div");
      addOnDiv.classList.add("addOn");
      addOnDiv.classList.add("flex");
      const addOnTitle = document.createElement("p");
      addOnTitle.classList.add("addOnTitle");
      const addOnPrice = document.createElement("div");
      addOnPrice.classList.add("addOnPrice");
      addOnDiv.appendChild(addOnTitle);
      addOnDiv.appendChild(addOnPrice);
      if (addOn.checked) {
        if (subType === "monthly") {
          if (addOn.value === "onlineService") {
            addOnTitle.textContent = "Online service";
            addOnPrice.textContent = "+$1/mo";
            addOnTotal += 1;
          } else if (addOn.value === "largerStorage") {
            addOnTitle.textContent = "Larger service";
            addOnPrice.textContent = "+$2/mo";
            addOnTotal += 2;
          } else if (addOn.value === "customizeProfile") {
            addOnTitle.textContent = "Customizable profile";
            addOnPrice.textContent = "+$2/mo";
            addOnTotal += 2;
          }
          summaryAddons.appendChild(addOnDiv);
        } else {
          if (addOn.value === "onlineService") {
            addOnTitle.textContent = "Online service";
            addOnPrice.textContent = "+$10/yr";
            addOnTotal += 10;
          } else if (addOn.value === "largerStorage") {
            addOnTitle.textContent = "Larger storage";
            addOnPrice.textContent = "+$20/yr";
            addOnTotal += 20;
          } else if (addOn.value === "customizeProfile") {
            addOnTitle.textContent = "Customizable profile";
            addOnPrice.textContent = "+$20/yr";
            addOnTotal += 20;
          }
          summaryAddons.appendChild(addOnDiv);
        }
      }
    }
    console.log(selectedPlan);
    console.log(subType);
    console.log(totalPrice);

    /**set up the next tab */

    planTitle.textContent = `${selectedPlan} (${subType})`;
    finalTotal.textContent = planPrice;
    if (subType === "monthly") {
      totalText.textContent = "Total (per month)";
      finalPrice.textContent = `+$${totalPrice + addOnTotal}/mo`;
    } else {
      totalText.textContent = "Total (per year)";
      finalPrice.textContent = `+$${totalPrice + addOnTotal}/yr`;
    }

    return nextTab();
  }

  if (currIndex === 3) {
  }
}

function subOption() {
  if (billingInput.checked) {
    /** handle yearly sub */
    arcadePrice.textContent = "$90/yr";
    advancedPrice.textContent = "$120/yr";
    proPrice.textContent = "$150/yr";
    arcadeOffer.classList.remove("hidden");
    advancedOffer.classList.remove("hidden");
    proOffer.classList.remove("hidden");
  } else {
    arcadePrice.textContent = "$9/mo";
    advancedPrice.textContent = "$12/mo";
    proPrice.textContent = "$15/mo";
    arcadeOffer.classList.add("hidden");
    advancedOffer.classList.add("hidden");
    proOffer.classList.add("hidden");
  }
  return;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

billingInput.addEventListener("click", subOption);
nextBtn.addEventListener("click", formValidation);
prevBtn.addEventListener("click", prevTab);
