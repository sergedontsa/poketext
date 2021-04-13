package Model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Moves {

    @Id
    private String name;
    private int power;
    private int pp;

    public Moves(String name, int power, int pp) {
        this.name = name;
        this.power = power;
        this.pp = pp;
    }

    public Moves() {

    }

    public String getName() {
        return name;
    }

    public int getPower() {
        return power;
    }

    public int getPp() {
        return pp;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPower(int power) {
        this.power = power;
    }

    public void setPp(int pp) {
        this.pp = pp;
    }

    @Override
    public String toString() {
        return "Moves{" +
                "name='" + name + '\'' +
                ", power=" + power +
                ", pp=" + pp +
                '}';
    }
}
