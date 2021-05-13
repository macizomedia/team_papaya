import { createContext, Component } from "react";

const galleryContext = createContext();

class CentralStore extends Component {
    constructor(props) {
        super(props);
        this.state = { images: [] }
        this.getPhotos = this.getPhotos.bind(this);
    }

    getPhotos() {
        fetch()
            .then(res => res.json())
            .then(myImages => { this.state({ images: myImages }) })
    }

    render() {
        return (
            <galleryContext.Provider value={{ ...this.state, getPhotos: this.getPhotos }}>
                {this.props.children}
            </galleryContext.Provider>
        )
    }
}

export default galleryContext

export { CentralStore }