import { FilterUseCase } from "../../hexagon/FilterUseCase";

describe("FilterUseCase", () => {
  let filterUseCase;
  let mockData;

  beforeEach(() => {
    filterUseCase = new FilterUseCase();

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

  describe("filterByPattern", () => {
    it("should filter animals containing the pattern", () => {
      const result = filterUseCase.filterByPattern(mockData, "ory");

      const expectedResult = [
        {
          name: "Uzuzozne",
          people: [
            {
              name: "Lillie Abbott",
              animals: [{ name: "John Dory" }],
            },
          ],
        },
      ];

      expect(result).toEqual(expectedResult);
    });

    it("should return empty array for invalid input", () => {
      expect(filterUseCase.filterByPattern(null, "ry")).toEqual([]);
      expect(filterUseCase.filterByPattern(mockData, null)).toEqual([]);
      expect(filterUseCase.filterByPattern(undefined, "ry")).toEqual([]);
      expect(filterUseCase.filterByPattern(mockData, "")).toEqual([]);
    });

    it("should return empty array when no animals match pattern", () => {
      const result = filterUseCase.filterByPattern(mockData, "xyz");
      expect(result).toEqual([]);
    });

    it("should preserve original data structure without mutation", () => {
      const originalData = JSON.parse(JSON.stringify(mockData));
      filterUseCase.filterByPattern(mockData, "ry");

      expect(mockData).toEqual(originalData);
    });

    it("should handle empty countries array", () => {
      const result = filterUseCase.filterByPattern([], "ry");
      expect(result).toEqual([]);
    });
  });

  describe("_isValidFilterInput", () => {
    it("should return true for valid input", () => {
      expect(filterUseCase._isValidFilterInput(mockData, "ry")).toBe(true);
    });

    it("should return false for invalid input", () => {
      expect(filterUseCase._isValidFilterInput(null, "ry")).toBe(false);
      expect(filterUseCase._isValidFilterInput(mockData, null)).toBe(false);
      expect(filterUseCase._isValidFilterInput(mockData, "")).toBe(false);
      expect(filterUseCase._isValidFilterInput("not-array", "ry")).toBe(false);
    });
  });

  describe("_filterCountryByPattern", () => {
    it("should return country when people have matching animals", () => {
      const country = mockData[0];
      const result = filterUseCase._filterCountryByPattern(country, "a");

      const expectedResult = {
        name: "Uzuzozne",
        people: [
          {
            name: "Lillie Abbott",
            animals: [{ name: "Elephant" }, { name: "Cat" }],
          },
        ],
      };

      expect(result).toEqual(expectedResult);
    });

    it("should return null when no people have matching animals", () => {
      const country = mockData[0];
      const result = filterUseCase._filterCountryByPattern(country, "xyz");

      const expectedResult = null;

      expect(result).toEqual(expectedResult);
    });
  });

  describe("_filterAnimalsByPattern", () => {
    it("should filter animals by pattern", () => {
      const animals = [
        { name: "John Dory" },
        { name: "Elephant" },
        { name: "Butterfly" },
      ];

      const result = filterUseCase._filterAnimalsByPattern(animals, "fly");

      const expectedResult = [{ name: "Butterfly" }];

      expect(result).toEqual(expectedResult);
    });

    it("should return empty array when no animals match", () => {
      const animals = [{ name: "Cat" }, { name: "Dog" }];
      const result = filterUseCase._filterAnimalsByPattern(animals, "xyz");

      const expectedResult = [];

      expect(result).toEqual(expectedResult);
    });

    it("should handle empty animals array", () => {
      const result = filterUseCase._filterAnimalsByPattern([], "ry");

      const expectedResult = [];

      expect(result).toEqual(expectedResult);
    });
  });

  describe("_filterPersonByPattern", () => {
    it("should return person when animals match pattern", () => {
      const person = {
        name: "Test Person",
        animals: [{ name: "John Dory" }, { name: "Cat" }],
      };

      const result = filterUseCase._filterPersonByPattern(person, "ry");

      const expectedResult = {
        name: "Test Person",
        animals: [{ name: "John Dory" }],
      };

      expect(result).toEqual(expectedResult);
    });

    it("should return null when no animals match pattern", () => {
      const person = {
        name: "Test Person",
        animals: [{ name: "Cat" }, { name: "Dog" }],
      };

      const result = filterUseCase._filterPersonByPattern(person, "xyz");

      const expectedResult = null;

      expect(result).toEqual(expectedResult);
    });
  });
});
