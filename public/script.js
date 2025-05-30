// script.js

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-theme");
  const verseDisplay = document.getElementById("bible-verse");

  // Welcome alert
  alert("Welcome to Anointed Flames TV – Your Home of Gospel!");

  // Toggle dark mode
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    toggleBtn.innerText = document.body.classList.contains("dark-mode")
      ? "Switch to Light Mode"
      : "Switch to Dark Mode";
  });

  // Sample Bible verses (can be expanded or loaded from API)
  const verses = [
    "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline. – 2 Timothy 1:7",
    "Let your light shine before others, that they may see your good deeds and glorify your Father in heaven. – Matthew 5:16",
    "I can do all things through Christ who strengthens me. – Philippians 4:13",
    "But seek first the kingdom of God and his righteousness. – Matthew 6:33"
  ];

  // Pick a random verse to display
  const randomVerse = verses[Math.floor(Math.random() * verses.length)];
  verseDisplay.textContent = `"${randomVerse}"`;
});
