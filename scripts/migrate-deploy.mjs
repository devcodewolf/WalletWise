// Aplica las migraciones pendientes de Prisma antes de arrancar la app.
//
// Las bases de datos de producción se crearon originalmente con `prisma db push`,
// así que no tienen historial de migraciones (`_prisma_migrations`) y
// `prisma migrate deploy` fallaría con P3005. La primera vez, este script marca
// como aplicadas las migraciones cuyas tablas ya existen (baseline) y después
// aplica el resto. En despliegues posteriores solo ejecuta `migrate deploy`.

import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

// Migraciones anteriores a usar `migrate deploy`, con la tabla que demuestra
// que ya están presentes en una base de datos creada con `db push`.
const BASELINE_MIGRATIONS = [
	{ name: '20250724112501_init', table: 'User' },
	{
		name: '20251227101807_add_recurring_transactions',
		table: 'RecurringTransaction',
	},
]

const run = (cmd) => execSync(cmd, { stdio: 'inherit' })

async function tableExists(prisma, table) {
	const [{ exists }] = await prisma.$queryRaw`
		SELECT EXISTS (
			SELECT 1 FROM information_schema.tables
			WHERE table_schema = current_schema() AND table_name = ${table}
		) AS "exists"
	`
	return exists
}

async function getMigrationsToBaseline() {
	const prisma = new PrismaClient()
	try {
		if (await tableExists(prisma, '_prisma_migrations')) return []

		const toBaseline = []
		for (const migration of BASELINE_MIGRATIONS) {
			if (!(await tableExists(prisma, migration.table))) break
			toBaseline.push(migration.name)
		}
		return toBaseline
	} finally {
		await prisma.$disconnect()
	}
}

async function main() {
	const toBaseline = await getMigrationsToBaseline()

	if (toBaseline.length > 0) {
		console.log(
			'[migrate] Base de datos sin historial de migraciones. Baseline de:',
			toBaseline.join(', '),
		)
		for (const name of toBaseline) {
			run(`prisma migrate resolve --applied ${name}`)
		}
	}

	run('prisma migrate deploy')
}

main().catch((error) => {
	console.error('[migrate] Error aplicando migraciones:', error)
	process.exit(1)
})
