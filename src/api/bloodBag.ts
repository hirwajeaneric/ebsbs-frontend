import { BloodBagTypes } from "@/components/forms/ManageBloodBagForm";

// import Cookies from "js-cookie";
const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

type AddBloodBagResponseTypes = {
    message: string;
    error?: string;
}

export const addBloodBag = async (data: BloodBagTypes): Promise<AddBloodBagResponseTypes> => {
    const response = await fetch(`${API_BASE_URL}/bloodBags/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log(responseData);
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

export const getBloodBagsInBloodBank = async (bloodBankId: string) => {
    const response = await fetch(`${API_BASE_URL}/bloodBags/listInBloodBank?id=${bloodBankId}`);
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

export const getBloodBagsInHospital = async (hospitalId: string) => {
    const response = await fetch(`${API_BASE_URL}/bloodBags/listInHospital?id=${hospitalId}`);
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

export const getBloodBagDetails = async (bagId: string) => {
    const response = await fetch(`${API_BASE_URL}/bloodBags/findById?id=${bagId}`);
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

type DeleteBloodBagResponseTypes = {
    message: string;
    error?: string;
}

export const deleteBloodBag = async (id: string): Promise<DeleteBloodBagResponseTypes> => {
    const response = await fetch(`${API_BASE_URL}/bloodBags/delete?id=${id}`, {
        method: "DELETE",
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

type UpdateBloodBagResponseTypes = {
    updatedBloodBag: BloodBagTypes;
    message: string;
    error?: string;
}

export const updateBloodBag = async (id: string, data: BloodBagTypes): Promise<UpdateBloodBagResponseTypes> => {
    const response = await fetch(`${API_BASE_URL}/bloodBags/update?id=${id}`, {
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