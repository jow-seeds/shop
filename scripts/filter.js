document.addEventListener('DOMContentLoaded', () => {
    const filterInputs = document.querySelectorAll('.form-check-input');

    function getActiveFilters() {
        const filters = {
            type: [],
            gen: [],
            thc: []
        };

        filterInputs.forEach(input => {
            if (input.checked) {
                if (input.id.startsWith('filter-')) {
                    filters.type.push(input.value);
                } else if (input.id.startsWith('gen-')) {
                    filters.gen.push(input.value);
                } else if (input.id.startsWith('thc-')) {
                    filters.thc.push(input.value);
                }
            }
        });

        return filters;
    }

    function applyFilters() {
        const cards = document.querySelectorAll('.card');
        const activeFilters = getActiveFilters();

        cards.forEach(card => {
            const cardType = card.dataset.type;
            const cardGen = card.dataset.gen;
            const cardThc = card.dataset.thc;

            const matchType = activeFilters.type.length === 0 || activeFilters.type.includes(cardType);
            const matchGen =
                activeFilters.gen.length === 0 ||
                activeFilters.gen.some(filterGen => cardGen.includes(filterGen.toLowerCase()));

            const matchThc = activeFilters.thc.length === 0 || activeFilters.thc.includes(cardThc);

            if (matchType && matchGen && matchThc) {
                card.parentElement.style.display = ''; // .col sichtbar machen
            } else {
                card.parentElement.style.display = 'none';
            }
        });
    }

    filterInputs.forEach(input => {
        input.addEventListener('change', applyFilters);
    });

    applyFilters(); // Initial einmal anwenden
});