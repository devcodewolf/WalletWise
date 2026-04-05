import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export const TransactionListSkeleton = () => {
	return (
		<div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
			{/* Side Panel Skeleton */}
			<div className="flex flex-col gap-4">
				{/* Card Net Savings */}
				<Card className="p-6 bg-card border border-border relative overflow-hidden flex flex-col justify-between min-h-[150px]">
					<div className="relative z-10">
						<Skeleton className="h-4 w-24 mb-5" />
						<Skeleton className="h-10 w-44" />
					</div>
					<div className="relative z-10 mt-auto pt-6">
						<Skeleton className="h-6 w-36 rounded-full" />
					</div>
				</Card>

				<div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
					{/* Card Ingresos */}
					<Card className="p-5 bg-card border border-border overflow-hidden relative flex flex-col justify-between h-[155px]">
						<Skeleton className="w-12 h-12 rounded-2xl" />
						<div className="mt-4">
							<Skeleton className="h-4 w-16 mb-2" />
							<Skeleton className="h-8 w-24" />
						</div>
					</Card>

					{/* Card Gastos */}
					<Card className="p-5 bg-card border border-border overflow-hidden relative flex flex-col justify-between h-[155px]">
						<Skeleton className="w-12 h-12 rounded-2xl" />
						<div className="mt-4">
							<Skeleton className="h-4 w-16 mb-2" />
							<Skeleton className="h-8 w-24" />
						</div>
					</Card>
				</div>
			</div>

			{/* Table and Toolbar Skeleton */}
			<div className="xl:col-span-3">
				<div className="w-full">
					<div className="block md:flex items-center justify-end pb-4 gap-2">
						<div className="flex-1 mb-4 md:mb-0">
							<div className="flex items-center flex-wrap gap-4">
								<Skeleton className="h-9 w-[220px] rounded-lg" />
								<Skeleton className="h-9 w-[110px]" />
								<Skeleton className="h-9 w-[110px]" />
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Skeleton className="h-9 w-full md:w-[250px]" />
							<Skeleton className="h-9 w-[100px]" />
						</div>
					</div>
					<div className="rounded-md border overflow-hidden">
						{/* Table Header */}
						<div className="bg-muted px-4 py-3 border-b">
							<div className="flex justify-between items-center">
								<Skeleton className="h-5 w-20" />
								<Skeleton className="h-5 w-20" />
								<Skeleton className="h-5 w-20" />
								<Skeleton className="h-5 w-20" />
								<Skeleton className="h-5 w-20" />
							</div>
						</div>
						{/* Table Rows */}
						<div className="w-full space-y-4 p-4 bg-card">
							<Skeleton className="h-8 w-full" />
							<Skeleton className="h-8 w-full" />
							<Skeleton className="h-8 w-full" />
							<Skeleton className="h-8 w-full" />
							<Skeleton className="h-8 w-full" />
							<Skeleton className="h-8 w-full" />
							<Skeleton className="h-8 w-full" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
