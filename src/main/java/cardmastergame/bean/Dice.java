package cardmastergame.bean;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value="Dice model", description="Sample model for a dice")
public class Dice {
    @ApiModelProperty(notes = "Dice expression")
    private String expression;
    @ApiModelProperty(notes = "Result",example = "15")
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
