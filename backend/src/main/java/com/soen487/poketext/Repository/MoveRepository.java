package com.soen487.poketext.Repository;

import com.soen487.poketext.Model.Move;
import com.soen487.poketext.Model.Pokemon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MoveRepository extends JpaRepository<Move, Integer> {

    List<Move> findAllByPokemon(Pokemon pokemon);

}
