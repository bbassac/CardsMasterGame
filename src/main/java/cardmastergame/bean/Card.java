package cardmastergame.bean;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
@ApiModel(value="Card model", description="Sample model for a card")
public class Card {
    @ApiModelProperty(notes = "Card ID",example = "1")
    private int id;
    @ApiModelProperty(notes = "Card Picture Path")
    private String path;
    @ApiModelProperty(notes = "Card Damage Point",example = "1")
    private int dammagePoints = 0;
    @ApiModelProperty(notes = "Card Orientation (activated or not")
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
