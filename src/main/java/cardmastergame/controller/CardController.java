package cardmastergame.controller;

import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
public class CardController extends AbstractController{




    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/{cardId}/dmg/{value}",method = RequestMethod.PUT)
    @ResponseBody
    public int updateDMGOnCard( @PathVariable("playerId") int playerId,
                               @PathVariable("cardId") int cardId,
                               @PathVariable("value") int value) throws IOException {
        return customRepo.updateDmgPointsOnCard(playerId,cardId,value);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/{cardId}/dmg",method = RequestMethod.GET)
    @ResponseBody
    public int getDMGOnCard( @PathVariable("playerId") int playerId, @PathVariable("cardId") int cardId) throws IOException {
        return customRepo.getDmgOnCard(playerId,cardId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/{cardId}/activated/{value}",method = RequestMethod.PUT)
    @ResponseBody
    public boolean updateActivatedOnCard(@PathVariable("playerId") int playerId,@PathVariable("cardId") int cardId,@PathVariable("value") boolean value) throws IOException {
        return customRepo.updateActivatedOnCard(playerId,cardId,value);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/{cardId}/activated",method = RequestMethod.GET)
    @ResponseBody
    public boolean getActivatedOnCard(@PathVariable("playerId") int playerId, @PathVariable("cardId") int cardId) throws IOException {
        return customRepo.getActivatedOnCard(playerId,cardId);
    }

}