export const API_URL = "http://127.0.0.1:8000/api";

// Fetch Visitor Logs
export const fetchVisitorLogs = async () => {
    const response = await fetch(`${API_URL}/visitor_logs`);
    return response.json();
};

// Fetch Submitted Forms
export const fetchSubmittedForms = async () => {
    const response = await fetch(`${API_URL}/submitted_forms`);
    return response.json();
};

// Fetch Staff List
export const fetchStaffList = async () => {
    const response = await fetch(`${API_URL}/staff_list`);
    return response.json();
};

// Fetch Analytics Data
export const fetchAnalyticsData = async () => {
    const response = await fetch(`${API_URL}/analytics`);
    return response.json();
};
