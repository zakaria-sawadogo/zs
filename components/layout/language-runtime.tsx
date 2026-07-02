"use client";

import { useEffect } from "react";

const dictionary: Record<string, string> = {
  "About": "À propos",
  "Research": "Recherche",
  "Publications": "Publications",
  "Projects": "Projets",
  "Teaching": "Enseignement",
  "Lab": "Laboratoire",
  "Contact": "Contact",
  "Lecturer & Researcher": "Enseignant-Chercheur",
  "Artificial Intelligence • Cybersecurity • Data Science": "Intelligence Artificielle • Cybersécurité • Science des Données",
  "Research interests": "Intérêts de recherche",
  "Selected Recent Publications": "Publications récentes sélectionnées",
  "All publications": "Toutes les publications",
  "Current projects": "Projets en cours",
  "Service & recognition": "Services et distinctions",
  "Experience": "Expérience",
  "Education": "Formation",
  "Funding": "Financements",
  "Open focus": "Encadrement et collaborations",
  "Students interested in AI, cybersecurity, Android malware, privacy, and data systems are welcome to send a concise research statement.": "Les étudiants intéressés par l’IA, la cybersécurité, les malwares Android, la confidentialité et les systèmes de données peuvent envoyer une brève note de recherche.",
  "Lecturer and researcher in AI, cybersecurity, data science, and digital transformation.": "Enseignant-chercheur en IA, cybersécurité, science des données et transformation numérique.",
  "Join": "S'inscrire",
  "Newsletter": "Infolettre",
  "Navigation": "Navigation",
  "All rights reserved.": "Tous droits réservés.",
  "Research Areas": "Axes de recherche",
  "Students": "Étudiants",
  "Secure, intelligent systems for real institutions": "Des systèmes intelligents et sécurisés pour des institutions réelles",
  "The research program connects artificial intelligence, security, privacy, and data science with practical digital transformation needs.": "Le programme de recherche relie l’intelligence artificielle, la sécurité, la confidentialité et la science des données aux besoins concrets de transformation numérique.",
  "Recent publications and projects": "Publications et projets récents",
  "Biography, academic path, and responsibilities": "Biographie, parcours académique et responsabilités",
  "Research areas": "Axes de recherche",
  "Each research area connects technologies, projects, and publications so the academic record stays navigable.": "Chaque axe de recherche relie technologies, projets et publications afin de rendre le parcours scientifique facilement navigable.",
  "Scholar-style publication index": "Index des publications de type Scholar",
  "Search publications": "Rechercher des publications",
  "Applied research and institutional platforms": "Recherche appliquée et plateformes institutionnelles",
  "Courses, practical work, and downloadable material": "Cours, travaux pratiques et ressources téléchargeables",
  "AI, Cybersecurity & Data Science Laboratory": "Laboratoire IA, Cybersécurité et Science des Données",
  "Grants and sponsored research": "Subventions et recherche financée",
  "Current and former supervisees": "Étudiants actuels et anciens encadrés",
  "Conference talks and invited lectures": "Conférences et communications invitées",
  "Distinctions and recognitions": "Distinctions et reconnaissances",
  "Research life, seminars, and workshops": "Vie scientifique, séminaires et ateliers",
  "Resources and academic documents": "Ressources et documents académiques",
  "Collaborations, supervision, and speaking invitations": "Collaborations, encadrement et invitations",
  "Academic curriculum vitae": "Curriculum vitae académique",
  "Dr. Zakaria Sawadogo is a Lecturer and Researcher at the École Polytechnique de Ouagadougou (EPO), Burkina Faso, specializing in Artificial Intelligence, Cybersecurity, Data Science, and Digital Transformation. His research focuses on developing intelligent and secure digital systems that address societal challenges through innovative AI-driven solutions.\n\nHe obtained his Ph.D. in Computer Science from Gaston Berger University, Senegal, where his doctoral research explored machine learning techniques for the continuous evaluation and detection of Android malware. His work has contributed to advancing behavior-based malware detection, explainable AI for cybersecurity, and privacy-preserving intelligent systems.\n\nDr. Sawadogo has authored several peer-reviewed scientific publications in international journals and conferences. His current research interests include Artificial Intelligence, Machine Learning, Deep Learning, Android Malware Analysis, Cyber Threat Intelligence, Privacy-Preserving Computing, Federated Learning, Homomorphic Encryption, and AI for Sustainable Development.\n\nBeyond research, he is actively involved in teaching undergraduate and graduate courses in computer science, artificial intelligence, cybersecurity, and software engineering. He has supervised numerous student projects and promotes practical, research-oriented education.\n\nHe has also contributed to several national and international initiatives related to digital governance, Internet development, and cybersecurity. His professional engagement includes leadership roles within the Internet Society Burkina Faso Chapter (ISOC Burkina Faso) and participation in regional and international research collaborations.\n\nHis long-term vision is to establish a Center of Excellence in Artificial Intelligence and Cybersecurity that fosters cutting-edge research, innovation, capacity building, and international collaboration to support Africa's digital transformation.": "Dr Zakaria Sawadogo est Enseignant-Chercheur à l’École Polytechnique de Ouagadougou (EPO), au Burkina Faso. Il est spécialisé en intelligence artificielle, cybersécurité, science des données et transformation numérique. Ses recherches portent sur le développement de systèmes numériques intelligents et sécurisés capables de répondre à des défis sociétaux grâce à des solutions innovantes fondées sur l’intelligence artificielle.\n\nIl a obtenu son doctorat en informatique à l’Université Gaston Berger du Sénégal, où ses travaux doctoraux ont exploré les techniques d’apprentissage automatique pour l’évaluation continue et la détection des logiciels malveillants Android. Ses recherches contribuent à l’avancement de la détection comportementale des malwares, de l’intelligence artificielle explicable appliquée à la cybersécurité et des systèmes intelligents respectueux de la vie privée.\n\nDr Sawadogo est auteur de plusieurs publications scientifiques évaluées par les pairs dans des revues et conférences internationales. Ses intérêts de recherche actuels incluent l’intelligence artificielle, l’apprentissage automatique, l’apprentissage profond, l’analyse des malwares Android, la cyber threat intelligence, le calcul préservant la confidentialité, l’apprentissage fédéré, le chiffrement homomorphe et l’IA pour le développement durable.\n\nAu-delà de la recherche, il intervient activement dans l’enseignement de cours de premier cycle et de cycle supérieur en informatique, intelligence artificielle, cybersécurité et génie logiciel. Il a encadré de nombreux projets étudiants et promeut une formation pratique, orientée recherche et innovation.\n\nIl a également contribué à plusieurs initiatives nationales et internationales liées à la gouvernance numérique, au développement de l’Internet et à la cybersécurité. Son engagement professionnel comprend des responsabilités au sein du chapitre Internet Society Burkina Faso (ISOC Burkina Faso) ainsi que des collaborations de recherche régionales et internationales.\n\nSa vision à long terme est de mettre en place un Centre d’Excellence en Intelligence Artificielle et Cybersécurité favorisant la recherche de pointe, l’innovation, le renforcement des capacités et la collaboration internationale au service de la transformation numérique de l’Afrique."
};

