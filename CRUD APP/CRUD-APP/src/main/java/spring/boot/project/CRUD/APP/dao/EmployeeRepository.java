package spring.boot.project.CRUD.APP.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import spring.boot.project.CRUD.APP.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

}
