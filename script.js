const form = document.getElementById("rsvpForm");
const responseMsg = document.getElementById("responseMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  responseMsg.classList.add("hidden");
  responseMsg.textContent = "";

  try {
    const res = await fetch("https://wedding-rsvp-backend-gx5k.onrender.com/rsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (res.ok) {
      responseMsg.textContent = "RSVP sent successfully! Thank you ❤️";
      responseMsg.classList.remove("hidden");
      form.reset();
    } else {
      throw new Error(result.error || "Something went wrong");
    }
  } catch (err) {
    responseMsg.textContent = "There was a problem sending your RSVP. Please try again later.";
    responseMsg.classList.remove("hidden");
  }
});
