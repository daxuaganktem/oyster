const OysterCard = require('./OysterCard.class');
let card = new OysterCard();

//Get cost tests
test('only zone 1', () => {
  expect(card.getCostByZone(1, true)).toBe(2.5);
});

test('2 zones with 1', () => {
  expect(card.getCostByZone(2, true)).toBe(3);
});

test('3 zones', () => {
  expect(card.getCostByZone(3, true)).toBe(3.2);
});

test('1 zone without 1', () => {
  expect(card.getCostByZone(1, false)).toBe(2);
});

test('2 zones without 1', () => {
  expect(card.getCostByZone(2, false)).toBe(2.25);
});

//set balance test
test('set positive balance', () => {
  expect(card.setCredit(20.5)).toBe(20.5);
});

test('get zones crossed', () => {
  expect(card.getZonesCrossed([1,2],[1])).toBe(1)
})

test('get zones crossed', () => {
  expect(card.getZonesCrossed([1,2],[3])).toBe(2)
})

//check out station test
test("No checkout", () => {
  var card = new OysterCard(30);
  card.enterStation(OysterCard.STATIONS.Hammersmith)
	card.setNewJourney(OysterCard.STATIONS.EarlsCourt);
	expect(card.getCredit()).toBe(26.8);
});
