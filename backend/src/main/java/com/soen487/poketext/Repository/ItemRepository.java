package com.soen487.poketext.Repository;

import com.soen487.poketext.Model.Item;
import com.soen487.poketext.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer> {

    List<Item> findAllByUser(User user);
}
