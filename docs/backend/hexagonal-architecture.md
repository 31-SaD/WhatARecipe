# 🎯 Hexagonal Architecture / DDD

## 💡 Convention

The backend follows Hexagonal Architecture with DDD tactical patterns. Code is organized in three layers:

- **Domain** — Value Objects, Repository interfaces, Domain Events. No framework or external dependencies.
- **Application** — One use case per class. Orchestrates domain objects.
- **Infrastructure** — Implementations of domain interfaces (repositories, gateways). Framework and library aware.

Directory structure:

```
src/api/
    pom.xml
    src/main/java/com/sad/
        domain/          # VOs, Entities, interfaces
        application/     # Use cases (one per folder)
            {use-case}/
        infrastructure/  # Repository impls, gateways
    src/test/java/com/sad/   # same package tree as main
```

## 🏆 Benefits

- Domain logic stays framework-agnostic and independently testable.
- Swapping infrastructure (e.g. database, external API) requires no domain or application changes.
- One use case per class keeps application services small, focused, and easy to name.
- Folder structure mirrors the architecture, making navigation predictable.

## 👀 Examples

### ✅ Good: Use case with single responsibility

### ❌ Bad: Use case that depends on infrastructure directly

## 🧐 Real world examples

- None (For the moment)

## 🔗 Related agreements

- None (For the moment)