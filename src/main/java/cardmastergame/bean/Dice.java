package cardmastergame.bean;

import org.jsondoc.core.annotation.ApiObject;

@ApiObject
public class Dice {
    private String expression;
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
