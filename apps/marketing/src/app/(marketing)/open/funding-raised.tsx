'use client';

import { HTMLAttributes } from 'react';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { formatMonth } from '@documenso/lib/client-only/format-month';
import { cn } from '@documenso/ui/lib/utils';

import { FUNDING_RAISED } from '~/app/(marketing)/open/data';

export type FundingRaisedProps = HTMLAttributes<HTMLDivElement>;

export const FundingRaised = ({ className, ...props }: FundingRaisedProps) => {
  const formattedData = FUNDING_RAISED.map((item) => ({
    amount: Number(item.amount),
    date: formatMonth(item.date),
  }));

  return (
    <div className={cn('flex flex-col', className)} {...props}>
      <h3 className="px-4 text-lg font-semibold">Total Funding Raised</h3>

      <div className="border-border mt-2.5 flex flex-1 flex-col items-center justify-center rounded-2xl border p-4 shadow-sm hover:shadow">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={formattedData} margin={{ top: 40, right: 40, bottom: 20, left: 40 }}>
            <XAxis dataKey="date" />
            <YAxis
              tickFormatter={(value) =>
                Number(value).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                })
              }
            />
            <Tooltip
              itemStyle={{
                color: 'hsl(var(--primary-foreground))',
              }}
              formatter={(value) => [
                Number(value).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }),
                'Amount Raised',
              ]}
              cursor={{ fill: 'hsl(var(--primary) / 10%)' }}
            />
            <Bar dataKey="amount" fill="hsl(var(--primary))" label="Amount Raised" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
