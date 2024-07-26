import create from 'zustand';
import { createDeck, getHandValue, Card } from "../card/qard";

interface GameState {
  deck: Card[];
  playerHand: Card[];
  dealerHand: Card[];
  playerScore: number;
  dealerScore: number;
  gameOver: boolean;
  playerChips: number;
  currentBet: number;
  dealInitialCards: () => void;
  playerHit: () => void;
  dealerPlay: () => void;
  resetGame: () => void;
  placeBet: (amount: number) => void;
  handleWin: () => void;
  handleLoss: () => void;
  handleDraw: () => void;
}

const useStore = create<GameState>((set, get) => ({
  deck: createDeck().sort(() => Math.random() - 0.5),
  playerHand: [],
  dealerHand: [],
  playerScore: 0,
  dealerScore: 0,
  gameOver: false,
  playerChips: 5000, 
  currentBet: 0,

  dealInitialCards: () => set((state) => {
    const playerHand = [state.deck.pop()!, state.deck.pop()!];
    const dealerHand = [state.deck.pop()!, state.deck.pop()!];
    return {
      playerHand,
      dealerHand,
      playerScore: getHandValue(playerHand),
      dealerScore: getHandValue(dealerHand),
      deck: state.deck,
      gameOver: false,
    };
  }),

  playerHit: () => set((state) => {
    const newCard = state.deck.pop()!;
    const newPlayerHand = [...state.playerHand, newCard];
    const newPlayerScore = getHandValue(newPlayerHand);
    return {
      playerHand: newPlayerHand,
      playerScore: newPlayerScore,
      deck: state.deck,
      gameOver: newPlayerScore >= 21,
    };
  }),

  dealerPlay: () => set((state) => {
    let dealerHand = [...state.dealerHand];
    while (getHandValue(dealerHand) < 17) {
      dealerHand.push(state.deck.pop()!);
    }
    const dealerScore = getHandValue(dealerHand);
    return {
      dealerHand,
      dealerScore,
      gameOver: true,
    };
  }),

  resetGame: () => set((state) => ({
    deck: createDeck().sort(() => Math.random() - 0.5),
    playerHand: [],
    dealerHand: [],
    playerScore: 0,
    dealerScore: 0,
    gameOver: false,
    currentBet: 0,
  })),

  placeBet: (amount) => set((state) => {
    if (state.playerChips >= amount) {
      return {
        playerChips: state.playerChips - amount,
        currentBet: state.currentBet + amount,
      };
    }
    return state;
  }),

  handleWin: () => set((state) => ({
    playerChips: state.playerChips + state.currentBet * 2,
    currentBet: 0,
  })),

  handleLoss: () => set((state) => ({
    currentBet: 0,
  })),

  handleDraw: () => set((state) => ({
    playerChips: state.playerChips + state.currentBet,
    currentBet: 0,
  })),
}));

export default useStore;


