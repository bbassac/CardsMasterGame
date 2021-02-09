package cardmastergame.service;

import cardmastergame.FileUtils;
import cardmastergame.LogUtils;
import cardmastergame.bean.Card;
import cardmastergame.bean.Deck;
import cardmastergame.controller.MyFilters;
import cardmastergame.controller.SearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Component
public class CardService {
    private static final String BACK_DRAW = "/Back-Draw";
    private static final String BACK_SELECT = "/Back-Select";
    private static final String BACK_SELECT_3 = "/Back-Select3";
    @Autowired
    private SearchEngine searchEngine ;
    private int lastIndex;
    private Deck<Card> environnments;
    private Deck<Card>[] pioche;
    private Deck<Card> invocations;
    private Deck<Card>[] cimetieres;
    private Deck<Card>[] mains;
    private Deck<Card>[] plateaux;
    private Deck<Card>[] pieges;
    private Deck<Card>[] equipment;
    private Deck<Card> currentEnvironnement;
    @Autowired
    private MetaDataService metaDataService;
    @Autowired
    private PlayerService playerService;

    @Value("${game.trap.max}")
    private int MAX_TRAP;

    private Random rand = new Random();

    public void startNewGame() {
        lastIndex = 0;
        environnments = new Deck<>();
        currentEnvironnement = new Deck<>();
        pioche = new Deck[2];
        pioche[0] = new Deck<>();
        pioche[1] = new Deck<>();
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
        equipment[0] = new Deck<>();
        equipment[1] = new Deck<>();

        LogUtils.warn("Loaded " + loadStack(environnments, BACK_SELECT) + " environment");
        LogUtils.warn("Loaded " + selectCurrentEnvironnement() + " environnement courant");
        LogUtils.warn("Loaded " + loadStack(invocations, BACK_SELECT_3) + " invocations");
        updateReinforced(invocations);
        LogUtils.warn("Loaded " + loadAndDecorateDeck(pioche[0], 0, BACK_DRAW) + " pioche joueur 0");
        LogUtils.warn("Loaded " + loadAndDecorateDeck(pioche[1], 1, BACK_DRAW) + " pioche joueur 1");
    }

    private int selectCurrentEnvironnement() {
        int nombreAleatoire = getRandomPosition(environnments);
        currentEnvironnement.push(environnments.get(nombreAleatoire));
        return 1;
    }

    private int getRandomPosition(Deck<Card> stack) {
        return rand.nextInt(stack.size());
    }


    public void moveCardFromDrawToPlayer(int player) {
        if (pioche[player].size() > 0) {
            int randomPoition = getRandomPosition(pioche[player]);
            mains[player].push(pioche[player].get(randomPoition));
            pioche[player].remove(randomPoition);
        }
    }

    private int loadAndDecorateDeck(Deck<Card> stack, Integer player, String folder) {
        int i = loadStack(stack, folder);

        updateReinforced(stack);
        updateEquipmentChakra(player, stack);
        return i;
    }

    private int loadStack(Deck<Card> stack, String folder) {
        String prop = FileUtils.getCurrentJarImgPath();
        File path = new File(prop + folder);
        File[] files = path.listFiles();
        for (File listOfFile : files) {
            if (listOfFile.isFile()) {
                lastIndex++;
                Card c = new Card();
                c.setId(lastIndex);
                c.setPath(folder + "\\" + listOfFile.getName());
                stack.push(c);
            }
        }

        metaDataService.update(stack, folder);

        return files.length;
    }

    private void updateEquipmentChakra(Integer player, Deck<Card> stack) {
        if (player != null) {

            String chakra = playerService.getAffinite(player).getMetaData().getChakra();
            for (Card c : stack) {
                if (c.isWeaponOrArmor()) {
                    c.getMetaData().setChakra(chakra);
                }
            }
        }
    }


    private void updateReinforced(Deck<Card> stack) {
        for (Card c : stack) {
            if ("Ninja".equals(c.getMetaData().getKind())) {
                if (c.getMetaData().getChakra().equals(currentEnvironnement.get(0).getMetaData().getChakra())) {
                    c.getStatus().setReinforced(true);
                }
            }
        }
    }

    private Card findCardInStackById(Deck<Card> stack, String deckName, int cardId) {
        for (Card c : stack) {
            if (c.getId() == cardId) {
                return c;
            }
        }

        throw new CardNotFoundException(" Card " + cardId + " not found in " + deckName);
    }

    public void moveSpecificCardFromInvocationToPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(invocations, "invocations", cardId);
        invocations.remove(c);
        mains[playerId].push(c);
    }

    public void moveCardFromHandToGameForPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(mains[playerId], "main joueur " + playerId, cardId);
        mains[playerId].remove(c);
        plateaux[playerId].push(c);
    }

    public void moveCardFromHandToPiegeForPlayer(int playerId, int cardId) {
        if (pieges[playerId].size() < MAX_TRAP) {
            Card c = findCardInStackById(mains[playerId], "main joueur " + playerId, cardId);
            mains[playerId].remove(c);
            pieges[playerId].push(c);
        }
    }

    public void moveCardFromPiegeToGraveyardForPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(pieges[playerId], "piege joueur " + playerId, cardId);
        cleanCard(c);
        pieges[playerId].remove(c);
        cimetieres[playerId].push(c);
    }


    public void moveCardFromGameToGraveyardForPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(plateaux[playerId], "plateau joueur " + playerId, cardId);
        cleanCard(c);
        plateaux[playerId].remove(c);
        cimetieres[playerId].push(c);
    }

    private void cleanCard(Card c) {
        c.setDammagePoints(0);
        c.getStatus().setActivated(false);
        c.getStatus().setUsed(false);
        c.getStatus().setHidden(false);
        c.getStatus().setStuned(false);
    }

    public void moveCardFromHandToGraveyardForPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(mains[playerId], "main joueur " + playerId, cardId);
        cleanCard(c);
        mains[playerId].remove(c);
        cimetieres[playerId].push(c);
    }

    public int updateDmgPointsOnCard(int playerId, int cardId, int value) {
        findCardInStackById(plateaux[playerId], "plateaux joueur " + playerId, cardId).setDammagePoints(value);
        return value;
    }


    public int getDmgOnCard(int playerId, int cardId) {
        return findCardInStackById(plateaux[playerId], "plateau joueur " + playerId, cardId).getDammagePoints();
    }

    public void moveCardFromGraveyardToPlayerHand(int playerId, int cardId) {
        Card c = findCardInStackById(cimetieres[playerId], "cimetière joueur " + playerId, cardId);
        cimetieres[playerId].remove(c);
        mains[playerId].push(c);
    }


    public void moveCardFromOtherGraveyardToHand(int playerId, int cardId, int oppPlayerId) {
        Card c = findCardInStackById(cimetieres[oppPlayerId], "cimetière joueur " + playerId, cardId);
        cimetieres[oppPlayerId].remove(c);
        mains[playerId].push(c);
    }

    public boolean updateActivatedOnCard(int playerId, int cardId, boolean value) {
        findCardInStackById(plateaux[playerId], "plateau joueur " + playerId, cardId).getStatus().setActivated(value);
        return value;
    }

    public boolean getActivatedOnCard(int playerId, int cardId) {
        return findCardInStackById(plateaux[playerId], "plateau joueur " + playerId, cardId).getStatus().isActivated();
    }

    public boolean updateUsedOnCard(int playerId, int cardId, boolean value) {
        findCardInStackById(plateaux[playerId], "plateau joueur " + playerId, cardId).getStatus().setUsed(value);
        return value;
    }

    public boolean getUsedOnCard(int playerId, int cardId) {
        return findCardInStackById(plateaux[playerId], "plateau joueur " + playerId, cardId).getStatus().isUsed();
    }


    public void setAllcardsNonActive(int playerId) {
        for (Object c : plateaux[playerId]) {
            ((Card) c).getStatus().setActivated(false);
        }
        for (Object c : equipment[playerId]) {
            ((Card) c).getStatus().setActivated(false);
        }
    }


    public Deck<Card> getStack(StackConstants stackName) {
        switch (stackName) {
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
                throw new CardNotFoundException("Stack name " + stackName + " not found");
        }

    }

    public void filterDraw(int playerId, List<String> result) {
        //Clear de la pioches
        pioche[playerId].clear();
        //Reinit from Scratch
        loadAndDecorateDeck(pioche[playerId], playerId, BACK_DRAW);
        if (result.size() > 0) {
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
        Card c = findCardInStackById(mains[playerId], "equipment joueur " + playerId, cardId);
        mains[playerId].remove(c);
        equipment[playerId].push(c);
    }

    public void moveCardFromEquipmentToGraveyard(int playerId, int cardId) {
        Card c = findCardInStackById(equipment[playerId], "equipment joueur " + playerId, cardId);
        cleanCard(c);
        equipment[playerId].remove(c);
        cimetieres[playerId].push(c);
    }

    public boolean updateActivatedOnEquipmentCard(int playerId, int cardId, boolean value) {
        findCardInStackById(equipment[playerId], "equipement joueur " + playerId, cardId).getStatus().setActivated(value);
        return value;
    }

    public boolean updateUsedOnEquipmentCard(int playerId, int cardId, boolean value) {
        findCardInStackById(equipment[playerId], "equipement joueur " + playerId, cardId).getStatus().setUsed(value);
        return value;
    }

    public boolean updateHiddendOnCard(int playerId, int cardId, boolean value) {
        findCardInStackById(plateaux[playerId], "plateau joueur " + playerId, cardId).getStatus().setHidden(value);
        return value;
    }

    public boolean updateStunedOnCard(int playerId, int cardId, boolean value) {
        findCardInStackById(plateaux[playerId], "plateau joueur " + playerId, cardId).getStatus().setStuned(value);
        return value;
    }


    public boolean updateUsedOnTrapCard(int playerId, int cardId, boolean value) {
        findCardInStackById(pieges[playerId], "piège joueur " + playerId, cardId).getStatus().setUsed(value);
        return value;
    }

    public Deck<Card> searchCards(MyFilters filters) {
        Deck<Card> fullDeck = new Deck<>();
        loadStack(fullDeck, BACK_DRAW);

        if (!filters.getName().isEmpty()) {
            fullDeck = fullDeck.stream().filter(
                    p -> p.getMetaData().getName().toLowerCase().contains(filters.getName().toLowerCase()))
                    .collect(Collectors.toCollection(Deck::new));
        }
        if (!filters.getChakra().isEmpty()) {
            fullDeck = fullDeck.stream().filter(
                    p -> p.getMetaData().getChakra().equals(filters.getChakra()))
                    .collect(Collectors.toCollection(Deck::new));
        }


        return fullDeck;
    }

    public Deck<Card> searchCards(List<SearchCriteria> params) {
        Deck<Card> fullDeck = new Deck<Card>();
        loadStack(fullDeck, CardService.BACK_DRAW);
        return searchEngine.searchCards(params, fullDeck);
    }

}
