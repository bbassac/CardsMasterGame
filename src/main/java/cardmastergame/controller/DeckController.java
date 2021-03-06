package cardmastergame.controller;

import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class DeckController extends AbstractController{

    @CrossOrigin
    @RequestMapping(path="/deck", method = RequestMethod.PUT,produces = "text/plain;charset=utf-8")
    @ResponseBody
    public byte[] getCollections(
        @RequestBody List<String> deck) throws IOException {
        //Filter doublons
        Set<String> set = new HashSet<>(deck);
          
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
          
            for (String s: set){
                 outputStream.write(s.getBytes(StandardCharsets.UTF_8));
                 outputStream.write("\r\n".getBytes());
         
            }
            outputStream.close();
  
           
     
        return outputStream.toByteArray();

    }



}