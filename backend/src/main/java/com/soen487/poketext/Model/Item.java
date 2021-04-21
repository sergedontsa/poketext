package com.soen487.poketext.Model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="item")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Item {

    @Id
    @Column(name="name")
    @Basic
    private String name;

    // To confirm what this is going to be about
    @Column(name="attributes")
    @Basic
    private int attributes;

    //TODO
    @Column(name="sprite")
    @Basic
    private String sprite;

    @ManyToOne(optional = false)
    @JoinColumn(name="userid")
    private User user;

}
