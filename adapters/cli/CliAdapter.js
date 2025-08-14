export class CliAdapter {
  constructor(filterUseCase, countUseCase) {
    this.filterUseCase = filterUseCase;
    this.countUseCase = countUseCase;
  }

  /**
   * Parses command line arguments
   * @param {Array} argsList - List of CLI arguments
   * @returns {Object} Parsed options
   */
  parseArguments(argsList) {
    const options = {};

    argsList.forEach((arg) => {
      if (arg.startsWith("--filter=")) {
        options.filter = arg.split("=")[1];
      } else if (arg === "--count") {
        options.count = true;
      }
    });

    return options;
  }

  /**
   * Formats and outputs results to console
   * @param {Array} data - Data to output
   */
  outputResults(data) {
    console.log(JSON.stringify(data, null, 2));
  }

  /**
   * Main execution method
   * @param {Array} argsList - Command line arguments
   * @param {Array} data - Source data
   */
  execute(argsList, data) {
    const options = this.parseArguments(argsList);

    if (options.filter) {
      const filteredData = this.filterUseCase.filterByPattern(
        data,
        options.filter
      );
      this.outputResults(filteredData);
    } else if (options.count) {
      const countedData = this.countUseCase.addCountToNames(data);
      this.outputResults(countedData);
    } else {
      console.log("Usage: node app.js --filter=<pattern> | --count");
    }
  }
}
