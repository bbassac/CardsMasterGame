package cardmastergame.service;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import cardmastergame.FileUtils;
import cardmastergame.LogUtils;
import cardmastergame.bean.Card;
import cardmastergame.bean.Deck;

@Component
public class CardService {
    private static final String BACK_DRAW = "/Back-Draw";
    private static final String BACK_SELECT = "/Back-Select";
    private static final String BACK_SELECT_3 = "/Back-Select3";
    private int lastIndex;
    private Map<Integer, Card> allCards;
    private Deck<Card> environnments;
    private Deck<Card>[] pioche;
    private Deck<Card> invocations;
    private Deck<Card>[] cimetieres;
    private Deck<Card>[] mains;
    private Deck<Card>[] plateaux;
    private Deck<Card>[] pieges;
    private Deck<Card>[] equipment;
    private Deck<Card> currentEnvironnement;

   // private CardUpdater cardUpdater = new CardUpdater("Naruto.json"); 

    @Value("${game.trap.max}")
    private int MAX_TRAP;

    private Random rand = new Random();

    public int startNewGame(){
        lastIndex = 0;
        environnments = new Deck<>();
        currentEnvironnement = new Deck<>();
        pioche = new Deck[2];
        pioche[0]= new Deck<>();
        pioche[1]= new Deck<>();
        invocations = new Deck<>();
        cimetieres = new Deck[2];
        cimetieres[0] = new Deck<>();
        cimetieres[1] = new Deck<>();
        pieges = new Deck[2];
        pieges[0] = new Deck<>();
        pieges[1] = new Deck<>();
        mains = new Deck[2];
        mains[0] = new Deck<>();
        mains[1] = new Deck<>();
        plateaux = new Deck[2];
        plateaux[0] = new Deck<>();
        plateaux[1] = new Deck<>();
        equipment = new Deck[2];
        equipment[0]= new Deck<>();
        equipment[1]= new Deck<>();
        allCards = new HashMap<>();

        int nbCards1 = loadStack(environnments, BACK_SELECT);
        LogUtils.warn("Loaded " + nbCards1 + " environement");
        int nbCards2 = loadStack(invocations, BACK_SELECT_3);
        LogUtils.warn("Loaded " + nbCards2 + " invocations");
        int nbCards3 = loadStack(pioche[0], BACK_DRAW);
        loadStack(pioche[1], BACK_DRAW);
        LogUtils.warn("Loaded " + nbCards3 + " pioches");
        int nbCards4 = selectCurrentEnvironnement();
        LogUtils.warn("1 environnement selectionné ");
        return nbCards1+nbCards2+nbCards3+nbCards4;
    }

    private int selectCurrentEnvironnement() {
        int nombreAleatoire = getRandomPosition(environnments);
        currentEnvironnement.push(environnments.get(nombreAleatoire));
        return 1;
    }

    private int getRandomPosition(Deck<Card> stack) {
        return rand.nextInt(stack.size() );
    }



    public void moveCardFromDrawToPlayer(int player) {
        if(pioche[player].size()>0) {
            int randomPoition = getRandomPosition(pioche[player]);
            mains[player].push(pioche[player].get(randomPoition));
            pioche[player].remove(randomPoition);
        }
    }

    private int loadStack(Deck<Card> stack, String folder) {
        String prop = FileUtils.getCurrentJarImgPath();
        File path = new File(prop + folder);
        File[] listOfFiles = path.listFiles();
        for (File listOfFile : listOfFiles) {
            if (listOfFile.isFile()) {
                lastIndex++;
                Card c = new Card();
                c.setId(lastIndex);
                c.setPath(folder + "\\" + listOfFile.getName());
                allCards.put(c.getId(), c);
                stack.push(c);
            }
        }
        
        //cardUpdater.update(stack);
        
        return listOfFiles.length;
    }

    private Card findCardInStackById(Deck<Card> stack ,String deckName, int cardId) {
        for (Card c : stack){
            if(c.getId()== cardId){
                return c;
            }
        }

        throw new UnsupportedOperationException(" Card " + cardId +" not found in "+deckName);
    }

    public void moveSpecificCardFromInvocationToPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(invocations,"invocations", cardId);
        invocations.remove(c);
        mains[playerId].push(c);
    }

    public void moveCardFromHandToGameForPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(mains[playerId],"main joueur " + playerId, cardId);
        mains[playerId].remove(c);
        plateaux[playerId].push(c);
    }

    public void moveCardFromHandToPiegeForPlayer(int playerId, int cardId) {
        if (pieges[playerId].size() < MAX_TRAP) {
            Card c = findCardInStackById(mains[playerId],"main joueur " + playerId, cardId);
            mains[playerId].remove(c);
            pieges[playerId].push(c);
        }
    }
    public void moveCardFromPiegeToGraveyardForPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(pieges[playerId],"piege joueur " + playerId, cardId);
        pieges[playerId].remove(c);
        cimetieres[playerId].push(c);
    }


    public void moveCardFromGameToGraveyardForPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(plateaux[playerId],"plateau joueur " + playerId ,cardId);
        cleanCard(c);
        plateaux[playerId].remove(c);
        cimetieres[playerId].push(c);
    }

    private void cleanCard(Card c) {
        c.setDammagePoints(0);
        c.setActivated(false);
        c.setUsed(false);
    }

    public void moveCardFromHandToGraveyardForPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(mains[playerId],"main joueur " + playerId, cardId);
        cleanCard(c);
        mains[playerId].remove(c);
        cimetieres[playerId].push(c);
    }

    public int updateDmgPointsOnCard(int playerId, int cardId, int value) {
        findCardInStackById(plateaux[playerId],"plateaux joueur " + playerId,cardId).setDammagePoints(value);
        return value;
    }


    public int getDmgOnCard(int playerId, int cardId) {
        return  findCardInStackById(plateaux[playerId],"plateau joueur " + playerId,cardId).getDammagePoints();
    }

    public void moveCardFromGraveyardToPlayerHand(int playerId, int cardId) {
        Card c = findCardInStackById(cimetieres[playerId],"cimetière joueur " + playerId, cardId);
        cimetieres[playerId].remove(c);
        mains[playerId].push(c);
    }


    public void moveCardFromOtherGraveyardToHand(int playerId, int cardId, int oppPlayerId) {
        Card c = findCardInStackById(cimetieres[oppPlayerId],"cimetière joueur " + playerId, cardId);
        cimetieres[oppPlayerId].remove(c);
        mains[playerId].push(c);
    }

    public Map<Integer, Card> getAllCards() {
        return allCards;
    }

    public boolean updateActivatedOnCard(int playerId, int cardId, boolean value) {
        findCardInStackById(plateaux[playerId],"plateau joueur " + playerId,cardId).setActivated(value);
        return value;
    }

    public boolean getActivatedOnCard(int playerId, int cardId) {
        return findCardInStackById(plateaux[playerId],"plateau joueur " + playerId,cardId).isActivated();
    }

    public boolean updateUsedOnCard(int playerId, int cardId,boolean value) {
        findCardInStackById(plateaux[playerId],"plateau joueur " + playerId,cardId).setUsed(value);
        return value;
    }

    public boolean getUsedOnCard(int playerId, int cardId) {
        return  findCardInStackById(plateaux[playerId],"plateau joueur " + playerId,cardId).isUsed();
    }


    public void setAllcardsNonActive(int playerId) {
        for ( Object c : plateaux[playerId]) {
            ((Card)c).setActivated(false);
        }
    }



    public Deck<Card> getStack(StackConstants stackName) {
        switch (stackName){
            case ENVIRONNEMENT:
                return currentEnvironnement;
            case ENVIRONNEMENTS:
                return environnments;
            case DRAW0:
                return pioche[0];
            case DRAW1:
                return pioche[1];
            case INVOCATIONS:
                return invocations;
            case GRAVEYARD0:
                return cimetieres[0];
            case GRAVEYARD1:
                return cimetieres[1];
            case HAND0:
                return mains[0];
            case HAND1:
                return mains[1];
            case BOARD0:
                return plateaux[0];
            case BOARD1:
                return plateaux[1];
            case TRAP0:
                return pieges[0];
            case TRAP1:
                return pieges[1];
            case EQUIPMENT0:
                return equipment[0];
            case EQUIPMENT1:
                return equipment[1];
            case ALL:
                Deck<Card> fullDeck = new Deck<>();
                loadStack(fullDeck, BACK_DRAW);
                return fullDeck;
            default:
                throw new UnsupportedOperationException();
        }

    }

    public void filterDraw(int playerId, List<String> result) {
        //Clear de la pioches
        pioche[playerId].clear();
        //Reinit from Scratch
        loadStack(pioche[playerId], BACK_DRAW);
        if (result.size()>0) {
            Deck<Card> newDeck = new Deck<>();
            for (Object c : pioche[playerId]) {
                Card card = (Card) c;
                if (result.contains(card.getPath())) {
                    newDeck.add(card);
                }
            }
            //on écrase
            pioche[playerId] = newDeck;
        }
    }

    public void moveCardFromHandToEquipmentForPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(mains[playerId],"equipment joueur " + playerId, cardId);
        mains[playerId].remove(c);
        equipment[playerId].push(c);
    }

    public void moveCardFromEquipmentToGraveyard(int playerId, int cardId) {
        Card c = findCardInStackById(equipment[playerId],"equipment joueur " + playerId, cardId);
        equipment[playerId].remove(c);
        cimetieres[playerId].push(c);
    }
}
