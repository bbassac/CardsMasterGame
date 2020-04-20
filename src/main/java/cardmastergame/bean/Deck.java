package cardmastergame.bean;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;
import java.util.Stack;

@ApiModel(value="Deck model", description="Sample model for deck of cards",discriminator = "lastmodified")
public class Deck<T> extends Stack<T> {

	private static final long serialVersionUID = 126566155301726257L;
	
	@ApiModelProperty(notes = "Date de modification de la liste",example = "12/15/2016T16h30h22")
    private Date lastModified;

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }
}
