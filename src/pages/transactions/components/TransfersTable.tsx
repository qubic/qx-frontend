import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Alert } from '@app/components/ui'
import type { Transfer } from '@app/store/apis/qx'
import { clsxTwMerge } from '@app/utils'
import { TRANSFERS_TABLE_COLUMNS, TRANSFERS_TABLE_SKELETON_ROWS } from '../constants'
import TransferRow from './TransferRow'

const TransfersSkeleton = memo(() =>
  Array.from({ length: TRANSFERS_TABLE_SKELETON_ROWS }).map((_, index) => (
    <TransferRow.Skeleton key={String(`Transfer-row-skeleton-${index}`)} />
  ))
)

const TransferHeadCell = memo(
  ({ children, className }: Readonly<{ children: React.ReactNode; className?: string }>) => (
    <th className={clsxTwMerge('p-16 text-center text-xxs font-400 xs:text-xs', className)}>
      <span className="text-gray-50">{children}</span>
    </th>
  )
)

type Props = Readonly<{
  transfers: Transfer[] | undefined
  isLoading: boolean
}>

export default function TransfersTable({ transfers, isLoading }: Props) {
  const { t } = useTranslation()

  const renderTableHeadContent = useCallback(
    () => (
      <tr>
        {TRANSFERS_TABLE_COLUMNS.map(({ i18nkey }) => (
          <TransferHeadCell key={i18nkey}>{t(i18nkey)}</TransferHeadCell>
        ))}
      </tr>
    ),
    [t]
  )

  const renderTableContent = useCallback(() => {
    if (isLoading) return <TransfersSkeleton />

    if (!transfers)
      return (
        <tr>
          <td className="p-16" colSpan={9}>
            <Alert variant="error">{t('transfers_page.error_fetching_transfers')}</Alert>
          </td>
        </tr>
      )

    if (!transfers.length)
      return (
        <tr>
          <td className="p-16" colSpan={9}>
            <Alert>{t('transfers_page.Transfers_not_found')}</Alert>
          </td>
        </tr>
      )

    return transfers?.map((transfer) => <TransferRow key={transfer.hash} transfer={transfer} />)
  }, [isLoading, transfers, t])

  return (
    <div className="w-[85vw] max-w-2xl rounded-12 border-1 border-primary-60 bg-primary-70 pb-16">
      <div className="overflow-x-scroll">
        <table className="w-full">
          <thead className="border-b-1 border-primary-60 text-left font-space text-sm text-gray-50">
            {renderTableHeadContent()}
          </thead>
          <tbody>{renderTableContent()}</tbody>
        </table>
      </div>
    </div>
  )
}
