import { RequestTypes } from "@/components/forms/ManageBloodRequestForm";

// import Cookies from "js-cookie";
const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

type AddRequestResponseTypes = {
    user: RequestTypes;
    message: string;
    error: string;
}

export const addRequest = async (data: RequestTypes): Promise<AddRequestResponseTypes> => {
    console.log(data);
    const response = await fetch(`${API_BASE_URL}/bloodrequests/add`, {
        method: "POST",
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
    return responseData
}

export const getRequestById = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/bloodrequests/findById?id=${id}`, {
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

type UpdateRequestResponseTypes = {
    updatedRequest: RequestTypes;
    message: string;
    error?: string;
}

export const updateRequest = async (id: string, data: RequestTypes): Promise<UpdateRequestResponseTypes> => {
    const response = await fetch(`${API_BASE_URL}/bloodrequests/update?id=${id}`, {
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

export const getHospitalSentRequests = async (hospitalId: string) => {
    const response = await fetch(`${API_BASE_URL}/bloodrequests/findByHospital?hospitalId=${hospitalId}`);
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

export const getReceivedRequestsByHospital = async (hospitalId: string) => {
    const response = await fetch(`${API_BASE_URL}/bloodrequests/findReceivedByHospital?hospitalId=${hospitalId}`);
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

export const getRequestsForBloodBank = async (bloodBankId: string) => {
    const response = await fetch(`${API_BASE_URL}/bloodrequests/findByBloodBank?bloodBankId=${bloodBankId}`);
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

export const deleteRequest = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/bloodrequests/delete?id=${id}`, {
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

// export const searchHospital