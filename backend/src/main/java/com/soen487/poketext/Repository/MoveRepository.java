package com.soen487.poketext.Repository;

import com.soen487.poketext.Model.Move;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MoveRepository extends JpaRepository<Move, Integer> {
}
