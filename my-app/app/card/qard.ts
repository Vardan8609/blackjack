const suits = ["sirt", "qyap", "xach", "khar"];
const values = ["tuz", "2", "3", "4", "5", "6", "7", "8", "9", "10", "valet", "dama", "korol"];

const cardImages = {
  sirt: [
    '/images/Atlas_deck_ace_of_hearts.svg.png', 
    '/images/images.png',                        
    '/images/Atlas_deck_4_of_hearts.svg.png',     
    '/images/Atlas_deck_5_of_hearts.svg.png',     
    '/images/images888.png',                     
    '/images/Atlas_deck_7_of_hearts.svg.png',     
    '/images/Atlas_deck_8_of_hearts.svg.png',    
    '/images/Atlas_deck_9_of_hearts.svg.png',    
    '/images/Playing_card_heart_10.svg.png',     
    '/images/Atlas_deck_jack_of_hearts.svg.png',  
    '/images/images (3).png',                    
    '/images/images (4).png',                    
    '/images/Atlas_deck_ace_of_hearts.svg.png'    
  ],
  qyap: [
    '/images/Atlas_deck_ace_of_diamonds.svg.png',  
    '/images/Atlas_deck_2_of_diamonds.svg.png',    
    '/images/Atlas_deck_3_of_diamonds.svg.png',   
    '/images/Atlas_deck_4_of_diamonds.svg.png',   
    '/images/Atlas_deck_5_of_diamonds.svg.png',   
    '/images/Atlas_deck_6_of_diamonds.svg.png',  
    '/images/Atlas_deck_7_of_diamonds.svg.png',   
    '/images/images (1).png',                    
    '/images/1200px-Atlas_deck_9_of_diamonds.svg.png', 
    '/images/Atlas_deck_10_of_diamonds.svg.png',   
    '/images/Atlas_deck_jack_of_diamonds.svg.png', 
    '/images/28.png',                              
    '/images/images (5).png'                      
  ],
  xach: [
    '/images/Atlas_deck_ace_of_clubs.svg.png',     
    '/images/unknown-2-of-clubs-from-a-deck-of-goodall-son-ltd-playing-cards-c1940_u-l-q1mzjsg0.jpg', 
    '/images/17036191-playing-cards-three-of-clubs.jpg',  
    '/images/Atlas_deck_4_of_clubs.svg.png',      
    '/images/Atlas_deck_5_of_clubs.svg.png',      
    '/images/Atlas_deck_6_of_clubs.svg.png',      
    '/images/Atlas_deck_7_of_clubs.svg.png',       
    '/images/Atlas_deck_8_of_clubs.svg.png',       
    '/images/images (2).png',                     
    '/images/Atlas_deck_10_of_clubs.svg.png',     
    '/images/Atlas_deck_jack_of_clubs.svg.png',    
    '/images/Atlas_deck_queen_of_clubs.svg.png',   
    '/images/images.jpg'                           
  ],
  khar: [
    '/images/Atlas_deck_ace_of_spades.svg.png',    
    '/images/Atlas_deck_2_of_spades.svg.png',      
    '/images/Atlas_deck_3_of_spades.svg.png',      
    '/images/Atlas_deck_4_of_spades.svg (1).png',  
    '/images/5-of-spades-from-a-deck-of-goodall-son-ltd-playing-cards-c1940-artist-unknown-W7EW8B.jpg', 
    '/images/Atlas_deck_6_of_spades.svg.png',     
    '/images/Atlas_deck_7_of_spades.svg.png',      
    '/images/Atlas_deck_8_of_spades.svg.png',     
    '/images/Atlas_deck_9_of_spades.svg.png',     
    '/images/Atlas_deck_10_of_spades.svg.png',    
    '/images/Atlas_deck_jack_of_spades.svg.png',   
    '/images/Atlas_deck_queen_of_spades.svg.png',  
    '/images/images (1).jpg'                      
  ]
};

interface Card {
  suit: string;
  value: string;
}

const createDeck = (): Card[] => {
  let deck: Card[] = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
};

const getCardValue = (card: Card): number => {
  if (card.value === "tuz") return 11;
  if (["korol", "dama", "valet"].includes(card.value)) return 10;
  return parseInt(card.value);
};

const getHandValue = (hand: Card[]): number => {
  let value = hand.reduce((sum, card) => sum + getCardValue(card), 0);
  let aceCount = hand.filter(card => card.value === "tuz").length;
  while (value > 21 && aceCount > 0) {
    value -= 10;
    aceCount--;
  }
  return value;
};

const getCardImage = (card: Card): string => {
  const suitIndex = suits.indexOf(card.suit);
  const valueIndex = values.indexOf(card.value);

  if (suitIndex === -1 || valueIndex === -1) {
    throw new Error(`Invalid card: ${card.suit} ${card.value}`);
  }

  return cardImages[suits[suitIndex]][valueIndex];
};

export { createDeck, getCardValue, getHandValue, getCardImage };



