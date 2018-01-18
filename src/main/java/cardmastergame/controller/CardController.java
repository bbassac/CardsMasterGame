package cardmastergame.controller;

import cardmastergame.bean.Dice;
import com.bernardomg.tabletop.dice.notation.DiceNotationExpression;
import com.bernardomg.tabletop.dice.parser.DefaultDiceNotationExpressionParser;
import com.bernardomg.tabletop.dice.parser.DiceNotationExpressionParser;
import com.bernardomg.tabletop.dice.roller.DefaultRoller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/card/{id}")
public class CardController extends AbstractController{


    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public String getCardPath(@PathVariable("id") Integer id) throws IOException {

        return customRepo.getCardById(id);
    }

}