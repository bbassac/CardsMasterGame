package cardmastergame.controller;

import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
public class PlayerController extends AbstractController{

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/pvs",method = RequestMethod.GET)
    @ResponseBody
    public int pvs( @PathVariable("playerId") int playerId) throws IOException {
        return customRepo.getPlayerPvs(playerId);

    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/pvs/{value}",method = RequestMethod.PUT)
    @ResponseBody
    public int updatePlayerPvs(@PathVariable("playerId") int playerId, @PathVariable("value") int value) throws IOException {
        customRepo.updatePlayerPvs(playerId,value);
        return customRepo.getPlayerPvs(playerId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/chakra",method = RequestMethod.GET)
    @ResponseBody
    public int getChakra(@PathVariable("playerId") int playerId) throws IOException {
        return customRepo.getChakras(playerId);

    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/chakra/{value}",method = RequestMethod.PUT)
    @ResponseBody
    public int updateChakras(@PathVariable("playerId") int playerId, @PathVariable("value") int value) throws IOException {
        return customRepo.updateChakras(playerId,value);

    }

}
