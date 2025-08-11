import DataProcessor from "./domain/DataProcessor.js";
import CliAdapter from "./adapters/cli/CliAdapter.js";
import data from "./data.js";

// Set up the hexagon
const dataProcessor = new DataProcessor();

// Inject hexagon into CLI adapter
const cliAdapter = new CliAdapter(dataProcessor);

// Execute
cliAdapter.execute(process.argv.slice(2), data);
