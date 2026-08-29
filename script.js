const form = document.getElementById("waitlistForm");
const successMessage = document.getElementById("successMessage");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const submitButton = form.querySelector(".submit-btn");
  submitButton.disabled = true;
  submitButton.innerHTML = "Joining...";
  emailjs.sendForm(
    "service_d1e80eh",
    "template_q0t391p",
    form
  )
  .then(function () {
    form.style.display = "none";
    successMessage.style.display = "block";
    window.location.hash = "waitlist";
  })
  .catch(function (error) {
    console.error("EmailJS error:", error);
    submitButton.disabled = false;
    submitButton.innerHTML = 'Join the Waitlist <span>→</span>';
    alert(
      "Something went wrong. Please try again."
    );
  });
});
/* WHATSAPP SHARE */
document.getElementById("whatsappBtn").addEventListener("click", function () {
  const message =
    "Something is coming... 👀\n\n" +
    "Join the private waitlist and be among the first to know:\n" +
    window.location.href;
  const whatsappURL =
    "https://wa.me/?text=" + encodeURIComponent(message);
  window.open(whatsappURL, "_blank");
});
/* COPY LINK */
document.getElementById("copyBtn").addEventListener("click", function () {
  navigator.clipboard.writeText(window.location.href);
  this.textContent = "Link Copied ✓";
  setTimeout(() => {
    this.textContent = "Copy Invite Link";
  }, 2000);
});