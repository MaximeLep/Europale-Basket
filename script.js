console.log('script.js chargé');

// ----------------------------------------------------- //
//               PAGE : GLOBAL - START                 //
// ----------------------------------------------------- //

const burger = document.querySelector('.burger');
        const links = document.querySelector('.links');

        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            links.classList.toggle('show');
        });



        const unlockBtn = document.getElementById('unlock-btn');
            const lockScreen = document.querySelector('.lock-screen');
            const mainScreen = document.querySelector('.main-screen');

            unlockBtn.addEventListener('click', () => {
                lockScreen.style.display = 'none';
                mainScreen.style.display = 'block';
            });

// ------------------------------------------------------- //
//                PAGE : GLOBAL - END                    //
// ------------------------------------------------------- //



// ----------------------------------------------------- //
//               PAGE : INDEX.HTML - START                 //
// ----------------------------------------------------- //

const logoImg = document.querySelector('.logo img');

logoImg.addEventListener('mouseenter', () => {
  // On ajoute la classe d'animation
  logoImg.classList.add('rotate');
});

logoImg.addEventListener('mouseleave', () => {
  // On laisse l'animation finir mais on enlève la classe après 2s
  setTimeout(() => {
    logoImg.classList.remove('rotate');
  }, 2000); // durée de l'animation
});

// ------------------------------------------------------- //
//                PAGE : INDEX.HTML - END                    //
// ------------------------------------------------------- //


// ----------------------------------------------------- //
//               PAGE : TEAMS.HTML - START               //
// ----------------------------------------------------- //
(function(){
  const track = document.querySelector('.carousel_track');
  const prevBtn = document.querySelector('.carousel_btn.prev');
  const nextBtn = document.querySelector('.carousel_btn.next');
  let cards = Array.from(track.children);

  const gap = 20; // espace entre cartes (en px)

  // Calcul largeur carte (incluant gap)
  let cardWidth = cards[0].getBoundingClientRect().width + gap;

  // Combien d'items visibles en même temps
  function visibleCards() {
    const containerWidth = track.parentElement.getBoundingClientRect().width;
    return Math.floor(containerWidth / cardWidth);
  }

  // Clonage pour effet infini
  function setupInfinite() {
    const visible = visibleCards();

    // Supprime clones précédents
    const clones = track.querySelectorAll('.clone');
    clones.forEach(c => c.remove());

    // Clone derniers visibles et ajoute au début
    const lastItems = cards.slice(-visible);
    lastItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('clone');
      track.insertBefore(clone, track.firstChild);
    });

    // Clone premiers visibles et ajoute à la fin
    const firstItems = cards.slice(0, visible);
    firstItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('clone');
      track.appendChild(clone);
    });

    // Re-lister tous les enfants (avec clones)
    cards = Array.from(track.children);
    cardWidth = cards[0].getBoundingClientRect().width + gap;
  }

  let currentIndex = 0;

  // Initialisation
  function init() {
    setupInfinite();
    currentIndex = visibleCards(); // Commencer au vrai 1er élément (après clones)
    track.style.transition = 'none';
    moveToIndex(currentIndex);
    setTimeout(() => {
      track.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
  }

  // Déplace le carrousel à l'index demandé
  function moveToIndex(index) {
    track.style.transform = `translateX(-${cardWidth * index}px)`;
    currentIndex = index;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex <= 0) return; // Prévenir problème pendant transition
    moveToIndex(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex >= cards.length - 1) return;
    moveToIndex(currentIndex + 1);
  });

  // Gérer la boucle infinie au moment de fin de transition
  track.addEventListener('transitionend', () => {
    const visible = visibleCards();

    if (currentIndex >= cards.length - visible) {
      // On est dans les clones en fin, on saute au vrai début
      track.style.transition = 'none';
      currentIndex = visible;
      moveToIndex(currentIndex);
      setTimeout(() => {
        track.style.transition = 'transform 0.5s ease-in-out';
      }, 50);
    }
    else if (currentIndex < visible) {
      // On est dans les clones au début, on saute à la fin "vraie"
      track.style.transition = 'none';
      currentIndex = cards.length - visible * 2;
      moveToIndex(currentIndex);
      setTimeout(() => {
        track.style.transition = 'transform 0.5s ease-in-out';
      }, 50);
    }
  });

  // Resize : recalcul pour que ça colle avec le resize
  window.addEventListener('resize', () => {
    setupInfinite();
    currentIndex = visibleCards();
    track.style.transition = 'none';
    moveToIndex(currentIndex);
    setTimeout(() => {
      track.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
  });

  // Initialiser au chargement
  window.addEventListener('load', init);

})();


//               PAGE : TEAMS.HTML - END                 //
// ----------------------------------------------------- //

// ----------------------------------------------------- //
//               PAGE : U9.HTML - START                 //
// ----------------------------------------------------- //

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');

  const observerOptions = { threshold: 0.2 };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('section-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    section.classList.add('section-hidden');
    observer.observe(section);
  });
});



// ------------------------------------------------------- //
//                PAGE : U9.HTML - END                    //
// ------------------------------------------------------- //






 