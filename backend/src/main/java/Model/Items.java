package Model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="items")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Items {

    @Id
    @Column(name="name")
    @Basic
    private String name;

    // To confirm what this is going to be about
    @Column(name="attributes")
    @Basic
    private int attributes;

}
