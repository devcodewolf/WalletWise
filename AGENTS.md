# AGENTS.md

Guía para agentes de IA (Claude Code, Codex, Cursor, etc.) que trabajen en **WalletWise**, una app de finanzas personales (ingresos, gastos, billeteras, categorías, movimientos recurrentes y estadísticas).

## Stack

- **Next.js 15** (App Router, Turbopack en dev) + **React 19** + **TypeScript** (strict)
- **Prisma 6** sobre **PostgreSQL** (`DATABASE_URL`)
- **NextAuth v5 beta** (Credentials + bcryptjs), sesión vía `auth()`
- **Tailwind CSS v4** + **shadcn/ui** (estilo `new-york`, Radix, iconos `lucide-react`)
- **React Hook Form** + **Zod** para formularios y validación
- **Recharts** para gráficos, **Sonner** para toasts, **Zustand** para estado de usuario en cliente
- **Node 24.22.1** (fijado en `engines`), gestor de paquetes **pnpm**
- Despliegue en **Vercel**

## Comandos

```bash
pnpm install            # ejecuta también `prisma generate` (postinstall)
pnpm dev                # servidor de desarrollo (http://localhost:3000)
pnpm build              # build de producción — úsalo para verificar tipos antes de dar algo por terminado
pnpm lint               # ESLint (next lint)
pnpm prisma migrate dev --name <nombre>   # nueva migración tras cambiar schema.prisma
pnpm prisma db seed     # seed (prisma/seed.ts vía tsx)
```

No hay suite de tests: verifica con `pnpm lint` y `pnpm build`.

## Estructura

- `app/(auth)/(login)/` — login en `/` (ruta pública).
- `app/(admin)/admin-panel/` — área autenticada: dashboard, `transactions`, `categories`, `wallets`, `recurring`, `statistics`. El layout fuerza `dynamic = 'force-dynamic'`.
- `app/api/auth/[...nextauth]/` — handlers de NextAuth.
- `actions/` — **Server Actions** (`'use server'`), una por dominio. Toda lectura/escritura a BD pasa por aquí.
- `components/<dominio>/` — componentes por feature; `components/ui/` son componentes shadcn.
- `lib/schemas/` — esquemas Zod (compartidos entre formulario y server action). `lib/db.ts` — cliente Prisma singleton. `lib/auth-utils.ts` — `getCurrentUser` / `requireAuth`.
- `hooks/` — hooks de cliente (`use-form-submit`, `use-statistics`, `use-expenseTracker`…).
- `context/theme/` + `src/styles/themes.css` — temas de color personalizables (además de claro/oscuro con `next-themes`).
- `prisma/` — `schema.prisma`, migraciones y seed.
- `.agents/skills/` — skills instaladas (Next.js, shadcn, Tailwind v4, React/Vercel best practices…). Consúltalas cuando la tarea toque esas áreas.

## Convenciones

### Server Actions
- Empiezan con `requireAuth()` y filtran siempre por `userId: Number(authResult.user!.id)`. Nunca devuelvas datos de otro usuario.
- Validan la entrada con el esquema Zod (`safeParse`) antes de tocar la BD.
- Devuelven un objeto uniforme: `{ success: true, data }` o `{ success: false, error: 'mensaje en español' }`. No lanzan excepciones al cliente; usan `try/catch` + `console.error`.
- Al crear/editar/borrar transacciones, mantén coherente `Wallet.currentBalance`.

### Datos y tipos de dominio
- Tipo de transacción/categoría: los valores reales son **`'Gasto'`** e **`'Ingreso'`** (el comentario de `schema.prisma` que dice "Expense/Income" está desactualizado).
- Frecuencia de recurrentes: `'MONTHLY'` | `'YEARLY'` (`month` solo aplica a `YEARLY`).
- Moneda: EUR con `Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' })`.

### Componentes y UI
- Por defecto Server Components que llaman a la action y se envuelven en `<Suspense>` con un **skeleton dedicado** (`*-skeleton.tsx`) que replica el diseño real. Si cambias el diseño de un componente, actualiza su skeleton.
- `'use client'` solo donde haga falta interactividad (formularios, gráficos, toggles).
- Formularios: React Hook Form + `zodResolver` + `useFormSubmit` (muestra toast y hace `router.refresh()` tras éxito).
- Usa los componentes de `components/ui/` y los tokens de color de los temas (variables CSS); evita colores hardcodeados para que funcionen todos los temas y el modo oscuro.
- Diseño responsive obligatorio (la app se usa en móvil).
- Imports con alias `@/…`.

### Estilo de código
- Indentación con **tabs**, comillas simples.
- Textos de la UI, mensajes de error y comentarios en **español**.

## Puntos delicados

- **Middleware / Edge Runtime**: `middleware.ts` importa solo `auth.config.ts`, que **no debe importar Prisma ni bcryptjs** (el bundle Edge de Vercel tiene límite de 1 MB). La lógica de `authorize()` vive en `auth.ts` (Node runtime).
- `next.config.ts` usa `staleTimes` de 1 h en el router cache: tras mutaciones hay que invalidar con `router.refresh()` o `revalidatePath`.
- Cambios en `schema.prisma` requieren migración en `prisma/migrations/` (no uses `db push` sobre producción, rompe el historial de migraciones). Si no hay acceso a una BD de desarrollo, escribe el SQL de la migración a mano siguiendo el formato de las existentes.
- **Migraciones en despliegue**: `pnpm start` ejecuta `scripts/migrate-deploy.mjs` (`prisma migrate deploy`, con baseline automático para BD creadas con `db push`) antes de `next start`. Así se aplican solas en el servidor propio (Dokploy). Vercel no usa `start`: allí hay que aplicarlas aparte (BD en Neon). Por eso `prisma` (CLI) está en `dependencies`.
- Hay dos entornos con BD separadas: Vercel + Neon (demo para portfolio) y Dokploy (uso personal, datos reales). Ambos despliegan desde `main`.
- Los ficheros `.env*` están en `.gitignore`; nunca los subas ni muestres secretos.

## Git

- Rama principal: `main`. Trabaja en ramas de feature y fusiona mediante PR (`gh` está disponible).
- Mensajes de commit en español, estilo `feat:` / `fix:` / `chore:`.
- **No añadas líneas `Co-Authored-By` de agentes de IA en los commits.**
