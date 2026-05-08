// ─────────────────────────────────────────
// Mobile Menu (Hamburger)
// ─────────────────────────────────────────

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');

// Toggle the mobile menu open/close when hamburger is clicked
hamburger.addEventListener('click', function () {
  const isHidden = mobileMenu.classList.toggle('hidden');
  // Swap the icon depending on whether menu is open or closed
  iconOpen.classList.toggle('hidden', !isHidden);
  iconClose.classList.toggle('hidden', isHidden);
});

// Close the mobile menu when any nav link is clicked
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', function () {
    mobileMenu.classList.add('hidden');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
  });
});


// ─────────────────────────────────────────
// Typing Animation (Hero Section)
// ─────────────────────────────────────────

const typingEl = document.getElementById('typing-text');

// These are the phrases that cycle through in the hero
const phrases = [
  'Full Stack Developer',
  'Mobile App Developer',
  'AI Integration Specialist',
  'React Native Engineer',
  'Problem Solver',
];

let phraseIndex = 0;    // which phrase we're on
let charIndex = 0;      // how many characters are typed so far
let isDeleting = false; // are we deleting or typing?

// Speed settings (in milliseconds)
const typeSpeed = 80;
const deleteSpeed = 45;
const pauseAfterType = 1800;   // wait before starting to delete
const pauseAfterDelete = 400;  // wait before typing next phrase

function type() {
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    // Type one character at a time
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;

    // Finished typing the full phrase — start deleting after a pause
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, pauseAfterType);
      return;
    }
    setTimeout(type, typeSpeed);

  } else {
    // Delete one character at a time
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;

    // Finished deleting — move to next phrase
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, pauseAfterDelete);
      return;
    }
    setTimeout(type, deleteSpeed);
  }
}

// Start the typing effect after a short delay on page load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 600);
});


// ─────────────────────────────────────────
// Scroll Animations
// ─────────────────────────────────────────

// Fade-in animation for elements with class 'fade-in'
// Triggers when the element enters the viewport
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      fadeObserver.unobserve(entry.target); // stop watching once shown
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(function(el) {
  fadeObserver.observe(el);
});

// Slide-in animation for elements with class 'todo' (cards, project items etc.)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target); // stop watching once shown
    }
  });
});

const todoElements = document.querySelectorAll('.todo');
todoElements.forEach(el => observer.observe(el));


// ─────────────────────────────────────────
// Button Mouse Glow Effect
// ─────────────────────────────────────────

// Tracks mouse position inside each button for the radial glow effect
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--mouseX', `${e.clientX - rect.left}px`);
    btn.style.setProperty('--mouseY', `${e.clientY - rect.top}px`);
  });
});


// ─────────────────────────────────────────
// EmailJS — Contact Form
// ─────────────────────────────────────────

// Initialize EmailJS with your public key
emailjs.init("nGamb62zlcb4JZ2x8");

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault(); // stop the page from refreshing

  const btn = document.getElementById("submit-btn");
  const btnText = document.getElementById("btn-text");
  const status = document.getElementById("form-status");

  // Grab form values
  const name = document.getElementById("user_name").value.trim();
  const email = document.getElementById("user_email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Basic validation — all three required fields must be filled
  if (!name || !email || !message) {
    status.textContent = "Please fill in all required fields.";
    status.className = "text-center text-sm mt-2 text-red-400";
    status.classList.remove("hidden");
    return;
  }

  // Show loading state on the button
  btnText.textContent = "Sending...";
  btn.disabled = true;

  // Build the template params that match your EmailJS template variables
  const templateParams = {
    user_name: name,
    user_email: email,
    subject: document.getElementById("subject").value.trim(),
    message: message,
    time: new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" }),
  };

  // Send the email using your service and template IDs
  emailjs.send("service_61tqgdg", "template_t6spdlh", templateParams)
    .then(() => {
      // Success — show confirmation and reset the form
      status.textContent = "Message sent successfully! I'll get back to you soon.";
      status.className = "text-center text-sm mt-2 text-green-400";
      status.classList.remove("hidden");
      document.getElementById("contact-form").reset();
    })
    .catch(() => {
      // Something went wrong — tell the user to email directly
      status.textContent = "Something went wrong. Please try emailing me directly.";
      status.className = "text-center text-sm mt-2 text-red-400";
      status.classList.remove("hidden");
    })
    .finally(() => {
      // Always re-enable the button after success or failure
      btnText.textContent = "Send Message";
      btn.disabled = false;
    });
});


