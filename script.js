// 1. Compte à rebours
const dateLan = new Date('2026-12-12T10:00:00');
const compteur = document.querySelector('#compteur');

function mettreAJourCompteur() {
  const reste = dateLan - new Date();
  if (reste <= 0) {
    compteur.textContent = 'La LAN a commencé !';
    return;
  }
  const jours = Math.floor(reste / 86400000);
  const heures = Math.floor(reste / 3600000) % 24;
  const minutes = Math.floor(reste / 60000) % 60;
  const secondes = Math.floor(reste / 1000) % 60;
  compteur.textContent = jours + ' j ' + heures + ' h ' + minutes + ' min ' + secondes + ' s';
}

mettreAJourCompteur();
setInterval(mettreAJourCompteur, 1000);

// 2. Inscriptions
const PLACES_MAX = 48;
const formulaire = document.querySelector('#formulaire');
const champPseudo = document.querySelector('#pseudo');
const champJeu = document.querySelector('#jeu');
const erreur = document.querySelector('#erreur');
const liste = document.querySelector('#liste');
const places = document.querySelector('#places');

let inscrits = JSON.parse(localStorage.getItem('inscrits')) || [];

function afficherInscrits() {
  liste.innerHTML = '';
  for (const joueur of inscrits) {
    const ligne = document.createElement('li');
    ligne.textContent = joueur.pseudo + ' (' + joueur.jeu + ')';
    liste.appendChild(ligne);
  }
  places.textContent = PLACES_MAX - inscrits.length;
}

function pseudoDejaPris(pseudo) {
  for (const joueur of inscrits) {
    if (joueur.pseudo.toLowerCase() === pseudo.toLowerCase()) {
      return true;
    }
  }
  return false;
}

formulaire.addEventListener('submit', function (evenement) {
  evenement.preventDefault();
  const pseudo = champPseudo.value.trim();
  const jeu = champJeu.value;

  if (pseudo.length < 3) {
    erreur.textContent = 'Le pseudo doit faire au moins 3 caractères.';
    return;
  }
  if (jeu === '') {
    erreur.textContent = 'Choisis un tournoi.';
    return;
  }
  if (pseudoDejaPris(pseudo)) {
    erreur.textContent = 'Ce pseudo est déjà inscrit.';
    return;
  }
  if (inscrits.length >= PLACES_MAX) {
    erreur.textContent = 'Complet, plus aucune place.';
    return;
  }

  erreur.textContent = '';
  inscrits.push({ pseudo: pseudo, jeu: jeu });
  localStorage.setItem('inscrits', JSON.stringify(inscrits));
  afficherInscrits();
  formulaire.reset();
});

afficherInscrits();

// 3. Mode sombre, mémorisé
const boutonTheme = document.querySelector('#theme');

function appliquerTheme(theme) {
  if (theme === 'sombre') {
    document.body.classList.add('sombre');
    boutonTheme.textContent = 'Mode clair';
  } else {
    document.body.classList.remove('sombre');
    boutonTheme.textContent = 'Mode sombre';
  }
}

appliquerTheme(localStorage.getItem('theme'));

boutonTheme.addEventListener('click', function () {
  let nouveau = 'sombre';
  if (document.body.classList.contains('sombre')) {
    nouveau = 'clair';
  }
  localStorage.setItem('theme', nouveau);
  appliquerTheme(nouveau);
});

// 4. Menu du téléphone
const burger = document.querySelector('#burger');
const menu = document.querySelector('#menu');

burger.addEventListener('click', function () {
  menu.classList.toggle('ouvert');
});
