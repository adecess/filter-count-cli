import { DataProcessor } from "../../domain/DataProcessor.js";

describe("DataProcessor", () => {
  let dataProcessor;
  let mockData;

  beforeEach(() => {
    dataProcessor = new DataProcessor();

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
        name: "Satanwi",
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
      const result = dataProcessor.filterByPattern(mockData, "ry");

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
        {
          name: "Satanwi",
          people: [
            {
              name: "Anthony Bruno",
              animals: [{ name: "Oryx" }, { name: "Canary" }],
            },
          ],
        },
      ];

      expect(result).toEqual(expectedResult);
    });

    it("should return empty array for invalid input", () => {
      expect(dataProcessor.filterByPattern(null, "ry")).toEqual([]);
      expect(dataProcessor.filterByPattern(mockData, null)).toEqual([]);
      expect(dataProcessor.filterByPattern(undefined, "ry")).toEqual([]);
      expect(dataProcessor.filterByPattern(mockData, "")).toEqual([]);
    });

    it("should return empty array when no animals match pattern", () => {
      const result = dataProcessor.filterByPattern(mockData, "xyz");
      expect(result).toEqual([]);
    });

    it("should preserve original data structure without mutation", () => {
      const originalData = JSON.parse(JSON.stringify(mockData));
      dataProcessor.filterByPattern(mockData, "ry");

      expect(mockData).toEqual(originalData);
    });

    it("should handle empty countries array", () => {
      const result = dataProcessor.filterByPattern([], "ry");
      expect(result).toEqual([]);
    });
  });

  describe("_isValidInput", () => {
    it("should return true for valid input", () => {
      expect(dataProcessor._isValidInput(mockData, "ry")).toBe(true);
    });

    it("should return false for invalid input", () => {
      expect(dataProcessor._isValidInput(null, "ry")).toBe(false);
      expect(dataProcessor._isValidInput(mockData, null)).toBe(false);
      expect(dataProcessor._isValidInput(mockData, "")).toBe(false);
      expect(dataProcessor._isValidInput("not-array", "ry")).toBe(false);
    });
  });

  describe("_filterAnimalsByPattern", () => {
    it("should filter animals by pattern", () => {
      const animals = [
        { name: "John Dory" },
        { name: "Elephant" },
        { name: "Butterfly" },
      ];

      const result = dataProcessor._filterAnimalsByPattern(animals, "fly");

      const expectedResult = [{ name: "Butterfly" }];

      expect(result).toEqual(expectedResult);
    });

    it("should return empty array when no animals match", () => {
      const animals = [{ name: "Cat" }, { name: "Dog" }];
      const result = dataProcessor._filterAnimalsByPattern(animals, "xyz");

      const expectedResult = [];

      expect(result).toEqual(expectedResult);
    });

    it("should handle empty animals array", () => {
      const result = dataProcessor._filterAnimalsByPattern([], "ry");

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

      const result = dataProcessor._filterPersonByPattern(person, "ry");

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

      const result = dataProcessor._filterPersonByPattern(person, "xyz");

      const expectedResult = null;

      expect(result).toEqual(expectedResult);
    });
  });

  describe("_filterCountryByPattern", () => {
    it("should return country when people have matching animals", () => {
      const country = mockData[0];
      const result = dataProcessor._filterCountryByPattern(country, "a");

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
      const result = dataProcessor._filterCountryByPattern(country, "xyz");

      const expectedResult = null;

      expect(result).toEqual(expectedResult);
    });
  });
});
