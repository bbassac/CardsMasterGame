package cardmastergame.bean;

import org.jsondoc.core.annotation.ApiObject;
import org.jsondoc.core.annotation.ApiObjectField;

@ApiObject(description = "Representation of a dice")
public class Dice {
    @ApiObjectField(description = "Original expression used for dice throw")
    private String expression;
    @ApiObjectField(description = "Int value of the throw")
    private long value;

    public String getExpression() {
        return expression;
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }

    public long getValue() {
        return value;
    }

    public void setValue(long value) {
        this.value = value;
    }
}
