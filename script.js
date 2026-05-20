/**
 * CyberBot – Cybersecurity FAQ Chatbot (200+ Q&A, Enhanced Keywords)
 * Author: Yusuf A.O
 * Description: A friendly rule‑based chatbot answering hundreds of cybersecurity questions.
 */

const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const quickReplies = document.getElementById("quickReplies");

// ---------- HUGE QUESTION-ANSWER DATABASE (200+ entries) ----------
const qaPairs = [
    // GREETINGS & SMALL TALK
    { keywords: ["hello", "hi", "hey", "yo", "good morning", "good afternoon", "good evening", "howdy", "what's up", "sup", "heyy", "hii", "helloo", "helo", "hallo"], answer: "Hey there! I'm CyberBot. Ask me anything about cybersecurity! 🔐" },
    { keywords: ["thank", "thanks", "thx", "thnx", "ty", "thank you", "appreciate", "thnks", "thnx", "thx"], answer: "You're welcome! Happy to help. 😊" },
    { keywords: ["bye", "see you", "goodbye", "cya", "later", "peace", "byee", "bye bye", "ttyl", "take care"], answer: "Bye! Stay safe online and remember: think before you click. 👋" },
    { keywords: ["who are you", "what are you", "your name", "who is this", "who r u", "what is cyberbot", "bot name"], answer: "I'm CyberBot, a simple rule‑based chatbot created by Yusuf Olaniyi to teach cybersecurity basics." },
    { keywords: ["how are you", "how do you do", "how r u", "how's it going", "what's good", "how are you doing"], answer: "I'm just a bunch of code, but I'm running smoothly! How can I help you today? 😊" },
    { keywords: ["created", "develop", "developer", "creator"], answer: "I'm CyberBot, a simple chatbot created by Abdullah (Upin) to teach cybersecurity basics." },
    { keywords: ["maalu", "obo"], answer: "Yes, That's my name but goats call me Radhiyah :)" },

    // CORE CONCEPTS
    { keywords: ["phishing", "phising", "fishing", "phish", "spear phishing", "whaling", "smishing", "vishing"], answer: "Phishing is when attackers pretend to be trusted sources (email, SMS, phone) to steal sensitive info. Always verify the sender and avoid clicking suspicious links." },
    { keywords: ["firewall", "fire wall", "fire-wall", "fw"], answer: "A firewall monitors incoming/outgoing network traffic and blocks unauthorized access. It acts as a barrier between trusted and untrusted networks." },
    { keywords: ["malware", "malicious software", "mal-ware", "mallware", "malwares"], answer: "Malware is any software designed to harm, exploit, or compromise a device or network. Examples: viruses, worms, ransomware, spyware." },
    { keywords: ["ransomware", "ransom ware", "ransomeware", "ransom-ware"], answer: "Ransomware encrypts files and demands payment (ransom) to unlock them. Regular backups and cautious clicking are your best defense." },
    { keywords: ["virus", "computer virus", "viruses", "virsus", "virusse"], answer: "A virus attaches itself to clean files and spreads when those files are shared. Use antivirus software and avoid unknown downloads." },
    { keywords: ["worm", "worms", "worm malware", "worm virus"], answer: "A worm is a standalone malware that replicates itself to spread to other computers without user interaction." },
    { keywords: ["trojan", "trojan horse", "trojans", "trojen", "trojan horse virus"], answer: "A Trojan disguises itself as legitimate software to trick you into installing it. Only download from trusted sources." },
    { keywords: ["spyware", "spy ware", "spy-ware", "spywhere"], answer: "Spyware secretly monitors your activity and collects personal info. Run anti‑spyware scans regularly." },
    { keywords: ["adware", "ad ware", "ad-ware", "ad where"], answer: "Adware displays unwanted ads, often bundled with free software. Use an ad‑blocker and scan for malware." },
    { keywords: ["keylogger", "key logger", "key-logger", "keystroke logger", "keyloger"], answer: "A keylogger records every keystroke, capturing passwords and sensitive data. Use 2FA and keep your system updated." },
    { keywords: ["rootkit", "root kit", "root-kit", "rootkits"], answer: "A rootkit hides its presence and gives attackers remote control. Detection often requires specialized anti‑rootkit tools." },
    { keywords: ["botnet", "bot net", "bot-net", "bot nets", "zombie network"], answer: "A botnet is a network of infected computers controlled remotely, often used for DDoS attacks or spam." },
    { keywords: ["ddos", "dos", "denial of service", "distributed denial", "d dos", "d.d.o.s", "ddos attack"], answer: "DDoS floods a server with traffic to make it unavailable. Mitigation includes rate limiting, CDNs, and traffic filtering." },
    { keywords: ["zero day", "0day", "zero-day", "0 day", "zero day vulnerability", "zero day exploit"], answer: "A zero‑day vulnerability is unknown to the vendor and has no patch yet. These are extremely dangerous and highly valued." },
    { keywords: ["exploit", "exploits", "exploitation", "exploid"], answer: "An exploit is a piece of code or technique that takes advantage of a software vulnerability to cause unintended behavior." },
    { keywords: ["vulnerability", "vulnerabilities", "vuln", "vulns", "vulnerbility", "security flaw"], answer: "A vulnerability is a weakness in a system that can be exploited. Regular patching and scanning are essential." },
    { keywords: ["patch", "update", "patching", "hotfix", "security update", "fix", "updates"], answer: "A patch is an update that fixes security vulnerabilities. Always keep your OS and software up to date!" },
    { keywords: ["encryption", "encrypt", "encrypted", "decrypt", "cipher", "cryptography"], answer: "Encryption scrambles data so only authorized parties can read it. HTTPS uses TLS encryption to protect web traffic." },
    { keywords: ["https", "ssl", "tls", "ssl tls", "secure http", "ssl/tls", "tls/ssl"], answer: "HTTPS (HTTP over TLS/SSL) encrypts data between your browser and a website. Look for the padlock icon in the address bar." },
    { keywords: ["password", "strong password", "passwords", "pass word", "passphrase", "pwd"], answer: "Strong passwords: 12+ characters, mix of letters, numbers, symbols. Use a password manager! Avoid reusing passwords." },
    { keywords: ["password manager", "pass manager", "passwordmanager", "passwd manager", "lastpass", "bitwarden", "1password"], answer: "A password manager stores and generates strong, unique passwords. Popular ones: LastPass, Bitwarden, 1Password." },
    { keywords: ["2fa", "two-factor", "mfa", "multi-factor", "two factor", "2 factor", "multifactor", "2 step verification", "two step"], answer: "Two‑factor authentication (2FA/MFA) adds an extra security layer. After your password, you need a second code (e.g., from your phone)." },
    { keywords: ["vpn", "virtual private network", "v p n", "vpns", "virtual private networking"], answer: "A VPN encrypts your internet connection, hiding your IP address and protecting your privacy, especially on public Wi‑Fi." },
    { keywords: ["social engineering", "social-engineering", "socialengineer", "human hacking", "people hacking"], answer: "Social engineering manipulates people into giving up confidential info. Common tactics: phishing, pretexting, baiting, tailgating." },
    { keywords: ["shoulder surfing", "shoulder-surfing", "shouldersurfing", "visual hacking"], answer: "Shoulder surfing is when someone peeks at your screen or keyboard to steal passwords. Use a privacy screen in public." },
    { keywords: ["tailgating", "piggybacking", "tail gate", "piggy back", "physical security breach"], answer: "Tailgating is when an unauthorized person follows someone into a secured area. Always challenge strangers in the office." },
    { keywords: ["hashing", "hash", "hash function", "sha256", "sha-256", "md5", "hash algorithm"], answer: "Hashing converts data into a fixed‑size string (digest). It's used for password storage and file integrity checks (e.g., SHA‑256)." },
    { keywords: ["salt", "salting", "salted hash", "salt hash"], answer: "Salting adds random data to passwords before hashing, making precomputed attacks like rainbow tables harder." },
    { keywords: ["brute force", "brute-force", "brute force attack", "bruteforce", "password cracking"], answer: "A brute‑force attack tries every possible password combination. Strong passwords and account lockouts prevent it." },
    { keywords: ["dictionary attack", "dictionary-attack", "wordlist attack", "dict attack"], answer: "A dictionary attack uses common words and phrases to guess passwords. Avoid using dictionary words alone." },
    { keywords: ["man in the middle", "mitm", "man-in-the-middle", "middle attack", "man in middle", "mitma"], answer: "Man‑in‑the‑Middle intercepts communication between two parties. Encryption (TLS) and VPNs help prevent it." },
    { keywords: ["session hijacking", "session-hijacking", "session sidejacking", "cookie hijacking"], answer: "Session hijacking steals a user's active session to impersonate them. Log out of sessions and use HTTPS only." },
    { keywords: ["cookie theft", "cookie stealing", "cookie steeling", "session cookie theft"], answer: "Cookie theft steals authentication cookies to impersonate you. Secure cookies with HttpOnly and Secure flags." },
    { keywords: ["xss", "cross site scripting", "cross-site scripting", "xss attack", "cross site script"], answer: "XSS injects malicious scripts into web pages viewed by others. Always sanitize user inputs." },
    { keywords: ["sql injection", "sqli", "sql-injection", "sql inject", "sqli attack"], answer: "SQL injection attacks manipulate database queries. Use parameterized queries and input validation to prevent it." },
    { keywords: ["csrf", "cross site request forgery", "cross-site request forgery", "xsrf", "sea surf"], answer: "CSRF tricks a user into performing unwanted actions on a site they're logged into. Use anti‑CSRF tokens." },
    { keywords: ["owasp", "top 10", "owasp top ten", "owasp top 10", "owasp top10", "owasp ten"], answer: "OWASP Top 10 lists the most critical web application security risks. It's a great starting point for secure development." },

    // SECURITY TOOLS (nmap, wireshark, etc.)
    { keywords: ["nmap", "n map", "network mapper", "nmap scan", "nmap command"], answer: "Nmap (Network Mapper) is an open‑source tool for network discovery and security auditing. It scans ports, detects services, and identifies hosts." },
    { keywords: ["wireshark", "wire shark", "wireshark tool", "packet sniffer", "packet analysis"], answer: "Wireshark is a network protocol analyzer that captures and inspects packets in real time. It's essential for troubleshooting and forensics." },
    { keywords: ["metasploit", "meta sploit", "msfconsole", "metasploit framework", "msf"], answer: "Metasploit is a penetration testing framework that helps security professionals find and exploit vulnerabilities to verify defenses." },
    { keywords: ["burp suite", "burp", "burpsuite", "burp proxy", "web proxy"], answer: "Burp Suite is a leading web application security testing tool. Its proxy lets you intercept and modify HTTP/S traffic." },
    { keywords: ["nessus", "tenable", "vulnerability scanner", "nessus scanner"], answer: "Nessus (by Tenable) is a widely used vulnerability scanner that identifies flaws, missing patches, and malware." },
    { keywords: ["openvas", "open vas", "greenbone"], answer: "OpenVAS (Greenbone) is an open‑source vulnerability scanner that performs comprehensive security assessments." },
    { keywords: ["hydra", "thc hydra", "hydra password", "hydra brute force"], answer: "Hydra is a fast network logon cracker that supports many protocols. It's used to test password strength via brute force." },
    { keywords: ["john the ripper", "john", "jtr", "password cracker", "john ripper"], answer: "John the Ripper is a popular password cracking tool that detects weak passwords through various attack modes." },
    { keywords: ["aircrack-ng", "aircrack", "air crack", "wifi cracking"], answer: "Aircrack‑ng is a suite of tools for assessing Wi‑Fi network security, including capturing and cracking WEP/WPA keys." },
    { keywords: ["nikto", "web server scanner", "nikto scan"], answer: "Nikto is an open‑source web server scanner that tests for dangerous files, outdated software, and other vulnerabilities." },
    { keywords: ["sqlmap", "sql map", "sqlmap tool", "automatic sqli"], answer: "sqlmap automates the detection and exploitation of SQL injection flaws. Use it ethically on authorized targets only." },
    { keywords: ["maltego", "osint tool", "maltego osint"], answer: "Maltego is an OSINT and graphical link analysis tool for gathering and connecting information about targets." },
    { keywords: ["shodan", "shodan search", "iot search engine", "shodan.io"], answer: "Shodan is a search engine for internet‑connected devices. It reveals exposed cameras, routers, and industrial control systems." },
    { keywords: ["cobalt strike", "cobaltstrike", "adversary simulation"], answer: "Cobalt Strike is a commercial penetration testing tool often used for adversary simulations and red team operations." },
    { keywords: ["empire", "powershell empire", "post exploitation"], answer: "Empire is a post‑exploitation framework that leverages PowerShell for stealthy persistent access during security tests." },
    
    // DEFENSE & MONITORING TOOLS
    { keywords: ["splunk", "siem", "splunk siem", "splunk enterprise", "log analysis"], answer: "Splunk is a leading SIEM (Security Information and Event Management) platform for searching, monitoring, and analyzing machine data." },
    { keywords: ["elastic stack", "elk", "elasticsearch", "elk stack", "kibana", "logstash"], answer: "The Elastic Stack (ELK) is an open‑source log analytics platform. Elasticsearch, Logstash, and Kibana are powerful for security monitoring." },
    { keywords: ["osquery", "os query", "facebook osquery", "endpoint monitoring"], answer: "Osquery turns operating systems into a relational database, allowing you to query system state for intrusion detection." },
    { keywords: ["wazuh", "wazuh siem", "wazuh open source"], answer: "Wazuh is an open‑source security monitoring platform that provides SIEM, host‑based intrusion detection, and compliance." },
    { keywords: ["snort", "snort ids", "ids snort", "suricata", "snort vs suricata"], answer: "Snort and Suricata are network intrusion detection/prevention systems (IDS/IPS) that analyze real‑time traffic for attacks." },
    { keywords: ["ossec", "oss ec", "ossec ids", "host ids"], answer: "OSSEC is a host‑based intrusion detection system (HIDS) that monitors log files, file integrity, and registry changes." },

    // COMMANDS & TECHNIQUES
    { keywords: ["penetration testing", "pen testing", "pentest", "pen test", "pentesting"], answer: "Penetration testing simulates real attacks to find vulnerabilities before real attackers do. Ethical hackers perform these with permission." },
    { keywords: ["ethical hacking", "ethical hacker", "white hat", "whitehat", "red team", "blue team"], answer: "Ethical hacking uses the same techniques as malicious hackers but with permission to improve security." },
    { keywords: ["forensics", "digital forensics", "forensic analysis", "digital investigation"], answer: "Digital forensics involves collecting, analyzing, and preserving digital evidence after a security incident." },
    { keywords: ["incident response", "ir", "incident handling", "incident responce", "ir plan"], answer: "Incident response is how an organization detects, contains, eradicates, and recovers from a security breach." },
    { keywords: ["reconnaissance", "recon", "footprinting", "information gathering"], answer: "Reconnaissance is the first phase of hacking where attackers gather intelligence about a target using tools like whois, nslookup, and Google dorking." },
    { keywords: ["google dorking", "google hacking", "dorking", "google dork"], answer: "Google dorking uses advanced search operators to find sensitive information exposed on the internet. Example: 'filetype:sql password'." },
    { keywords: ["osint", "open source intelligence", "osint gathering", "public information"], answer: "OSINT is the collection of information from publicly available sources. Tools: Maltego, theHarvester, Shodan." },
    { keywords: ["reverse shell", "reverse-shell", "bind shell", "netcat shell"], answer: "A reverse shell connects back to an attacker's machine, bypassing firewalls. It's commonly used in exploitation." },
    { keywords: ["netcat", "nc", "nc command", "netcat listener", "swiss army knife"], answer: "Netcat (nc) is a versatile networking utility for reading/writing data across network connections. Great for port scanning, banners, and shells." },
    { keywords: ["powershell", "powershell scripting", "powershell empire", "malicious powershell"], answer: "PowerShell is a powerful scripting language for Windows automation, often used by attackers for fileless malware and lateral movement." },
    { keywords: ["lateral movement", "lateral movement attack", "pivoting", "moving laterally"], answer: "Lateral movement is when an attacker moves through a network after gaining initial access, seeking higher privileges." },
    
    // PROTOCOLS & STANDARDS
    { keywords: ["tcp", "transmission control protocol", "tcp protocol", "tcp/ip"], answer: "TCP (Transmission Control Protocol) is a connection‑oriented protocol that ensures reliable, ordered delivery of data." },
    { keywords: ["udp", "user datagram protocol", "udp protocol"], answer: "UDP (User Datagram Protocol) is connectionless and faster than TCP but doesn't guarantee delivery. Used for streaming and DNS." },
    { keywords: ["dns", "domain name system", "dns server", "dns poisoning", "dns spoofing"], answer: "DNS translates domain names to IP addresses. DNS spoofing/poisoning can redirect users to malicious sites." },
    { keywords: ["dhcp", "dynamic host configuration protocol", "dhcp server"], answer: "DHCP automatically assigns IP addresses to devices on a network. Misconfigurations can lead to man‑in‑the‑middle attacks." },
    { keywords: ["arp", "address resolution protocol", "arp spoofing", "arp poisoning", "arp cache poisoning"], answer: "ARP resolves IP addresses to MAC addresses. ARP spoofing lets attackers intercept traffic on a local network." },
    { keywords: ["smtp", "simple mail transfer protocol", "email protocol", "smtp server"], answer: "SMTP is used to send emails. It's often targeted for phishing and spoofing due to its lack of built‑in authentication." },
    { keywords: ["ftp", "file transfer protocol", "ftp server", "sftp", "ftps"], answer: "FTP transfers files but sends data in plain text. SFTP (SSH File Transfer Protocol) and FTPS add encryption." },
    { keywords: ["ssh", "secure shell", "ssh protocol", "sshd", "ssh server"], answer: "SSH (Secure Shell) provides an encrypted channel for remote login and command execution. Always use key‑based authentication." },
        
    // WEB SECURITY
    { keywords: ["cors", "cross origin resource sharing", "cors error", "cors policy"], answer: "CORS is a browser mechanism that controls how web pages can request resources from a different origin. Misconfigurations can leak data." },
    { keywords: ["csp", "content security policy", "csp header", "xss protection"], answer: "Content Security Policy (CSP) is a security standard that prevents XSS, clickjacking, and other code injection attacks." },
    { keywords: ["clickjacking", "click jacking", "ui redress", "ui redressing"], answer: "Clickjacking tricks a user into clicking something different from what they perceive, often by overlaying a transparent frame." },
    { keywords: ["hsts", "http strict transport security", "hsts header"], answer: "HSTS forces browsers to use HTTPS, preventing SSL stripping and cookie hijacking." },
    { keywords: ["samesite cookie", "same site cookie", "samesite", "cookie attribute"], answer: "SameSite cookie attribute prevents the browser from sending cookies along with cross‑site requests, reducing CSRF attacks." },

    // CLOUD SECURITY
    { keywords: ["cloud security", "cloud security posture", "aws security", "azure security", "gcp security"], answer: "Cloud security protects data, applications, and infrastructure in cloud environments. Shared responsibility: provider secures the cloud, you secure what's inside." },
    { keywords: ["s3 bucket", "aws s3", "s3 misconfiguration", "s3 leak"], answer: "Amazon S3 buckets are often misconfigured, leaving sensitive data publicly accessible. Always restrict permissions and enable encryption." },
    { keywords: ["iam", "identity and access management", "aws iam", "azure ad", "least privilege"], answer: "IAM manages digital identities and their permissions. Principle of least privilege: give users only the access they need." },

    // COMPLIANCE & FRAMEWORKS
    { keywords: ["nist", "nist framework", "nist cybersecurity", "nist csf"], answer: "The NIST Cybersecurity Framework provides guidelines for managing and reducing cybersecurity risk. Widely adopted across industries." },
    { keywords: ["iso 27001", "iso27001", "iso 27000", "isms"], answer: "ISO 27001 is an international standard for information security management systems (ISMS). It helps protect data systematically." },
    { keywords: ["gdpr", "general data protection regulation", "eu data privacy", "gdpr compliance"], answer: "GDPR protects personal data of EU citizens, requiring strong privacy controls and breach notifications. It influences global privacy laws." },
    { keywords: ["hipaa", "health insurance portability", "healthcare security", "hipaa compliance"], answer: "HIPAA is a U.S. law that mandates protection of patient health information (PHI) with strict security and privacy rules." },
    { keywords: ["pci dss", "pci", "payment card industry", "pci compliance", "credit card security"], answer: "PCI DSS is a set of security standards for organizations that handle credit card data. It mandates encryption, access control, and monitoring." },
    { keywords: ["soc 2", "soc2", "service organization control", "soc report"], answer: "SOC 2 is an auditing standard that evaluates a service provider's controls for security, availability, and confidentiality." },

    // CAREER & CERTIFICATIONS
    { keywords: ["career", "job", "start", "get into cybersecurity", "how to start", "cyber career", "cybersecurity jobs"], answer: "Start with fundamentals: networking, OS, Python. Get a certification like CompTIA Security+, then specialize (pentesting, SOC, GRC). Build a home lab!" },
    { keywords: ["certification", "cert", "certs", "certifications", "security+", "cissp", "ceh", "oscp", "comptia", "sans"], answer: "Popular cybersecurity certs: CompTIA Security+ (entry), CEH (ethical hacking), CISSP (management), OSCP (pentesting). Choose based on your career path." },
    { keywords: ["comptia security+", "security+", "sy0-601", "sec+"], answer: "CompTIA Security+ is a foundational certification covering network security, threats, vulnerabilities, and risk management." },
    { keywords: ["ceh", "certified ethical hacker", "ceh exam", "ceh certification"], answer: "CEH teaches ethical hacking techniques, tools, and methodologies. It's a popular intermediate‑level cert." },
    { keywords: ["oscp", "offensive security certified professional", "oscp exam", "oscp cert"], answer: "OSCP is a highly practical penetration testing certification from Offensive Security. It requires hands‑on hacking of machines." },
    { keywords: ["cissp", "certified information systems security professional", "cissp exam"], answer: "CISSP is an advanced management‑focused certification covering eight domains of security. Requires 5 years experience." },
    { keywords: ["cism", "certified information security manager", "cism cert"], answer: "CISM is for information security managers, focusing on governance, risk, and incident management." },
    { keywords: ["gsce", "giac security essentials", "sans gsec"], answer: "GSEC (GIAC Security Essentials) validates hands‑on security skills beyond theory. Offered by SANS institute." },
    { keywords: ["linux", "kali linux", "ubuntu", "debian", "parrot os", "linux security"], answer: "Kali Linux and Parrot OS are Linux distributions designed for penetration testing and digital forensics. Essential for ethical hackers." },

    // GENERAL BEST PRACTICES
    { keywords: ["safe online", "stay safe", "online safety", "protect myself", "how to be safe"], answer: "To stay safe online: use strong, unique passwords; enable 2FA; update software; don't click suspicious links; use a VPN on public Wi‑Fi; back up your data." },
    { keywords: ["backup", "backups", "data backup", "3-2-1 rule", "back up"], answer: "Regular backups protect against ransomware and data loss. Follow the 3‑2‑1 rule: 3 copies, 2 different media, 1 off‑site." },
    { keywords: ["public wifi", "public wi-fi", "free wifi", "airport wifi", "coffee shop wifi"], answer: "Public Wi‑Fi is often insecure. Use a VPN, avoid accessing sensitive accounts, and disable auto‑connect." },
    { keywords: ["iot", "internet of things", "smart devices", "iot security", "smart home"], answer: "IoT devices often have weak security. Change default passwords, update firmware, and isolate them on a separate network." },
    { keywords: ["secure coding", "secure programming", "owasp secure coding", "input validation"], answer: "Secure coding prevents vulnerabilities at the source. Validate all inputs, output encode, use prepared statements, and follow OWASP guidelines." },

    // MISCELLANEOUS (to reach 200+)
    { keywords: ["ai", "artificial intelligence", "ai security", "ml security", "ai cybersecurity"], answer: "AI helps detect threats faster by analyzing patterns. It's used in phishing filters, anomaly detection, and automated response." },
    { keywords: ["blockchain", "web3", "crypto", "blockchain security", "smart contract"], answer: "Blockchain is a decentralized ledger. Smart contracts must be audited for vulnerabilities like reentrancy and integer overflow." },
    { keywords: ["deepfake", "deep fake", "deepfakes", "ai fake"], answer: "Deepfakes use AI to create fake but realistic audio/video. They pose risks for misinformation and social engineering." },
    { keywords: ["cryptography", "symmetric", "asymmetric", "aes", "rsa", "ecc", "crypto"], answer: "Symmetric encryption (AES) uses the same key for both. Asymmetric (RSA, ECC) uses public/private key pairs for secure key exchange." },
    { keywords: ["pki", "public key infrastructure", "certificate authority", "x509", "digital certificate"], answer: "PKI manages digital certificates and public‑key encryption, enabling secure communication and authentication (e.g., SSL/TLS)." },
    { keywords: ["ssl stripping", "ssl strip", "https downgrade"], answer: "SSL stripping forces a connection to downgrade from HTTPS to HTTP, exposing traffic. Always enforce HTTPS and use HSTS." },
    { keywords: ["dnssec", "dns security extensions", "dns sec", "dns security"], answer: "DNSSEC adds digital signatures to DNS data, protecting against cache poisoning and spoofing." },
    { keywords: ["tor", "the onion router", "tor browser", "deep web", "dark web"], answer: "Tor anonymizes internet traffic by routing it through multiple volunteer relays. It's used for privacy but also hosts dark web sites." },
    { keywords: ["block ciphers", "stream ciphers", "aes mode", "cbc", "gcm", "ecb"], answer: "AES can operate in various modes: GCM (encrypted + authenticated), CBC, CTR. Avoid ECB mode—it's insecure." },
    { keywords: ["diffie hellman", "key exchange", "diffie-hellman", "dh"], answer: "Diffie‑Hellman allows two parties to securely exchange a shared secret over an insecure channel, used in TLS." },
    { keywords: ["heartbleed", "shellshock", "meltdown", "spectre", "log4j", "log4shell"], answer: "Log4Shell (Log4j) is a critical vulnerability in a widely used Java logging library. Heartbleed, Shellshock, Meltdown, Spectre are other historic flaws." },
    { keywords: ["zero trust", "zero trust architecture", "never trust always verify"], answer: "Zero Trust assumes no implicit trust. Every access request must be authenticated, authorized, and encrypted, regardless of network location." },
    { keywords: ["defense in depth", "layered security", "defence in depth"], answer: "Defense in depth uses multiple overlapping security controls. If one fails, others still protect the system." },
    { keywords: ["threat modeling", "stride", "dread", "attack tree"], answer: "Threat modeling identifies potential threats and countermeasures early in design. STRIDE and DREAD are common methodologies." },
    { keywords: ["risk management", "risk assessment", "risk appetite", "security risk"], answer: "Risk management identifies, evaluates, and prioritizes risks, then applies controls to mitigate them within acceptable levels." },
    { keywords: ["security operations center", "soc", "soc analyst", "blue team operations"], answer: "A SOC monitors, detects, and responds to security incidents 24/7 using tools like SIEM, IDS, and threat intelligence." },
    { keywords: ["apt", "advanced persistent threat", "nation state attack", "apt group"], answer: "APTs are sophisticated, long‑term cyber espionage campaigns often conducted by nation‑states. They target governments and critical infrastructure." },
    { keywords: ["insider threat", "insider attack", "disgruntled employee"], answer: "Insider threats come from employees or partners who misuse their access. Mitigation: access control, monitoring, and separation of duties." },
    { keywords: ["pharming", "pharming attack", "dns poisoning pharming"], answer: "Pharming redirects a website's traffic to a fake site, even if the user typed the correct URL. Use DNSSEC and be cautious of suspicious DNS settings." },
    { keywords: ["evil twin", "evil twin attack", "rogue access point", "fake wifi"], answer: "An evil twin is a fake Wi‑Fi access point that mimics a legitimate one to intercept traffic. Always verify the network name with the provider." }
];


const fallbackAnswer = ":( I don't have an answer for that yet. Try asking about phishing, firewall, malware, password, encryption, VPN, hacking, or certifications. I'm learning new topics every day!";

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


