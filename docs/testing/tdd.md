# 🎯 Test-Driven Development (TDD)

## 💡 Convention

All production code is written in response to a failing test. The mandatory cycle is **Red → Green → Refactor**:

1. **Red** — Write the smallest test that expresses the next behavior. Run it and confirm it fails for the right reason (missing behavior, not a typo or setup error).
2. **Green** — Write the minimum production code to make that test pass. No extra features, no speculative abstractions.
3. **Refactor** — Improve design (names, duplication, structure) while keeping all tests green. Do not change behavior.

Additional rules:

- **One failing test at a time.** Do not add several tests and then implement; finish the cycle for each behavior before starting the next.
- **Tests are the specification.** If behavior is not covered by a test, it does not exist yet. Do not write production code “to prepare” for a test that will come later.
- **Start from the inside out.** Follow the hexagonal layers: Domain first, then Application (use cases), then Infrastructure and API/UI. Outer layers are driven by tests on inner layers or by narrow integration tests, not the other way around.
- **Fast feedback.** Favor unit tests on domain and application logic. Integration and end-to-end tests are added only when a port or delivery mechanism cannot be exercised meaningfully in isolation.
- **Deterministic tests.** No sleeps, no reliance on wall-clock time, randomness, or external services unless explicitly controlled (fakes, test containers, or fixed clocks).
- **Readable tests.** Use Arrange–Act–Assert (or Given–When–Then). Test names describe behavior: `should_reject_recipe_without_title`, not `test_create_recipe`.

Test layout mirrors source layout:

```
src/api/src/main/java/com/sad/
    domain/
    application/
    infrastructure/
src/api/src/test/java/com/sad/     # Java: same package tree under test/
    ...
src/app/
    ...
src/app/**/*.test.tsx      # React: colocated or __tests__ next to component
```

When working with AI agents: request **only the failing test** first; reject diffs that add implementation before a red test exists.

## 🏆 Benefits

- Design emerges from usage: APIs and domain models stay focused on real behavior.
- Regressions are caught immediately; the suite is the safety net for refactoring.
- Domain and application layers stay framework-agnostic and fast to run.
- Agents and humans share the same contract: tests define what “done” means before code exists.
- Thin delivery layers (API routes, React components) stay trivial because logic lives in tested use cases and domain code.

## 👀 Examples

### ✅ Good: Red first — failing test for domain rule

```java
@Test
void should_reject_recipe_without_title() {
    assertThrows(InvalidRecipeException.class, () ->
        Recipe.create(null, List.of("ingredient"))
    );
}
```

Run → fails because `Recipe` does not exist or does not validate yet. Then implement `Recipe` until green.

### ❌ Bad: Implementation before any test

```java
// Recipe.java written first with full validation, persistence annotations, etc.
// Test added afterward only to “cover” existing code
```

This is test-last, not TDD. It misses design feedback and tends to over-build.

### ✅ Good: Green with minimal code

```java
public final class Recipe {
    public static Recipe create(String title, List<String> ingredients) {
        if (title == null || title.isBlank()) {
            throw new InvalidRecipeException("title is required");
        }
        return new Recipe(title, ingredients);
    }
}
```

Only enough to pass the current test. Add `shouldRejectEmptyTitle` in the next Red step if needed.

### ❌ Bad: Green step that adds unrequested behavior

```java
public static Recipe create(String title, List<String> ingredients) {
    if (title == null || title.isBlank()) throw new InvalidRecipeException(...);
    if (ingredients.isEmpty()) throw new InvalidRecipeException(...); // no test yet
    normalizeIngredients(ingredients); // speculative refactor
    return new Recipe(title, ingredients);
}
```

YAGNI violation: extra rules belong in their own Red → Green → Refactor cycles.

### ✅ Good: Refactor only with green tests

After `Recipe` and `CreateRecipe` pass, extract a shared `RecipeTitle` value object and re-run the suite. Commit refactor separately from behavior changes when practical.

### ❌ Bad: Refactor mixed with new behavior in one step

Renaming types, adding a new field, and a new test in the same commit without a green state in between makes failures hard to diagnose.

## 🧐 Real world examples

- None (For the moment)

## 🔗 Related agreements

- None (For the moment)
