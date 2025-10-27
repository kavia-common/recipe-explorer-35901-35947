(function () {
  "use strict";

  // Utility: simple toast
  function showToast(message) {
    let toast = document.getElementById("simple-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "simple-toast";
      toast.style.position = "fixed";
      toast.style.left = "50%";
      toast.style.bottom = "32px";
      toast.style.transform = "translateX(-50%)";
      toast.style.background = "rgba(17,24,39,0.95)";
      toast.style.color = "#fff";
      toast.style.padding = "10px 14px";
      toast.style.borderRadius = "10px";
      toast.style.fontSize = "14px";
      toast.style.boxShadow = "0 6px 16px rgba(0,0,0,0.3)";
      toast.style.zIndex = "9999";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = "1";
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      toast.style.transition = "opacity 0.4s ease";
      toast.style.opacity = "0";
    }, 1600);
  }

  function qs(id) { return document.getElementById(id); }

  function init() {
    const email = qs("email-input");
    const password = qs("password-input");
    const signInBtn = qs("node-54-668");
    const forgotBtn = qs("node-12-94");
    const googleBtn = qs("node-13-35");
    const facebookBtn = qs("node-13-49");
    const signupCta = document.querySelector(".signup-cta .link-inline");

    if (signInBtn) {
      signInBtn.addEventListener("click", () => {
        const e = (email && email.value || "").trim();
        const p = (password && password.value || "").trim();
        if (!e || !p) {
          showToast("Please enter email and password.");
          return;
        }
        // Very basic email check
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) {
          showToast("Please enter a valid email.");
          return;
        }
        showToast("Signing in...");
      });
    }

    if (forgotBtn) {
      forgotBtn.addEventListener("click", () => showToast("Forgot Password clicked"));
    }
    if (googleBtn) {
      googleBtn.addEventListener("click", () => showToast("Continue with Google"));
    }
    if (facebookBtn) {
      facebookBtn.addEventListener("click", () => showToast("Continue with Facebook"));
    }
    if (signupCta) {
      signupCta.addEventListener("click", () => showToast("Navigate to Sign up"));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
