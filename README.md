# SaaS Analytics Dashboard

A resume-grade analytics dashboard using **Nuxt 3**, **TypeScript**, and **Server-Side Rendering (SSR)**.

## 🚀 Key Features

*   **SSR Architecture**: Pages are rendered server-side for SEO and performance.
*   **Authentication System**:
    *   JWT-based auth simulation
    *   `httpOnly` cookie abstraction for security
    *   Protected routes via middleware
*   **Data Visualization**:
    *   **Vanilla SVG Charts**: No heavy charting libraries. Hand-coded responsive Line and Bar charts.
    *   Interactive Tooltips
*   **Data Interaction**:
    *   Server-side Pagination & Sorting
    *   Debounced Search
    *   Date Range Filtering (UI)
*   **Modern UI/UX**:
    *   Clean, dark-mode focused design
    *   BEM-inspired CSS structure (no Tailwind dependency, demonstrating CSS mastery)
    *   Responsive Layout (Mobile Sidebar, grid adaptations)

## 🛠 Tech Stack

*   **Framework**: Nuxt 3 (Vue 3 + Nitro)
*   **Language**: TypeScript (Strict Mode)
*   **State Management**: `useState` (SSR-safe)
*   **Styling**: Native CSS Variables & Scoped CSS
*   **API**: Mock Nitro server endpoints

## 📂 Architecture

```
app/
  components/
    charts/     # SVG visualization components
    dashboard/  # Domain-specific components
    layout/     # Header, Sidebar
    ui/         # Reusable primitives (Card, DataTable)
  composables/  # Shared logic (useAuth, useApi)
  layouts/      # Page structures
  middleware/   # Route protection
  pages/        # Route views
server/
  api/          # Mock backend endpoints
types/          # Shared interfaces
```

## 🏗 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Login Credentials (Demo)**
    *   Email: `demo@example.com`
    *   Password: `password123`

## 💡 Why SSR?

This project implements SSR to demonstrate:
1.  **Performance**: Faster First Contentful Paint (FCP) by sending populated HTML.
2.  **SEO**: ensuring public pages are crawlable.
3.  **Security**: Validating auth tokens server-side before rendering sensitive routes.

## 🖌 Trade-offs & Decisions

*   **Vanilla CSS**: Chosen over Tailwind to demonstrate core CSS fundamental knowledge (Flexbox, Grid, CSS Variables).
*   **Mock API**: Used local mock endpoints for a self-contained demo, but structured to easily swap with a real API.
*   **SVG Charts**: Custom implementation to reduce bundle size and show understanding of SVG coordinate systems.
