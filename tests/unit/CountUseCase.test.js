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
});
