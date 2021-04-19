package com.soen487.poketext.Repository;

import com.soen487.poketext.Model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Integer> {
}
