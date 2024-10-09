import { RequestTypes } from "../forms/ManageBloodRequestForm";

export default function RequestDataTable({ request }: { request: RequestTypes }) {
    return (
        <table className="w-full text-sm rounded-md">
            <thead className="border-b">
                <tr className="text-left py-2">
                    <th></th>
                    <th>Plasma</th>
                    <th>Platelet</th>
                    <th>Whole Blood</th>
                    <th>Reb Blood Cells</th>
                </tr>
            </thead>
            <tbody>
                <tr className="text-left py-2 border-b bg-muted">
                    <th className="pl-4 py-2">A (Rh+)</th>
                    <td>{request?.plasmaRhP_A}</td>
                    <td>{request?.plateletRhP_A}</td>
                    <td>{request?.rhP_A}</td>
                    <td>{request?.rbcP_A}</td>
                </tr>
                <tr className="text-left py-2 border-b">
                    <th className="pl-4 py-2">B (Rh+)</th>
                    <td>{request?.plasmaRhP_B}</td>
                    <td>{request?.plateletRhP_B}</td>
                    <td>{request?.rhP_B}</td>
                    <td>{request?.rbcP_B}</td>
                </tr>
                <tr className="text-left py-2 border-b bg-muted">
                    <th className="pl-4 py-2">AB (Rh+)</th>
                    <td>{request?.plasmaRhP_AB}</td>
                    <td>{request?.plateletRhP_AB}</td>
                    <td>{request?.rhP_AB}</td>
                    <td>{request?.rbcP_AB}</td>
                </tr>
                <tr className="text-left py-2 border-b">
                    <th className="pl-4 py-2">O (Rh+)</th>
                    <td>{request?.plasmaRhP_O}</td>
                    <td>{request?.plateletRhP_O}</td>
                    <td>{request?.rhP_O}</td>
                    <td>{request?.rbcP_O}</td>
                </tr>
                <tr className="text-left py-2 border-b bg-muted">
                    <th className="pl-4 py-2">A (Rh-)</th>
                    <td>{request?.plasmaRhN_A}</td>
                    <td>{request?.plateletRhN_A}</td>
                    <td>{request?.rhN_A}</td>
                    <td>{request?.rbcN_A}</td>
                </tr>
                <tr className="text-left py-2 border-b">
                    <th className="pl-4 py-2">B (Rh-)</th>
                    <td>{request?.plasmaRhN_B}</td>
                    <td>{request?.plateletRhN_B}</td>
                    <td>{request?.rhN_B}</td>
                    <td>{request?.rbcN_B}</td>
                </tr>
                <tr className="text-left py-2 border-b bg-muted">
                    <th className="pl-4 py-2">AB (Rh-)</th>
                    <td>{request?.plasmaRhN_AB}</td>
                    <td>{request?.plateletRhN_AB}</td>
                    <td>{request?.rhN_AB}</td>
                    <td>{request?.rbcN_AB}</td>
                </tr>
                <tr className="text-left py-2">
                    <th className="pl-4 py-2">O (Rh-)</th>
                    <td>{request?.plasmaRhN_O}</td>
                    <td>{request?.plateletRhN_O}</td>
                    <td>{request?.rhN_O}</td>
                    <td>{request?.rbcN_O}</td>
                </tr>
            </tbody>
        </table>
    )
}
