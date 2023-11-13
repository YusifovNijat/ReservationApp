package spring.boot.project.CRUD.APP.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name="reservations")
@Data
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="hotel_name")
    private String hotel_name;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name="arrival")
    private Date arrival;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name="departure")
    private Date departure;

    @Column(name="type_of_room")
    private String typeOfRoom;

    @Column(name="guests_number")
    private int guestsNumber;

    @Column(name="price")
    private double price;

    public Employee(){

    }

    public Employee(String hotel_name, Date arrival, Date departure, String typeOfRoom, int guestsNumber, double price) {
        this.hotel_name = hotel_name;
        this.arrival = arrival;
        this.departure = departure;
        this.typeOfRoom = typeOfRoom;
        this.guestsNumber = guestsNumber;
        this.price = price;
    }
}
