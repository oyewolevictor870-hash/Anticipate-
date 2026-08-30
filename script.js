const form = document.getElementById("waitlistForm");
const successMessage = document.getElementById("successMessage");
const formStatus = document.getElementById("formStatus");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

function setStatus(message) {
  if (formStatus) {
    formStatus.textContent = message;
  }
}

function getShareUrl() {
  return window.location.href.split("#")[0] + "#waitlist";
}

if (form) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    setStatus("");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!window.emailjs) {
      setStatus("The email service is not loaded. Please refresh and try again.");
      return;
    }

    const submitButton = form.querySelector(".submit-btn");
    const originalButtonText = submitButton
      ? submitButton.innerHTML
      : "Join the Waitlist";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = "Joining…";
    }

    const consentCheckbox = document.getElementById("whatsappConsent");

    const templateParams = {
      name: document.getElementById("name")?.value.trim() || "",
      email: document.getElementById("email")?.value.trim() || "",
      phone: document.getElementById("phone")?.value.trim() || "",
      whatsappConsent: consentCheckbox && consentCheckbox.checked
        ? "Yes"
        : "No"
    };

    try {
      await emailjs.send(
        "service_d1e80eh",
        "template_q0t391p",
        templateParams
      );

      form.style.display = "none";

      if (successMessage) {
        successMessage.style.display = "block";
        successMessage.classList.add("is-visible");
        successMessage.setAttribute("tabindex", "-1");
        successMessage.focus();
      }

      window.location.hash = "waitlist";
    } catch (error) {
      console.error("EmailJS error:", error);

      setStatus(
        "Something went wrong. Please check your details and try again."
      );

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }
    }
  });
}

const whatsappButton = document.getElementById("whatsappBtn");

if (whatsappButton) {
  whatsappButton.addEventListener("click", function () {
    const message =
      "The cover is veiled. The message is not. 👀\n\n" +
      "Join the private waitlist and be among the first to know:\n" +
      getShareUrl();

    const whatsappUrl =
      "https://wa.me/?text=" + encodeURIComponent(message);

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  });
}

const copyButton = document.getElementById("copyBtn");

if (copyButton) {
  copyButton.addEventListener("click", async function () {
    const originalText = this.textContent;

    try {
      const shareUrl = getShareUrl();

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const helper = document.createElement("textarea");
        helper.value = shareUrl;
        helper.style.position = "fixed";
        helper.style.opacity = "0";

        document.body.appendChild(helper);
        helper.focus();
        helper.select();
        document.execCommand("copy");
        helper.remove();
      }

      this.textContent = "Link copied ✓";
    } catch (error) {
      this.textContent = "Copy failed";
    }

    setTimeout(() => {
      this.textContent = originalText;
    }, 2200);
  });
}