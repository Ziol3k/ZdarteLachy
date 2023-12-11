document.addEventListener('DOMContentLoaded', function () {
  const categoriesBtn = document.getElementById('categoriesBtn');
  const categoriesMenu = document.getElementById('categoriesMenu');
  const filtersBtn = document.getElementById('filtersBtn');
  const filtersMenu = document.getElementById('filtersMenu');

  // Funkcja dodająca filtry do bocznego menu
  function addFilters(category) {
    // Wyczyszczenie istniejących filtrów
    filtersMenu.innerHTML = '';

    // Dodanie nowych filtrów na podstawie wybranej kategorii
    const filtersForCategory = getFiltersForCategory(category);
    filtersForCategory.forEach(filter => {
      const filterItem = document.createElement('li');
      filterItem.textContent = filter;
      filtersMenu.appendChild(filterItem);
    });

    // Pokazanie filtrów
    filtersMenu.classList.add('expanded');
  }

  // Wyświetlenie wszystkich kategorii na start
  categoriesMenu.classList.add('expanded');

  // Nasłuchiwanie kliknięcia na konkretnej kategorii
  categoriesMenu.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      const selectedCategory = event.target.dataset.category;
      addFilters(selectedCategory);
      // Ukrycie napisu "Filtry" przed wybraniem kategorii
      filtersBtn.style.display = 'block';
    }
  });

  // Nasłuchiwanie kliknięcia na przycisk "Filtry"
  filtersBtn.addEventListener('click', function () {
    filtersMenu.classList.toggle('expanded');
  });

  // Funkcja zwracająca filtry dla konkretnej kategorii
  function getFiltersForCategory(category) {
    // Tutaj powinieneś dodać logikę określającą filtry dla danej kategorii
    // Na razie zwracam przykładowe filtry.
    if (category === 'Kurtki') {
      return ['Kolor', 'Rozmiar', 'Materiał'];
    } else if (category === 'Bluzy') {
      return ['Kolor', 'Rozmiar', 'Styl'];
    } else {
      return []; // Pusta lista dla innych kategorii
    }
  }
});
