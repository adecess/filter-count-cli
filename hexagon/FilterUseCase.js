export class FilterUseCase {
  /**
   * Filters countries/people/animals by pattern, removing empty arrays
   * @param {Array} countries - Array of countries with people and animals
   * @param {string} pattern - Pattern to search for in animal names
   * @returns {Array} Filtered countries with matching animals only
   */
  filterByPattern(countries, pattern) {
    if (!this._isValidFilterInput(countries, pattern)) {
      return [];
    }

    return countries
      .map((country) => this._filterCountryByPattern(country, pattern))
      .filter((country) => country !== null);
  }

  /**
   * Validates filter input parameters
   * @param {Array} countries - Countries array
   * @param {string} pattern - Search pattern
   * @returns {boolean} True if filter input is valid
   * @private
   */
  _isValidFilterInput(countries, pattern) {
    return !!pattern && !!countries && Array.isArray(countries);
  }

  /**
   * Filters a single country by pattern
   * @param {Object} country - Country object
   * @param {string} pattern - Search pattern
   * @returns {Object|null} Filtered country or null if no matches
   * @private
   */
  _filterCountryByPattern(country, pattern) {
    const filteredPeople = this._filterPeopleByPattern(country.people, pattern);

    return filteredPeople.length > 0
      ? { ...country, people: filteredPeople }
      : null;
  }

  /**
   * Filters people array by pattern
   * @param {Array} people - Array of people
   * @param {string} pattern - Search pattern
   * @returns {Array} Filtered people array
   * @private
   */
  _filterPeopleByPattern(people, pattern) {
    return people
      .map((person) => this._filterPersonByPattern(person, pattern))
      .filter((person) => person !== null);
  }

  /**
   * Filters a single person by pattern
   * @param {Object} person - Person object
   * @param {string} pattern - Search pattern
   * @returns {Object|null} Filtered person or null if no matching animals
   * @private
   */
  _filterPersonByPattern(person, pattern) {
    const filteredAnimals = this._filterAnimalsByPattern(
      person.animals,
      pattern
    );

    return filteredAnimals.length > 0
      ? { ...person, animals: filteredAnimals }
      : null;
  }

  /**
   * Filters animals array by pattern
   * @param {Array} animals - Array of animals
   * @param {string} pattern - Search pattern
   * @returns {Array} Filtered animals array
   * @private
   */
  _filterAnimalsByPattern(animals, pattern) {
    return animals.filter((animal) => animal.name.includes(pattern));
  }
}
