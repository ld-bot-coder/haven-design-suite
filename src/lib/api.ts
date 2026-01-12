import { storage } from './storage';

class ApiClient {
    // Auth endpoints
    async login(email: string, password: string) {
        const response = await storage.login(email, password);
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return response;
    }

    async logout() {
        await storage.logout();
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    }

    async getCurrentUser() {
        return await storage.getCurrentUser();
    }

    // Product endpoints
    async getProducts(params?: { category?: string; status?: string; search?: string }) {
        return await storage.getProducts(params);
    }

    async getProduct(id: string) {
        return await storage.getProduct(id);
    }

    async createProduct(formData: FormData) {
        return await storage.createProduct(formData);
    }

    async updateProduct(id: string, formData: FormData) {
        return await storage.updateProduct(id, formData);
    }

    async toggleProductVisibility(id: string) {
        return await storage.toggleProductVisibility(id);
    }

    async deleteProduct(id: string) {
        await storage.deleteProduct(id);
        return { success: true };
    }

    // Enquiry endpoints
    async submitEnquiry(data: any) {
        return await storage.submitEnquiry(data);
    }

    async getEnquiries(params?: { status?: string; search?: string }) {
        return await storage.getEnquiries(params);
    }

    async updateEnquiryStatus(id: string, status: string, notes?: string) {
        return await storage.updateEnquiryStatus(id, status, notes);
    }

    async deleteEnquiry(id: string) {
        await storage.deleteEnquiry(id);
        return { success: true };
    }

    // Appointment endpoints
    async bookAppointment(data: any) {
        return await storage.bookAppointment(data);
    }

    async getAppointments(params?: { status?: string; search?: string; date?: string }) {
        return await storage.getAppointments(params);
    }

    async updateAppointmentStatus(id: string, status: string, notes?: string) {
        return await storage.updateAppointmentStatus(id, status, notes);
    }

    async deleteAppointment(id: string) {
        await storage.deleteAppointment(id);
        return { success: true };
    }

    // Gallery endpoints
    async getGalleryImages(params?: { category?: string }) {
        return await storage.getGalleryImages(params);
    }

    async uploadGalleryImage(formData: FormData) {
        return await storage.uploadGalleryImage(formData);
    }

    async deleteGalleryImage(id: string) {
        await storage.deleteGalleryImage(id);
        return { success: true };
    }

    // Content endpoints
    async getContent(key?: string) {
        return await storage.getContent(key);
    }

    async updateContent(key: string, value: any) {
        return await storage.updateContent(key, value);
    }

    async bulkUpdateContent(updates: Record<string, any>) {
        return await storage.bulkUpdateContent(updates);
    }
}

export const api = new ApiClient();
export default api;
