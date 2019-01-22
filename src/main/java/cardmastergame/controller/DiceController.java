package cardmastergame.controller;

import cardmastergame.bean.Dice;
import com.bernardomg.tabletop.dice.notation.TransformableDiceNotationExpression;
import com.bernardomg.tabletop.dice.parser.DefaultDiceNotationExpressionParser;
import com.bernardomg.tabletop.dice.parser.DiceNotationExpressionParser;
import com.bernardomg.tabletop.dice.roller.DefaultRoller;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(description = "Api to parse Dice syntax and generate result")
public class DiceController extends AbstractController{

    private Dice lastResult = new Dice();

    @CrossOrigin
    @RequestMapping(path = "/lastdice", method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value="Retrieve the last dice roll",response = Dice.class)
    public Dice getLastDice() {
        return lastResult;
    }

    @CrossOrigin
    @RequestMapping(path = "/dice/{value}", method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value="Compute a Dice Expression ",response = Dice.class)
    public Dice computeDice(
            @ApiParam(value = "value ", allowableValues ="1D6,3D12+4",type ="String",required = true)
            @PathVariable("value") String value) {

        final DiceNotationExpressionParser parser;
        final TransformableDiceNotationExpression parsed;

        parser = new DefaultDiceNotationExpressionParser(new DefaultRoller());

        parsed = parser.parse(value);
        Dice dice = new Dice();
        dice.setExpression(value);

        dice.setValue(parsed.roll());
        lastResult=dice;
        return dice;
    }

}