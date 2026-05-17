# Repository layout

- Monorepo with **isolated modules** under `src/` (no root `pom.xml` or `package.json` for apps). See `docs/repo-structure.md`.
- **Backend** — `src/api/`: own `pom.xml`, Java 25, Spring Boot, Maven. Run `mvn` from `src/api/`.
- **Frontend** — `src/app/`: own `package.json`, React. Run `npm` from `src/app/`.

# Architecture

- Onion Architecture, DDD.
- Backend standard Maven paths: `src/main/java`, `src/test/java` under `src/api/`.
- Base Java package: `com.sad` (directory path `com/sad/` under main and test).

# Documentation

- Detailed conventions with examples live in `docs/`.
- **Do NOT read all docs upfront.**
- When working on a task, use this map to find and read only the docs relevant to your task:

```
docs/
├── documentation-guidelines.md
├── repo-structure.md
├── backend/
│   ├── hexagonal-architecture.md
│   └── thin-api-routes.md
└── testing/
    └── tdd.md
```