// ─────────────────────────────────────────
// Theme Toggle (Light / Dark Mode)
// ─────────────────────────────────────────

const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const themeIcon = document.getElementById('theme-icon');
const themeIconMobile = document.getElementById('theme-icon-mobile');

function setTheme(isLight) {
  // Add or remove the 'light' class on body — CSS handles the rest
  document.body.classList.toggle('light', isLight);

  // Swap the icon to match the current mode
  const icon = isLight ? './Icons/dark_mode_icon.svg' : './Icons/light_mode_icon.svg';
  themeIcon.src = icon;
  themeIconMobile.src = icon;

  // Save preference so it persists on refresh
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Desktop toggle button
themeToggle.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('light'));
});

// Mobile toggle button (same logic)
themeToggleMobile.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('light'));
});

// On page load, apply the saved theme if there is one
if (localStorage.getItem('theme') === 'light') {
  setTheme(true);
}


// ─────────────────────────────────────────
// AI Chatbot
// ─────────────────────────────────────────

const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotClose = document.getElementById("chatbot-close");
const sendBtn = document.getElementById("sendBtn");
const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");

// Make sure chatbot is closed when page first loads
chatbotWindow.style.display = "none";

// Open chatbot on toggle button click, close if already open
// Using display style instead of 'hidden' class because the window
// needs display:flex to lay out correctly — toggling 'hidden' would conflict
chatbotToggle.addEventListener("click", () => {
  const isOpen = chatbotWindow.style.display === "flex";
  chatbotWindow.style.display = isOpen ? "none" : "flex";
  if (!isOpen) userInput.focus(); // auto-focus input when opening
});

// Close button inside the chat window
chatbotClose.addEventListener("click", () => {
  chatbotWindow.style.display = "none";
});

// Keyword-based responses — checks user input for matching keywords
// and returns the appropriate reply
const responses = [
  { keywords: ["hi", "hello", "hey"], reply: "Hello! 👋 How can I help you today?" },
  { keywords: ["who are you", "about"], reply: "I am Sharushan Asokan, a final semester BSCS student." },
  { keywords: ["skills"], reply: "I work on both frontend and backend and focus on strong logic building." },
  { keywords: ["projects"], reply: "Most of my projects are CLI-based. I am currently improving UI projects." },
  { keywords: ["contact", "email"], reply: "You can contact me at sharushanj30@gmail.com" },
  { keywords: ["freelance", "hire"], reply: "Yes, I am available for freelance work. Feel free to contact me!" },
  { keywords: ["how are you"], reply: "I'm doing great! Ready to answer your questions 🙂" }
];

// Loop through all responses and check if the user's message contains any keyword
function findResponse(input) {
  input = input.toLowerCase();
  for (let item of responses) {
    for (let keyword of item.keywords) {
      if (input.includes(keyword)) return item.reply;
    }
  }
  // Default reply if nothing matched
  return "I'm not sure about that. Try asking about my skills, projects, or contact.";
}

// Handles sending a message — shows user bubble, then bot reply with a typing delay
function sendMessage() {
  let input = userInput.value;
  if (!input.trim()) return; // ignore empty messages

  // Append user's message on the right side
  chatbox.innerHTML += `
    <div class="flex justify-end">
      <div class="bg-purple-600 text-white px-3 py-2 rounded-lg max-w-[70%] wrap-break-words">
        ${input}
      </div>
    </div>
  `;
  chatbox.scrollTop = chatbox.scrollHeight;

  userInput.value = "";
  userInput.disabled = true; // disable input while bot is "typing"

  // Show a "Bot is typing..." bubble while waiting
  const typingBubble = document.createElement("div");
  typingBubble.className = "flex justify-start";
  typingBubble.innerHTML = `
    <div class="bg-white text-black px-3 py-2 rounded-lg shadow max-w-[70%] italic wrap-break-words" id="typing">
      Bot is typing...
    </div>
  `;
  chatbox.appendChild(typingBubble);
  chatbox.scrollTop = chatbox.scrollHeight;

  // Replace typing bubble with the actual reply after a short random delay
  setTimeout(() => {
    const reply = findResponse(input);
    typingBubble.innerHTML = `<span class="text-black">${reply}</span>`;
    typingBubble.classList.remove("italic");
    userInput.disabled = false;
    userInput.focus();
    chatbox.scrollTop = chatbox.scrollHeight;
  }, 1200 + Math.random() * 800); // random delay between 1.2s - 2s
}

// Send on button click or Enter key press
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});