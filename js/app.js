// Main Application

class EmployeeApp {
    constructor() {
        this.initialize();
    }

    initialize() {
        console.log('Employee Management System Initialized');
        this.renderInitialData();
        this.setupStyle();
    }

    renderInitialData() {
        // Render employees table
        uiManager.renderTable();
        uiManager.updateEmployeeCount();
    }

    setupStyle() {
        // Add fade out animation to styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(20px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Demo: Add sample employees
    addSampleEmployees() {
        const samples = [
            {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '555-0001',
                department: 'IT',
                position: 'Senior Developer',
                salary: 95000,
                joiningDate: '2021-03-15',
                address: '123 Main St, New York, NY'
            },
            {
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane.smith@example.com',
                phone: '555-0002',
                department: 'HR',
                position: 'HR Manager',
                salary: 75000,
                joiningDate: '2020-06-01',
                address: '456 Oak Ave, New York, NY'
            },
            {
                firstName: 'Mike',
                lastName: 'Johnson',
                email: 'mike.johnson@example.com',
                phone: '555-0003',
                department: 'Finance',
                position: 'Finance Analyst',
                salary: 70000,
                joiningDate: '2021-01-10',
                address: '789 Pine Rd, New York, NY'
            },
            {
                firstName: 'Sarah',
                lastName: 'Wilson',
                email: 'sarah.wilson@example.com',
                phone: '555-0004',
                department: 'Marketing',
                position: 'Marketing Manager',
                salary: 80000,
                joiningDate: '2020-11-20',
                address: '321 Elm St, New York, NY'
            }
        ];

        if (employeeManager.getAllEmployees().length === 0) {
            samples.forEach(sample => {
                employeeManager.addEmployee(sample);
            });
            uiManager.renderTable();
            uiManager.updateEmployeeCount();
            uiManager.showNotification('Sample employees loaded!', 'info');
        }
    }
}

// Initialize application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new EmployeeApp();
    });
} else {
    new EmployeeApp();
}
