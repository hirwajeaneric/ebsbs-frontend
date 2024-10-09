export interface Notification {
    id: string;
    title: string;
    sendingUserId?: string;
    sendingUserName?: string;
    sendingHospitalId?: string;
    sendingHospitalName?: string;
    sendingBloodBankId?: string;
    sendingBloodBankName?: string;
    content: string;
    link?: string;
    status: 'Unseen';
    createdAt: Date;
    updatedAt: Date;
    receivingBloodBankId?: string;
    receivingBloodBankName?: string;
    receivingHospitalId?: string;
    receivingHospitalName?: string;
    type: 'Hospital Application';
}

type Props = { notification: Notification }
import { LinkProps } from "react-router-dom";


export default function NotificationContainer({ notification }: Props) {
    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between flex-col">
                <p className="font-bold">{notification.title}</p>
                <p>{notification.content}</p>
                {notification.link && <a href={notification.link as LinkProps['hrefLang']} className="text-blue-500">View More</a>}
            </div>
            <div>
                <span>{new Date(notification.createdAt).toLocaleString()}</span>
            </div>
        </div>
    )
}
