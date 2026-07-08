// UI Management

class UIManager {
    constructor() {
        this.form = document.getElementById('employeeForm');
        this.tableBody = document.getElementById('employeeTableBody');
        this.searchInput = document.getElementById('searchInput');
        this.filterDepartment = document.getElementById('filterDepartment');
        this.modal = document.getElementById('detailsModal');
        this.currentEditingId = null;

        this.initializeEventListeners();
    }

    // Initialize event listeners
    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        document.getElementById('resetBtn').addEventListener('click', () => this.resetForm());
        document.getElementById('cancelBtn').addEventListener('click', () => this.cancelEdit());
        this.searchInput.addEventListener('input', () => this.handleSearch());
        this.filterDepartment.addEventListener('change', () => this.handleFilter());
        document.getElementById('clearSearchBtn').addEventListener('click', () => this.clearSearch());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportToCSV());
        document.getElementById('closeModalBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('closeModalFooterBtn').addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
    }

    // Handle form submission
    handleFormSubmit(e) {
        e.preventDefault();

        const employeeData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            department: document.getElementById('department').value,
            position: document.getElementById('position').value.trim(),
            salary: parseFloat(document.getElementById('salary').value) || 0,
            joiningDate: document.getElementById('joiningDate').value,
            address: document.getElementById('address').value.trim()
        };

        // Validate
        const validation = employeeManager.validateEmployee(employeeData);
        if (!validation.isValid) {
            this.showNotification(validation.errors.join('\n'), 'error');
            return;
        }

        // Add or update
        if (this.currentEditingId) {
            employeeManager.updateEmployee(this.currentEditingId, employeeData);
            this.showNotification('Employee updated successfully!', 'success');
            this.cancelEdit();
        } else {
            employeeManager.addEmployee(employeeData);
            this.showNotification('Employee added successfully!', 'success');
        }

        this.resetForm();
        this.renderTable();
        this.updateEmployeeCount();
    }

    // Reset form
    resetForm() {
        this.form.reset();
        document.getElementById('employeeId').value = '';
        this.cancelEdit();
    }

    // Cancel edit mode
    cancelEdit() {
        this.currentEditingId = null;
        document.getElementById('submitBtn').textContent = 'Add Employee';
        document.getElementById('cancelBtn').style.display = 'none';
        this.form.reset();
    }

    // Edit employee
    editEmployee(id) {
        const employee = employeeManager.getEmployee(id);
        if (!employee) return;

        this.currentEditingId = id;
        document.getElementById('employeeId').value = employee.id;
        document.getElementById('firstName').value = employee.firstName;
        document.getElementById('lastName').value = employee.lastName;
        document.getElementById('email').value = employee.email;
        document.getElementById('phone').value = employee.phone || '';
        document.getElementById('department').value = employee.department;
        document.getElementById('position').value = employee.position;
        document.getElementById('salary').value = employee.salary || '';
        document.getElementById('joiningDate').value = employee.joiningDate;
        document.getElementById('address').value = employee.address || '';

        document.getElementById('submitBtn').textContent = 'Update Employee';
        document.getElementById('cancelBtn').style.display = 'inline-block';

        // Scroll to form
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    }

    // Delete employee
    deleteEmployee(id) {
        if (confirm('Are you sure you want to delete this employee?')) {
            if (employeeManager.deleteEmployee(id)) {
                this.showNotification('Employee deleted successfully!', 'success');
                this.renderTable();
                this.updateEmployeeCount();
            }
        }
    }

    // View employee details
    viewDetails(id) {
        const employee = employeeManager.getEmployee(id);
        if (!employee) return;

        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <p><strong>Employee ID:</strong> ${employee.id}</p>
            <p><strong>Full Name:</strong> ${employee.firstName} ${employee.lastName}</p>
            <p><strong>Email:</strong> ${employee.email}</p>
            <p><strong>Phone:</strong> ${employee.phone || 'N/A'}</p>
            <p><strong>Department:</strong> ${employee.department}</p>
            <p><strong>Position:</strong> ${employee.position}</p>
            <p><strong>Salary:</strong> ${employee.salary ? `$${employee.salary.toLocaleString()}` : 'N/A'}</p>
            <p><strong>Joining Date:</strong> ${this.formatDate(employee.joiningDate)}</p>
            <p><strong>Address:</strong> ${employee.address || 'N/A'}</p>
            ${employee.createdAt ? `<p><strong>Created:</strong> ${this.formatDateTime(employee.createdAt)}</p>` : ''}
            ${employee.updatedAt ? `<p><strong>Updated:</strong> ${this.formatDateTime(employee.updatedAt)}</p>` : ''}
        `;
        this.openModal();
    }

    // Render employee table
    renderTable() {
        const employees = employeeManager.getAllEmployees();

        if (employees.length === 0) {
            this.tableBody.innerHTML = '<tr class="empty-row"><td colspan="9" class="empty-message">No employees added yet. Add your first employee!</td></tr>';
            return;
        }

        this.tableBody.innerHTML = employees.map(emp => `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.firstName} ${emp.lastName}</td>
                <td>${emp.email}</td>
                <td>${emp.phone || '-'}</td>
                <td>${emp.department}</td>
                <td>${emp.position}</td>
                <td>${emp.salary ? `$${emp.salary.toLocaleString()}` : '-'}</td>
                <td>${this.formatDate(emp.joiningDate)}</td>
                <td>
                    <div class="actions">
                        <button class="btn btn-info btn-small" onclick="uiManager.viewDetails(${emp.id})">View</button>
                        <button class="btn btn-warning btn-small" onclick="uiManager.editEmployee(${emp.id})">Edit</button>
                        <button class="btn btn-danger btn-small" onclick="uiManager.deleteEmployee(${emp.id})">Delete</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // Handle search
    handleSearch() {
        const query = this.searchInput.value;
        if (!query) {
            this.renderTable();
            return;
        }

        const results = employeeManager.searchEmployees(query);
        this.renderSearchResults(results);
    }

    // Handle filter
    handleFilter() {
        const department = this.filterDepartment.value;
        const filtered = employeeManager.filterByDepartment(department);
        this.renderFilteredResults(filtered);
    }

    // Render search results
    renderSearchResults(results) {
        if (results.length === 0) {
            this.tableBody.innerHTML = '<tr class="empty-row"><td colspan="9" class="empty-message">No employees found matching your search.</td></tr>';
            return;
        }
        this.renderEmployeeRows(results);
    }

    // Render filtered results
    renderFilteredResults(results) {
        if (results.length === 0) {
            this.tableBody.innerHTML = '<tr class="empty-row"><td colspan="9" class="empty-message">No employees in this department.</td></tr>';
            return;
        }
        this.renderEmployeeRows(results);
    }

    // Render employee rows
    renderEmployeeRows(employees) {
        this.tableBody.innerHTML = employees.map(emp => `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.firstName} ${emp.lastName}</td>
                <td>${emp.email}</td>
                <td>${emp.phone || '-'}</td>
                <td>${emp.department}</td>
                <td>${emp.position}</td>
                <td>${emp.salary ? `$${emp.salary.toLocaleString()}` : '-'}</td>
                <td>${this.formatDate(emp.joiningDate)}</td>
                <td>
                    <div class="actions">
                        <button class="btn btn-info btn-small" onclick="uiManager.viewDetails(${emp.id})">View</button>
                        <button class="btn btn-warning btn-small" onclick="uiManager.editEmployee(${emp.id})">Edit</button>
                        <button class="btn btn-danger btn-small" onclick="uiManager.deleteEmployee(${emp.id})">Delete</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // Clear search
    clearSearch() {
        this.searchInput.value = '';
        this.filterDepartment.value = '';
        this.renderTable();
    }

    // Export to CSV
    exportToCSV() {
        const csv = employeeManager.exportAsCSV();
        if (!csv) {
            this.showNotification('No employees to export.', 'warning');
            return;
        }

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `employees_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.showNotification('Employees exported successfully!', 'success');
    }

    // Update employee count
    updateEmployeeCount() {
        const count = employeeManager.getAllEmployees().length;
        document.getElementById('employeeCount').textContent = count;
    }

    // Open modal
    openModal() {
        this.modal.classList.add('show');
    }

    // Close modal
    closeModal() {
        this.modal.classList.remove('show');
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 2000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;

        if (type === 'success') {
            notification.style.background = '#10b981';
        } else if (type === 'error') {
            notification.style.background = '#ef4444';
        } else if (type === 'warning') {
            notification.style.background = '#f59e0b';
        } else {
            notification.style.background = '#3b82f6';
        }

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    // Format date and time
    formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
}

// Create global instance
const uiManager = new UIManager();
