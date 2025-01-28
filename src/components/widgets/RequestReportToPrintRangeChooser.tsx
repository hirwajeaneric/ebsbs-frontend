import { forwardRef } from 'react';
import { RequestTypes } from '../forms/ManageBloodRequestForm';
import { BloodBankDataTypes } from '../forms/SettingsForm';

type Props = {
    allRequests: RequestTypes[],
    pendingRequests: RequestTypes[],
    bloodBank: BloodBankDataTypes,
    from: string,
    to: string
}

export const RequestReportToPrintRangeChooser = forwardRef<HTMLDivElement, Props>(({ allRequests, pendingRequests, from, to }, ref) => {
    return (
        <div ref={ref} className="w-full mx-auto p-16">
            <div>
                {/* Top bar  */}
                <div className='flex justify-between items-start border-b-2 border-black pb-3'>
                    <div className=''>
                        <h1 className='font-bold text-3xl'>Request Report</h1>
                        <h2 className='text-xl font-bold text-slate-400'>
                            From {from.split("").slice(0, 16).join("")} to {to.split("").slice(0, 16).join("")}
                        </h2>
                        <h2>Generated on: {new Date().toDateString()}</h2>
                    </div>
                    <div className=''>
                        <div className='flex flex-col gap-2 items-center'>
                            <img src="https://cpts-nk.org/wp-content/uploads/2024/06/CPTS-NK-logo.png" className='w-[100px]' alt="C.P.T.S Logo" />
                            <div className='flex flex-col'>
                                <span className='font-bold text-base'>Centre Provinciale de Transfusion Sanguine</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Report content */}
                <div className='flex flex-col w-full'>
                    <div className='flex flex-col my-4'>
                        <span>Total Requests: <strong>{allRequests.length}</strong></span>
                        <span>Pending Requests: <strong>{pendingRequests.length}</strong></span>
                    </div>
                    <h2 className='text-lg font-bold mb-2'>Received Requests</h2>
                    <table className=''>
                        <thead className='bg-gray-400'>
                            <tr>
                                <th className='text-left'>Hospital</th>
                                <th className='text-left'>Recieved On</th>
                                <th className='text-left'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allRequests.map((request, index) => (
                                <tr key={index} className='border-b'>
                                    <td>{request.hospital?.name}</td>
                                    <td>{request.createdAt ? new Date(request.createdAt).toDateString() : ''}</td>
                                    <td>{request.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2 className='text-lg font-bold mb-2 mt-4'>Pending Requests</h2>
                    <table className=''>
                        <thead className='bg-gray-400'>
                            <tr>
                                <th className='text-left'>Hospital</th>
                                <th className='text-left'>Recieved On</th>
                                <th className='text-left'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingRequests.map((request, index) => (
                                <tr key={index} className='border-b'>
                                    <td>{request.hospital?.name}</td>
                                    <td>{request.createdAt ? new Date(request.createdAt).toDateString() : ''}</td>
                                    <td>{request.status}</td>
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