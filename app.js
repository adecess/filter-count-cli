import { FilterUseCase } from "./hexagon/FilterUseCase.js";
import { CountUseCase } from "./hexagon/CountUseCase.js";

import { CliAdapter } from "./adapters/cli/CliAdapter.js";

import data from "./data.js";

// Set up the hexagon
const filterUseCase = new FilterUseCase();
const countUseCase = new CountUseCase();

// Inject hexagon into CLI adapter
const cliAdapter = new CliAdapter(filterUseCase, countUseCase);

// Execute
cliAdapter.execute(process.argv.slice(2), data);