const reverseDictionary = Object.fromEntries(Object.entries(dictionary).map(([english, french]) => [french, english]));

function translateTextNode(node: Text, language: "en" | "fr") {
  const value = node.nodeValue;
  if (!value) return;
  const trimmed = value.trim();
  if (!trimmed) return;

  const replacement = language === "fr" ? dictionary[trimmed] : reverseDictionary[trimmed];
  if (!replacement) return;

  node.nodeValue = value.replace(trimmed, replacement);
}

function applyLanguage(language: "en" | "fr") {
  document.documentElement.lang = language;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE", "PRE"].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => translateTextNode(node, language));
}

export function LanguageRuntime() {
  useEffect(() => {
    const initial = (window.localStorage.getItem("site-language") === "fr" ? "fr" : "en") as "en" | "fr";
    applyLanguage(initial);

    const onLanguageChange = (event: Event) => {
      const language = (event as CustomEvent<"en" | "fr">).detail;
      applyLanguage(language);
    };

    window.addEventListener("site-language-change", onLanguageChange);
    const observer = new MutationObserver(() => {
      const language = (window.localStorage.getItem("site-language") === "fr" ? "fr" : "en") as "en" | "fr";
      applyLanguage(language);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("site-language-change", onLanguageChange);
      observer.disconnect();
    };
  }, []);

  return null;
}
