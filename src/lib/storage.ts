// Local Storage Service for Frontend-Only Data Persistence

export interface Product {
    id: string;
    name: string;
    category: string;
    price: string;
    description: string;
    status: 'active' | 'hidden';
    image: string; // base64 or URL
    createdAt: string;
    updatedAt: string;
}

export interface Enquiry {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: 'new' | 'contacted' | 'resolved';
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Appointment {
    id: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    service: string;
    message?: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface GalleryImage {
    id: string;
    title: string;
    category: string;
    description?: string;
    image: string; // base64
    createdAt: string;
}

export interface ContentItem {
    key: string;
    value: any;
    updatedAt: string;
}

export interface User {
    email: string;
    password: string;
    name: string;
}

class LocalStorageService {
    private STORAGE_KEYS = {
        PRODUCTS: 'sv_products',
        ENQUIRIES: 'sv_enquiries',
        APPOINTMENTS: 'sv_appointments',
        GALLERY: 'sv_gallery',
        CONTENT: 'sv_content',
        USER: 'sv_user',
        AUTH_TOKEN: 'sv_auth_token',
    };

    constructor() {
        this.initializeData();
    }

    // Initialize with seed data if empty
    private initializeData() {
        if (!localStorage.getItem(this.STORAGE_KEYS.PRODUCTS)) {
            this.seedProducts();
        }
        if (!localStorage.getItem(this.STORAGE_KEYS.USER)) {
            this.seedUser();
        }
        if (!localStorage.getItem(this.STORAGE_KEYS.CONTENT)) {
            this.seedContent();
        }
    }

    private seedUser() {
        const defaultUser: User = {
            email: 'admin@srivenkateswara.in',
            password: 'admin123', // In production, this should be hashed
            name: 'Admin',
        };
        localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(defaultUser));
    }

    private seedProducts() {
        const products: Product[] = [
            {
                id: '1',
                name: 'Royal Velvet Drapes',
                category: 'Curtains',
                price: '12500',
                description: 'Luxurious velvet drapes with elegant gold trim.',
                status: 'active',
                image: '/placeholder.svg',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                id: '2',
                name: 'Milano Modular Sofa',
                category: 'Sofas',
                price: '85000',
                description: 'Contemporary modular sofa with premium fabric upholstery.',
                status: 'active',
                image: '/placeholder.svg',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        ];
        localStorage.setItem(this.STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    }

    private seedContent() {
        const content: ContentItem[] = [
            {
                key: 'site_title',
                value: 'HOME DECOR',
                updatedAt: new Date().toISOString(),
            },
            {
                key: 'site_description',
                value: 'Wholesale & Retailer of Home Furnishings',
                updatedAt: new Date().toISOString(),
            },
        ];
        localStorage.setItem(this.STORAGE_KEYS.CONTENT, JSON.stringify(content));
    }

    // Generic CRUD operations
    private getItems<T>(key: string): T[] {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    private setItems<T>(key: string, items: T[]): void {
        localStorage.setItem(key, JSON.stringify(items));
    }

    // File handling
    async fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // Auth methods
    async login(email: string, password: string): Promise<{ token: string; user: Omit<User, 'password'> }> {
        const user = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.USER) || '{}') as User;

        if (user.email === email && user.password === password) {
            const token = btoa(`${email}:${Date.now()}`);
            localStorage.setItem(this.STORAGE_KEYS.AUTH_TOKEN, token);
            return {
                token,
                user: { email: user.email, name: user.name },
            };
        }

        throw new Error('Invalid credentials');
    }

    async logout(): Promise<void> {
        localStorage.removeItem(this.STORAGE_KEYS.AUTH_TOKEN);
    }

    async getCurrentUser(): Promise<Omit<User, 'password'>> {
        const token = localStorage.getItem(this.STORAGE_KEYS.AUTH_TOKEN);
        if (!token) throw new Error('Not authenticated');

        const user = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.USER) || '{}') as User;
        return { email: user.email, name: user.name };
    }

