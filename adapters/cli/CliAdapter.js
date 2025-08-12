export class CliAdapter {
  constructor(dataProcessor) {
    this.dataProcessor = dataProcessor;
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
   * @param {Array} argv - Command line arguments
   * @param {Array} data - Source data
   */
  execute(argv, data) {
    const options = this.parseArguments(argv);

    if (options.filter) {
      const filteredData = this.dataProcessor.filterByPattern(
        data,
        options.filter
      );
      this.outputResults(filteredData);
    } else if (options.count) {
      // TODO: Implement count feature
      console.log("Count feature not yet implemented");
    } else {
      console.log("Usage: node app.js --filter=<pattern> | --count");
    }
  }
}
