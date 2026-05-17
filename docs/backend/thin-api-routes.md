# 🎯 Thin API Routes

## 💡 Convention

API routes must be thin controllers. They resolve a use case from the DI container, call it, and return the response. They must not contain business logic such as filtering, sorting, mapping, or any domain rule.

All business logic belongs in the Application layer (use cases) or the Domain layer.

## 🏆 Benefits

- Business logic stays testable through unit tests against use cases, without needing HTTP infrastructure.
- API routes become trivially simple, reducing the chance of bugs in the delivery layer.
- Logic is reusable — the same use case can be called from API routes, CLI commands, or event handlers.

## 👀 Examples

### ✅ Good: Route delegates entirely to a use case

### ❌ Bad: Business logic inside the API route

## 🧐 Real world examples

- None (For the moment)

## 🔗 Related agreements

- None (For the moment)
