package cardmastergame.controller;

import cardmastergame.bean.Dice;
import com.bernardomg.tabletop.dice.notation.DiceNotationExpression;
import com.bernardomg.tabletop.dice.parser.DefaultDiceNotationExpressionParser;
import com.bernardomg.tabletop.dice.parser.DiceNotationExpressionParser;
import com.bernardomg.tabletop.dice.roller.DefaultRoller;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.io.IOException;

@RestController
@RequestMapping("/dice/{value}")
public class DiceController extends AbstractController{


    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
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