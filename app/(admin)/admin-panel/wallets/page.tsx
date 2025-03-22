import { WalletList } from '@/components/wallets/wallet-list';

// Sample data for wallets
const data = [
	{
		id: '1',
		name: 'Cash',
		initialBalance: 500,
	},
	{
		id: '2',
		name: 'Bank Account',
		initialBalance: 2500,
	},
	{
		id: '3',
		name: 'Credit Card',
		initialBalance: 0,
	},
];

export default function WalletsPage() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">
				<WalletList data={data} />
			</div>
		</div>
	);
}
