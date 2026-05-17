# 🎯 Repository layout (isolated modules)

## 💡 Convention

The repository is a **monorepo with isolated applications** under `src/`. Each app owns its build tool configuration at the **module root**. There is **no** aggregating `pom.xml` or `package.json` at the repository root.

```
WaR/                          # repository root (docs, AGENTS.md, CI, skills)
├── docs/
├── AGENTS.md
├── src/
│   ├── api/                  # backend — Java 25, Spring Boot, Maven
│   │   ├── pom.xml
│   │   └── src/
│   │       ├── main/java/com/sad/
│   │       └── test/java/com/sad/
│   └── app/                  # frontend — React, npm
│       ├── package.json
│       └── src/              # React source (e.g. components, pages)
└── ...
```

Rules:

- **Backend** lives only in `src/api/`. Run Maven commands from `src/api/` (e.g. `mvn test`, `mvn spring-boot:run`).
- **Frontend** lives only in `src/app/`. Run npm commands from `src/app/` (e.g. `npm test`, `npm run dev`).
- **Do not** add a root `pom.xml` that aggregates `api` unless the team explicitly revises this convention.
- **Do not** add a root `package.json` for the React app; keep frontend dependencies scoped to `src/app/`.
- Shared documentation and agent skills stay at the repository root (`docs/`, `.agents/`, `AGENTS.md`).

## 🏆 Benefits

- Backend and frontend build, test, and release independently.
- Clear ownership: one folder per stack, no mixed tooling at the root.
- CI can run jobs per path (`src/api/**`, `src/app/**`) without coupling failures across stacks.
- Agents and developers always know where to run `mvn` vs `npm`.

## 👀 Examples

### ✅ Good: Run tooling from the module directory

```bash
cd src/api && mvn test
cd src/app && npm test
```

### ❌ Bad: Expect a root-level Maven or npm project

```bash
# from repository root — no pom.xml or package.json for apps here
mvn test
npm test
```

## 🧐 Real world examples

- None (for the moment)

## 🔗 Related agreements

- [Hexagonal Architecture and DDD](backend/hexagonal-architecture.md)
- [Test-Driven Development (TDD)](testing/tdd.md)
