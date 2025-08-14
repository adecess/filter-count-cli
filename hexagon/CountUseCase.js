export class CountUseCase {
  /**
   * Adds count information to countries and people names
   * @param {Array} countries - Array of countries with people and animals
   * @returns {Array} Countries with count information in names
   */
  addCountToNames(countries) {
    if (!this._isValidCountInput(countries)) {
      return [];
    }

    return countries.map((country) => this._addCountToCountry(country));
  }

  /**
   * Validates input for count operation
   * @param {Array} countries - Countries array
   * @returns {boolean} True if input is valid for counting
   * @private
   */
  _isValidCountInput(countries) {
    return !!countries && Array.isArray(countries);
  }

  /**
   * Adds count to a single country
   * @param {Object} country - Country object
   * @returns {Object} Country with count information
   * @private
   */
  _addCountToCountry(country) {
    const countedPeople = this._addCountToPeople(country.people);
    const peopleCount = country.people.length;

    return {
      name: `${country.name} [${peopleCount}]`,
      people: countedPeople,
    };
  }

  /**
   * Adds count to people array
   * @param {Array} people - Array of people
   * @returns {Array} People with count information
   * @private
   */
  _addCountToPeople(people) {
    return people.map((person) => this._addCountToPerson(person));
  }

  /**
   * Adds count to a single person
   * @param {Object} person - Person object
   * @returns {Object} Person with count information
   * @private
   */
  _addCountToPerson(person) {
    const animalCount = person.animals.length;

    return {
      name: `${person.name} [${animalCount}]`,
      animals: person.animals,
    };
  }
}
