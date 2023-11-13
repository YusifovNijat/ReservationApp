package spring.boot.project.CRUD.APP.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import spring.boot.project.CRUD.APP.entity.Employee;
import spring.boot.project.CRUD.APP.service.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("/")
public class MyController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<Employee> showAllEmployees(){
        List<Employee> allEmployees = employeeService.getAllEmployees();
        return allEmployees;
    }

    @GetMapping("/{id}")
    public Employee geEmployee(@PathVariable int id){
        Employee employee = employeeService.getEmployee(id);
        return employee;
    }

    @PostMapping
    public Employee addNewEmployee(@RequestBody Employee employee){
        employeeService.saveEmployee(employee);
        return employee;
    }

    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable int id,@RequestBody Employee employee){
        Employee existingEmployee = employeeService.getEmployee(id);
        if (existingEmployee == null){
            return null;
        } else {
            existingEmployee.setHotel_name(employee.getHotel_name());
            existingEmployee.setArrival(employee.getArrival());
            existingEmployee.setDeparture(employee.getDeparture());
            existingEmployee.setTypeOfRoom(employee.getTypeOfRoom());
            existingEmployee.setGuestsNumber(employee.getGuestsNumber());
            existingEmployee.setPrice(employee.getPrice());

            // Save the updated employee in your service or repository
            employeeService.saveEmployee(existingEmployee);
        }
        return existingEmployee;
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable int id){
        employeeService.deleteEmployee(id);
    }
}
