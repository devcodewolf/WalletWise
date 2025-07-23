import { useMemo } from 'react';
import { Transaction } from '@prisma/client';

interface ExpenseTrackerMetrics {
  currentMonthIncome: number;
  currentMonthExpense: number;
  currentMonthTransactionCount: number;
  dailyExpenseAvg: number;
  incomeVariation: number;
  expenseVariation: number;
  balance: number;
  balancePercentage: number;
}

export function useExpenseTracker(transactions: Transaction[]): ExpenseTrackerMetrics {
  return useMemo(() => {
    const now = new Date();
    const getMonth = (date: Date) => date.getMonth();
    const getYear = (date: Date) => date.getFullYear();

    // Filtrar transacciones del mes actual
    const currentMonthTransactions = transactions.filter((t) => {
      const date = new Date(t.date);
      return getMonth(date) === getMonth(now) && getYear(date) === getYear(now);
    });

    // Filtrar transacciones de los 3 meses anteriores
    const last3MonthsTransactions = transactions.filter((t) => {
      const date = new Date(t.date);
      const currentMonth = getMonth(now);
      const currentYear = getYear(now);
      const validMonths = [
        (currentMonth - 1 + 12) % 12,
        (currentMonth - 2 + 12) % 12,
        (currentMonth - 3 + 12) % 12,
      ];
      const yearForMonth = (month: number) =>
        month <= currentMonth ? currentYear : currentYear - 1;
      return validMonths.some(
        (month) => getMonth(date) === month && getYear(date) === yearForMonth(month)
      );
    });

    // Totales del mes actual
    const currentMonthIncome = currentMonthTransactions
      .filter((t) => t.type === 'Ingreso')
      .reduce((sum, t) => sum + t.amount, 0);

    const currentMonthExpense = Math.abs(
      currentMonthTransactions
        .filter((t) => t.type === 'Gasto')
        .reduce((sum, t) => sum + t.amount, 0)
    );

    // Totales de los 3 meses anteriores
    const last3MonthsIncome = last3MonthsTransactions
      .filter((t) => t.type === 'Ingreso')
      .reduce((sum, t) => sum + t.amount, 0);
    const last3MonthsExpense = Math.abs(
      last3MonthsTransactions
        .filter((t) => t.type === 'Gasto')
        .reduce((sum, t) => sum + t.amount, 0)
    );
    const avgIncome3Months = last3MonthsIncome / 3;
    const avgExpense3Months = last3MonthsExpense / 3;

    // Porcentajes de variación
    const incomeVariation =
      avgIncome3Months > 0
        ? ((currentMonthIncome - avgIncome3Months) / avgIncome3Months) * 100
        : 0;
    const expenseVariation =
      avgExpense3Months > 0
        ? ((currentMonthExpense - avgExpense3Months) / avgExpense3Months) * 100
        : 0;

    const balance = currentMonthIncome - currentMonthExpense;
    const balancePercentage =
      currentMonthIncome > 0 ? (balance / currentMonthIncome) * 100 : 0;

    const currentMonthTransactionCount = currentMonthTransactions.length;
    const dailyExpenseAvg = currentMonthExpense / 30; // Aproximado para el mes

    return {
      currentMonthIncome,
      currentMonthExpense,
      currentMonthTransactionCount,
      dailyExpenseAvg,
      incomeVariation,
      expenseVariation,
      balance,
      balancePercentage,
    };
  }, [transactions]);
}
