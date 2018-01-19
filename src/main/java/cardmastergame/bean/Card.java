package cardmastergame.bean;

import org.jsondoc.core.annotation.ApiObject;
import org.jsondoc.core.annotation.ApiObjectField;

@ApiObject(description = "Representation of a Card")
public class Card {
    @ApiObjectField(description = "Unique id to find cards")
    private int id;
    @ApiObjectField(description = "path of the card")
    private String path;

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
}
