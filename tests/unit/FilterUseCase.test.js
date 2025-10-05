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
});
