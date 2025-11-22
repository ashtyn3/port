# Adding Apps to the Portfolio

This guide shows how to add new applications to your portfolio using the app registry system.

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│              App Registry System                 │
├─────────────────────────────────────────────────┤
│                                                  │
│  1. Create Component → 2. Register → 3. Done!   │
│                                                  │
│  Your Component        appRegistry.tsx    Menu  │
│  ──────────────       ────────────────   ────── │
│  MyApp.tsx       →    register(app)   →  Auto   │
│                                         Display  │
└─────────────────────────────────────────────────┘
```

This guide shows how to add new applications to your portfolio using the app registry system.

## Quick Start

### Step 1: Create Your App Component

```tsx
// src/lib/content/myapp.tsx
export const MyApp = () => {
  return (
    <div class="flex flex-col items-center justify-center h-full w-full">
      <h1 class="text-2xl font-bold">My Awesome App</h1>
      <p>This is my app content!</p>
    </div>
  );
};
```

### Step 2: Register It

Open `src/lib/appRegistry.tsx`:

```tsx
// 1. Import your component at the top
import { MyApp } from "./content/myapp";

// 2. Add to the registry (find the appRegistry.registerMultiple section)
appRegistry.registerMultiple([
  // ... existing apps ...
  {
    id: "my-app",
    title: "My Awesome App",
    category: "personal",
    component: MyApp,
  },
]);
```

### Step 3: Done!

Your app will now appear in the menu automatically. No need to modify any other files!

## Real Example: Adding a Calculator App

### 1. Create the component

```tsx
// src/lib/content/calculator.tsx
import { createSignal } from "solid-js";

export const Calculator = () => {
  const [result, setResult] = createSignal(0);
  const [input, setInput] = createSignal("");

  const calculate = () => {
    try {
      setResult(eval(input()));
    } catch (e) {
      setResult(0);
    }
  };

  return (
    <div class="flex flex-col items-center justify-center h-full w-full p-4 gap-4">
      <h1 class="text-2xl font-bold">Calculator</h1>
      <input
        type="text"
        value={input()}
        onInput={(e) => setInput(e.currentTarget.value)}
        class="border-2 border-gray-300 p-2 w-full"
        placeholder="Enter expression"
      />
      <button
        onClick={calculate}
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>
      <div class="text-xl">Result: {result()}</div>
    </div>
  );
};
```

### 2. Register it in appRegistry.tsx

```tsx
import { Calculator } from "./content/calculator";

appRegistry.registerMultiple([
  // ... existing apps ...
  {
    id: "calculator",
    title: "Calculator",
    description: "Simple calculator app",
    category: "personal",
    component: Calculator,
    windowOptions: {
      initialSize: { width: 400, height: 500 },
    },
  },
]);
```

## Advanced: Custom Behavior

For apps that need special behavior when opened:

```tsx
{
  id: "project-suite",
  title: "Project Suite",
  category: "freelance",
  component: ProjectOverview,
  onOpen: (createWindow, bringToFront) => {
    // Open main window
    const mainId = createWindow("Projects", () => <ProjectOverview />, {
      customId: "projects-main",
    });
    
    // Open additional detail windows
    queueMicrotask(() => {
      createWindow("Project A", () => <ProjectA />, {
        customId: "project-a",
      });
      createWindow("Project B", () => <ProjectB />, {
        customId: "project-b",
      });
      bringToFront(mainId);
    });
  },
}
```

## Available Categories

- `getting-started` - Intro and help content
- `freelance` - Freelance work
- `personal` - Personal projects

To add a new category, see `src/lib/README.md`.

## Tips

1. **Unique IDs**: Make sure each app has a unique `id`
2. **Component Import**: Don't forget to import your component at the top of `appRegistry.tsx`
3. **Window Size**: Set `initialSize` in `windowOptions` for better UX
4. **Mobile Support**: Use `isMobile()` helper if you need mobile-specific behavior

## Full Documentation

See `src/lib/README.md` for complete API documentation.
