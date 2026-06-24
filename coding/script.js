// Image Slider Logic (Updated for all 34+ pictures)
let currentSlide = 0;

function showSlide(index) {
    // Yeh line automatic aap ki saari pics (jitni bhi HTML mein hain) unhein count kar legi
    const slides = document.querySelectorAll('.slide');
    
    if (slides.length === 0) return;
    
    // Purani active slide se image hatayein
    slides[currentSlide].classList.remove('active');
    
    // Agli slide ka number set karein
    currentSlide = (index + slides.length) % slides.length;
    
    // Nayi slide ko screen par show karein
    slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Variable to store slider auto-play interval later
let sliderInterval;


// Surprise Reveal Logic (Runs when button is clicked)
let heartInterval;

// 6. Proposal Quiz System Logic
let currentStep = 0;

function startProposalQuiz() {
    // Hide the initial ready button box
    document.getElementById('intro-box').classList.add('hidden');
    
    // Show the interactive quiz box
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.classList.remove('hidden');
    
    // Run the first dialogue
    nextQuizStep();
}

function nextQuizStep() {
    const dialogueText = document.getElementById('quiz-dialogue');
    const btnWrapper = document.getElementById('quiz-buttons-wrapper');
    
    // Clear old buttons
    btnWrapper.innerHTML = "";
    
    if (currentStep === 0) {
        dialogueText.innerText = "Arry arryy, ruko zra sbr kro, itni jldi kia hai? 😉";
        
        let nextBtn = document.createElement('button');
        nextBtn.className = "quiz-btn";
        nextBtn.innerText = "Acha, Sorry! 🙈";
        nextBtn.onclick = () => { currentStep++; nextQuizStep(); };
        btnWrapper.appendChild(nextBtn);
        
    } else if (currentStep === 1) {
        dialogueText.innerText = "If you want to see your special surprise you have to answer my one question! 🤓";
        
        let nextBtn = document.createElement('button');
        nextBtn.className = "quiz-btn";
        nextBtn.innerText = "Poochhein, I'm ready! m";
        nextBtn.onclick = () => { currentStep++; nextQuizStep(); };
        btnWrapper.appendChild(nextBtn);
        
    } else if (currentStep === 2) {
        dialogueText.innerText = "Are you ready to answer my question? 🤔";
        
        let yesBtn = document.createElement('button');
        yesBtn.className = "quiz-btn";
        yesBtn.innerText = "Yes, Ready! 👍";
        yesBtn.onclick = () => { currentStep++; nextQuizStep(); };
        btnWrapper.appendChild(yesBtn);
        
    } else if (currentStep === 3) {
        dialogueText.innerHTML = "Will you marry me? 💍✨";
        
        // Create YES Button
        let finalYesBtn = document.createElement('button');
        finalYesBtn.className = "quiz-btn";
        finalYesBtn.innerText = "Yes, I Will! ❤️";
        finalYesBtn.onclick = () => { runFinalReveal(); };
        
        // Create NO Button (The runaway button)
        let finalNoBtn = document.createElement('button');
        finalNoBtn.className = "quiz-btn";
        finalNoBtn.id = "no-btn";
        finalNoBtn.innerText = "No 😜";
        
        // 🔥 Funny text list aur click counter (Idea 1)
let noClickCount = 0;
const funnyTexts = [
    "Oye nahi! 😜",
    "Pakad ke dikhao 😂",
    "Chor do ab bas 🥺",
    "Sirf YES dabaao! ❤️",
    "Dheet ho gayi ho? 🤫",
    "Nahi lagna thapa! 🏃‍♂️"
];

const dodgeButton = () => {
    const randomX = Math.random() * (window.innerWidth - finalNoBtn.offsetWidth - 40) + 20;
    const randomY = Math.random() * (window.innerHeight - finalNoBtn.offsetHeight - 40) + 20;
    
    finalNoBtn.style.position = 'fixed';
    finalNoBtn.style.left = `${randomX}px`;
    finalNoBtn.style.top = `${randomY}px`;
    finalNoBtn.style.zIndex = '9999';

    // 🔥 Har touch/hover par text agla funny text ban jayega
    finalNoBtn.innerText = funnyTexts[noClickCount % funnyTexts.length];
    noClickCount++;
};

    finalNoBtn.addEventListener('mouseover', dodgeButton);
    finalNoBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        dodgeButton();
    });

    btnWrapper.appendChild(finalYesBtn);
    btnWrapper.appendChild(finalNoBtn);
} }

