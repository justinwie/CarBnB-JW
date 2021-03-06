const React = require('react');
const CarIndexItem = require('./car_index_item')
const CarStore = require('../stores/car_store')
const CarActions = require('../actions/car_actions')
const CarMap = require('./car_map')

const CarIndex = React.createClass({
  getInitialState(){
    return { cars: {} }
  },

  componentDidMount(){
    this.storeListener = CarStore.addListener(this._handleChange);
    CarActions.fetchAllCars();
  },

  componentWillUnmount(){
    this.storeListener.remove();
  },

  _handleChange(){
    this.setState({ cars: CarStore.all() })
  },

  position(x, y){
    return {lat: x, lng: y};
  },

  render(){
    let cars_arr = []

    for (var idx in this.state.cars){
      let lng = this.state.cars[idx].lng;
      let lat = this.state.cars[idx].lat;
      let latLng = new google.maps.LatLng(lat, lng)

      if (this.props.bounds && this.props.bounds.contains(latLng)){
        cars_arr.push(this.state.cars[idx])
      };
    }

    return(
      <div className='car_index'>
        <div className='car_index_spacer'>
        {
          cars_arr.map(function(car){
            return <CarIndexItem car={car} key={car.id} carImage={car.imageurl}/>
          })
        }
      </div>
      </div>
    );
  }
});

module.exports = CarIndex;
