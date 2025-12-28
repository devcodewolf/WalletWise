import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	experimental: {
		staleTimes: {
			dynamic: 3600, // 1 hora - se invalida con router.refresh() al hacer cambios
			static: 3600, // 1 hora
		},
	},
}

export default nextConfig
