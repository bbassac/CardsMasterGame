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
    @ApiModelProperty(notes = "Card meta data")
    private MetaData metaData;
    @ApiModelProperty(notes = "Card status")
    private Status status = new Status();

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
    public MetaData getMetaData() {
        return metaData;
    }
    public void setMetaData(MetaData metaData) {
        this.metaData = metaData;
    }
    public Status getStatus() {
        return status;
    }
    public void setStatus(Status status) {
        this.status = status;
    }

    public boolean isWeaponOrArmor(){
        boolean isWeapon ="Arme".equals(getMetaData().getTeam());
        boolean isArmor = "Armure".equals(getMetaData().getTeam());
        return isWeapon || isArmor;
    }



    boolean isEquipment(){
        return "Equipement".equals(getMetaData().getKind());
    }
}
