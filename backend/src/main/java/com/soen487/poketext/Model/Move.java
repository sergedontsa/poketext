package com.soen487.poketext.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.aop.config.PointcutEntry;

import javax.persistence.*;

@Entity
@Table(name="move")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Move {

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

    // Also referred as power in the com.soen487.poketext.PokeAPI
    @Column(name="damage")
    @Basic
    private int damage;

    @Column(name="priority")
    @Basic
    private int priority;

    @Column(name="pp")
    @Basic
    private int pp;

    @ManyToOne(cascade=CascadeType.ALL, optional = false)
    @JoinColumn(name="pokemonid")
    private Pokemon pokemon;

}
