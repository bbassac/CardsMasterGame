package cardmastergame.bean;

import io.swagger.annotations.ApiModelProperty;

public class Status {

    @ApiModelProperty(notes = "Card Orientation (activated or not")
    private boolean activated = false;
    @ApiModelProperty(notes = "Card Used (yes or false")
    private boolean used = false;


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
}
