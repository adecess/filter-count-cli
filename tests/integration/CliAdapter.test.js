import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";

import { CliAdapter } from "../../adapters/cli/CliAdapter.js";
import { DataProcessor } from "../../hexagon/DataProcessor.js";

describe("CliAdapter Integration Tests", () => {
  let cliAdapter;
  let dataProcessor;
  let mockData;
  let consoleSpy;

  beforeEach(() => {
    dataProcessor = new DataProcessor();
    cliAdapter = new CliAdapter(dataProcessor);

    mockData = [
      {
        name: "Uzuzozne",
        people: [
          {
            name: "Lillie Abbott",
            animals: [{ name: "John Dory" }, { name: "Elephant" }],
          },
        ],
      },
      {
        name: "Satanwi",
        people: [
          {
            name: "Anthony Bruno",
            animals: [{ name: "Oryx" }, { name: "Cat" }],
          },
        ],
      },
    ];

    // Mock console.log to capture output
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe("parseArguments", () => {
    it("should parse filter argument correctly", () => {
      const args = ["--filter=lo"];
      const result = cliAdapter.parseArguments(args);

      const expectedResult = { filter: "lo" };

      expect(result).toEqual(expectedResult);
    });

    it("should parse count argument correctly", () => {
      const args = ["--count"];
      const result = cliAdapter.parseArguments(args);

      const expectedResult = { count: true };

      expect(result).toEqual(expectedResult);
    });

    it("should return empty object for no arguments", () => {
      const result = cliAdapter.parseArguments([]);

      const expectedResult = {};

      expect(result).toEqual(expectedResult);
    });

    it("should set both options when both filter and count are present", () => {
      const args = ["--filter=test", "--count"];
      const result = cliAdapter.parseArguments(args);

      const expectedResult = { filter: "test", count: true };

      expect(result).toEqual(expectedResult);
    });

    it("should handle complex filter patterns", () => {
      const args = ["--filter=Jean Valjean"];
      const result = cliAdapter.parseArguments(args);

      const expectedResult = { filter: "Jean Valjean" };

      expect(result).toEqual(expectedResult);
    });
  });

  describe("outputResults", () => {
    it("should output JSON formatted results", () => {
      const testData = [{ name: "test", value: 123 }];
      cliAdapter.outputResults(testData);

      const expectedOutput = JSON.stringify(testData, null, 2);

      expect(consoleSpy).toHaveBeenCalledWith(expectedOutput);
    });

    it("should handle empty array output", () => {
      cliAdapter.outputResults([]);

      const expectedOutput = "[]";

      expect(consoleSpy).toHaveBeenCalledWith(expectedOutput);
    });
  });

  describe("execute - full integration", () => {
    it("should execute filter command end-to-end", () => {
      const args = ["--filter=or"];
      cliAdapter.execute(args, mockData);

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      const output = consoleSpy.mock.calls[0][0];
      const result = JSON.parse(output);

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

    it("should execute filter with no matches", () => {
      const args = ["--filter=xyz"];
      cliAdapter.execute(args, mockData);

      const expectedOutput = "[]";

      expect(consoleSpy).toHaveBeenCalledWith(expectedOutput);
    });

    it("should show usage message for invalid arguments", () => {
      const args = ["--invalid"];
      cliAdapter.execute(args, mockData);

      const expectedOutput = "Usage: node app.js --filter=<pattern> | --count";

      expect(consoleSpy).toHaveBeenCalledWith(expectedOutput);
    });

    it("should handle count command (not yet implemented)", () => {
      const args = ["--count"];
      cliAdapter.execute(args, mockData);

      const expectedOutput = "Count feature not yet implemented";

      expect(consoleSpy).toHaveBeenCalledWith(expectedOutput);
    });

    it("should work with real DataProcessor instance", () => {
      const args = ["--filter=Dory"];
      cliAdapter.execute(args, mockData);

      const output = consoleSpy.mock.calls[0][0];
      const result = JSON.parse(output);

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
  });

  describe("dependency injection", () => {
    it("should work with different DataProcessor implementations", () => {
      const mockResult = [{ mocked: "result" }];
      const mockDataProcessor = {
        filterByPattern: jest.fn().mockReturnValue(mockResult),
      };

      const cliAdapterWithMock = new CliAdapter(mockDataProcessor);
      cliAdapterWithMock.execute(["--filter=test"], mockData);

      const expectedOutput = JSON.stringify(mockResult, null, 2);

      expect(mockDataProcessor.filterByPattern).toHaveBeenCalledWith(
        mockData,
        "test"
      );
      expect(consoleSpy).toHaveBeenCalledWith(expectedOutput);
    });
  });
});
