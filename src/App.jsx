import React, { Component } from 'react';
import './App.css';
import Card from './Card.jsx';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      photo_list: this.props.data.properties,
      photo: this.props.data.properties[4]
    }

    this.nextPhoto = this.nextPhoto.bind(this);
    this.prevPhoto = this.prevPhoto.bind(this);
  }

  nextPhoto() {
    if(this.state.photo.id === this.props.data.properties.length-1) return;
    const newIndex = this.state.photo.id+1;
    this.setState({
      photo: this.props.data.properties[newIndex]
    })
  }

  prevPhoto() {
    if(this.state.photo.id === 0) return; //prevents indexoutofbounds`  
    const newIndex = this.state.photo.id-1;
    this.setState({
      photo: this.props.data.properties[newIndex]
    })
  }
 
  handleKeyDown(event) {
    if(this.props.show === true){
      if(event.key === 'Escape') {
        this.props.handleClose();
      } else if (event.key === 'ArrowLeft'){
        this.prevPhoto();
      } else if (event.key === 'ArrowRight') {
        this.nextPhoto();
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  }

  render() {
    if (this.props.show === false){
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.85)',
      padding: 50,
    };

    // The modal "window"
    const modalStyle = {
      //backgroundColor: '#fff',
      //display: 'flex',
      position: 'relative',
      backgroundColor: 'transparent',
      padding: 1,
      
    };
    const closeButton = {
      position: 'relative',
      left: 260,
      bottom: 200
    }
    const leftArrow = {
      position:'relative',
      left: -200,
      bottom: 0
    }
    const rightArrow = {
      position:'relative',
      right: -200,
      bottom: 0,
    }

    const {photo_list, photo} = this.state;
    return (
  <div className="backdrop" style={backdropStyle}>
    <div className="modal" style={modalStyle}>
      <div className="App">

        <div className="page">
            
            <section id = "wrapper">
                <i
                  onClick={() => this.prevPhoto()} 
                  //disabled={photo.id === data.properties.length-1}
                  class="fa fa-angle-left fa-3x"
                  style={leftArrow}
                  id='modal-icon'
                >
                </i>




                <img src={this.state.photo.photo_url} className="App-logo"/>


                <i
                  onClick={() => this.nextPhoto()} 
                  //disabled={photo.id === data.properties.length-1}
                  class="fa fa-angle-right fa-3x"
                  style={rightArrow}
                  id='modal-icon'
                >
                </i>



            {console.log(this.props)}

        <i style={closeButton} onClick={this.props.handleClose} class="fas fa-times fa-2x" id='modal-icon'></i>

            </section>




            <div className="col">
              <div className={`cards-slider active-slide-${photo.id}`}>
                <div className="cards-slider-wrapper" style={{
                  'transform': `translateX(-${photo.id*(100/photo_list.length)}%)`
                }}>
                  {photo_list.map(photo => <Card key={photo.id} photo={photo} /> )}
                </div>
              </div>
            </div>

        </div>
      </div>

    </div>
    </div>
    );
  }
}

export default App;
