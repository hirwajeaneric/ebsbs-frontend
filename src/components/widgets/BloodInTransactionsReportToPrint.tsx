import { forwardRef } from 'react';
import { getMonthName } from '@/lib/months';
import { BloodInTransactionsTypes } from '../tables/BloodInTransactionsTable/BloodInTransactionTable';
import { HospitalDataTypes } from '../forms/HospitalSettingsForm';

type Props = {
    bloodInTransactions: BloodInTransactionsTypes[] | undefined,
    hospital: HospitalDataTypes | undefined,
    filterYear: number,
    filterMonth: number
}

export const BloodInTransactionsReportToPrint = forwardRef<HTMLDivElement, Props>(({ bloodInTransactions, hospital, filterYear, filterMonth }, ref) => {

    if (!bloodInTransactions || !hospital) return null;

    return (
        <div ref={ref} className="w-full mx-auto p-16">
            <div>
                {/* Top bar  */}
                <div className='flex justify-between items-start border-b border-black pb-3'>
                    <div className=''>
                        <img src="/vecteezy_round-medical-cross-symbol-on-transparent-background_17177954.png" className='w-[100px]' alt="C.P.T.S Logo" />
                        <h1 className='font-bold text-3xl'>Blood In Transactions</h1>
                        <h2 className='text-xl font-bold text-slate-400'>
                            {filterYear} - {getMonthName(filterMonth + 1)}
                        </h2>
                    </div>
                    <div className=''>
                        <div className='flex flex-col gap-4 items-start justify-start'>
                            <div className='flex flex-col'>
                                <span className='font-bold text-base'>{hospital.name}</span>
                                <p><strong>Province: </strong>{hospital.province}</p>
                                <p><strong>Town: </strong>{hospital.town}</p>
                                <p><strong>Specialization: </strong>{hospital.specialization}</p>
                            </div>
                            <h2>Generated on: {new Date().toDateString()}</h2>
                        </div>
                    </div>
                </div>

                {/* Report content */}
                <div className='flex flex-col w-full'>
                    <div className='flex flex-col my-4'>
                        <span>Total Requests: <strong>{bloodInTransactions && bloodInTransactions.length}</strong></span>
                    </div>
                    <h2 className='text-lg font-bold mb-2'>Received Blood</h2>
                    <table className=''>
                        <thead className='bg-gray-300'>
                            <tr>
                                <th className='text-left'>Date</th>
                                <th className='text-left'>Whole Blood</th>
                                <th className='text-left'>Red Blood Cells</th>
                                <th className='text-left'>Plasma</th>
                                <th className='text-left'>Platelets</th>
                                <th className='text-left'>Total Bags</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bloodInTransactions && bloodInTransactions.map((transaction, index) => (
                                <tr key={index} className='border-b'>
                                    <td className='py-2'>{transaction.createdAt ? new Date(transaction.createdAt).toDateString() : ''}</td>
                                    <td>{transaction.totalWholeBlood}</td>
                                    <td>{transaction.totalRedBloodCells}</td>
                                    <td>{transaction.totalPlasmas}</td>
                                    <td>{transaction.totalPlatelets}</td>
                                    <td className='font-semibold'>{transaction.totalBags}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer  */}
                <p className='mt-16 text-sm text-slate-800'>Copyright {new Date().getFullYear()} &copy; C.P.T.S. All Rights Reserved.</p>
            </div>
        </div>
    )
})