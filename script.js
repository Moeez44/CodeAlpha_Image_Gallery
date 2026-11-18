document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));

    // Lightbox Elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentVisibleIndex = 0;

    // Filter Logic
    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            filterButtons.forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedCategory = button.getAttribute('data-filter');

            galleryCards.forEach((card) => {
                const cardCategory = card.getAttribute('data-category');
                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // Helper: Get currently visible cards
    const getVisibleCards = () => galleryCards.filter((card) => !card.classList.contains('hide'));

    // Open Lightbox
    const openLightbox = (index) => {
        const visibleCards = getVisibleCards();
        if (!visibleCards.length) return;

        currentVisibleIndex = (index + visibleCards.length) % visibleCards.length;
        const activeCard = visibleCards[currentVisibleIndex];

        const img = activeCard.querySelector('img');
        const category = activeCard.querySelector('.category-tag').textContent;
        const title = activeCard.querySelector('h3').textContent;

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCategory.textContent = category;
        lightboxTitle.textContent = title;

        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
    };

    const closeLightbox = () => {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
    };

    galleryCards.forEach((card) => {
        card.addEventListener('click', () => {
            const visibleCards = getVisibleCards();
            const index = visibleCards.indexOf(card);
            openLightbox(index);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => openLightbox(currentVisibleIndex - 1));
    lightboxNext.addEventListener('click', () => openLightbox(currentVisibleIndex + 1));

    // Close on backdrop click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') openLightbox(currentVisibleIndex - 1);
        if (e.key === 'ArrowRight') openLightbox(currentVisibleIndex + 1);
    });
});
