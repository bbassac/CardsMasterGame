package cardmastergame.controller;

import cardmastergame.bean.Dice;
import com.bernardomg.tabletop.dice.notation.DiceNotationExpression;
import com.bernardomg.tabletop.dice.parser.DefaultDiceNotationExpressionParser;
import com.bernardomg.tabletop.dice.parser.DiceNotationExpressionParser;
import com.bernardomg.tabletop.dice.roller.DefaultRoller;
import org.jsondoc.core.annotation.Api;
import org.jsondoc.core.annotation.ApiMethod;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@Api(name = "Dice API",description = "Api to parse Dice syntax and generate result")
public class DiceController extends AbstractController{


    @CrossOrigin
    @RequestMapping(path = "/dice/{value}", method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "Throw a dice such as '1d6 or 4d10+3'")
    public Dice computeDice(@PathVariable("value") String value) throws IOException {

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