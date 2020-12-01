"use strict";

const BUS_COST = 1.8,
      MAX_COST = 3.2,
      COST_ONLY_ZONE_ONE = 2.5,
      COST_ONE_ZONE_NOT_INCLUDING_ZONE_ONE = 2.0,
      COST_TWO_ZONES_INCLUDING_ZONE_ONE = 3.0,
      COST_TWO_ZONES_EXCLUDING_ZONE_ONE = 2.25;

const STATIONS = {
    Holborn: [1],
    EarlsCourt: [1, 2],
    Hammersmith: [2],
    Wimbledon: [3]
};


class OysterCard {

    constructor (credit = 0) {
        this.credit = credit;
        this.fare = 0;
        this.points = [];
    }

    setCredit(amount) {
        if (typeof(amount) === 'number') {
            this.credit += amount;
        } else {
            return 0;
        }
        return this.credit;
    }

    getCredit() {
        return this.credit;
    }

    setDebit() {
        (this.credit >= this.fare ? this.credit -= this.fare : process.exit(console.log('Not enough credit!')));
        console.log('fare', this.fare)
    }

    enterStation(station) {
        if(typeof station === `object`) {
            this.points.push(station);
            this.fare = MAX_COST;
            this.setDebit();
        } else {
            process.exit(console.log('Invalid Station!'))
        }
    }

    exitStation() {
        this.getFinalCost();
        this.setCredit(MAX_COST);
        console.log('return fare');
        this.setDebit();
        this.points=[]
    }

    setNewJourney(finalStation) {
        this.points.push(finalStation);
    }

    setNewBusJourney() {
        this.fare = BUS_COST;
        this.setDebit();
    }

    getFinalCost() {
        if (this.points.length == 2) {
            var zonesCrossed = this.getZonesCrossed(this.points[0], this.points[1]);
            var isZoneOneCrossed = this.crossedZoneOne(this.points[0], this.points[1]);
            var cost = this.getCostByZone(zonesCrossed, isZoneOneCrossed);
            this.fare = cost;
        } else {
            this.fare = MAX_COST;
        }

    }

    getCostByZone(zonesCrossed, isZoneOneCrossed) {
        if(zonesCrossed == 1 && isZoneOneCrossed) { return COST_ONLY_ZONE_ONE; }
        if(zonesCrossed == 1 && !isZoneOneCrossed) { return COST_ONE_ZONE_NOT_INCLUDING_ZONE_ONE; }
        if(zonesCrossed == 2 && isZoneOneCrossed) { return COST_TWO_ZONES_INCLUDING_ZONE_ONE; }
        if(zonesCrossed == 2 && !isZoneOneCrossed) { return COST_TWO_ZONES_EXCLUDING_ZONE_ONE; }
        if(zonesCrossed == 3) { return MAX_COST; }
        return MAX_COST;
    }

    getZonesCrossed(from, to) {
        var minZonesVisited = 10;
        from.forEach(function(fromZone, index, array){
            to.forEach(function(toZone, index, array){
                var zonesVisited = Math.abs(fromZone - toZone) + 1;
                if(zonesVisited < minZonesVisited) {
                    minZonesVisited = zonesVisited;
                }
                if(minZonesVisited == 1) {
                    return;
                }
            });
        });
        return minZonesVisited;
    }

    in_arr(value, arr) {
        for(var i = 0; i < arr.length; i++) {
            if(arr[i] == value) return true;
        }
        return false;
    }

    crossedZoneOne(from, to) {
        return (from.length == 1 && this.in_arr(1, from)) || (to.length == 1 && this.in_arr(1, to));
    }

}

Object.defineProperty(OysterCard, 'STATIONS', {
  value: STATIONS,
  writable: false // makes the property read-only
});

module.exports = OysterCard;
