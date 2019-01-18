package cardmastergame.controller;

import cardmastergame.bean.Card;
import cardmastergame.bean.StackConstants;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Stack;

@RestController
public class TrapController extends AbstractController{


    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/trap/{cardId}",method = RequestMethod.PUT)
    @ResponseBody
    public void moveCardFromHandToTrap(@PathVariable("playerId") int playerId,@PathVariable("cardId") int cardId) throws IOException {
       customRepo.moveCardFromHandToTrapForPlayer(playerId,cardId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/traps",method = RequestMethod.GET)
    @ResponseBody
    public Stack<Card> displayTraps(@PathVariable("playerId") int playerId) throws IOException {
        return playerId == 0 ? customRepo.getStack(StackConstants.TRAP0) : customRepo.getStack(StackConstants.TRAP1);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/trap/{cardId}/graveyard",method = RequestMethod.PUT)
    @ResponseBody
    public void moveCardFromTrapToGraveyard( @PathVariable("playerId") int playerId,@PathVariable("cardId") int cardId) throws IOException {
        customRepo.moveCardFromTrapToGraveyard(playerId,cardId);
    }

}