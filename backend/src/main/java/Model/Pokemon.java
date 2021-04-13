package Model;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Arrays;

@Entity
public class Pokemon {

    @Id
    private String name;
    private final int level = 50;
    private int hp;
    private byte[] sprite;

    public Pokemon(String name, int hp, byte[] sprite) {
        this.name = name;
        this.hp = hp;
        this.sprite = sprite;
    }

    public Pokemon() {

    }

    public void setName(String name) {
        this.name = name;
    }

    public void setHp(int hp) {
        this.hp = hp;
    }

    public void setSprite(byte[] sprite) {
        this.sprite = sprite;
    }

    public String getName() {
        return name;
    }

    public int getLevel() {
        return level;
    }

    public int getHp() {
        return hp;
    }

    public byte[] getSprite() {
        return sprite;
    }

    @Override
    public String toString() {
        return "Pokemon{" +
                "name='" + name + '\'' +
                ", level=" + level +
                ", hp=" + hp +
                ", sprite=" + Arrays.toString(sprite) +
                '}';
    }
}
