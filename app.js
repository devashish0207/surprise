/* ============================================
        CONFIGURATION VARIABLES
        You can easily customize these values
           ============================================ */

        // Creator information - Change this to your name
        const CREATOR_CONFIG = {
            name: "Created by kd Prajapati"
        };

        // Customize your title and message here
const PAGE1_CONFIG = {
    title: "🎁 Hey Dishuuu this is for you...",
    message: " Ye raha tumhara birthday gift 🎁✨\nDoor ho to kya hua… kuch rishte distance se kam nahi hote balki aur gehre ho jaate hain.\nMain shayad tumhare paas physically na ho paun\npar meri feelings meri duaayein aur meri best wishes hamesha tumhare saath rehti hain ❤️   "
};

        // Audio file URLs - Change these to your own music files
        const AUDIO_CONFIG = {
            backgroundMusic: "Khat - 320Kbps-(Mr-Jat.in).mp3",
            confettiSound: "the-vampires-monster-male-curiously-saying-surprise-319528.mp3"
        };

        // Customize the messages that appear on Page 2
        const MESSAGES = [
            "Bestie 💖",
            "Cute Dost 😊",
            "Choti Si Queen Friend 👸",
            "Sweetest Yaar 🌸",
            "Best Wali 💕",
            "My Vibe ✨",
            "My Safe Place 💖",
            "Calm in Chaos 🤍",
            "Soft but Strong 💕",
            "BrilliantVibe Setter 💫"
        ];

        // Settings for the surprise animation
        const ANIMATION_CONFIG = {
            delayBefore: 7000,           // Delay in ms before messages start (7 seconds for Oops to show)
            messageDuration: 10000,      // How long messages keep appearing (10-15 seconds)
            messageInterval: 400,        // Interval between each message (ms)
            messageRotation: 30,         // Random rotation range in degrees
            confettiCount: 1            // Number of confetti pieces per pop
        };

        /* ============================================
        PAGE INITIALIZATION
           ============================================ */

        // Set page 1 content
        document.getElementById("cardTitle").textContent = PAGE1_CONFIG.title;
        document.getElementById("cardMessage").textContent = PAGE1_CONFIG.message;
        document.getElementById("creatorTag").textContent = CREATOR_CONFIG.name;

        // Get DOM elements
        const page1 = document.getElementById("page1");
        const page2 = document.getElementById("page2");
        const unlockBtn = document.getElementById("unlockBtn");
        const shuffleBtn = document.getElementById("shuffleBtn");
        const bgMusic = document.getElementById("bgMusic");
        const confettiSoundElement = document.getElementById("confettiSound");
        const messageModal = document.getElementById("messageModal");
        const modalClose = document.getElementById("modalClose");
        const modalMessageText = document.getElementById("modalMessageText");

        /* ============================================
        BACKGROUND MUSIC
        Starts automatically when page loads
           ============================================ */
        window.addEventListener("load", function () {
            // Start playing background music
            bgMusic.play().catch(function (error) {
                console.log("Auto-play prevented:", error);
            });
        });

        /* ============================================
        PAGE TRANSITION
        When user clicks "Unlock Your Gift"
           ============================================ */
        unlockBtn.addEventListener("click", function () {
            // Hide page 1, show page 2
            page1.classList.add("hidden");
            page2.classList.remove("hidden");

            // Start the surprise animation after a delay
            setTimeout(startSurpriseAnimation, ANIMATION_CONFIG.delayBefore);
        });

        /* ============================================
        SHUFFLE BUTTON
        Rearranges existing messages to new positions
           ============================================ */
        shuffleBtn.addEventListener("click", function () {
            // Get all existing message elements
            const allMessages = document.querySelectorAll(".message");

            // Rearrange each message to a new random position
            allMessages.forEach(function (msg) {
                // Generate new random position
                const randomX = Math.random() * (window.innerWidth - 200);
                const randomY = Math.random() * (window.innerHeight - 100);

                // Generate new random rotation
                const randomRotation = (Math.random() * ANIMATION_CONFIG.messageRotation * 2) - ANIMATION_CONFIG.messageRotation;

                // Add smooth transition for movement
                msg.style.transition = "all 0.5s ease-out";

                // Update position and rotation
                msg.style.left = randomX + "px";
                msg.style.top = randomY + "px";
                msg.style.setProperty("--rotation", randomRotation + "deg");
                msg.style.transform = "scale(1) rotate(" + randomRotation + "deg)";
            });
        });

        /* ============================================
        SURPRISE ANIMATION
        Displays random messages with confetti
           ============================================ */
        function startSurpriseAnimation() {
            let messageCount = 0;
            const totalDuration = ANIMATION_CONFIG.messageDuration;
            const interval = ANIMATION_CONFIG.messageInterval;
            const maxMessages = 20; // Limit to 20 messages

            // Calculate how many messages to show
            const messageLoopInterval = setInterval(function () {
                if (messageCount >= maxMessages || messageCount * interval > totalDuration) {
                    clearInterval(messageLoopInterval);
                    return;
                }

                // Show a random message
                showRandomMessage();

                // Trigger confetti effect
                createConfetti();

                // Play confetti sound
                playConfettiSound();

                messageCount++;
            }, interval);
        }

        /* ============================================
        MODAL CLOSE BUTTON
           ============================================ */
        modalClose.addEventListener("click", function () {
            messageModal.classList.remove("active");
        });

        // Close modal when clicking outside the content
        messageModal.addEventListener("click", function (e) {
            if (e.target === messageModal) {
                messageModal.classList.remove("active");
            }
        });

        /* ============================================
        SHOW MESSAGE DETAIL
        Opens modal with message details
           ============================================ */
        function showMessageDetail(messageText) {
            modalMessageText.textContent = messageText;

            // Add descriptive text based on message
            const descriptions = {
                "Bestie 💖": "Woh dost jo har situation me saath ho bina bole sab samajh jaye. Jo sirf friend nahi, life ka sabse close aur trusted person ho 💖",
                "Cute Dost 😊": "jo chhoti chhoti baaton pe khush ho jaye , sabko khush rakhe.",
                "Choti Si Queen Friend 👸": "chhoti si queen friend isiliye ho kyunki tum friendship bohot achhe tarike se nibhati ho koi kami nahi chhorti ho.",
                "Sweetest Yaar 🌸": "jo hamesa pyar dikhaye aur life me uski importance samajh jaye.",
                "Best Wali 💕": "Jo har situation me sabse zyada samajhne wali ho 💖, sabka khayal rakhne wali ho.",
                "My Vibe ✨": "Tumari aur meri vibe ek jaisi hai, kyuki jab humlog bat karte hai to pta nahi chalta hai ki kitna time ho gya hai, aur humlog ek dusre ke sath bohot comfortable feel karte hai.",
                "My Safe Place 💖": "Jiske paas aake dil ko sukoon milta hai 🤍, apna koi v bat kar sakte hain. bina kisi tension ke.",
                "Calm in Chaos 🤍": "kabhi v kitna v tensiton hota hai jab tumse bat karte hai aur tum fir samjhati ho usse bohot achha feel karte hai.",
                "Soft but Strong 💕": "Jo dil se soft hai, par har situation me strong rehti hai ✨",
                "BrilliantVibe Setter 💫": "Jahan bhi jaaye, apni energy se mahaul bana deti hai ✨ Uski vibe hi sabko happy aur positive kar deti ho 💖 "
            };

            const description = descriptions[messageText] || "Keep up the amazing work!";
            document.getElementById("modalMessageDescription").textContent = description;
            messageModal.classList.add("active");
        }

        /* ============================================
           SHOW RANDOM MESSAGE
           Displays a message at random position with animation
           ============================================ */
        function showRandomMessage() {
            // Pick a random message from array
            const randomMessage = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

            // Create message element
            const messageEl = document.createElement("div");
            messageEl.className = "message";
            messageEl.textContent = randomMessage;

            // Calculate message bounds
            const messageWidth = 150; // Approximate message width
            const messageHeight = 60; // Approximate message height
            const padding = 20;

            // Random position on screen with bounds checking
            const maxX = Math.max(window.innerWidth - messageWidth - padding, 0);
            const maxY = Math.max(window.innerHeight - messageHeight - padding, 0);
            
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;

            // Random rotation
            const randomRotation = (Math.random() * ANIMATION_CONFIG.messageRotation * 2) - ANIMATION_CONFIG.messageRotation;

            // Set styles
            messageEl.style.left = randomX + "px";
            messageEl.style.top = randomY + "px";
            messageEl.style.setProperty("--rotation", randomRotation + "deg");

            // Add to page and keep it there
            document.body.appendChild(messageEl);

            // Remove old messages if more than 20 exist
            const allMessages = document.querySelectorAll(".message");
            if (allMessages.length > 20) {
                allMessages[0].remove();
            }

            // Add click event to open detail modal
            messageEl.addEventListener("click", function () {
                showMessageDetail(randomMessage);
            });
        }

        /* ============================================
        CREATE CONFETTI
        Generates confetti pieces that fall down
           ============================================ */
        function createConfetti() {
            const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA502", "#F7B731", "#5F27CD"];

            for (let i = 0; i < ANIMATION_CONFIG.confettiCount; i++) {
                const confetti = document.createElement("div");
                confetti.className = "confetti";

                // Random color
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.background = randomColor;

                // Random size
                const size = Math.random() * 8 + 4;
                confetti.style.width = size + "px";
                confetti.style.height = size + "px";
                confetti.style.borderRadius = "50%";

                // Random starting position (from center of screen)
                const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 100;
                const startY = window.innerHeight / 2 + (Math.random() - 0.5) * 100;

                confetti.style.left = startX + "px";
                confetti.style.top = startY + "px";

                // Add random horizontal drift
                const driftX = (Math.random() - 0.5) * 200;
                confetti.style.setProperty("--driftX", driftX + "px");

                // Add to page and remove after animation
                document.body.appendChild(confetti);
                setTimeout(function () {
                    confetti.remove();
                }, 2000);
            }
        }

        /* ============================================
        PLAY CONFETTI SOUND
        Plays the pop sound effect
           ============================================ */
        function playConfettiSound() {
            // Reset audio to start so it plays even if called rapidly
            confettiSoundElement.currentTime = 0;
            confettiSoundElement.play().catch(function (error) {
                console.log("Sound play prevented:", error);
            });
        }

        /* ============================================
        SHUFFLE ARRAY
        Randomizes the order of messages
           ============================================ */
        function shuffleArray(array) {
            // Fisher-Yates shuffle algorithm
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }