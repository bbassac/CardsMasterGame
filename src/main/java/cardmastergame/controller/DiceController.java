package cardmastergame.controller;

import cardmastergame.bean.Dice;
import com.bernardomg.tabletop.dice.notation.DiceNotationExpression;
import com.bernardomg.tabletop.dice.parser.DefaultDiceNotationExpressionParser;
import com.bernardomg.tabletop.dice.parser.DiceNotationExpressionParser;
import com.bernardomg.tabletop.dice.roller.DefaultRoller;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(value = "Dice API",description = "Api to parse Dice syntax and generate result")
public class DiceController extends AbstractController{


    @CrossOrigin
    @RequestMapping(path = "/dice/{value}", method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value="Compute a Dice Expression",response = Dice.class)
    public Dice computeDice(@PathVariable("value") String value) {

        final DiceNotationExpressionParser parser;
        final DiceNotationExpression parsed;

        parser = new DefaultDiceNotationExpressionParser(new DefaultRoller());

        parsed = parser.parse(value);
        Dice dice = new Dice();
        dice.setExpression(value);
        dice.setValue(parsed.getValue());
        return dice;
    }

}