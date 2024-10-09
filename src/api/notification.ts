// import Cookies from "js-cookie";
const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const getNotificationsByBloodBankId = async (bloodBankId: string) => {
    const response = await fetch(`${API_BASE_URL}/notifications/getNotificationsByBloodBank?bloodBankId=${bloodBankId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const responseData = await response.json();
    if (!response.ok) {
        if (responseData.errors) {
            throw new Error(responseData.errors);
        }
        if (responseData.message) {
            throw new Error(responseData.message);
        }
        if (responseData.error) { 
            throw new Error(responseData.error);
        }
    }
    return responseData;
}

export const getAdminNotifications = async () => {
    const response = await fetch(`${API_BASE_URL}/notifications/admin-notifications`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const responseData = await response.json();
    if (!response.ok) {
        if (responseData.errors) {
            throw new Error(responseData.errors);
        }
        if (responseData.message) {
            throw new Error(responseData.message);
        }
        if (responseData.error) { 
            throw new Error(responseData.error);
        }
    }
    return responseData;
}

export const getNotificationsByHospitalId = async (hospitalId: number) => {
    const response = await fetch(`${API_BASE_URL}/notifications/getNotificationsByHospital?hospitalId=${hospitalId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const responseData = await response.json();
    if (!response.ok) {
        if (responseData.errors) {
            throw new Error(responseData.errors);
        }
        if (responseData.message) {
            throw new Error(responseData.message);
        }
        if (responseData.error) { 
            throw new Error(responseData.error);
        }
    }
    return responseData;
}