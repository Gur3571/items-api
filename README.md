# Items API

A small CRUD application for managing items that belong to groups.
Django REST Framework backend, React frontend, runnable independently.

## Requirements

- Python 3.10+
- Node 18+

## Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_items        # optional sample data
python manage.py runserver
```

The API runs at `http://127.0.0.1:8000/api/`. DRF's browsable interface is
available at that URL for manual testing.

Run the tests with `python manage.py test`.

## Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` and expects the backend on port 8000.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/items/` | List all items |
| POST | `/api/items/` | Create an item |
| GET | `/api/items/{id}/` | Retrieve one item |
| PATCH | `/api/items/{id}/` | Partially update an item |

Items have `name`, `group` (`primary` or `secondary`), `created_at` and
`updated_at`. Timestamps are set by the server and ignored if a client
supplies them.

## Structure

```
backend/
├── core/          Django project settings and root URL config
└── items/         The app: model, serializer, viewset, tests, seed command

frontend/
└── src/
    ├── api.js         Fetch wrapper; one function per endpoint
    ├── useItems.js    Hook owning the items list, loading and error state
    ├── App.jsx        Page shell, table, group filter
    ├── ItemPanel.jsx  Detail panel — view, edit and create modes
    └── styles/        Design tokens and global reset
```

## The uniqueness rule

A name may appear once per group — "Rock" can exist in both Primary and
Secondary, but not twice in Primary. This is enforced at three levels:

- A `UniqueConstraint` on the model, so the database is the final authority
- A `UniqueTogetherValidator` on the serializer, so a collision returns a
  readable 400 rather than a 500
- Inline field errors in the UI, rendered under the field the user changed

`ItemAPITests` covers both directions of the rule, the 400 and 404 responses,
and the timestamp behaviour.

## Notes for running

- CORS is configured for `http://localhost:5173`. If Vite starts on a
  different port because 5173 is taken, add that origin to
  `CORS_ALLOWED_ORIGINS` in `backend/core/settings.py`.
- `seed_items` is optional. Skipping it leaves the database empty, which is
  a good way to see the empty state; running it gives six items including
  "Rock" and "Paper" in both groups, which demonstrates the uniqueness rule.

## Notes on decisions

**Endpoints are namespaced under `/api/`** rather than served from the root,
leaving room for other things on the same origin.

**The viewset is composed from mixins** rather than `ModelViewSet`, so only
the four required actions exist. `PUT` and `DELETE` return 405.

**Group filtering happens client-side.** The full list is already in memory,
so filtering is instant and costs no requests. Server-side filtering would be
right once the dataset outgrows a single response.

**No pagination.** It changes the list response shape, so it seemed better to
leave out than half-add.

**Plain CSS modules** rather than a component library — the UI is one table
and one panel, which didn't warrant the dependency.

**Editing happens in a detail panel** rather than inline in the table. With
two editable fields, inline editing would be better UX in a real product; the
panel exercises the retrieve endpoint and gives validation errors somewhere
sensible to render.

**Name uniqueness is case-sensitive,** matching the database default.
Whitespace is stripped before validation, so `" Rock "` collides with `"Rock"`.
A case-insensitive rule would need `UniqueConstraint(Lower('name'), 'group')`
plus a matching serializer check.

## What I'd add next

Pagination and server-side filtering, delete, search, and TypeScript on the
frontend.