document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    let stage = 1;
    let formData = {
        answers: [],
        finalMessage: ''
    };

    const questions = [
        {
            id: 1,
            text: "Ayii masih sayang Piki?",
            type: "choice",
            options: ["ya", "tidak", "tidak tahu"]
        },
        {
            id: 2, 
            text: "Ayii masih ada hubungan dengan Piki?", 
            type: "choice",
            options: ["ya", "tidak", "tidak tahu"]
        },
        {
            id: 3, 
            text: "Seberapa sering Ayii & Piki berkomunikasi?", 
            type: "choice",
            options: ["sering", "jarang", "sudah tidak"]
        },
        {
            id: 4, 
            text: "Apakah Ayii masih percaya dengan Piki?", 
            type: "choice",
            options: ["ya", "tidak", "tidak tahu"]
        },
        {
            id: 5, 
            text: "Seberapa dalam perasaan Ayii ke Piki?", 
            type: "choice",
            options: ["masih sangat dalam", "sudah tidak terlalu dalam", "saya sudah benci dengan Piki"]
        }
    ];

    const questionScores = {
        "ya": 2,
        "sering": 2,
        "masih sangat dalam": 2,
        "tidak tahu": 1,
        "jarang": 1,
        "sudah tidak terlalu dalam": 1,
        "tidak": 0,
        "sudah tidak": 0,
        "saya sudah benci dengan Piki": 0
    };

    function renderQuestion() {
        const currentQuestion = questions[stage - 1];
        quizContainer.innerHTML = `
            <h2 class="question">${currentQuestion.text}</h2>
            <div class="answers">
                ${currentQuestion.options.map(option => `
                    <button class="answer-btn" data-answer="${option}">
                        ${option}
                    </button>
                `).join('')}
            </div>
        `;

        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.addEventListener('click', handleAnswer);
        });
    }

    function handleAnswer(event) {
        const answer = event.target.dataset.answer;
        formData.answers.push(answer);

        if (formData.answers.length < questions.length) {
            stage++;
            renderQuestion();
        } else {
            calculateResults();
        }
    }

    function calculateResults() {
        const totalScore = formData.answers.reduce((sum, answer) => sum + questionScores[answer], 0);
        const maxPossibleScore = questions.length * 2;
        const percentageScore = Math.round((totalScore / maxPossibleScore) * 100);

        let resultMessage = "";
        if (percentageScore >= 80) {
            resultMessage = "Cinta kalian sangat kuat! 💖 Tetap jaga hubungan ini!";
        } else if (percentageScore >= 60) {
            resultMessage = "Hubungan kalian masih ada harapan. Komunikasi lebih baik lagi! 💕";
        } else {
            resultMessage = "Sepertinya butuh pembicaraan serius. Jangan menyerah! 💔";
        }

        const waNumber = "085346096377";
        const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(resultMessage)}`;

        quizContainer.innerHTML = `
            <h2 class="question">Hasil Quiz Cinta</h2>
            <div class="result">
                <p>Skor Keseluruhan: <strong>${percentageScore}%</strong></p>
                <p>Total Skor: <strong>${totalScore} dari 10</strong></p>
                <p class="result-message">${resultMessage}</p>
                <input type="text" id="final-message" placeholder="Tulis pesan spesial untuk Piki" class="answer-btn">
                <button onclick="sendWhatsApp()" class="answer-btn">Kirim Pesan via WhatsApp</button>
            </div>
        `;
    }

    function sendWhatsApp() {
        const finalMessage = document.getElementById('final-message').value;
        const waNumber = "085346096377";
        const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(finalMessage)}`;
        window.open(waLink, '_blank');
    }

    // Start the quiz
    renderQuestion();
});