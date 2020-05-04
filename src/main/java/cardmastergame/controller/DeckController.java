package cardmastergame.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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