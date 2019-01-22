package cardmastergame.bean;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;
import java.util.LinkedList;
@ApiModel(value="Deck model", description="Sample model for deck of cards",discriminator = "lastmodified")
public class Deck<Card> extends LinkedList<Card> {

    @ApiModelProperty(notes = "Date de modification de la liste",example = "12/15/2016T16h30h22")
    private Date lastModified;

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }
}
