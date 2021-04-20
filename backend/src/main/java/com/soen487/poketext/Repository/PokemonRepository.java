package com.soen487.poketext.Repository;

import com.soen487.poketext.Model.Pokemon;
import com.soen487.poketext.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PokemonRepository extends JpaRepository<Pokemon, Integer> {

    Optional<Pokemon> findByUserAndName(User user, String name);



}
