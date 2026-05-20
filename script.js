/**
 * CyberBot – Cybersecurity FAQ Chatbot (50+ Answers + Quick Replies)
 * Author: Yusuf Abdullah Olaniyi
 */

const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const quickReplies = document.getElementById("quickReplies");

// ---------- QUESTION-ANSWER DATABASE ----------
const qaPairs = [
    { keywords: ["phishing"], answer: "Phishing is when attackers pretend to be trusted sources to steal sensitive info. Always check links and sender addresses." },
    { keywords: ["firewall"], answer: "A firewall monitors incoming/outgoing network traffic and blocks unauthorized access. It's your first line of defense." },
    { keywords: ["malware"], answer: "Malware is any software designed to harm, exploit, or otherwise compromise a device or network (e.g., viruses, worms, ransomware)." },
    { keywords: ["ransomware"], answer: "Ransomware encrypts files and demands payment to unlock them. Regular backups and cautious clicking are your best defense." },
    { keywords: ["virus", "computer virus"], answer: "A virus is malicious code that attaches itself to clean files and spreads. Use antivirus software and avoid unknown downloads." },
    { keywords: ["worm"], answer: "A worm is a standalone malware that replicates itself to spread to other computers, often without user action." },
    { keywords: ["trojan", "trojan horse"], answer: "A Trojan disguises itself as legitimate software to trick users into installing it. Never download from untrusted sources." },
    { keywords: ["spyware"], answer: "Spyware secretly monitors user activity and collects personal information without consent. Run anti‑spyware scans regularly." },
    { keywords: ["adware"], answer: "Adware displays unwanted advertisements, often bundled with free software. Use an ad‑blocker and scan for malware." },
    { keywords: ["keylogger"], answer: "A keylogger records every keystroke you type, capturing passwords and sensitive data. Use 2FA and keep your system updated." },
    { keywords: ["rootkit"], answer: "A rootkit hides its presence and gives attackers remote control. Detection often requires specialized anti‑rootkit tools." },
    { keywords: ["botnet"], answer: "A botnet is a network of infected computers controlled remotely, often used for DDoS attacks or spam." },
    { keywords: ["ddos", "dos", "denial of service"], answer: "DDoS floods a server with traffic to make it unavailable. Mitigation includes rate limiting and traffic filtering." },
    { keywords: ["zero day", "0day"], answer: "A zero‑day vulnerability is unknown to the vendor and has no patch yet. These are extremely dangerous." },
    { keywords: ["exploit"], answer: "An exploit is a piece of code or technique that takes advantage of a software vulnerability to cause unintended behavior." },
    { keywords: ["vulnerability"], answer: "A vulnerability is a weakness in a system that can be exploited. Regular patching and scanning are essential." },
    { keywords: ["patch", "update"], answer: "A patch is an update that fixes security vulnerabilities. Always keep your OS and software up to date!" },
    { keywords: ["encryption"], answer: "Encryption scrambles data so only authorized parties can read it. HTTPS uses encryption to protect web traffic." },
    { keywords: ["https", "ssl", "tls"], answer: "HTTPS (SSL/TLS) encrypts data between your browser and a website. Look for the padlock icon in the address bar." },
    { keywords: ["password", "strong password"], answer: "Strong passwords: 12+ characters, mix of letters, numbers, symbols. Use a password manager! Avoid reusing passwords." },
    { keywords: ["password manager"], answer: "A password manager stores and generates strong, unique passwords. Popular ones: LastPass, Bitwarden, 1Password." },
    { keywords: ["2fa", "two-factor", "mfa", "multi-factor"], answer: "Two‑factor authentication adds an extra layer of security. After your password, you enter a code from your phone or app." },
    { keywords: ["vpn"], answer: "A VPN encrypts your internet connection, hiding your IP address and protecting your privacy, especially on public Wi‑Fi." },
    { keywords: ["social engineering"], answer: "Social engineering manipulates people into giving up confidential info. Example: a fake IT support call." },
    { keywords: ["shoulder surfing"], answer: "Shoulder surfing is when someone peeks at your screen or keyboard to steal passwords. Use a privacy screen in public." },
    { keywords: ["tailgating", "piggybacking"], answer: "Tailgating is when an unauthorized person follows someone into a secured area. Always challenge strangers." },
    { keywords: ["hashing"], answer: "Hashing converts data into a fixed‑size string. It's used for password storage and file integrity checks (e.g., SHA‑256)." },
    { keywords: ["salt", "salting"], answer: "Salting adds random data to passwords before hashing, making precomputed attacks harder." },
    { keywords: ["brute force", "brute-force"], answer: "A brute‑force attack tries every possible password combination. Strong passwords and account lockouts prevent it." },
    { keywords: ["dictionary attack"], answer: "A dictionary attack uses common words and phrases to guess passwords. Avoid using dictionary words alone." },
    { keywords: ["man in the middle", "mitm"], answer: "Man‑in‑the‑Middle intercepts communication between two parties. Encryption and VPNs help prevent it." },
    { keywords: ["session hijacking"], answer: "Session hijacking steals a user's active session to impersonate them. Log out of sessions and use HTTPS." },
    { keywords: ["cookie theft"], answer: "Cookie theft steals authentication cookies to impersonate you. Secure your cookies with HttpOnly and Secure flags." },
    { keywords: ["xss", "cross site scripting"], answer: "XSS injects malicious scripts into web pages viewed by others. Always sanitize user inputs." },
    { keywords: ["sql injection", "sqli"], answer: "SQL injection attacks manipulate database queries. Use parameterized queries and input validation to prevent it." },
    { keywords: ["csrf", "cross site request forgery"], answer: "CSRF tricks a user into performing unwanted actions on a site they're logged into. Use anti‑CSRF tokens." },
    { keywords: ["owasp", "top 10"], answer: "OWASP Top 10 lists the most critical web app security risks. It's a great place to start learning secure development." },
    { keywords: ["penetration testing", "pen testing", "pentest"], answer: "Penetration testing simulates real attacks to find vulnerabilities before real attackers do. Ethical hackers perform these." },
    { keywords: ["ethical hacking"], answer: "Ethical hacking uses the same techniques as malicious hackers but with permission to improve security." },
    { keywords: ["red team", "blue team"], answer: "Red team attacks, blue team defends. Purple team combines both to improve overall security." },
    { keywords: ["forensics", "digital forensics"], answer: "Digital forensics involves collecting, analyzing, and preserving digital evidence after a security incident." },
    { keywords: ["incident response", "ir"], answer: "Incident response is how an organization detects, contains, and recovers from a security breach." },
    { keywords: ["cve", "cwe"], answer: "CVE (Common Vulnerabilities and Exposures) identifies specific vulnerabilities. CWE lists common weakness types." },
    { keywords: ["nist", "cybersecurity framework"], answer: "The NIST Cybersecurity Framework provides guidelines for managing and reducing cybersecurity risk. Widely used globally." },
    { keywords: ["iso 27001"], answer: "ISO 27001 is an international standard for information security management systems (ISMS). It helps protect data systematically." },
    { keywords: ["gdpr", "data privacy"], answer: "GDPR (General Data Protection Regulation) protects personal data of EU citizens. It influences privacy laws worldwide." },
    { keywords: ["cloud security"], answer: "Cloud security protects data stored online. Shared responsibility: provider secures the cloud, you secure what's inside." },
    { keywords: ["iot security", "internet of things"], answer: "IoT devices often have weak security. Change default passwords, update firmware, and isolate them on a separate network." },
    { keywords: ["ai", "artificial intelligence", "cybersecurity ai"], answer: "AI helps detect threats faster by analyzing patterns. It's also used in phishing filters and anomaly detection." },
    { keywords: ["blockchain", "web3"], answer: "Blockchain is a decentralized ledger. It can improve integrity and transparency, but smart contracts must be audited for bugs." },
    { keywords: ["career", "job", "start"], answer: "Start with fundamentals: networking, OS, programming (Python). Get certifications like CompTIA Security+, then specialize." },
    { keywords: ["certification", "cert"], answer: "Popular cybersecurity certs: CompTIA Security+, CEH, CISSP, OSCP. They validate skills and help you land jobs." },
    { keywords: ["hello", "hi", "hey", "What's up"], answer: "Hey there! I'm CyberBot. Ask me anything about cybersecurity! 🔐" },
    { keywords: ["thank", "thanks"], answer: "You're welcome! Happy to help. 😊" },
    { keywords: ["bye", "see you"], answer: "Bye! Stay safe online and remember: think before you click. 👋" },
    { keywords: ["created", "develop", "developer", "creator"], answer: "I'm CyberBot, a simple rule‑based chatbot created by Yusuf Olaniyi to teach cybersecurity basics." },
    { keywords: ["safe online", "stay safe"], answer: "To stay safe online: use strong, unique passwords; enable 2FA; update software; don't click suspicious links; and use a VPN on public Wi‑Fi." },
];

