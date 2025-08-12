# Filter Count CLI

A command-line application built that filters and counts animals, people, and countries from structured data.

## Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐
│                 │───▶│  FilterUseCase   │
│   CLI Adapter   │    │    (Hexagon)     │
│   (Primary)     │    └──────────────────┘
│                 │    ┌──────────────────┐
│                 │───▶│   CountUseCase   │
└─────────────────┘    │    (Hexagon)     │
                       └──────────────────┘
```

### Key Principles Applied:

- **Single Responsibility Principle** - Each class has one clear purpose
- **Dependency Injection** - Clean separation of concerns
- **Immutability** - Original data is never modified
- **Pure Business Logic** - Use cases contain no I/O dependencies

## 📁 Project Structure

```
├── README.md
├── package.json
├── app.js                    # Entry point & dependency injection
├── data.js                   # Sample data
├── hexagon/                  # Business logic (core)
│   ├── FilterUseCase.js      # "Filter by pattern" use case
│   └── CountUseCase.js       # "Add counts to names" use case
├── adapters/                 # External interfaces
│   └── cli/
│       └── CliAdapter.js     # Command-line interface
└── tests/
    ├── unit/                 # Isolated business logic tests
    │   ├── FilterUseCase.test.js
    │   └── CountUseCase.test.js
    └── integration/          # Adapter integration tests
        └── CliAdapter.test.js
```

## Getting Started

### Prerequisites

- Node.js >= 24.0.0
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/adecess/filter-count-cli.git
cd filter-count-cli

# Install dependencies
npm install
```

## Usage

### Filter Feature

Filter animals containing a specific pattern:

```bash
node app.js --filter=ry
```

**Example Output:**

```json
[
  {
    "name": "Uzuzozne",
    "people": [
      {
        "name": "Lillie Abbott",
        "animals": [
          {
            "name": "John Dory"
          }
        ]
      }
    ]
  },
  {
    "name": "Whatchusay",
    "people": [
      {
        "name": "Anthony Bruno",
        "animals": [
          {
            "name": "Oryx"
          },
          {
            "name": "Canary"
          }
        ]
      }
    ]
  }
]
```

### Count Feature

Add count information to country and people names:

```bash
node app.js --count
```

**Example Output:**

```json
[
  {
    "name": "Dillauti [2]",
    "people": [
      {
        "name": "Winifred Graham [6]",
        "animals": [
          { "name": "Anoa" },
          { "name": "Duck" },
          { "name": "Narwhal" },
          { "name": "Badger" },
          { "name": "Cobra" },
          { "name": "Crow" }
        ]
      },
      {
        "name": "Blanche Viciani [8]",
        "animals": [
          { "name": "Barbet" },
          { "name": "Rhea" },
          { "name": "Snakes" },
          { "name": "Antelope" },
          { "name": "Echidna" },
          { "name": "Crow" },
          { "name": "Guinea Fowl" },
          { "name": "Deer Mouse" }
        ]
      }
    ]
  }
]
```

### Run All Tests

```bash
npm test
```
