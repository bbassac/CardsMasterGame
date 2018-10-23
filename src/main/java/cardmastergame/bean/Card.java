package cardmastergame.bean;

import org.jsondoc.core.annotation.ApiObject;
import org.jsondoc.core.annotation.ApiObjectField;

@ApiObject(description = "Representation of a Card")
public class Card {
    @ApiObjectField(description = "Unique id to find cards")
    private int id;
    @ApiObjectField(description = "path of the card")
    private String path;
    @ApiObjectField(description = "number of damage on card")
    private int dammagePoints = 0;
    @ApiObjectField(description = "true if power has already been activated")
    private boolean activated = false;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public int getDammagePoints() {
        return dammagePoints;
    }

    public void setDammagePoints(int dammagePoints) {
        this.dammagePoints = dammagePoints;
    }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }


}
