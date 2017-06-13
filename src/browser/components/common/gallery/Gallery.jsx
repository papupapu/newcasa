import React from 'react';
import PropTypes from 'prop-types';

import Image from '../image/Image';
import GallerySlider from './GallerySlider';

import './Gallery.css';

class Gallery extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      iGotSizes: false,
    };
    this.sliderObj = null;
    this.floorplanIndex = null;
  }

  componentDidMount() {
    this.setSliderMediaUp();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const device = nextProps.device !== '' && nextProps.device !== this.props.device;
    const viewport = nextProps.viewport.width !== '' && nextProps.viewport.width !== this.props.viewport.width;
    const media = nextProps.media[0].src !== this.props.media[0].src;
    const availableSizes = nextState.iGotSizes && !this.state.iGotSizes;
    if (device || viewport || media || availableSizes) {
      if (media) {
        this.photoArray = nextProps.media.filter((el) => { if (el.type === 'photo') { return el; } return false; });
      }
      const gWidth = Math.floor((this.gallery.offsetHeight * 360) / 265);
      this.sliderSizes = [
        gWidth,
        this.gallery.offsetHeight,
      ];
      this.sliderObj = {
        media: this.photoArray,
        floorplanIndex: this.floorplanIndex,
        // slidesLinkTo: this.props.slidesLinkTo,
        sizes: this.sliderSizes,
        device: nextProps.device,
        // type: this.props.type,
      };
      return true;
    }
    return false;
  }

  setSliderMediaUp() {
    const { media } = this.props;
    this.photoArray = media.filter(
      (el, index) => {
        if (el.type === 'photo') {
          return el;
        } else if (el.type === 'floorplan') {
          if (this.floorplanIndex === null) {
            this.floorplanIndex = index;
          }
          return el;
        }
        return false;
      },
    );
    this.setState({ iGotSizes: true });
  }

  render() {
    const sliderObj = this.sliderObj;
    return (
      <div
        ref={(gallery) => { this.gallery = gallery; }}
        className={this.props.cssClassName !== '' ? `${this.props.cssClassName} gallery` : 'gallery'}
      >
        {
          this.state.iGotSizes ?
            <GallerySlider {...sliderObj} />
          :
            <Image src={this.props.media[0].src} alt="" />
        }
        <span className={this.props.depth}>Platinum</span>
      </div>
    );
  }

}

Gallery.propTypes = {
  device: PropTypes.string,
  viewport: PropTypes.instanceOf(Object),
  depth: PropTypes.string,
  media: PropTypes.instanceOf(Array),
  cssClassName: PropTypes.string,
  /*category: React.PropTypes.string,
  title: React.PropTypes.string,
  slidesLinkTo: React.PropTypes.string,
  type: React.PropTypes.string,*/
};

Gallery.defaultProps = {
  device: '',
  viewport: {},
  depth: '',
  media: [],
  cssClassName: '',
  /*slidesLinkTo: '',
  category: '',
  title: '',
  type: 'contained',*/
};

export default Gallery;
