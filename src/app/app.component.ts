import { EmployeeService } from './employee.service';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { Employee } from './models/employee';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EmployeeManagement';
  employees: Employee[] = [];
  employee: any = {};
  isUpdateEmployee: boolean = false;


  constructor(private employeeService: EmployeeService) {

  }
  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((employees: Employee[]) => {
      this.employees = [];
      employees.forEach(employee => {
        this.employees.push(employee);
      });
    });
  }

  AddEmployee(formData: any) {
    if (formData.id != null || formData.id != undefined) {
      let result = this.isEmployeeExist(formData.id);
      if (result) {
        this.employeeService.updateEmployee(formData.id, formData).subscribe(x => {
          this.getAllEmployees();
          this.resetFormData();
        });
      }
    } else {
      this.employeeService.addEmployee(formData).subscribe(x => {
        this.getAllEmployees();
        this.resetFormData();
      });
    }

  }

  updateEmployee(employee: any) {
    this.LoadData(employee);
  }

  LoadData(employee: any) {
    this.isUpdateEmployee = true;
    this.employee.id = employee.id;
    this.employee.name = employee.name;
  }

  resetFormData() {
    this.isUpdateEmployee = false;
    this.employee = {};
  }

  deleteEmployee(employee: any) {
    let result = this.isEmployeeExist(employee.id);
    if (result) {
      this.employeeService.deleteEmployee(employee.id).subscribe(x => {
        this.getAllEmployees();
      });
    }
  }

  isEmployeeExist(id: number) {
    let emp = this.employees.find(x => x.id == id);
    if (emp != null) {
      return true;
    }
    return false;
  }
}