    // Product methods
    async getProducts(params?: { category?: string; status?: string; search?: string }): Promise<Product[]> {
        let products = this.getItems<Product>(this.STORAGE_KEYS.PRODUCTS);

        if (params?.category) {
            products = products.filter(p => p.category === params.category);
        }
        if (params?.status) {
            products = products.filter(p => p.status === params.status);
        }
        if (params?.search) {
            const search = params.search.toLowerCase();
            products = products.filter(p =>
                p.name.toLowerCase().includes(search) ||
                p.description.toLowerCase().includes(search)
            );
        }

        return products;
    }

    async getProduct(id: string): Promise<Product> {
        const products = this.getItems<Product>(this.STORAGE_KEYS.PRODUCTS);
        const product = products.find(p => p.id === id);
        if (!product) throw new Error('Product not found');
        return product;
    }

    async createProduct(data: FormData): Promise<Product> {
        const products = this.getItems<Product>(this.STORAGE_KEYS.PRODUCTS);

        const imageFile = data.get('image') as File;
        let imageData = '/placeholder.svg';

        if (imageFile && imageFile.size > 0) {
            imageData = await this.fileToBase64(imageFile);
        }

        const newProduct: Product = {
            id: Date.now().toString(),
            name: data.get('name') as string,
            category: data.get('category') as string,
            price: data.get('price') as string,
            description: data.get('description') as string || '',
            status: 'active',
            image: imageData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        products.push(newProduct);
        this.setItems(this.STORAGE_KEYS.PRODUCTS, products);
        return newProduct;
    }

    async updateProduct(id: string, data: FormData): Promise<Product> {
        const products = this.getItems<Product>(this.STORAGE_KEYS.PRODUCTS);
        const index = products.findIndex(p => p.id === id);

        if (index === -1) throw new Error('Product not found');

        const imageFile = data.get('image') as File;
        let imageData = products[index].image;

        if (imageFile && imageFile.size > 0) {
            imageData = await this.fileToBase64(imageFile);
        }

        products[index] = {
            ...products[index],
            name: data.get('name') as string,
            category: data.get('category') as string,
            price: data.get('price') as string,
            description: data.get('description') as string || '',
            image: imageData,
            updatedAt: new Date().toISOString(),
        };

        this.setItems(this.STORAGE_KEYS.PRODUCTS, products);
        return products[index];
    }

    async toggleProductVisibility(id: string): Promise<Product> {
        const products = this.getItems<Product>(this.STORAGE_KEYS.PRODUCTS);
        const index = products.findIndex(p => p.id === id);

        if (index === -1) throw new Error('Product not found');

        products[index].status = products[index].status === 'active' ? 'hidden' : 'active';
        products[index].updatedAt = new Date().toISOString();

        this.setItems(this.STORAGE_KEYS.PRODUCTS, products);
        return products[index];
    }

    async deleteProduct(id: string): Promise<void> {
        const products = this.getItems<Product>(this.STORAGE_KEYS.PRODUCTS);
        const filtered = products.filter(p => p.id !== id);
        this.setItems(this.STORAGE_KEYS.PRODUCTS, filtered);
    }

    // Enquiry methods
    async submitEnquiry(data: any): Promise<Enquiry> {
        const enquiries = this.getItems<Enquiry>(this.STORAGE_KEYS.ENQUIRIES);

        const newEnquiry: Enquiry = {
            id: Date.now().toString(),
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message,
            status: 'new',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        enquiries.push(newEnquiry);
        this.setItems(this.STORAGE_KEYS.ENQUIRIES, enquiries);
        return newEnquiry;
    }

    async getEnquiries(params?: { status?: string; search?: string }): Promise<Enquiry[]> {
        let enquiries = this.getItems<Enquiry>(this.STORAGE_KEYS.ENQUIRIES);

        if (params?.status) {
            enquiries = enquiries.filter(e => e.status === params.status);
        }
        if (params?.search) {
            const search = params.search.toLowerCase();
            enquiries = enquiries.filter(e =>
                e.name.toLowerCase().includes(search) ||
                e.email.toLowerCase().includes(search)
            );
        }

        return enquiries.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    async updateEnquiryStatus(id: string, status: string, notes?: string): Promise<Enquiry> {
        const enquiries = this.getItems<Enquiry>(this.STORAGE_KEYS.ENQUIRIES);
        const index = enquiries.findIndex(e => e.id === id);

        if (index === -1) throw new Error('Enquiry not found');

        enquiries[index].status = status as Enquiry['status'];
        if (notes) enquiries[index].notes = notes;
        enquiries[index].updatedAt = new Date().toISOString();

        this.setItems(this.STORAGE_KEYS.ENQUIRIES, enquiries);
        return enquiries[index];
    }

    async deleteEnquiry(id: string): Promise<void> {
        const enquiries = this.getItems<Enquiry>(this.STORAGE_KEYS.ENQUIRIES);
        const filtered = enquiries.filter(e => e.id !== id);
        this.setItems(this.STORAGE_KEYS.ENQUIRIES, filtered);
    }

    // Appointment methods
    async bookAppointment(data: any): Promise<Appointment> {
        const appointments = this.getItems<Appointment>(this.STORAGE_KEYS.APPOINTMENTS);

        const newAppointment: Appointment = {
            id: Date.now().toString(),
            name: data.name,
            email: data.email,
            phone: data.phone,
            date: data.date,
            time: data.time,
            service: data.service,
            message: data.message,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        appointments.push(newAppointment);
        this.setItems(this.STORAGE_KEYS.APPOINTMENTS, appointments);
        return newAppointment;
    }

    async getAppointments(params?: { status?: string; search?: string; date?: string }): Promise<Appointment[]> {
        let appointments = this.getItems<Appointment>(this.STORAGE_KEYS.APPOINTMENTS);

        if (params?.status) {
            appointments = appointments.filter(a => a.status === params.status);
        }
        if (params?.date) {
            appointments = appointments.filter(a => a.date === params.date);
        }
        if (params?.search) {
            const search = params.search.toLowerCase();
            appointments = appointments.filter(a =>
                a.name.toLowerCase().includes(search) ||
                a.email.toLowerCase().includes(search)
            );
        }

        return appointments.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    async updateAppointmentStatus(id: string, status: string, notes?: string): Promise<Appointment> {
        const appointments = this.getItems<Appointment>(this.STORAGE_KEYS.APPOINTMENTS);
        const index = appointments.findIndex(a => a.id === id);

        if (index === -1) throw new Error('Appointment not found');

        appointments[index].status = status as Appointment['status'];
        if (notes) appointments[index].notes = notes;
        appointments[index].updatedAt = new Date().toISOString();

        this.setItems(this.STORAGE_KEYS.APPOINTMENTS, appointments);
        return appointments[index];
    }

    async deleteAppointment(id: string): Promise<void> {
        const appointments = this.getItems<Appointment>(this.STORAGE_KEYS.APPOINTMENTS);
        const filtered = appointments.filter(a => a.id !== id);
        this.setItems(this.STORAGE_KEYS.APPOINTMENTS, filtered);
    }

    // Gallery methods
    async getGalleryImages(params?: { category?: string }): Promise<GalleryImage[]> {
        let images = this.getItems<GalleryImage>(this.STORAGE_KEYS.GALLERY);

        if (params?.category) {
            images = images.filter(i => i.category === params.category);
        }

        return images.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    async uploadGalleryImage(data: FormData): Promise<GalleryImage> {
        const images = this.getItems<GalleryImage>(this.STORAGE_KEYS.GALLERY);

        const imageFile = data.get('image') as File;
        if (!imageFile) throw new Error('No image provided');

        const imageData = await this.fileToBase64(imageFile);

        const newImage: GalleryImage = {
            id: Date.now().toString(),
            title: data.get('title') as string || 'Untitled',
            category: data.get('category') as string || 'general',
            description: data.get('description') as string || '',
            image: imageData,
            createdAt: new Date().toISOString(),
        };

        images.push(newImage);
        this.setItems(this.STORAGE_KEYS.GALLERY, images);
        return newImage;
    }

    async deleteGalleryImage(id: string): Promise<void> {
        const images = this.getItems<GalleryImage>(this.STORAGE_KEYS.GALLERY);
        const filtered = images.filter(i => i.id !== id);
        this.setItems(this.STORAGE_KEYS.GALLERY, filtered);
    }

    // Content methods
    async getContent(key?: string): Promise<ContentItem | ContentItem[]> {
        const content = this.getItems<ContentItem>(this.STORAGE_KEYS.CONTENT);

        if (key) {
            const item = content.find(c => c.key === key);
            if (!item) throw new Error('Content not found');
            return item;
        }

        return content;
    }

    async updateContent(key: string, value: any): Promise<ContentItem> {
        const content = this.getItems<ContentItem>(this.STORAGE_KEYS.CONTENT);
        const index = content.findIndex(c => c.key === key);

        if (index === -1) {
            // Create new content item
            const newItem: ContentItem = {
                key,
                value,
                updatedAt: new Date().toISOString(),
            };
            content.push(newItem);
            this.setItems(this.STORAGE_KEYS.CONTENT, content);
            return newItem;
        }

        content[index].value = value;
        content[index].updatedAt = new Date().toISOString();

        this.setItems(this.STORAGE_KEYS.CONTENT, content);
        return content[index];
    }

    async bulkUpdateContent(updates: Record<string, any>): Promise<ContentItem[]> {
        const content = this.getItems<ContentItem>(this.STORAGE_KEYS.CONTENT);

        Object.entries(updates).forEach(([key, value]) => {
            const index = content.findIndex(c => c.key === key);

            if (index === -1) {
                content.push({
                    key,
                    value,
                    updatedAt: new Date().toISOString(),
                });
            } else {
                content[index].value = value;
                content[index].updatedAt = new Date().toISOString();
            }
        });

        this.setItems(this.STORAGE_KEYS.CONTENT, content);
        return content;
    }

    // Export/Import data (useful for backup)
    exportData(): string {
        const data = {
            products: this.getItems<Product>(this.STORAGE_KEYS.PRODUCTS),
            enquiries: this.getItems<Enquiry>(this.STORAGE_KEYS.ENQUIRIES),
            appointments: this.getItems<Appointment>(this.STORAGE_KEYS.APPOINTMENTS),
            gallery: this.getItems<GalleryImage>(this.STORAGE_KEYS.GALLERY),
            content: this.getItems<ContentItem>(this.STORAGE_KEYS.CONTENT),
        };
        return JSON.stringify(data, null, 2);
    }

    importData(jsonData: string): void {
        try {
            const data = JSON.parse(jsonData);
            if (data.products) this.setItems(this.STORAGE_KEYS.PRODUCTS, data.products);
            if (data.enquiries) this.setItems(this.STORAGE_KEYS.ENQUIRIES, data.enquiries);
            if (data.appointments) this.setItems(this.STORAGE_KEYS.APPOINTMENTS, data.appointments);
            if (data.gallery) this.setItems(this.STORAGE_KEYS.GALLERY, data.gallery);
            if (data.content) this.setItems(this.STORAGE_KEYS.CONTENT, data.content);
        } catch (error) {
            throw new Error('Invalid JSON data');
        }
    }

    clearAllData(): void {
        Object.values(this.STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        this.initializeData();
    }
}

export const storage = new LocalStorageService();
export default storage;
