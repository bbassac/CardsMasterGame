package cardmastergame.controller;

import cardmastergame.bean.Card;
import cardmastergame.bean.StackConstants;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Stack;

@RestController
public class GraveyardController extends AbstractController{


    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/graveyard",method = RequestMethod.GET)
    @ResponseBody
    public Stack<Card> cimetary(@PathVariable("playerId") int playerId) throws IOException {
        return playerId == 0 ? customRepo.getStack(StackConstants.GRAVEYARD0) : customRepo.getStack(StackConstants.GRAVEYARD1);

    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/graveyard/{cardId}",method = RequestMethod.PUT)
    @ResponseBody
    public void moveCardFromGameToGraveyard(@PathVariable("playerId") int playerId, @PathVariable("cardId") int cardId) throws IOException {
        customRepo.moveCardFromGameToGraveyardForPlayer(playerId,cardId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/graveyard/{cardId}",method = RequestMethod.GET)
    @ResponseBody
    public void moveCardFromGraveyardToHand(@PathVariable("playerId") int playerId, @PathVariable("cardId") int cardId) throws IOException {
        customRepo.moveCardFromGraveyardToPlayerHand(playerId,cardId);
    }

    @CrossOrigin
    @RequestMapping(path = "/opponent/{oppPlayerId}/graveyard/{cardId}/player/{playerId}",method = RequestMethod.GET)
    @ResponseBody
    public void moveCardFromOtherGraveyardToHand(@PathVariable("playerId") int playerId,@PathVariable("cardId") int cardId, @PathVariable("oppPlayerId") int oppPlayerId) throws IOException {
        customRepo.moveCardFromOtherGraveyardToHand(playerId,cardId,oppPlayerId);
    }
}
