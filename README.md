# WalletWise - Tu Gestor de Finanzas Personales 💸

<p align="center">
  <img src="./public/img/logoWhite.webp" alt="WalletWise Logo" width="400"/>
</p>

<p align="center">
  <strong>Una aplicación moderna, intuitiva y potente para tomar el control de tus finanzas personales.</strong>
</p>

---

**WalletWise** es una aplicación web completa y moderna, diseñada para ayudarte a gestionar tus finanzas personales con facilidad. Realiza un seguimiento de tus ingresos y gastos, organízalos por categorías, administra múltiples billeteras y obtén información valiosa sobre tus hábitos de consumo a través de estadísticas y gráficos detallados.

Construida con Next.js, TypeScript y Prisma, esta aplicación ofrece una experiencia rápida, segura y amigable.

## ✨ Características

- **🔐 Autenticación Segura**: Sistema de inicio de sesión seguro con NextAuth.js.
- **📊 Dashboard Interactivo**: Obtén una visión general de tu salud financiera, incluyendo ingresos, gastos, balance mensual y transacciones recientes.
- **💸 Gestión de Transacciones**: Funcionalidad CRUD (Crear, Leer, Actualizar, Eliminar) completa para tus movimientos financieros. Filtra por tipo (ingreso/gasto) y año.
- **🗂️ Gestión de Categorías**: Crea y administra categorías personalizadas para tus transacciones, cada una con un icono y color únicos para una fácil identificación.
- **💼 Gestión de Billeteras**: Administra múltiples billeteras o cuentas bancarias, cada una con su propio saldo inicial y actual.
- **📈 Estadísticas Detalladas**:
  - **Vista Anual**: Visualiza tus ingresos y gastos mes a mes para cualquier año.
  - **Vista Mensual**: Compara el total de ingresos vs. gastos para un mes y año específicos.
  - **Desglose por Categoría**: Observa cómo se distribuyen tus gastos en diferentes categorías con gráficos de tarta.
  - **Resúmenes Financieros**: Informes detallados de balance mensual, trimestral y anual.
- **🎨 Temas Personalizables**:
  - Soporte para modo claro y oscuro.
  - Múltiples temas de color para personalizar tu experiencia.
- **📱 Diseño Responsivo**: Interfaz completamente adaptable que funciona perfectamente en dispositivos de escritorio, tabletas y móviles.
- **🔔 Notificaciones Toast**: Feedback amigable para acciones como crear, actualizar o eliminar elementos.

## 🚀 Stack Tecnológico

| Categoría            | Tecnología                                                                    |
| -------------------- | ----------------------------------------------------------------------------- |
| **Framework**        | [Next.js](https://nextjs.org/) (App Router)                                   |
| **Lenguaje**         | [TypeScript](https://www.typescriptlang.org/)                                 |
| **Styling**          | [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) |
| **ORM**              | [Prisma](https://www.prisma.io/)                                              |
| **Base de Datos**    | PostgreSQL (o cualquier BD soportada por Prisma)                              |
| **Autenticación**    | [NextAuth.js](https://next-auth.js.org/)                                      |
| **Gestor de Estado** | [Zustand](https://zustand-demo.pmnd.rs/)                                      |
| **Gráficos**         | [Recharts](https://recharts.org/)                                             |
| **Formularios**      | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)      |
| **Notificaciones**   | [Sonner](https://sonner.emilkowal.ski/)                                       |

## 📂 Estructura del Proyecto

El proyecto sigue la estructura estándar de Next.js App Router. Aquí tienes un resumen de los directorios clave:

- `app/`: Contiene todas las rutas y páginas.
  - `app/(admin)/`: Rutas y layouts para el panel de usuario autenticado.
  - `app/(auth)/`: Rutas para la autenticación (página de login).
  - `app/api/`: Rutas de API (si las hay).
  - `app/layout.tsx`: El layout raíz de la aplicación.
- `components/`: Contiene todos los componentes de React.
  - `components/ui/`: Componentes de UI reutilizables de shadcn/ui.
  - `components/categories/`: Componentes relacionados con la gestión de categorías.
  - `components/dashboard/`: Componentes para el dashboard principal.
  - `components/statistics/`: Componentes para la página de estadísticas y gráficos.
  - `components/transactions/`: Componentes para la gestión de transacciones.
  - `components/wallets/`: Componentes para la gestión de billeteras.
- `actions/`: Server Actions para mutaciones y consultas a la base de datos.
- `lib/`: Funciones de utilidad, esquemas y configuraciones de librerías.
- `prisma/`: Esquema de Prisma y archivos de migración.
- `store/`: Store de Zustand para la gestión del estado global.
- `public/`: Archivos estáticos como imágenes y fuentes.

## 🏁 Cómo Empezar

Sigue estas instrucciones para obtener una copia del proyecto y ponerla en marcha en tu máquina local para desarrollo y pruebas.

### Prerrequisitos

- Node.js (v18 or later)
- pnpm (or npm/yarn)
- Una base de datos PostgreSQL en ejecución (u otra base de datos soportada por Prisma)

### Instalación

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/your-username/gastos-app-next.git
    cd gastos-app-next
    ```

2.  **Instala las dependencias:**

    ```bash
    pnpm install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto y añade las variables de entorno necesarias. Puedes usar el siguiente ejemplo como plantilla:

    ```env
    # .env.local

    # Prisma
    # Ejemplo para PostgreSQL
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

    # NextAuth.js
    # Genera un secreto con: openssl rand -base64 32
    AUTH_SECRET="YOUR_AUTH_SECRET"

    # Puedes usar cualquier proveedor de NextAuth. El ejemplo de abajo es para GitHub.
    AUTH_GITHUB_ID="YOUR_GITHUB_ID"
    AUTH_GITHUB_SECRET="YOUR_GITHUB_SECRET"
    ```

4.  **Sube el esquema a la base de datos:**
    Este comando aplicará tu esquema de Prisma a la base de datos, creando las tablas necesarias.

    ```bash
    pnpm prisma db push
    ```

    _Opcional: También puedes poblar la base de datos si tienes un script de seed._

    ```bash
    pnpm prisma db seed
    ```

5.  **Ejecuta el servidor de desarrollo:**
    ```bash
    pnpm dev
    ```

Abre http://localhost:3000 en tu navegador para ver el resultado.
