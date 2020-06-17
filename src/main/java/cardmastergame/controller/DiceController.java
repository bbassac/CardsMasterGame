package cardmastergame.controller;

import cardmastergame.bean.Dice;
import com.bernardomg.tabletop.dice.history.RollHistory;
import com.bernardomg.tabletop.dice.interpreter.DiceInterpreter;
import com.bernardomg.tabletop.dice.interpreter.DiceRoller;
import com.bernardomg.tabletop.dice.parser.DefaultDiceParser;
import com.bernardomg.tabletop.dice.parser.DiceParser;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(description = "Api to parse Dice syntax and generate result")
public class DiceController extends AbstractController{

    private Dice lastResult = new Dice();

    private final DiceParser parser     = new DefaultDiceParser();
    
    private final DiceInterpreter<RollHistory> roller = new DiceRoller();

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

        if (!StringUtils.isEmpty(value)){
            final RollHistory history = parser.parse(value, roller);

            Dice dice = new Dice();
            dice.setExpression(value);
            dice.setDetail(history.toString());
            dice.setValue(history.getTotalRoll());
            lastResult=dice;
        }

        return lastResult;
    }

}