// This runs ONLY when she clicks "Yes, I Will!"
function runFinalReveal() {
    const surpriseScreen = document.getElementById('surprise-screen');
    if (surpriseScreen) {
        surpriseScreen.style.transition = 'opacity 1s';
        surpriseScreen.style.opacity = '0';
    }

    setTimeout(() => {
        if (surpriseScreen) {
            surpriseScreen.classList.add('hidden');
        }
        const mainWebsite = document.getElementById('main-website');
        if (mainWebsite) {
            mainWebsite.classList.remove('hidden');
        }
        // Surprise load hote hi confetti blast chalao
triggerConfettiBlast();
// 🔥 Slider ko pehli pic se active karne ke liye auto-play loop
        if (!sliderInterval) {
            sliderInterval = setInterval(() => {
                changeSlide(1);
            }, 4500);
        }
        
        // Jab final surprise screen open ho jaye, tab audio play ho
        const music = document.getElementById('bg-music');
        if (music) {
            music.play().catch(error => console.log("Audio play error:", error));
        }

        // Start floating hearts when surprise is revealed
        heartInterval = setInterval(createHeart, 300);
    }, 1000);
}

// Music Toggle Button Logic
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');

function toggleMusic() {
    if (music.paused) {
        music.play();
        musicBtn.innerText = "⏸️ Pause Music";
    } else {
        music.pause();
        musicBtn.innerText = "🎵 Play Music";
    }
}


