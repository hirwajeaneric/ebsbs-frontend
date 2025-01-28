import { forwardRef, useEffect } from 'react';
import { BloodInTransactionsTypes } from '../tables/BloodInTransactionsTable/BloodInTransactionTable';
import { HospitalDataTypes } from '../forms/HospitalSettingsForm';

type Props = {
    bloodInTransactions: BloodInTransactionsTypes[] | undefined,
    hospital: HospitalDataTypes | undefined,
    from: string,
    to: string
}

export const BloodInTransactionsReportToPrintRangeChooser = forwardRef<HTMLDivElement, Props>(({ bloodInTransactions, hospital, from, to }, ref) => {

    useEffect(() => {
        bloodInTransactions?.forEach((transaction: BloodInTransactionsTypes) => {
            let plasmas = 0;
            let platelets = 0;
            let redBloodCells = 0;
            let wholeBlood = 0;

            plasmas += transaction.plasmaRhN_A + transaction.plasmaRhN_B + transaction.plasmaRhN_O + transaction.plasmaRhP_A + transaction.plasmaRhP_B + transaction.plasmaRhP_O + transaction.plasmaRhP_AB + transaction.plasmaRhN_AB;
            platelets += transaction.plateletRhN_A + transaction.plateletRhN_B + transaction.plateletRhN_O + transaction.plateletRhP_A + transaction.plateletRhP_B + transaction.plateletRhP_O + transaction.plateletRhP_AB + transaction.plateletRhN_AB;
            redBloodCells += transaction.rbcN_A + transaction.rbcN_B + transaction.rbcN_O + transaction.rbcN_AB + transaction.rbcP_A + transaction.rbcP_B + transaction.rbcP_O + transaction.rbcP_AB;
            wholeBlood += transaction.rhN_A + transaction.rhN_B + transaction.rhN_O + transaction.rhP_A + transaction.rhP_B + transaction.rhP_O + transaction.rhP_AB + transaction.rhN_AB;

            transaction.totalPlasmas = plasmas;
            transaction.totalPlatelets = platelets;
            transaction.totalRedBloodCells = redBloodCells;
            transaction.totalWholeBlood = wholeBlood;
            transaction.totalBags = plasmas + platelets + redBloodCells + wholeBlood;
        });
        console.log(bloodInTransactions);
    }, [bloodInTransactions]);

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
                        From {from.split("").slice(0, 16).join("")} to {to.split("").slice(0, 16).join("")}
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