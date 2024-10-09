import { StockTypes } from "@/pages/bloodbank/dashboard/Stock";

export default function StockTable({ stock }: { stock: StockTypes }) {
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
                    <th className="pl-4">A (Rh+)</th>
                    <td>{stock?.plasmaRhP_A}</td>
                    <td>{stock?.plateletRhP_A}</td>
                    <td>{stock?.rhP_A}</td>
                    <td>{stock?.rbcP_A}</td>
                </tr>
                <tr className="text-left py-2 border-b">
                    <th className="pl-4">B (Rh+)</th>
                    <td>{stock?.plasmaRhP_B}</td>
                    <td>{stock?.plateletRhP_B}</td>
                    <td>{stock?.rhP_B}</td>
                    <td>{stock?.rbcP_B}</td>
                </tr>
                <tr className="text-left py-2 border-b bg-muted">
                    <th className="pl-4">AB (Rh+)</th>
                    <td>{stock?.plasmaRhP_AB}</td>
                    <td>{stock?.plateletRhP_AB}</td>
                    <td>{stock?.rhP_AB}</td>
                    <td>{stock?.rbcP_AB}</td>
                </tr>
                <tr className="text-left py-2 border-b">
                    <th className="pl-4">O (Rh+)</th>
                    <td>{stock?.plasmaRhP_O}</td>
                    <td>{stock?.plateletRhP_O}</td>
                    <td>{stock?.rhP_O}</td>
                    <td>{stock?.rbcP_O}</td>
                </tr>
                <tr className="text-left py-2 border-b bg-muted">
                    <th className="pl-4">A (Rh-)</th>
                    <td>{stock?.plasmaRhN_A}</td>
                    <td>{stock?.plateletRhN_A}</td>
                    <td>{stock?.rhN_A}</td>
                    <td>{stock?.rbcN_A}</td>
                </tr>
                <tr className="text-left py-2 border-b">
                    <th className="pl-4">B (Rh-)</th>
                    <td>{stock?.plasmaRhN_B}</td>
                    <td>{stock?.plateletRhN_B}</td>
                    <td>{stock?.rhN_B}</td>
                    <td>{stock?.rbcN_B}</td>
                </tr>
                <tr className="text-left py-2 border-b bg-muted">
                    <th className="pl-4">AB (Rh-)</th>
                    <td>{stock?.plasmaRhN_AB}</td>
                    <td>{stock?.plateletRhN_AB}</td>
                    <td>{stock?.rhN_AB}</td>
                    <td>{stock?.rbcN_AB}</td>
                </tr>
                <tr className="text-left py-2">
                    <th className="pl-4">O (Rh-)</th>
                    <td>{stock?.plasmaRhN_O}</td>
                    <td>{stock?.plateletRhN_O}</td>
                    <td>{stock?.rhN_O}</td>
                    <td>{stock?.rbcN_O}</td>
                </tr>
            </tbody>
        </table>
    )
}
