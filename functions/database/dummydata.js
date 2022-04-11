const {getDatabase} = require('./mongo');
const maps = require('./maps');

/**
 * @deprecated Will be removed in the future.
 * TODO - remove loadDummyData
 */
async function loadDummyData(){
    await maps.insertMap({
        uid:'ad4a5sd4a5sd',
        name:"Test Map Name Added From Dummy Data 1 ",
        width: 260,
        height: 940,
        markerGroups: []
    });
    await maps.insertMap({
        uid:'ad4a5sd4a5sd',
        name:"Test Map Name Added From Dummy Data 2",
        width: 220,
        height: 901,
        markerGroups: []
    });
    await maps.insertMap({
        _id: "623fcfbd6e343577380e4f97",
        uid:"ad4a5sd4a5sd",
        name:"Test Map Name Added From Dummy Data 3",
        width: 1,
        height: 5,
        markerGroups: []
    });
    await maps.insertMap({
        uid:'randomuser',
        name:"Test Map Name Added From Dummy Data 4",
        width: 2,
        height: 50,
        markerGroups: []
    });

}

module.exports = loadDummyData;