const fallbackAnswer = "🤔 I don't have an answer for that yet. Try asking about phishing, firewall, malware, password, encryption, VPN, hacking, or certifications. I'm learning new topics every day!";

// ---------- HELPERS ----------
function getAnswer(userText) {
    const text = userText.toLowerCase();
    for (let pair of qaPairs) {
        if (pair.keywords.some(keyword => text.includes(keyword))) {
            return pair.answer;
        }
    }
    return fallbackAnswer;
}

function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("msg-content");
    contentDiv.textContent = text;

    messageDiv.appendChild(contentDiv);
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function botReply(text) {
    setTimeout(() => {
        addMessage(text, "bot");
    }, 600);
}

// ---------- SEND MESSAGE ----------
function sendMessage(messageText) {
    const text = messageText || userInput.value.trim();
    if (text === "") return;

    addMessage(text, "user");
    if (!messageText) userInput.value = "";

    const answer = getAnswer(text);
    botReply(answer);
}

// ---------- QUICK‑REPLY BUTTONS ----------
quickReplies.addEventListener("click", (e) => {
    if (e.target.classList.contains("quick-btn")) {
        const question = e.target.textContent;
        sendMessage(question);
    }
});

// ---------- EVENT LISTENERS ----------
sendBtn.addEventListener("click", () => sendMessage());
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

userInput.focus();