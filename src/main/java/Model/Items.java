package Model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Items {

    @Id
    private String name;
    private int hpRecovered;

    public Items(String name, int hpRecovered) {
        this.name = name;
        this.hpRecovered = hpRecovered;
    }

    public Items() {

    }

    public String getName() {
        return name;
    }

    public int getHpRecovered() {
        return hpRecovered;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setHpRecovered(int hpRecovered) {
        this.hpRecovered = hpRecovered;
    }

    @Override
    public String toString() {
        return "Items{" +
                "name='" + name + '\'' +
                ", hpRecovered=" + hpRecovered +
                '}';
    }
}
