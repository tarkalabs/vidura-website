// Change the video source for mobile
const mobileBreakpoint = 768;
if (window.innerWidth < mobileBreakpoint) {
  document.querySelector(".demo-video video").src =
    "assets/videos/vidura-demo-mobile.mp4";
}

// Add click handlers for contact us form
let ctas = document.getElementsByClassName("get-started");
for (let cta of ctas) {
  cta.addEventListener("click", function () {
    showContactUs(true);
  });
}

function showContactUs(show) {
  document.getElementById("first-contact").style.display = show
    ? "block"
    : "none";
}

// Show contact us in the header after scrolling out above the fold contact us hero button
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Hero CTA is out of the viewport. Show the CTA button in the header
    let mainCTANotVisible = entry.intersectionRatio == 0;
    document.querySelector(".header .hero").style.display = mainCTANotVisible
      ? "block"
      : "none";
  });
});
observer.observe(document.querySelector(".cta .hero"));

// Contact us form submit logic
// const formSubmitUrl = "https://tarkalabs.com";
const formSubmitUrl =
  "https://getform.io/f/0156bf4e-da33-4ecd-96a5-b1273602419a";
function submitForm() {
  const form = document.getElementById("contact-us-form");
  const formData = new FormData(form);
  const error =
    formData.get("fullname").trim() == "" ||
    formData.get("orgname").trim() == "" ||
    !document.querySelector(".contact-us input[type='email']").checkValidity();

  const noteElem = document.querySelector(".form-footer > .note");
  const button = document.querySelector(".form-footer > button");
  if (error) {
    noteElem.textContent = "Please fill all fields marked *";
  } else {
    button.disabled = true;
    noteElem.textContent = "";
    button.textContent = "Processing...";
    fetch(formSubmitUrl, {
      method: "POST",
      body: formData,
    })
      .then(function (resp) {
        button.textContent = "Thank you! We will reach out to you soon";
        setTimeout(() => {
          showContactUs(false);
        }, 3000);
      })
      .catch(function (err) {
        button.textContent = "☹";
        noteElem.innerHTML =
          "Oops! Something went wrong. We are looking at it.</br>You can reach out to <b>hello@tarkalabs.com</b> meanwhile";
        console.log("err", err);
      });
  }
}
