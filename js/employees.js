// Employee Management - Data Layer

class EmployeeManager {
    constructor() {
        this.storageKey = 'employees';
        this.employees = this.loadFromStorage();
        this.nextId = this.getNextId();
    }

    // Load employees from LocalStorage
    loadFromStorage() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading from storage:', error);
            return [];
        }
    }

    // Save employees to LocalStorage
    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.employees));
            return true;
        } catch (error) {
            console.error('Error saving to storage:', error);
            return false;
        }
    }

    // Get next available ID
    getNextId() {
        if (this.employees.length === 0) return 1001;
        const ids = this.employees.map(emp => parseInt(emp.id));
        return Math.max(...ids) + 1;
    }

    // Add new employee
    addEmployee(employeeData) {
        const employee = {
            id: this.nextId,
            ...employeeData,
            createdAt: new Date().toISOString()
        };
        this.employees.push(employee);
        this.nextId++;
        this.saveToStorage();
        return employee;
    }

    // Update existing employee
    updateEmployee(id, employeeData) {
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            this.employees[index] = {
                ...this.employees[index],
                ...employeeData,
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage();
            return this.employees[index];
        }
        return null;
    }

    // Delete employee
    deleteEmployee(id) {
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            this.employees.splice(index, 1);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    // Get employee by ID
    getEmployee(id) {
        return this.employees.find(emp => emp.id === id);
    }

    // Get all employees
    getAllEmployees() {
        return [...this.employees];
    }

    // Search employees
    searchEmployees(query) {
        const lowerQuery = query.toLowerCase();
        return this.employees.filter(emp => 
            emp.id.toString().includes(lowerQuery) ||
            emp.firstName.toLowerCase().includes(lowerQuery) ||
            emp.lastName.toLowerCase().includes(lowerQuery) ||
            emp.email.toLowerCase().includes(lowerQuery)
        );
    }

    // Filter employees by department
    filterByDepartment(department) {
        if (!department) return this.getAllEmployees();
        return this.employees.filter(emp => emp.department === department);
    }

    // Get employees by department (for statistics)
    getEmployeesByDepartment() {
        const departments = {};
        this.employees.forEach(emp => {
            if (!departments[emp.department]) {
                departments[emp.department] = [];
            }
            departments[emp.department].push(emp);
        });
        return departments;
    }

    // Get total salary by department
    getSalaryByDepartment() {
        const salaries = {};
        this.employees.forEach(emp => {
            if (!salaries[emp.department]) {
                salaries[emp.department] = 0;
            }
            salaries[emp.department] += emp.salary || 0;
        });
        return salaries;
    }

    // Export employees as CSV
    exportAsCSV() {
        if (this.employees.length === 0) return '';

        const headers = [
            'ID',
            'First Name',
            'Last Name',
            'Email',
            'Phone',
            'Department',
            'Position',
            'Salary',
            'Joining Date',
            'Address'
        ];

        const rows = this.employees.map(emp => [
            emp.id,
            emp.firstName,
            emp.lastName,
            emp.email,
            emp.phone || '',
            emp.department,
            emp.position,
            emp.salary || '',
            emp.joiningDate,
            emp.address || ''
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        return csvContent;
    }

    // Validate employee data
    validateEmployee(employeeData) {
        const errors = [];

        if (!employeeData.firstName?.trim()) {
            errors.push('First name is required');
        }
        if (!employeeData.lastName?.trim()) {
            errors.push('Last name is required');
        }
        if (!employeeData.email?.trim()) {
            errors.push('Email is required');
        } else if (!this.isValidEmail(employeeData.email)) {
            errors.push('Please enter a valid email');
        }
        if (!employeeData.department) {
            errors.push('Department is required');
        }
        if (!employeeData.position?.trim()) {
            errors.push('Position is required');
        }
        if (!employeeData.joiningDate) {
            errors.push('Joining date is required');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Email validation
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Clear all data
    clearAll() {
        this.employees = [];
        this.nextId = 1001;
        this.saveToStorage();
    }
}

// Create global instance
const employeeManager = new EmployeeManager();
