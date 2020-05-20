package cardmastergame.bean;

import io.swagger.annotations.ApiModelProperty;

public class Status {

    @ApiModelProperty(notes = "Card Orientation (activated or not")
    private boolean activated = false;
    @ApiModelProperty(notes = "Card Used (yes or false")
    private boolean used = false;
    @ApiModelProperty(notes = "Card hidden (yes or false")
    private boolean hidden = false;
    @ApiModelProperty(notes = "Card stuned (yes or false")
    private boolean stuned = false;
    @ApiModelProperty(notes = "Card reinforced (yes or false")
    private boolean reinforced = false;

    public boolean isActivated() {
        return activated;
    }
    public void setActivated(boolean activated) {
        this.activated = activated;
    }
    public boolean isUsed() {
        return used;
    }
    public void setUsed(boolean used) {
        this.used = used;
    }
    public boolean isStuned() {
        return stuned;
    }
    public void setStuned(boolean stuned) {
        this.stuned = stuned;
    }
    public boolean isHidden() {
        return hidden;
    }
    public void setHidden(boolean hidden) {
        this.hidden = hidden;
    }
    public boolean isReinforced() {
        return reinforced;
    }
    public void setReinforced(boolean reinforced) {
        this.reinforced = reinforced;
    }
}
