# Random UI Experiments / Fun Spreadsheet Stuff

This is a test project I'm building **just for fun**. It's not meant to be polished or production-ready. I'm mainly experimenting with custom components, spreadsheet-inspired tables, frontend frameworks — and eventually, more backend ideas.

I'm using this project to:
- Create a spreadsheet-like table (I love spreadsheets) that will eventually help me move some of my personal spreadsheets (mostly game-related) into a more customizable web format.
- Build a reusable component system for table-style UIs.
- Test out various frontend libraries without worrying about “finishing” everything.
- Try out some backend experimentation later on.

> 💡 **Note**: There is no authentication and I don't plan to add any. This project is **not meant for public deployment** or storing sensitive data — it's just a personal playground for component testing.

---

## 🔐 Is this project secure or complete?

Nope.

This project is **not meant to be hosted publicly** or used in production. It's a sandbox for frontend experimentation and database interaction. Possibly even backend experimentation in the future. There is no authentication, no authorization, and no attempt to secure anything.

---

## 📦 Tech Stack

### 🧠 Core Goals
- Custom React + Webpack frontend
- Fully modular and scalable component structure
- Interactive spreadsheet-like tables

### 🧱 Frameworks & Libraries I Plan To Test With Eventually (in no strict order)
- [Ant Design](https://ant.design/components/overview)
- [TanStack Table](https://tanstack.com/table/latest/docs/framework/react/)
- [React Table Library](https://react-table-library.com)
- [React Bootstrap](https://react-bootstrap.netlify.app)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Material UI (maybe)](https://mui.com/) — probably skipping

---

## 🧩 Key Features (So Far)

- A **UniversalTable** component with:
  - Editable text, checkbox, and dropdown cells
  - Support for colSpan/rowSpan and merged headers
  - Coordinate-based selection (e.g., "A1", "B2")
  - ⚠️ Might be reworked again to be even more "universal"
- A **Nutrition Fact Table** that mimics real-world nutrition labels, with multiple products side-by-side
- Custom header bar, sidebar navigation, and more

---

## 🚀 Getting Started

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
npm install
npm start
```

> ⚠️ Ensure your `.env` is set up with MySQL credentials and that your MySQL server is running.

---

## 🛠️ Resetting the Backend (if DB schema changes)

If you're having database issues or made breaking changes to the models:
```bash
npx sequelize-cli db:drop
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Restart the server:
```bash
npm start
```

