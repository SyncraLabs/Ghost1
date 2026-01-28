# SOP: Frontend Architecture (Syncra)

## Goal
Build a Next.js 14 application that serves as the UI for Syncra.

## Structure
- **Framework**: Next.js 14 (App Router).
- **Styling**: Tailwind CSS + "Syncra" Design Tokens.
- **State**: React Server Components (RSC) for initial load, Client Components for interactivity.

## Key Components
1.  **Dropzone**: Client component. Handles file selection and drag-and-drop.
2.  **ProcessingStatus**: Visualizes the "Stripping" or "Generating" state.
3.  **ResultView**: Displays before/after (if applicable) or the final result.

## Integration Logic
- **Local Dev**: Use `exec` (Node) or API Routes that call Python scripts.
- **Production (Vercel)**: Python scripts deployed as Serverless Functions; Frontend calls `/api/py/generate` or similar.

## Design Rules
- **Font**: Inter (or Open Sauce clone).
- **Colors**:
    - Primary: #3a00e4
    - Background: White (clean) or Dark (#000000) depending on user preference (Default: Light/Clean as per PDF snippets).
