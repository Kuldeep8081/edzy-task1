# Edzy Library Explorer

A high-performance, infinite-scrolling book explorer application built for the Edzy Frontend Hackathon. This project fetches data from the Open Library API, featuring a virtualized grid, responsive design, and instant search capabilities.

## 🚀 Features

- **Infinite Scrolling:** Seamlessly loads more books as you scroll using `IntersectionObserver` logic.
- **Virtualized Grid:** Renders thousands of items efficiently using `@tanstack/react-virtual`, ensuring smooth performance without DOM overload.
- **Real-time Search:** Debounced search input (400ms) to reduce API calls while typing.
- **Quick Filters:** One-click filtering for popular categories (Science, History, etc.).
- **Responsive Design:** Adaptive grid layout that shifts from 2 columns on mobile to 4 columns on desktop.
- **Modern UI:** Polished interface using **shadcn/ui**, featuring hover effects, skeletons, and graceful image fallbacks.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **State & Caching:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Virtualization:** [TanStack Virtual](https://tanstack.com/virtual/latest)
- **Icons:** Lucide React

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```
   git clone [https://github.com/Kuldeep8081/edzy-task1.git]
   cd edzy-task1
   ```
2. **Install dependencies:**
   ```
   npm install
   ```
3. **Run the development server:**
   ```
   npm run dev
   ```
Open the application: Visit http://localhost:3000. The app will automatically redirect you to the library view at /library.
