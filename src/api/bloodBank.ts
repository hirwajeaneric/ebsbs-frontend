import { BloodBankDataTypes } from "@/components/forms/SettingsForm";

// import Cookies from "js-cookie";
const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const getBloodBankById = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/bloodbanks/findById?id=${id}`, {
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

type UpdateBloodBankResponseTypes = {
    user: BloodBankDataTypes;
    message: string;
    error?: string;
}

export const updateBloodBank = async (id: string, data: BloodBankDataTypes) : Promise<UpdateBloodBankResponseTypes> => { 
    const response = await fetch(`${API_BASE_URL}/bloodbanks/update?id=${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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

export const getBloodBanks = async () => {
    const response = await fetch(`${API_BASE_URL}/bloodbanks/list`);
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

export const getAdminOverviewData = async (bloodBankId: string) => {
    const response = await fetch(`${API_BASE_URL}/bloodbanks/getAdminOverviewData?id=${bloodBankId}`);
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

type FilterTypes = {
    bloodBankId: string;
    month: number | null;
    year: number | null;
}

export const getBloodBankRecorderOverviewData = async ({ bloodBankId, month, year }: FilterTypes) => {
    let endPoint = "";
    if (month && year) {
        endPoint = `${API_BASE_URL}/bloodbanks/recorderOverviewData?id=${bloodBankId}&month=${month}&year=${year}`;
    } else if (!month && !year) {
        endPoint = `${API_BASE_URL}/bloodbanks/recorderOverviewData?id=${bloodBankId}`;
    }
    const response = await fetch(endPoint);
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