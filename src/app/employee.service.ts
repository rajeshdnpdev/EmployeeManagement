import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) {

   }

   addEmployee(employee: any) {
     console.log(employee);
     return this.httpClient.post("https://localhost:44380/api/employee/add",{ name: employee.name });
   }

   getAllEmployees() {
     return this.httpClient.get<Employee[]>("https://localhost:44380/api/employee/all");
   }

   updateEmployee(id: any, employee: any) {
     return this.httpClient.put("https://localhost:44380/api/employee/update?id=" + id,{ name: employee.name});
   }

   deleteEmployee(id: any) {
     return this.httpClient.delete("https://localhost:44380/api/employee/delete?id=" + id);
   }
}
