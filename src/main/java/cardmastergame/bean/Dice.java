package cardmastergame.bean;

import io.swagger.annotations.ApiModelProperty;

public class Dice {
    @ApiModelProperty(notes = "Dice expression")
    private String expression;
    @ApiModelProperty(notes = "Result")
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
