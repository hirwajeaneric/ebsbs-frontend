import { HospitalApplicantionTypes } from "@/components/forms/ApplyForHospitalForm";
import { HospitalDataTypes } from "@/components/forms/HospitalSettingsForm";
import { ResultTypes, SearchHospitalsTypes } from "@/components/forms/SearchHospitalsDrawer";
// import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export type UpdateHospitalTypes = {
    name: string;
    googleLocation: string;
    province: string;
    town: string;
    specialization: string;
    hospitalType: string;
    accessStatus: "Active" | "Inactive";
}

export const ApplyForHospital = async (data: HospitalApplicantionTypes) => {
    const response = await fetch(`${API_BASE_URL}/hospitals/add`, {
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

    return responseData;
};

export const getInactiveHospitals = async () => {
    const response = await fetch(`${API_BASE_URL}/hospitals/inactive`, {
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

export const getHospitalById = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/hospitals/findById?id=${id}`, {
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

export const updateHospital = async (id: string, data: UpdateHospitalTypes | HospitalDataTypes) => {
    const response = await fetch(`${API_BASE_URL}/hospitals/update?id=${id}`, {
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

export const listAllHospitals = async () => {
    const response = await fetch(`${API_BASE_URL}/hospitals/list`);
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

export const listActiveHospitals = async () => {
    const response = await fetch(`${API_BASE_URL}/hospitals/active`);
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

export const listInactiveHospitals = async () => {
    const response = await fetch(`${API_BASE_URL}/hospitals/inactive`);
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

export const searchHospitalsByBlood = async (data: SearchHospitalsTypes): Promise<ResultTypes[]>=> {
    const response = await fetch(`${API_BASE_URL}/hospitals/search`, {
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
    return responseData.results;
}

export const getAdminOverviewData = async (hospitalId: string) => {
    const response = await fetch(`${API_BASE_URL}/hospitals/admin-overview?id=${hospitalId}`);
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

type labTechnitianRequestTypes = {
    hospitalId: string;
    month: number;
    year: number;
}

export const getLabTechnitianOverviewData = async ({ hospitalId, month, year }: labTechnitianRequestTypes) => {
    const response = await fetch(`${API_BASE_URL}/hospitals/labtech-overview?id=${hospitalId}&month=${month}&year=${year}`);
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