// Floating Hearts Generator Effect
function createHeart() {
    const container = document.getElementById('hearts-container');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    heart.style.fontSize = Math.random() * 20 + 12 + 'px';
    
    container.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Balloon Popping Game Logic
let balloonsPopped = 0;
const totalBalloons = 50; // Total 50 balloons to pop
const balloonColors = ['#ff4d6d', '#ff758f', '#ff8fa3', '#ffb3c1', '#ffccd5', '#ffccd5'];

function createBalloon() {
    if (balloonsPopped >= totalBalloons) return;
    
    const container = document.getElementById('balloon-container');
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    
    // Random styles for cool movement
    const randomColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    balloon.style.backgroundColor = randomColor;
    balloon.style.color = randomColor;
    balloon.style.left = Math.random() * 85 + 'vw';
    
    const speed = Math.random() * 4 + 4; // Floating speed
    balloon.style.setProperty('--speed', speed + 's');
    balloon.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    
    // Mobile Touch / Pop Action
   const popAction = () => {
        // Balloon pop hone ki sound play karein
        const popSound = new Audio('pop.mp3');
        popSound.play().catch(error => console.log("Sound play error:", error));

        balloon.style.transform = 'scale(0)';
        balloon.style.opacity = '0';
        balloonsPopped++;

        let remaining = totalBalloons - balloonsPopped;
        const counterSpan = document.getElementById('balloon-counter');
        const instructionHeading = document.querySelector('.game-instruction h2');
        
        if (counterSpan) {
            counterSpan.innerText = remaining >= 0 ? remaining : 0;

            // Idea 2: Funny messages text
            if (instructionHeading) {
                if (remaining === 40) {
                    instructionHeading.innerHTML = "🎈 Oye hoye, speed check karo! ⚡";
                } else if (remaining === 25) {
                    instructionHeading.innerHTML = "🎈 Thak to nahi gayin na? 😂";
                } else if (remaining === 10) {
                    instructionHeading.innerHTML = "🎈 Bas 10 reh gaye, dil thaam lo! 🎁";
                } else if (remaining === 0) {
                    instructionHeading.innerHTML = "🎉 BOOM! Game khatam! ❤️";
                }
            }
        }

        // Original Flow Fixed: Game screen fade out hogi aur nextQuizStep sequential text chalaye ga
        if (balloonsPopped >= totalBalloons) {
            setTimeout(() => {
                const gameScreen = document.getElementById('balloon-game-screen');
                if (gameScreen) {
                    gameScreen.style.transition = 'opacity 0.8s';
                    gameScreen.style.opacity = '0';
                    setTimeout(() => {
                        gameScreen.remove();
                        nextQuizStep(); // Yeh aap ke baki bache hue dialogues ko sequence mein chalaye ga
                    }, 800);
                }
            }, 500);
        }

        setTimeout(() => { balloon.remove(); }, 200);
    };

    balloon.addEventListener('click', popAction);
    balloon.addEventListener('touchstart', (e) => {
        e.preventDefault();
        popAction();
    });
    
    container.appendChild(balloon);
    
    // Automatically remove balloon if it floats away without popping
    setTimeout(() => {
        if(balloon.parentNode) {
            balloon.remove();
            if (balloonsPopped < totalBalloons) createBalloon(); // Spawn another one
        }
    }, speed * 1000);
}

// Spawn initial balloons loop
if(document.getElementById('balloon-container')) {
    for(let i=0; i < 15; i++) {
        setTimeout(createBalloon, i * 300);
    }
    // Keep spawning until target is reached
    setInterval(() => {
        const activeBalloons = document.querySelectorAll('.balloon').length;
        if(activeBalloons < 12 && balloonsPopped < totalBalloons) {
            createBalloon();
        }
    }, 400);
}

// // Love Letters (Envelopes) Popup Content (Warnings Fixed)
const letterMessages = {
    1: "Open When You Miss Me:\n\nHey jaan, agar aap is waqt mujhe miss kar rahi hain to bas apni aankhein band karein aur aik gehri saans lein... yaad rakhiyega ke main har lamha, har dharqan ke sath aap ke bilkul paas hun. Faasle chahe jitne bhi hon, humara dil aik doosre se hamesha jura hua hai. Main jab bhi aap se door hota hun, mera dil bhi aap hi ke paas rehta hai.\n\nJab bhi aap ka dil udas ho ya meri yaad boht zyada sataye, to bas is website ko kholegen, humari pictures ko dekhein aur yaad karein ke koi hai jo aap se be-panah mohabbat karta hai. Aap ki smile meri poori duniya hai, aap ka sukoon meri zindagi hai, so udas bilkul nahi hona! Main hamesha aap ka sath donga, har acche aur bure waqt mein. I love you so much meri jaan, smile please!",
    2: "Open For A Secret:\n\nMera ek boht bada aur sachha secret yeh hai ke... jab main ne aap ko pehli baar dekha tha aur humari pehli baar baat hui thi, tabhi dil mein ek ajeeb sa sukoon aur thodi si ghabrahat thi. Mujhe ussi lamhe andar se ek feeling aayi thi ke yeh ladki meri zindagi mein koi aam insaan ban kar nahi rehne wali. Mujhe tabhi lagta tha ke aap meri life ka sab se special aur sab se haseen hissa banne wali hain.\n\nAur aaj dekh lein, mera woh dil ka yakeen bilkul 100% sach ho gaya hai! Waqt kaise guzar gaya pata hi nahi chala, lekin aap ke sath guzra hua ek ek pal, ek ek baat meri life ki sab se keemti yaad ban chuki hai. Aap se baat kiye bina mera din shuru nahi hota aur na hi sukoon se khatam hota hai. Mera sab se bada secret aur meri sab se badi khushi bas aap hi ho meri jaan!",
    3: "Why I Love You:\n\nMain aap se isliye pyar nahi karta ke aap boht pyari hain, balkay isliye karta hun kyunke aap jaisa saaf dil, aap jaisi care, aur aap ka mujhe handle karne ka tareeqa poori duniya mein kisi ke paas nahi hai. ❤️\n\nJab aap gussa karti hain, jab aap fikar karti hain, ya jab aap choti choti baaton par bacho ki tarah larrti hain—mujhe aap ki har aik ada se aur zyada pyar ho jata hai. Aap ne meri zindagi mein aakar isay mukammal kar diya hai. Mujhe lagta hai ke main boht khush-kismat hun jo mujhe aap jaisa hamsafar mila.\n\nAap sirf meri pasand nahi, meri aadat, meri sukoon aur meri poori duniya ban chuki hain. Main har haal mein, har lamha aap ke sath rehna chahta hun. Thank you meri life mein aane ke liye aur isay itna haseen banane ke liye. Once again, Happy Birthday meri jaan! Allah aap ko hamesha khush rakhe aur humari jodi ko hamesha salamat rakhe!"
};

function openLetter(id) {
    const modal = document.getElementById('letter-modal');
    const textContainer = document.getElementById('letter-text');
    
    // Format text with linebreaks nicely
    textContainer.innerHTML = letterMessages[id].replace(/\n/g, '<br>');
    modal.classList.remove('hidden');
}

function closeLetter() {
    document.getElementById('letter-modal').classList.add('hidden');
}

// Close modal if clicked outside the paper box
window.onclick = function(event) {
    const modal = document.getElementById('letter-modal');
    if (event.target == modal) {
        modal.classList.add('hidden');
    }
}

// 5. Secret Password Protection Logic (Brackets Perfectly Fixed)
function checkSecretPassword() {
    const passwordInput = document.getElementById('secret-password-input');
    const errorMsg = document.getElementById('password-error-msg');
    
    if (!passwordInput) {
        console.error("Input box nahi mila!");
        return;
    }
    
    const userInput = passwordInput.value;
    const correctPassword = "2627"; // Aap ka password
    
    if (userInput === correctPassword) {
        const lockScreen = document.getElementById('password-lock-screen');
        if (lockScreen) {
            lockScreen.style.transition = "opacity 0.5s ease";
            lockScreen.style.opacity = "0";
            
            setTimeout(() => {
                lockScreen.remove();
                
                // Check if intro-box is hidden, then show it
                const introBox = document.getElementById('intro-box');
                if (introBox) {
                    introBox.classList.remove('hidden');
                }
            }, 500);
        }
    } else {
        if (errorMsg) {
            errorMsg.classList.remove('error-hidden');
        } else {
            alert("❌ Wrong Password! Try again my jaan... 🤔");
        }
        passwordInput.value = "";
        passwordInput.focus();
    }
}

// Global scope check aur enter key bypass
document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('secret-password-input');
    if (inputField) {
        inputField.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                checkSecretPassword();
            }
        });
    }
});

function triggerConfettiBlast() {
    const colors = ['#ff4d6d', '#ff758f', '#ff8fa3', '#ffb3c1', '#ffccd5', '#ffeb3b', '#4caf50', '#2196f3'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.animationDelay = Math.random() * 1.5 + 's';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        document.body.appendChild(confetti);

        // Niche girne ke baad delete karna
        setTimeout(() => confetti.remove(), 4500);
    }
}

// 🔥 Idea 3: Confetti Blast Effect Function
function triggerConfettiBlast() {
    const colors = ['#ff4d6d', '#ff758f', '#ff8fa3', '#ffb3c1', '#ffccd5', '#ffeb3b', '#4caf50', '#2196f3'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.animationDelay = Math.random() * 1.5 + 's';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        document.body.appendChild(confetti);

        // Niche girne ke baad remove karna
        setTimeout(() => confetti.remove(), 4500);
    }
}