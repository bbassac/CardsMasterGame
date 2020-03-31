package cardmastergame.bean;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class AffiniteManager {

    private static Random rand = new Random();

    private static Map<Integer, String> affinite  = new HashMap<Integer, String>() {{
        put(0, "Feu");
        put(1, "Vent");
        put(2, "Foudre");
        put(3, "Special");
        put(4, "Physique");
        put(5, "Terre");
        put(6, "Eau");
    }};

    public static String[] initialize() {
        String result[] = new String[2];
        result[0] = affinite.get(rand.nextInt(affinite.size()-1));
        result[1] = affinite.get(rand.nextInt(affinite.size()-1));
        return result;
    }
}
