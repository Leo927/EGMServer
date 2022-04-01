/**
 * This is a data class that is used to reduce the amount of data transferred. 
 * It is a subset of Map. And it only contains small information to be displayed on list. 
 */
module.exports = class MapListing{
  constructor(){
    this._id = "";
    this.name = "";
    this.uid = "";
  }
  /**
   * Get the data transfer unit
   */
  static fromMap(map){
    return {_id:map._id, name: map.name, uid:map.uid};
  }
}
