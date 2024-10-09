import { HospitalApplicantSignUpTypes } from "@/components/forms/CreateHospitalAdminAccountForm";
import { HospitalUserDataTypes } from "@/components/forms/ManageHospitalUserForm";
import { ResetPasswordCardFormTypes } from "@/components/forms/ResetPasswordCardForm";
import { UserDataTypes } from "@/components/forms/UserAccountForm";
import { ResetPasswordTypes } from "@/pages/bloodbank/auth/ResetPassword";
import { SignInTypes } from "@/pages/bloodbank/auth/SignIn";
// import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const SignUpForHospital = async (data: HospitalApplicantSignUpTypes) => {
    const response = await fetch(`${API_BASE_URL}/auth/hospital-sign-up`, {
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
}

export const BloodBankSignInRequest = async (data: SignInTypes) => {
    const response = await fetch(`${API_BASE_URL}/auth/bloodbank-sign-in`, {
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
}

export const HospitalSignInRequest = async (data: SignInTypes) => {
    const response = await fetch(`${API_BASE_URL}/auth/hospital-sign-in`, {
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
}

export const getUserWithHospitalId = async (hospitalId: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/findByHospitalId?hospitalId=${hospitalId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

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

export const getBloodBankWorkers = async (bloodBankId: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/listBloodBankEmployees?bloodBankId=${bloodBankId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
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

export const getHospitalWorkers = async (hospitalId: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/listHospitalEmployees?hospitalId=${hospitalId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
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

export const getBloodBankRecorderById = async (userId: string): Promise<UserDataTypes> => {
    const response = await fetch(`${API_BASE_URL}/auth/findBloodBankRecorderById?id=${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
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
    return responseData.user;
}

export const gethospitalWorkerById = async (userId: string): Promise<HospitalUserDataTypes> => {
    const response = await fetch(`${API_BASE_URL}/auth/findHospitalPharmacistById?id=${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
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
    return responseData.user;
}

export const addNewUser = async (data: UserDataTypes | HospitalUserDataTypes) => {
    const response = await fetch(`${API_BASE_URL}/auth/add`, {
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

type UpdateUserResponseTypes = {
    user: UserDataTypes | HospitalUserDataTypes;
    message: string;
    error?: string;
}

export const updateUser = async (userId: string, data: UserDataTypes | HospitalUserDataTypes): Promise<UpdateUserResponseTypes> => {
    console.log(data);
    const response = await fetch(`${API_BASE_URL}/auth/update-account?id=${userId}`, {
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

export const deleteUser = async (role: string, userId: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/delete-account?id=${userId}&role=${role}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
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

export const forgotPassword = async (data: ResetPasswordCardFormTypes) => {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
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

export const resetPassword = async (data: ResetPasswordTypes, token: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token
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