import { CountUseCase } from "../../hexagon/CountUseCase";

describe("CountUseCase", () => {
  let countUseCase;
  let mockData;

  beforeEach(() => {
    countUseCase = new CountUseCase();

    mockData = [
      {
        name: "Uzuzozne",
        people: [
          {
            name: "Lillie Abbott",
            animals: [
              { name: "John Dory" },
              { name: "Elephant" },
              { name: "Cat" },
            ],
          },
          {
            name: "Bob Smith",
            animals: [{ name: "Butterfly" }, { name: "Dog" }],
          },
        ],
      },
      {
        name: "Onlyonegod",
        people: [
          {
            name: "Anthony Bruno",
            animals: [{ name: "Oryx" }, { name: "Canary" }],
          },
        ],
      },
    ];
  });

  describe("addCountToNames", () => {
    it("should add count information to country and people names", () => {
      const result = countUseCase.addCountToNames(mockData);

      const expectedResult = [
        {
          name: "Uzuzozne [2]",
          people: [
            {
              name: "Lillie Abbott [3]",
              animals: [
                { name: "John Dory" },
                { name: "Elephant" },
                { name: "Cat" },
              ],
            },
            {
              name: "Bob Smith [2]",
              animals: [{ name: "Butterfly" }, { name: "Dog" }],
            },
          ],
        },
        {
          name: "Onlyonegod [1]",
          people: [
            {
              name: "Anthony Bruno [2]",
              animals: [{ name: "Oryx" }, { name: "Canary" }],
            },
          ],
        },
      ];

      expect(result).toEqual(expectedResult);
    });

    it("should return empty array for invalid input", () => {
      expect(countUseCase.addCountToNames(null)).toEqual([]);
      expect(countUseCase.addCountToNames(undefined)).toEqual([]);
      expect(countUseCase.addCountToNames("not-array")).toEqual([]);
    });

    it("should handle empty countries array", () => {
      const result = countUseCase.addCountToNames([]);

      const expectedResult = [];

      expect(result).toEqual(expectedResult);
    });

    it("should preserve original data structure without mutation", () => {
      const originalData = JSON.parse(JSON.stringify(mockData));
      countUseCase.addCountToNames(mockData);

      expect(mockData).toEqual(originalData);
    });

    it("should handle countries with empty people arrays", () => {
      const dataWithEmptyPeople = [
        {
          name: "Empty Country",
          people: [],
        },
      ];

      const result = countUseCase.addCountToNames(dataWithEmptyPeople);

      const expectedResult = [
        {
          name: "Empty Country [0]",
          people: [],
        },
      ];

      expect(result).toEqual(expectedResult);
    });
  });

  describe("_isValidCountInput", () => {
    it("should return true for valid input", () => {
      expect(countUseCase._isValidCountInput(mockData)).toBe(true);
      expect(countUseCase._isValidCountInput([])).toBe(true);
    });

    it("should return false for invalid input", () => {
      expect(countUseCase._isValidCountInput(null)).toBe(false);
      expect(countUseCase._isValidCountInput(undefined)).toBe(false);
      expect(countUseCase._isValidCountInput("not-array")).toBe(false);
    });
  });

  describe("_addCountToPerson", () => {
    it("should add animal count to person name", () => {
      const person = {
        name: "Test Person",
        animals: [{ name: "Cat" }, { name: "Dog" }, { name: "Bird" }],
      };

      const result = countUseCase._addCountToPerson(person);

      const expectedResult = {
        name: "Test Person [3]",
        animals: [{ name: "Cat" }, { name: "Dog" }, { name: "Bird" }],
      };

      expect(result).toEqual(expectedResult);
    });

    it("should handle person with no animals", () => {
      const person = {
        name: "Lonely Person",
        animals: [],
      };

      const result = countUseCase._addCountToPerson(person);

      const expectedResult = {
        name: "Lonely Person [0]",
        animals: [],
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe("_addCountToCountry", () => {
    it("should add people count to country name", () => {
      const country = {
        name: "Test Country",
        people: [
          { name: "Person 1", animals: [{ name: "Cat" }] },
          { name: "Person 2", animals: [{ name: "Dog" }] },
        ],
      };

      const result = countUseCase._addCountToCountry(country);

      const expectedResult = {
        name: "Test Country [2]",
        people: [
          { name: "Person 1 [1]", animals: [{ name: "Cat" }] },
          { name: "Person 2 [1]", animals: [{ name: "Dog" }] },
        ],
      };

      expect(result).toEqual(expectedResult);
    });
  });
});
