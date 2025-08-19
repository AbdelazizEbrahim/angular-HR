import { Pipe, PipeTransform } from '@angular/core';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department.model';

@Pipe({
  name: 'departmentName'
})
export class DepartmentNamePipe implements PipeTransform {
  private departments: Department[] = [];

  constructor(private departmentService: DepartmentService) {
    this.departmentService.getDepartments().subscribe(depts => {
      this.departments = depts;
    });
  }

  transform(departmentId: number): string {
    if (!departmentId || !this.departments.length) return 'N/A';
    
    const department = this.departments.find(d => d.id === departmentId);
    return department ? department.name : 'N/A';
  }
}