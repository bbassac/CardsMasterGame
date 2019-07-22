package cardmastergame.bean;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value="Dice model", description="Sample model for a dice")
public class Dice {
    @ApiModelProperty(notes = "Dice expression", example="3D12+4")
    private String expression;
    @ApiModelProperty(notes = "Result", example = "29")
    private long value;

    @ApiModelProperty(notes = "dice detail", example = "[3, 11, 11] + 4")
    private String detail;

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

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }
}
