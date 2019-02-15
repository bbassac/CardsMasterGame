package cardmastergame.controller;

import cardmastergame.bean.Dice;
import com.bernardomg.tabletop.dice.history.RollHistory;
import com.bernardomg.tabletop.dice.interpreter.DiceRoller;
import com.bernardomg.tabletop.dice.notation.DiceNotationExpression;
import com.bernardomg.tabletop.dice.parser.DefaultDiceParser;
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
            @ApiParam(value = "value ", example ="3D12+4",type ="String",required = true)
            @PathVariable("value") String value) {


        final DiceNotationExpression  parsed = new DefaultDiceParser().parse(value);
        final RollHistory history = new DiceRoller().transform(parsed);

        Dice dice = new Dice();
        dice.setExpression(value);
        dice.setDetail(history.getHistoryText());
        dice.setValue(history.getTotalRoll());
        lastResult=dice;
        return dice;
    }

}