import React from "react";
import SingleImageViewer from "./SingleImageViewer";

class ImageViewer extends React.Component {
  state = {
    viewerOpen: false,
    viewerImageUrl: '',
  }

  componentDidMount() {
    if (this.props.ref != null) {
      this.props.ref(this)
    }
  }

  closeViewer = () => this.setState({viewerOpen: false, viewerImageUrl: ''})

  openViewer(imageUrl) {
    this.setState({viewerImageUrl: imageUrl, viewerOpen: true})
  }

  render() {
    return (
      <SingleImageViewer
        imageUrl={this.state.viewerImageUrl}
        close={this.closeViewer}
        isOpen={this.state.viewerOpen}/>
    )
  }
}

export default ImageViewer;