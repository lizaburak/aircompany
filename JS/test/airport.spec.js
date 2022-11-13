const chai = require("chai");
chai.use(require("chai-sorted"));

const { assert, expect } = chai;

const Airport = require('../Airport');

const MilitaryPlane = require('../Planes/MilitaryPlane');
const PassengerPlane = require('../Planes/PassengerPlane');
const ExperimentalPlane = require('../Planes/ExperimentalPlane');

const MILITARY_TYPES = require('../models/militaryTypes');
const EXPERIMENTAL_TYPES = require('../models/experimentalTypes');
const CLASSIFICATION_LEVELS= require('../models/classificationLevels');

describe('Test Airport', () => {
    const militaryBomberPlanes = [
        new MilitaryPlane("B-1B Lancer", 1050, 21000, 80000, MILITARY_TYPES.BOMBER),
        new MilitaryPlane("B-2 Spirit", 1030, 22000, 70000, MILITARY_TYPES.BOMBER),
        new MilitaryPlane("B-52 Stratofortress", 1000, 20000, 80000, MILITARY_TYPES.BOMBER),
      ];
    
      const militaryFighterPlanes = [
        new MilitaryPlane("F-15", 1500, 12000, 10000, MILITARY_TYPES.FIGHTER),
        new MilitaryPlane("F-22", 1550, 13000, 11000, MILITARY_TYPES.FIGHTER),
      ];
    
      const militaryTransportPlanes = [
        new MilitaryPlane("C-130 Hercules", 650, 5000, 110000, MILITARY_TYPES.TRANSPORT),
      ];

      const classifiedExperimentalPlanes = [
        new ExperimentalPlane('Bell X-14', 277, 482, 500, EXPERIMENTAL_TYPES.HIGH_ALTITUDE, CLASSIFICATION_LEVELS.SECRET),
        new ExperimentalPlane('Ryan X-13 Vertijet', 560, 307, 500, EXPERIMENTAL_TYPES.VTOL, CLASSIFICATION_LEVELS.TOP_SECRET)
      ];

      const PassengerPlanes = [
        new PassengerPlane("Boeing-737", 900, 12000, 60500, 164),
        new PassengerPlane("Boeing-737-800", 940, 12300, 63870, 192),
        new PassengerPlane("Boeing-747", 980, 16100, 70500, 242),
        new PassengerPlane("Airbus A320", 930, 11800, 65500, 188),
        new PassengerPlane("Airbus A330", 990, 14800, 80500, 222),
        new PassengerPlane("Embraer 190", 870, 8100, 30800, 64),
        new PassengerPlane("Sukhoi Superjet 100", 870, 11500, 50500, 140),
        new PassengerPlane("Bombardier CS300", 920, 11000, 60700, 196),
      ];

      const planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);

      const planes = [ 
        ...militaryBomberPlanes,
        ...militaryFighterPlanes,
        ...militaryTransportPlanes,
        ...classifiedExperimentalPlanes,
        ...PassengerPlanes,
      ];  

      it('Should have military planes with transport type.', () => {
        const airport = new Airport(planes);
        const filteredPlanes = airport.getTransportMilitaryPlanes();
    
        expect(filteredPlanes).to.have.members(militaryTransportPlanes);
      });

      it('Should find passenger plane with max capacity.', () => {
        const airport = new Airport(planes);
        const selectedPlane = airport.getPassengerPlaneWithMaxPassengersCapacity();
    
        assert.deepEqual(selectedPlane, planeWithMaxPassengerCapacity);
      });

    it('Should sort by max load capacity.', () => {
        const airport = new Airport(planes);
        airport.sortByMaxLoadCapacity();
        const planesSortedByMaxLoadCapacity = airport.planes;

        expect(planesSortedByMaxLoadCapacity).to.be.ascendingBy("maxLoadCapacity");
    })

    it('Should check that at least one bomber is present in military planes.', () => {
        const airport = new Airport(planes);
        const bomberMilitaryPlanes  = airport.getBomberMilitaryPlanes();

        expect(bomberMilitaryPlanes).to.have.members(militaryBomberPlanes);
    })

    it('Should check that experimental planes has classification level higher than unclassified.', () => {
        const airport = new Airport(planes);
        let experimentalPlanes  = airport.getExperimentalPlanes();

        expect(experimentalPlanes).to.have.members(classifiedExperimentalPlanes);
    });
});



