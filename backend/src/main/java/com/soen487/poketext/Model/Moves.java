package com.soen487.poketext.Model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="moves")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Moves {

    @Id
    @Column(name="name")
    @Basic
    private String name;

    @Column(name="accuracy")
    @Basic
    private int accuracy;

    @Column(name="effect_chance")
    @Basic
    private int effect_chance;

    // Also referred as power in the PokeAPI
    @Column(name="damage")
    @Basic
    private int damage;

    @Column(name="priority")
    @Basic
    private int priority;

    @Column(name="pp")
    @Basic
    private int pp;

}
