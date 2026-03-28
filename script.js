const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');

hamburger.addEventListener('click', function () {
  const isHidden = mobileMenu.classList.toggle('hidden');
  iconOpen.classList.toggle('hidden', !isHidden);
  iconClose.classList.toggle('hidden', isHidden);
});

document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', function () {
    mobileMenu.classList.add('hidden');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
  });
});

const typingEl = document.getElementById('typing-text');
      const phrases = [
        'Full Stack Developer',
        'Mobile App Developer',
        'AI Integration Specialist',
        'React Native Engineer',
        'Problem Solver',
      ];

      let phraseIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      const typeSpeed = 80;
      const deleteSpeed = 45;
      const pauseAfterType = 1800;
      const pauseAfterDelete = 400;

      function type() {
        const current = phrases[phraseIndex];

        if (!isDeleting) {
          typingEl.textContent = current.substring(0, charIndex + 1);
          charIndex++;
          if (charIndex === current.length) {
            isDeleting = true;
            setTimeout(type, pauseAfterType);
            return;
          }
          setTimeout(type, typeSpeed);
        } else {
          typingEl.textContent = current.substring(0, charIndex - 1);
          charIndex--;
          if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, pauseAfterDelete);
            return;
          }
          setTimeout(type, deleteSpeed);
        }
      }

      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(type, 600);
      });

      const fadeElements = document.querySelectorAll('.fade-in');
      const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            fadeObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      fadeElements.forEach(function(el) {
        fadeObserver.observe(el);
      });
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);  
          }
        });
      });
      
      const todoElements = document.querySelectorAll('.todo');
      todoElements.forEach(el => observer.observe(el));

      document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--mouseX', `${e.clientX - rect.left}px`);
    btn.style.setProperty('--mouseY', `${e.clientY - rect.top}px`);
  });
});


emailjs.init("nGamb62zlcb4JZ2x8"); 

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const btn = document.getElementById("submit-btn");
  const btnText = document.getElementById("btn-text");
  const status = document.getElementById("form-status");

  const name = document.getElementById("user_name").value.trim();
  const email = document.getElementById("user_email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    status.textContent = "Please fill in all required fields.";
    status.className = "text-center text-sm mt-2 text-red-400";
    status.classList.remove("hidden");
    return;
  }

  btnText.textContent = "Sending...";
  btn.disabled = true;

  const templateParams = {
    user_name: name,
    user_email: email,
    subject: document.getElementById("subject").value.trim(),
    message: message,
    time: new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" }),
  };

  emailjs.send("service_61tqgdg", "template_t6spdlh", templateParams)
    .then(() => {
      status.textContent = "Message sent successfully! I'll get back to you soon.";
      status.className = "text-center text-sm mt-2 text-green-400";
      status.classList.remove("hidden");
      document.getElementById("contact-form").reset();
    })
    .catch(() => {
      status.textContent = "Something went wrong. Please try emailing me directly.";
      status.className = "text-center text-sm mt-2 text-red-400";
      status.classList.remove("hidden");
    })
    .finally(() => {
      btnText.textContent = "Send Message";
      btn.disabled = false;
    });
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const themeIcon = document.getElementById('theme-icon');
const themeIconMobile = document.getElementById('theme-icon-mobile');

function setTheme(isLight) {
  document.body.classList.toggle('light', isLight);
  const icon = isLight ? './Icons/dark_mode_icon.svg' : './Icons/light_mode_icon.svg';
  themeIcon.src = icon;
  themeIconMobile.src = icon;
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

themeToggle.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('light'));
});

themeToggleMobile.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('light'));
});

if (localStorage.getItem('theme') === 'light') {
  setTheme(true);
}

const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotClose = document.getElementById("chatbot-close");
const sendBtn = document.getElementById("sendBtn");
const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");

// Toggle chatbot
chatbotToggle.addEventListener("click", () => {
  chatbotWindow.classList.toggle("hidden");
  userInput.focus();
});
chatbotClose.addEventListener("click", () => chatbotWindow.classList.add("hidden"));

// Rule-based responses
const responses = [
  { keywords: ["hi","hello","hey"], reply: "Hello! 👋 How can I help you today?" },
  { keywords: ["who are you","about"], reply: "I am Sharushan Asokan, a final semester BSCS student." },
  { keywords: ["skills"], reply: "I work on both frontend and backend and focus on strong logic building." },
  { keywords: ["projects"], reply: "Most of my projects are CLI-based. I am currently improving UI projects." },
  { keywords: ["contact","email"], reply: "You can contact me at sharushanj30@gmail.com" },
  { keywords: ["freelance","hire"], reply: "Yes, I am available for freelance work. Feel free to contact me!" },
  { keywords: ["how are you"], reply: "I'm doing great! Ready to answer your questions 🙂" }
];

function findResponse(input) {
  input = input.toLowerCase();
  for (let item of responses) {
    for (let keyword of item.keywords) {
      if (input.includes(keyword)) return item.reply;
    }
  }
  return "I'm not sure about that. Try asking about my skills, projects, or contact.";
}

// Send message function with typing animation
function sendMessage() {
  let input = userInput.value;
  if (!input.trim()) return;

  // User message
  chatbox.innerHTML += `
    <div class="flex justify-end">
      <div class="bg-purple-600 text-white px-3 py-2 rounded-lg max-w-[70%] break-words">
        ${input}
      </div>
    </div>
  `;
  chatbox.scrollTop = chatbox.scrollHeight;

  userInput.value = "";
  userInput.disabled = true;

  // Bot typing bubble (white background + black text)
  const typingBubble = document.createElement("div");
  typingBubble.className = "flex justify-start";
  typingBubble.innerHTML = `
    <div class="bg-white text-black px-3 py-2 rounded-lg shadow max-w-[70%] italic break-words" id="typing">
      Bot is typing...
    </div>
  `;
  chatbox.appendChild(typingBubble);
  chatbox.scrollTop = chatbox.scrollHeight;

  // Typing delay
  setTimeout(() => {
    const reply = findResponse(input);
    // Force text-black explicitly
    typingBubble.innerHTML = `<span class="text-black">${reply}</span>`;
    typingBubble.classList.remove("italic");
    userInput.disabled = false;
    userInput.focus();
    chatbox.scrollTop = chatbox.scrollHeight;
  }, 1200 + Math.random() * 800);
}

// Event listeners
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});